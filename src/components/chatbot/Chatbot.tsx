import { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Load n8n chat widget
    const script = document.createElement('script');
    script.type = 'module';
    script.innerHTML = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

      createChat({
        webhookUrl: 'https://n8n.nhcare.in/webhook/a7d29007-dd53-4270-8838-1c35ed5d027b/chat'
      });
    `;
    
    document.head.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return null; // n8n chat widget handles its own rendering
};

export { Chatbot };