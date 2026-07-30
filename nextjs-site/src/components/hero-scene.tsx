'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Renderer,
  Camera,
  Transform,
  Program,
  Mesh,
  Geometry,
  Sphere,
  WireMesh,
  Vec3,
  Color,
} from 'ogl';

/* -------------------------------------------------------------------------- */
/*  GLSL — shared 3D simplex noise (Ashima / Stefan Gustavson, MIT)           */
/* -------------------------------------------------------------------------- */

const NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
      i.z+vec4(0.0,i1.z,i2.z,1.0))
    + i.y+vec4(0.0,i1.y,i2.y,1.0))
    + i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

/*  Vertex shader shared by the core sphere + wireframe shell so they morph  */
/*  together along the sphere normal.                                       */
const CORE_VERT = /* glsl */ `
attribute vec3 position;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform float uAmp;
varying vec3 vNormalV;
varying vec3 vViewV;
varying float vDisp;

${NOISE_GLSL}

void main(){
  vec3 n = normalize(position);
  float t = uTime;
  float n1 = snoise(n * 1.05 + vec3(0.0, 0.0, t * 0.22));
  float n2 = snoise(n * 2.20 + vec3(t * 0.16, t * 0.05, 0.0)) * 0.45;
  float disp = (n1 + n2) * uAmp;
  vDisp = disp;
  vec3 pos = position + n * disp;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vViewV = normalize(-mv.xyz);
  vNormalV = normalize(mat3(modelViewMatrix) * n);
  gl_Position = projectionMatrix * mv;
}
`;

const CORE_FRAG = /* glsl */ `
precision highp float;
varying vec3 vNormalV;
varying vec3 vViewV;
varying float vDisp;
uniform float uTime;
uniform vec3 uBase;
uniform vec3 uRim;

void main(){
  float fres = pow(1.0 - clamp(dot(normalize(vNormalV), normalize(vViewV)), 0.0, 1.0), 2.4);
  float pulse = 0.5 + 0.5 * sin(uTime * 1.1);
  // valleys glow brighter -> molten energy core look
  float valleys = clamp(-vDisp * 3.0, 0.0, 1.0);
  vec3 col = uBase;
  col = mix(col, uRim, fres);
  col += uRim * valleys * (0.5 + 0.4 * pulse);
  col += uRim * fres * (0.35 + 0.35 * pulse);
  gl_FragColor = vec4(col, 1.0);
}
`;

const WIRE_FRAG = /* glsl */ `
precision highp float;
uniform vec3 uColor;
uniform float uOpacity;
void main(){
  gl_FragColor = vec4(uColor, uOpacity);
}
`;

/*  Starfield / orbital points                                                */
const POINT_VERT = /* glsl */ `
attribute vec3 position;
attribute float aSize;
attribute float aSeed;
attribute vec3 aColor;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform float uPixelRatio;
varying float vSeed;
varying vec3 vColor;
void main(){
  vSeed = aSeed;
  vColor = aColor;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * uPixelRatio * (210.0 / max(0.001, -mv.z));
  gl_Position = projectionMatrix * mv;
}
`;

const POINT_FRAG = /* glsl */ `
precision highp float;
varying float vSeed;
varying vec3 vColor;
uniform float uTime;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;
  float alpha = smoothstep(0.5, 0.0, d);
  alpha *= alpha;
  float tw = 0.55 + 0.45 * sin(uTime * 1.6 + vSeed * 6.2831);
  gl_FragColor = vec4(vColor * (0.6 + 0.6 * tw), alpha);
}
`;

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

