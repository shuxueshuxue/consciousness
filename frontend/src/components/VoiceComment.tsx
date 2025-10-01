interface VoiceCommentProps {
  voice: string;
  text: string;
}

export default function VoiceComment({ voice, text }: VoiceCommentProps) {
  return (
    <div className={`voice-comment voice-comment-${voice.toLowerCase()}`}>
      <strong>{voice}:</strong> {text}
    </div>
  );
}