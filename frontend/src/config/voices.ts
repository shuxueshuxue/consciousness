export const VOICE_TRIGGERS = [
  { phrase: 'i feel', voice: 'Logic', comment: 'Feelings are just chemical reactions.', color: 'blue' },
  { phrase: 'i think', voice: 'Emotion', comment: 'But what does your heart say?', color: 'pink' },
  { phrase: 'should i', voice: 'Doubt', comment: 'Are you sure you even want to know?', color: 'yellow' },
] as const;

export const MEMORY_VOICE = {
  voice: 'Memory',
  comment: 'This reminds me of something you wrote before...',
  color: 'green',
  minLength: 50,
} as const;
