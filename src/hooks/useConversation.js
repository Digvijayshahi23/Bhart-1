import { useState } from "react";

export function useConversation() {
  const [activeSession, setActiveSession] = useState(null);

  const startNewSession = () => {
    setActiveSession({
      id: Date.now(),
      created_at: new Date().toISOString(),
    });
  };

  return {
    activeSession,
    startNewSession,
  };
}
export default useConversation;
