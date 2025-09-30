interface WritingAreaProps {
  value: string;
  onChange: (text: string) => void;
}

export default function WritingArea({ value, onChange }: WritingAreaProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="left-page">
      <textarea
        value={value}
        onChange={handleChange}
        placeholder="Start writing..."
        autoFocus
      />
    </div>
  );
}