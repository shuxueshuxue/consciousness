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
  icon: string;
  position: number;
}

function App() {
  const [voices, setVoices] = useState<Voice[]>([]);

  const handleTextChange = (newText: string) => {
    const newVoices: Voice[] = [];
    const lowerText = newText.toLowerCase();

    VOICE_TRIGGERS.forEach(({ phrase, voice, comment, icon }) => {
      const index = lowerText.indexOf(phrase);
      if (index !== -1) {
        newVoices.push({ name: voice, text: comment, icon, position: index });
      }
    });

    if (newText.length > MEMORY_VOICE.minLength && !newVoices.find(v => v.name === MEMORY_VOICE.voice)) {
      newVoices.push({ name: MEMORY_VOICE.voice, text: MEMORY_VOICE.comment, icon: MEMORY_VOICE.icon, position: Infinity });
    }

    // Sort by position in text
    newVoices.sort((a, b) => a.position - b.position);

    setVoices(newVoices);
  };

  return (
    <div className="book-interface">
      <WritingArea onChange={handleTextChange} />
      <VoicesPanel>
        {voices.map((voice, index) => (
          <VoiceComment key={index} voice={voice.name} text={voice.text} icon={voice.icon} />
        ))}
      </VoicesPanel>
      <BinderRings />
    </div>
  );
}

export default App