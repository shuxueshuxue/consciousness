import { useState } from 'react'
import './App.css'
import WritingArea from './components/WritingArea'
import VoicesPanel from './components/VoicesPanel'
import VoiceComment from './components/VoiceComment'
import BinderRings from './components/BinderRings'

interface Voice {
  name: string;
  text: string;
}

function App() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState<Voice[]>([]);

  const handleTextChange = (newText: string) => {
    setText(newText);

    const newVoices: Voice[] = [];

    if (newText.toLowerCase().includes('i feel')) {
      newVoices.push({ name: 'Logic', text: 'Feelings are just chemical reactions.' });
    }
    if (newText.toLowerCase().includes('i think')) {
      newVoices.push({ name: 'Emotion', text: 'But what does your heart say?' });
    }
    if (newText.toLowerCase().includes('should i')) {
      newVoices.push({ name: 'Doubt', text: 'Are you sure you even want to know?' });
    }
    if (newText.length > 50) {
      newVoices.push({ name: 'Memory', text: 'This reminds me of something you wrote before...' });
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