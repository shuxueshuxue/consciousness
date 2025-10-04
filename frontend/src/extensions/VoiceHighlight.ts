import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

export interface VoiceTrigger {
  phrase: string;
  voice: string;
  comment: string;
  color: string;
  icon: string;
}

export interface VoiceHighlightOptions {
  triggers: VoiceTrigger[];
}

export const VoiceHighlight = Extension.create<VoiceHighlightOptions>({
  name: 'voiceHighlight',

  addOptions() {
    return {
      triggers: [],
    };
  },

  addProseMirrorPlugins() {
    const triggers = this.options.triggers;

    return [
      new Plugin({
        key: new PluginKey('voiceHighlight'),

        state: {
          init(_, { doc }) {
            return findHighlights(doc, triggers);
          },

          apply(tr, oldState) {
            // @@@ Dynamic updates - Recalculate on doc change or meta change
            const metaChanged = tr.getMeta('voiceHighlight');
            if (tr.docChanged || metaChanged) {
              const newTriggers = metaChanged?.triggers || triggers;
              return findHighlights(tr.doc, newTriggers);
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

function findHighlights(doc: any, triggers: VoiceTrigger[]): DecorationSet {
  const decorations: Decoration[] = [];
  const text = doc.textContent.toLowerCase();

  triggers.forEach(({ phrase, color }) => {
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
