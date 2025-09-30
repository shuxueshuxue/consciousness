# Consciousness

**Your thoughts have thoughts about your thoughts.**

An introspective writing companion where different aspects of your psyche provide real-time commentary as you write.

**Main Goal:** 情感陪伴，生活建议 (Emotional companionship, life advice)

## UI Design

![Book UI Design](assets/book-ui-design.png)

## Design Principles

- **Something to take away** - Each session produces insights worth keeping
- **Actively prompt user** - Voices ask questions, don't just comment
- **Make the process interesting** - Real-time feedback keeps engagement
- **Long-term retrospection** - Statistics, patterns, relationship mapping over time
- **Community** - Note polish with auto image generation, sharing features

## Structure

```
consciousness/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── WritingArea.tsx     # Main writing input
│   │   │   ├── Voice.tsx           # Individual voice component
│   │   │   └── VoicesPanel.tsx     # Container for all voices
│   │   ├── hooks/
│   │   │   └── useSSE.ts           # Server-sent events hook
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── backend/
    ├── main.py                      # PolyCLI orchestration server
    ├── voices/
    │   ├── logic.py                 # Logic voice agent
    │   ├── emotion.py               # Emotion voice agent
    │   ├── doubt.py                 # Doubt voice agent
    │   ├── memory.py                # Memory voice agent
    │   └── intuition.py             # Intuition voice agent
    └── requirements.txt
```

## Implementation

### Frontend
- **React + TypeScript** - UI components
- **Vite** - Build tool
- **EventSource API** - SSE for voice streaming

### Backend (PolyCLI)
- **HTTP API** - Send user text, get analysis
- **SSE Stream** - Real-time voice comments
- **Session Persistence** - Save conversations
- **Multi-agent Orchestration** - Voices as PolyAgents

## Shipping Strategy

**Web first, then mobile app**

## Getting Started

```bash
# Frontend
cd frontend
npm create vite@latest . -- --template react-ts
npm install
npm run dev

# Backend
cd backend
pip install polycli
python main.py
```