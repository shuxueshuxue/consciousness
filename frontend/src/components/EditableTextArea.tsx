import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import { useEffect } from 'react';

interface EditableTextAreaProps {
  value: string;
  onChange: (text: string) => void;
}

export default function EditableTextArea({ value, onChange }: EditableTextAreaProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getText());
    },
    autofocus: true,
  });

  useEffect(() => {
    if (editor && editor.getText() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return <div className="editable-text-area"><EditorContent editor={editor} /></div>;
}