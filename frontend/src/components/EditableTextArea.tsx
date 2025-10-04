import { useEditor, EditorContent } from '@tiptap/react';
import { useEffect } from 'react';
import StarterKit from '@tiptap/starter-kit';
import { VoiceHighlight, type VoiceTrigger } from '../extensions/VoiceHighlight';

interface EditableTextAreaProps {
  onChange: (text: string) => void;
  triggers: VoiceTrigger[];
}

export default function EditableTextArea({ onChange, triggers }: EditableTextAreaProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      VoiceHighlight.configure({ triggers })
    ],
    onUpdate: ({ editor }) => onChange(editor.getText()),
    autofocus: true,
  });

  // @@@ Dynamic trigger updates - Update highlights when triggers change
  useEffect(() => {
    if (editor && editor.isEditable) {
      editor.chain()
        .setMeta('voiceHighlight', { triggers })
        .run();
    }
  }, [triggers, editor]);

  return <div className="editable-text-area"><EditorContent editor={editor} /></div>;
}