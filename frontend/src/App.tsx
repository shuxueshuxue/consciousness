import { useState } from 'react'
import './App.css'
import WritingArea from './components/WritingArea'
import VoicesPanel from './components/VoicesPanel'
import VoiceComment from './components/VoiceComment'
import BinderRings from './components/BinderRings'

interface Voice {
  name: string;
  text: string;
  range: { from: number; to: number };
  color: string;
}

// Voice type to color mapping
const VOICE_COLORS: Record<string, string> = {
  'Logic': 'blue',
  'Emotion': 'pink',
  'Doubt': 'yellow',
  'Memory': 'green',
};

function App() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState<Voice[]>([]);

  const handleTextChange = (newText: string) => {
    setText(newText);

    const newVoices: Voice[] = [];
    const lowerText = newText.toLowerCase();

    // Find trigger phrases
    const triggers = [
      { phrase: 'i feel', voice: 'Logic', comment: 'Feelings are just chemical reactions.' },
      { phrase: 'i think', voice: 'Emotion', comment: 'But what does your heart say?' },
      { phrase: 'should i', voice: 'Doubt', comment: 'Are you sure you even want to know?' },
    ];

    triggers.forEach(({ phrase, voice, comment }) => {
      const index = lowerText.indexOf(phrase);
      if (index !== -1) {
        const color = VOICE_COLORS[voice];
        newVoices.push({
          name: voice,
          text: comment,
          range: { from: index, to: index + phrase.length },
          color
        });
      }
    });

    // Memory voice for long text (no specific range)
    if (newText.length > 50 && !newVoices.find(v => v.name === 'Memory')) {
      newVoices.push({
        name: 'Memory',
        text: 'This reminds me of something you wrote before...',
        range: { from: 0, to: 0 },
        color: VOICE_COLORS['Memory']
      });
    }

    setVoices(newVoices);
  };

  return (
    <div className="book-interface">
      <WritingArea value={text} onChange={handleTextChange} />
      <VoicesPanel>
        {voices.map((voice, index) => (
          <VoiceComment key={index} voice={voice.name} text={voice.text} />
        ))}
      </VoicesPanel>
      <BinderRings />
    </div>
  );
}

export default App