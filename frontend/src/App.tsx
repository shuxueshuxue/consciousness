import { useState } from 'react'
import './App.css'
import WritingArea from './components/WritingArea'
import VoicesPanel from './components/VoicesPanel'
import VoiceComment from './components/VoiceComment'

function App() {
  const [text, setText] = useState('');
  const [comment, setComment] = useState('');
  const [voiceName, setVoiceName] = useState('');

  const handleTextChange = (newText: string) => {
    setText(newText);

    // Simple trigger: if user types "I feel"
    if (newText.toLowerCase().includes('i feel')) {
      setVoiceName('Logic');
      setComment('Feelings are just chemical reactions.');
    } else if (newText.toLowerCase().includes('i think')) {
      setVoiceName('Emotion');
      setComment('But what does your heart say?');
    } else if (newText.toLowerCase().includes('should i')) {
      setVoiceName('Doubt');
      setComment('Are you sure you even want to know?');
    } else if (newText.length > 50 && !comment) {
      setVoiceName('Memory');
      setComment('This reminds me of something you wrote before...');
    }
  };

  return (
    <div className="book-interface">
      <WritingArea value={text} onChange={handleTextChange} />
      {comment && (
        <VoicesPanel>
          <VoiceComment voice={voiceName} text={comment} />
        </VoicesPanel>
      )}
    </div>
  );
}

export default App