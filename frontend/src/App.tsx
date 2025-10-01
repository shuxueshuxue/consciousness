import { useState } from 'react'
import './App.css'
import WritingArea from './components/WritingArea'
import VoicesPanel from './components/VoicesPanel'
import VoiceComment from './components/VoiceComment'
import BinderRings from './components/BinderRings'
import { VOICE_TRIGGERS, MEMORY_VOICE } from './config/voices'

interface Voice {
  name: string;
  text: string;
}

function App() {
  const [voices, setVoices] = useState<Voice[]>([]);

  const handleTextChange = (newText: string) => {
    const newVoices: Voice[] = [];
    const lowerText = newText.toLowerCase();

    VOICE_TRIGGERS.forEach(({ phrase, voice, comment }) => {
      if (lowerText.includes(phrase)) {
        newVoices.push({ name: voice, text: comment });
      }
    });

    if (newText.length > MEMORY_VOICE.minLength && !newVoices.find(v => v.name === MEMORY_VOICE.voice)) {
      newVoices.push({ name: MEMORY_VOICE.voice, text: MEMORY_VOICE.comment });
    }

    setVoices(newVoices);
  };

  return (
    <div className="book-interface">
      <WritingArea onChange={handleTextChange} />
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