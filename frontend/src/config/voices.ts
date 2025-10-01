export const VOICE_TRIGGERS = [
  { phrase: 'i feel', voice: 'Logic', comment: 'Feelings are just chemical reactions.', color: 'blue', icon: 'brain' },
  { phrase: 'i think', voice: 'Emotion', comment: 'But what does your heart say?', color: 'pink', icon: 'heart' },
  { phrase: 'should i', voice: 'Doubt', comment: 'Are you sure you even want to know?', color: 'yellow', icon: 'question' },
] as const;

export const MEMORY_VOICE = {
  voice: 'Memory',
  comment: 'This reminds me of something you wrote before...',
  color: 'green',
  icon: 'cloud',
  minLength: 50,
} as const;
