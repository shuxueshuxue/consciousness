import { useState } from 'react'
import './App.css'
import WritingArea from './components/WritingArea'
import VoicesPanel from './components/VoicesPanel'
import VoiceComment from './components/VoiceComment'
import BinderRings from './components/BinderRings'
import { VOICE_TRIGGERS, MEMORY_VOICE } from './config/voices'
import type { VoiceTrigger } from './extensions/VoiceHighlight'

interface Voice {
  name: string;
  text: string;
  icon: string;
  position: number;
}

function App() {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [voiceTriggers, setVoiceTriggers] = useState<VoiceTrigger[]>(VOICE_TRIGGERS);

  const handleTextChange = (newText: string) => {
    const newVoices: Voice[] = [];
    const lowerText = newText.toLowerCase();

    voiceTriggers.forEach(({ phrase, voice, comment, icon }) => {
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

  // Example: Add a new trigger dynamically
  const addCustomTrigger = () => {
    const newTrigger: VoiceTrigger = {
      phrase: 'remember when',
      voice: 'Nostalgia',
      comment: 'The past always seems brighter from here...',
      color: 'purple',
      icon: 'cloud',
    };
    setVoiceTriggers([...voiceTriggers, newTrigger]);
  };

  return (
    <div className="book-interface">
      <WritingArea onChange={handleTextChange} triggers={voiceTriggers} />
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