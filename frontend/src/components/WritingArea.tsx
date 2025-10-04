import BookPage from './BookPage';
import EditableTextArea from './EditableTextArea';
import type { VoiceTrigger } from '../extensions/VoiceHighlight';

interface WritingAreaProps {
  onChange: (text: string) => void;
  triggers: VoiceTrigger[];
}

export default function WritingArea({ onChange, triggers }: WritingAreaProps) {
  return (
    <BookPage side="left">
      <EditableTextArea onChange={onChange} triggers={triggers} />
    </BookPage>
  );
}