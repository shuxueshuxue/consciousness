import { ReactNode } from 'react';

interface BookPageProps {
  children?: ReactNode;
  side: 'left' | 'right';
}

export default function BookPage({ children, side }: BookPageProps) {
  return (
    <div className={`book-page ${side}-page`}>
      {children}
    </div>
  );
}