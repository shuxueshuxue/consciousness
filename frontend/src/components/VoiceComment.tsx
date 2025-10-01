import { FaBrain, FaHeart, FaQuestion, FaCloud } from 'react-icons/fa';

interface VoiceCommentProps {
  voice: string;
  text: string;
  icon: string;
}

const iconMap = {
  brain: FaBrain,
  heart: FaHeart,
  question: FaQuestion,
  cloud: FaCloud,
};

export default function VoiceComment({ voice, text, icon }: VoiceCommentProps) {
  const Icon = iconMap[icon as keyof typeof iconMap];

  return (
    <div className={`voice-comment voice-comment-${voice.toLowerCase()}`}>
      <div className="voice-header">
        {Icon && <Icon className="voice-icon" />}
        <strong>{voice}:</strong>
      </div>
      <div className="voice-text">{text}</div>
    </div>
  );
}