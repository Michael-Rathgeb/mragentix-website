import { NextResponse } from 'next/server';

export const runtime = 'edge';

interface AgentPlan {
  plan: string[];
  summary: string;
  est: string;
}

export async function POST(req: Request) {
  let prompt = '';
  try {
    const body = await req.json();
    prompt = String(body?.prompt ?? '');
  } catch {
    /* empty body is fine */
  }
  const p = ` ${prompt.toLowerCase()} `;
  const has = (...keys: string[]) => keys.some((k) => p.includes(k));

  let result: AgentPlan;

  if (has('lead', 'sms', 'text', 'qualif', 'reply', 'follow', 'drip', 'book', 'appoint', 'call')) {
    result = {
      plan: [
        'Capture: webhook listens on web form + missed-call events',
        'Classify: Claude reads the message, scores intent (hot / warm / cold)',
        'Enrich: pull CRM record + last touch via GoHighLevel API',
        'Reply: speed-to-lead SMS in <60s with a booking link',
        'Route: hot leads escalate to a human; others enter a drip',
      ],
      summary: 'A speed-to-lead agent that replies in under 60 seconds and books while you sleep.',
      est: '~6 hrs/wk reclaimed · ~31% lift in close rate (typical)',
    };
  } else if (has('seo', 'content', 'keyword', 'rank', 'google', 'aeo', 'schema', 'faq', 'answer engine')) {
    result = {
      plan: [
        'Scrape: pull People Also Ask + related queries at scale',
        'Cluster: group questions into topical authority maps',
        'Generate: draft answers with sources and entity locking (KGMID)',
        'Structure: emit FAQPage / LocalBusiness JSON-LD schema',
        'Ship: build + deploy static pages, submit to IndexNow',
      ],
      summary: 'An AEO pipeline that publishes hundreds of schema-rich pages a week, hands-off.',
      est: '~10 hrs/wk reclaimed · 340+ pages / week (typical)',
    };
  } else if (has('report', 'data', 'research', 'summari', 'analy', 'spreadsheet', 'export', 'dashboard')) {
    result = {
      plan: [
        'Ingest: scheduled pulls from your sources (APIs, sheets, DB)',
        'Clean: normalize, dedupe, validate types',
        'Analyze: Claude summarizes trends + flags anomalies',
        'Visualize: render a dashboard + scheduled digest',
        'Distribute: email/Slack the report on a cadence',
      ],
      summary: 'A research/reporting agent that turns raw data into a weekly brief, automatically.',
      est: '~8 hrs/wk reclaimed',
    };
  } else if (has('website', 'site', 'page', 'web', 'landing', 'redesign', 'frontend')) {
    result = {
      plan: [
        'Audit: Lighthouse + conversion + content pass',
        'Design: conversion-led layout with automation baked in',
        'Build: React/static, Core Web Vitals 90+',
        'Wire: forms → CRM, booking, chat',
        'Ship: deploy + monitor',
      ],
      summary: 'A site build where the forms, booking, and chat feed your automation from day one.',
      est: 'ships in weeks, not quarters',
    };
  } else if (has('invoice', 'billing', 'payment', 'stripe', 'quote', 'estimate', 'receipt')) {
    result = {
      plan: [
        'Trigger: event from your CRM / order system',
        'Generate: create quote or invoice via Stripe/API',
        'Send: email + SMS with pay link',
        'Remind: automated follow-ups on unpaid items',
        'Reconcile: log payment + update records',
      ],
      summary: 'A billing agent that quotes, charges, and chases — without a human in the loop.',
      est: '~4 hrs/wk reclaimed',
    };
  } else {
    result = {
      plan: [
        'Map: break the task into trigger → steps → output',
        'Pick tools: which APIs / models / humans are needed',
        'Build agent: reads input, decides, calls tools, delivers',
        'Guardrails: approvals, logging, human fallback',
        'Deploy: monitor + hand off docs (or we run it)',
      ],
      summary: 'A custom agent for exactly what you described — observable, overrideable, production-ready.',
      est: 'free discovery call to scope it',
    };
  }

  return NextResponse.json(result);
}
