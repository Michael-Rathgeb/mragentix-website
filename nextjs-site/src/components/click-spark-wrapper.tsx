'use client';

import ClickSpark from '@/components/ui/click-spark';

export default function ClickSparkWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ClickSpark sparkColor="#00e5a0" sparkSize={12} sparkRadius={20} sparkCount={8} duration={500}>
      {children}
    </ClickSpark>
  );
}
