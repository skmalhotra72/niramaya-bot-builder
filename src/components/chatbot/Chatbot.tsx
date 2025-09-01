import { useEffect } from 'react';

// Extend window object to include n8nChat
declare global {
  interface Window {
    n8nChat: {
      init: (config: {
        chatId: string;
        webhookUrl: string;
        i18n?: {
          en: {
            title: string;
            subtitle: string;
            inputPlaceholder: string;
          };
        };
        initialMessages?: Array<{ text: string }>;
      }) => void;
    };
  }
}

const Chatbot = () => {
  useEffect(() => {
    // Initialize n8n chat widget with custom configuration
    const initChat = () => {
      if (window.n8nChat) {
        window.n8nChat.init({
          chatId: "niramaya-pathlabs-chat",
          webhookUrl: "https://n8n.nhcare.in/webhook/a7d29007-dd53-4270-8838-1c35ed5d027b/chat",

          i18n: {
            en: {
              title: "Welcome to NirAmaya Pathlabs",
              subtitle: "NABL Accredited · 24x7 Helpdesk · Best-in-class Patient Care",
              inputPlaceholder: "Type your message..."
            }
          },

          initialMessages: [
            { text: "🙏 Namaste!" },
            { text: "We can chat in Hindi, English, Hinglish, and many other Indian languages." },
            { text: "I can help you with any question related to lab tests and health checkup packages." },
            { text: "I can also help you with information about lab tests, pricing, discounts, and booking." },
            { text: "Kindly let me know — which language would you like to chat in today?" }
          ]
        });
      }
    };

    // Check if n8nChat is already loaded, otherwise wait for it
    if (window.n8nChat) {
      initChat();
    } else {
      // Wait for the script to load
      const checkForN8nChat = setInterval(() => {
        if (window.n8nChat) {
          clearInterval(checkForN8nChat);
          initChat();
        }
      }, 100);

      // Cleanup interval on unmount
      return () => clearInterval(checkForN8nChat);
    }
  }, []);

  return null; // n8n chat widget handles its own rendering
};

export { Chatbot };