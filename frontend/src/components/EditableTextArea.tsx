import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { VoiceHighlight } from '../extensions/VoiceHighlight';

interface EditableTextAreaProps {
  onChange: (text: string) => void;
}

export default function EditableTextArea({ onChange }: EditableTextAreaProps) {
  const editor = useEditor({
    extensions: [StarterKit, VoiceHighlight],
    onUpdate: ({ editor }) => onChange(editor.getText()),
    autofocus: true,
  });

  return <div className="editable-text-area"><EditorContent editor={editor} /></div>;
}