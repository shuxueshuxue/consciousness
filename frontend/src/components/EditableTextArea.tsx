interface EditableTextAreaProps {
  value: string;
  onChange: (text: string) => void;
}

export default function EditableTextArea({ value, onChange }: EditableTextAreaProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      value={value}
      onChange={handleChange}
      placeholder="Start writing..."
      autoFocus
      className="editable-text-area"
    />
  );
}