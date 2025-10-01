import BookPage from './BookPage';
import EditableTextArea from './EditableTextArea';

interface WritingAreaProps {
  onChange: (text: string) => void;
}

export default function WritingArea({ onChange }: WritingAreaProps) {
  return (
    <BookPage side="left">
      <EditableTextArea onChange={onChange} />
    </BookPage>
  );
}