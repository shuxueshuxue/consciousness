interface BinderRingProps {
  position: number;  // 0-100% vertical position
}

export default function BinderRing({ position }: BinderRingProps) {
  return (
    <div
      className="binder-ring"
      style={{ top: `${position}%` }}
    >
      <div className="hole-left" />
      <div className="ring-bar" />
      <div className="hole-right" />
    </div>
  );
}