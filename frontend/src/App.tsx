import { useState, useEffect } from 'react'
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
  const [currentText, setCurrentText] = useState<string>('');

  const detectVoices = (text: string, triggers: VoiceTrigger[]) => {
    const newVoices: Voice[] = [];
    const lowerText = text.toLowerCase();

    triggers.forEach(({ phrase, voice, comment, icon }) => {
      const index = lowerText.indexOf(phrase);
      if (index !== -1) {
        newVoices.push({ name: voice, text: comment, icon, position: index });
      }
    });

    if (text.length > MEMORY_VOICE.minLength && !newVoices.find(v => v.name === MEMORY_VOICE.voice)) {
      newVoices.push({ name: MEMORY_VOICE.voice, text: MEMORY_VOICE.comment, icon: MEMORY_VOICE.icon, position: Infinity });
    }

    // Sort by position in text
    newVoices.sort((a, b) => a.position - b.position);

    setVoices(newVoices);
  };

  const handleTextChange = (newText: string) => {
    setCurrentText(newText);
    detectVoices(newText, voiceTriggers);
  };

  // @@@ Re-detect voices when triggers change
  useEffect(() => {
    detectVoices(currentText, voiceTriggers);
  }, [voiceTriggers]);

  // @@@ Trigger management methods - ready for backend integration

  // Add a new trigger
  const addTrigger = (trigger: VoiceTrigger) => {
    setVoiceTriggers([...voiceTriggers, trigger]);
  };

  // Remove a trigger by phrase
  const removeTrigger = (phrase: string) => {
    setVoiceTriggers(voiceTriggers.filter(t => t.phrase !== phrase));
  };

  // Update an existing trigger
  const updateTrigger = (phrase: string, updates: Partial<VoiceTrigger>) => {
    setVoiceTriggers(voiceTriggers.map(t =>
      t.phrase === phrase ? { ...t, ...updates } : t
    ));
  };

  // Replace all triggers (e.g., from API)
  const setAllTriggers = (newTriggers: VoiceTrigger[]) => {
    setVoiceTriggers(newTriggers);
  };

  // Expose methods to window for testing in console
  useEffect(() => {
    (window as any).voiceControls = {
      addTrigger,
      removeTrigger,
      updateTrigger,
      setAllTriggers,
      getCurrentTriggers: () => voiceTriggers,
    };
  }, [voiceTriggers]);

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