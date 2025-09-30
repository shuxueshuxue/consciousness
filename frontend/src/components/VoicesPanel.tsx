import { ReactNode } from 'react';

interface VoicesPanelProps {
  children: ReactNode;
}

export default function VoicesPanel({ children }: VoicesPanelProps) {
  return (
    <div className="right-page">
      {children}
    </div>
  );
}