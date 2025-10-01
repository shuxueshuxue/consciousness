import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import { VOICE_TRIGGERS } from '../config/voices';

export const VoiceHighlight = Extension.create({
  name: 'voiceHighlight',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('voiceHighlight'),

        state: {
          init(_, { doc }) {
            return findHighlights(doc);
          },

          apply(tr, oldState) {
            // Only recalculate if document changed
            if (tr.docChanged) {
              return findHighlights(tr.doc);
            }
            return oldState;
          },
        },

        props: {
          decorations(state) {
            return this.getState(state);
          },
        },
      }),
    ];
  },
});

function findHighlights(doc: any): DecorationSet {
  const decorations: Decoration[] = [];
  const text = doc.textContent.toLowerCase();

  VOICE_TRIGGERS.forEach(({ phrase, color }) => {
    const pos = text.indexOf(phrase);

    if (pos !== -1) {
      // Convert text position to document position
      let docPos = 0;
      let textPos = 0;
      let found = false;

      doc.descendants((node: any, nodePos: number) => {
        if (found) return false;

        if (node.isText) {
          const nodeText = node.text || '';
          if (textPos + nodeText.length > pos) {
            // The match starts in this text node
            const offsetInNode = pos - textPos;
            docPos = nodePos + offsetInNode;
            found = true;
            return false;
          }
          textPos += nodeText.length;
        }

        return true;
      });

      if (found) {
        decorations.push(
          Decoration.inline(docPos, docPos + phrase.length, {
            class: `voice-highlight voice-highlight-${color}`,
          })
        );
      }
    }
  });

  return DecorationSet.create(doc, decorations);
}