/** Build a typed array of N points scattered in a box with falloff toward edges */
function makeStarfield(count: number, spread: number) {
  const position = new Float32Array(count * 3);
  const aSize = new Float32Array(count);
  const aSeed = new Float32Array(count);
  const aColor = new Float32Array(count * 3);
  const pale = [0.72, 0.92, 0.84];
  const emerald = [0.0, 0.9, 0.62];
  for (let i = 0; i < count; i++) {
    // distribute in a box, biased to a shell for depth
    const x = (Math.random() * 2 - 1) * spread;
    const y = (Math.random() * 2 - 1) * spread * 0.7;
    const z = (Math.random() * 2 - 1) * spread * 1.2;
    position.set([x, y, z], i * 3);
    aSize[i] = 0.4 + Math.random() * 1.8;
    aSeed[i] = Math.random();
    const c = Math.random() > 0.55 ? emerald : pale;
    aColor.set(c, i * 3);
  }
  return { position, aSize, aSeed, aColor };
}

/** Points arranged on a tilted orbital ring around the core */
function makeRing(count: number, radius: number) {
  const position = new Float32Array(count * 3);
  const aSize = new Float32Array(count);
  const aSeed = new Float32Array(count);
  const aColor = new Float32Array(count * 3);
  const emerald = [0.0, 0.9, 0.62];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + Math.random() * 0.05;
    const r = radius + (Math.random() * 2 - 1) * 0.12;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const y = (Math.random() * 2 - 1) * 0.06;
    position.set([x, y, z], i * 3);
    aSize[i] = 1.0 + Math.random() * 2.4;
    aSeed[i] = Math.random();
    aColor.set(emerald, i * 3);
  }
  return { position, aSize, aSeed, aColor };
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function HeroScene({ className = '' }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [lowEnd] = useState(() => {
    if (typeof window === 'undefined') return false;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const cores = navigator.hardwareConcurrency || 8;
    const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 8;
    // Skip WebGL on reduced-motion or low-end mobile devices; show a static poster instead.
    return reduce || (coarse && (cores <= 4 || mem <= 4));
  });

  useEffect(() => {
    if (lowEnd) return;
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new Renderer({
      alpha: true,
      antialias: true,
      depth: true,
      dpr: Math.min(window.devicePixelRatio || 1, 1.5),
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    mount.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 42, near: 0.1, far: 100, aspect: 1 });
    camera.position.set(0, 0, 4.4);

    const scene = new Transform();

    // ---- Core sphere (morphing, fresnel-glow) ----
    const coreGeo = new Sphere(gl, { radius: 1.12, widthSegments: 48, heightSegments: 36 });
    const coreProgram = new Program(gl, {
      vertex: CORE_VERT,
      fragment: CORE_FRAG,
      transparent: false,
      cullFace: false,
      uniforms: {
        uTime: { value: 0 },
        uAmp: { value: 0.2 },
        uBase: { value: new Vec3(0.02, 0.06, 0.05) },
        uRim: { value: new Vec3(0.0, 0.9, 0.62) },
      },
    });
    const core = new Mesh(gl, { geometry: coreGeo, program: coreProgram, frustumCulled: false });
    core.renderOrder = 0;
    core.setParent(scene);

    // ---- Wireframe shell (shares displacement via same vertex shader) ----
    const wire = new WireMesh(gl, {
      geometry: coreGeo,
      wireColor: new Color(0, 0.9, 0.62),
    });
    const wireProgram = new Program(gl, {
      vertex: CORE_VERT, // identical displacement
      fragment: WIRE_FRAG,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      cullFace: false,
      uniforms: {
        uTime: { value: 0 },
        uAmp: { value: 0.2 },
        uColor: { value: new Vec3(0.0, 0.9, 0.62) },
        uOpacity: { value: 0.35 },
      },
    });
    wire.program = wireProgram;
    wire.mode = gl.LINES;
    wire.frustumCulled = false;
    // Sit slightly outside the core surface so front lines render over it and
    // back lines are depth-occluded by the solid core (no z-fighting).
    wire.scale.set(1.05, 1.05, 1.05);
    wire.renderOrder = 3;
    wire.setParent(scene);

    // group that holds core + wire so they rotate together
    const coreGroup = new Transform();
    coreGroup.setParent(scene);
    // re-parent core + wire under coreGroup for a unified tilt
    // (ogl Transform.setParent moves node)
    core.setParent(coreGroup);
    wire.setParent(coreGroup);
    coreGroup.rotation.set(-0.35, 0.0, 0.28);

    // ---- Orbital ring of points ----
    const ringData = makeRing(160, 2.05);
    const ringGeo = new Geometry(gl, {
      position: { size: 3, data: ringData.position },
      aSize: { size: 1, data: ringData.aSize },
      aSeed: { size: 1, data: ringData.aSeed },
      aColor: { size: 3, data: ringData.aColor },
    });
    const ringProgram = new Program(gl, {
      vertex: POINT_VERT,
      fragment: POINT_FRAG,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.dpr },
      },
    });
    const ring = new Mesh(gl, { geometry: ringGeo, program: ringProgram, mode: gl.POINTS, frustumCulled: false });
    ring.renderOrder = 2;
    ring.rotation.set(1.15, 0.2, 0.3);
    ring.setParent(scene);

    // ---- Starfield ----
    const starData = makeStarfield(600, 6);
    const starGeo = new Geometry(gl, {
      position: { size: 3, data: starData.position },
      aSize: { size: 1, data: starData.aSize },
      aSeed: { size: 1, data: starData.aSeed },
      aColor: { size: 3, data: starData.aColor },
    });
    const starProgram = new Program(gl, {
      vertex: POINT_VERT,
      fragment: POINT_FRAG,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.dpr },
      },
    });
    const stars = new Mesh(gl, { geometry: starGeo, program: starProgram, mode: gl.POINTS, frustumCulled: false });
    stars.renderOrder = -10;
    stars.setParent(scene);

    // ---- Resize ----
    function resize() {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.perspective();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // ---- Pointer parallax ----
    const target = new Vec3(0, 0, 0);
    const camPos = new Vec3(0, 0, 4.4);
    const cur = new Vec3(0, 0, 4.4);
    let mx = 0;
    let my = 0;
    function onMove(e: PointerEvent) {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mx = nx;
      my = ny;
    }
    window.addEventListener('pointermove', onMove, { passive: true });

    // ---- Animation loop ----
    let raf = 0;
    const t0 = performance.now();
    const render = (now: number) => {
      raf = requestAnimationFrame(render);
      // pause the GPU once the visitor has scrolled well past the hero
      if (window.scrollY > window.innerHeight * 1.3) return;
      const t = (now - t0) / 1000;
      const sp = Math.min(1, Math.max(0, window.scrollY / Math.max(1, window.innerHeight)));

      // shared time on all programs
      coreProgram.uniforms.uTime.value = t;
      wireProgram.uniforms.uTime.value = t;
      ringProgram.uniforms.uTime.value = t;
      starProgram.uniforms.uTime.value = t;

      // scroll makes the core spin faster and the camera dolly in
      coreGroup.rotation.y = t * (0.12 + sp * 0.3);
      ring.rotation.y = t * (0.22 + sp * 0.25);

      // camera parallax: smooth the MOUSE only, apply SCROLL 1:1 so it never lags/jitters
      camPos.set(mx * 0.9, -my * 0.6, 0);
      cur.lerp(camPos, 0.08);
      camera.position.set(cur.x, cur.y - sp * 0.5, 4.4 - sp * 1.5);
      camera.lookAt(target);

      renderer.render({ scene, camera });
    };

    if (reduceMotion) {
      // render a single calm frame
      coreProgram.uniforms.uTime.value = 0.5;
      wireProgram.uniforms.uTime.value = 0.5;
      ringProgram.uniforms.uTime.value = 0.5;
      starProgram.uniforms.uTime.value = 0.5;
      renderer.render({ scene, camera });
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      if (mount && gl.canvas.parentNode === mount) mount.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [lowEnd]);

  if (lowEnd) {
    return <div className={`hero-poster ${className}`} aria-hidden="true" />;
  }
  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
