import { ReactNode } from 'react';
import BookPage from './BookPage';

interface VoicesPanelProps {
  children: ReactNode;
}

export default function VoicesPanel({ children }: VoicesPanelProps) {
  return (
    <BookPage side="right">
      {children}
    </BookPage>
  );
}