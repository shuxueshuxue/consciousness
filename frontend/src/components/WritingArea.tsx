import BookPage from './BookPage';
import EditableTextArea from './EditableTextArea';

interface WritingAreaProps {
  value: string;
  onChange: (text: string) => void;
}

export default function WritingArea({ value, onChange }: WritingAreaProps) {
  return (
    <BookPage side="left">
      <EditableTextArea value={value} onChange={onChange} />
    </BookPage>
  );
}