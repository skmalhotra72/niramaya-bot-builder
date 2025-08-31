import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageCircle, Send, User, Bot, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface UserContact {
  name?: string;
  phone?: string;
  email?: string;
  pincode?: string;
  age?: number;
  gender?: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      text: 'Hi! I\'m Nira, your NirAmaya assistant. I can help you with test prices, packages, TAT, and booking. How can I help you today?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userContact, setUserContact] = useState<UserContact>({});
  const [sessionId] = useState(() => crypto.randomUUID());
  const { toast } = useToast();

  const quickChips = [
    'Test Prices',
    'Health Packages',
    'Home Collection',
    'TAT Information',
    'Corporate Inquiries',
    'Book Now'
  ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text: text.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // TODO: Replace with actual n8n webhook URL
      const webhookUrl = 'https://your-n8n-host.com/webhook/niramaya-chatbot';
      
      const payload = {
        event: 'faq',
        session_id: sessionId,
        contact: userContact,
        context: {
          source: 'web',
          page: window.location.pathname,
          utm: {}
        },
        cart: [], // TODO: Get from cart context
        order_value_after_discount: 0,
        home_collection_charge: 0,
        message: text,
        transcript: messages.concat([userMessage]).map(msg => ({
          role: msg.role,
          text: msg.text,
          ts: msg.timestamp
        })),
        meta: {
          browser: navigator.userAgent,
          ip: '' // Will be populated by server
        }
      };

      // For demo purposes, simulate API response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: getAutoResponse(text),
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // In production, make actual API call:
      /*
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Secret': 'your-webhook-secret'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: data.response || 'Thank you for your message. Our team will get back to you shortly.',
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('Failed to send message');
      }
      */

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Connection Error",
        description: "Unable to send message. Please try again or call our helpdesk at 9555009009.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Simple auto-response logic (replace with n8n integration)
  const getAutoResponse = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('price') || lowerText.includes('cost')) {
      return "I can help you with test pricing! We offer up to 35% discount on most tests. Our popular tests include:\n\n• CBC - ₹300 (25% max discount)\n• Lipid Profile - ₹700 (30% max discount)\n• Thyroid Profile - ₹800 (25% max discount)\n\nHome collection is FREE above ₹600. Would you like to know about specific tests?";
    }
    
    if (lowerText.includes('package') || lowerText.includes('checkup')) {
      return "Our health packages offer great value:\n\n• Basic Health Checkup - ₹1,500 (30% discount)\n• Comprehensive Package - ₹3,500 (35% discount)\n• Women's Health Package - ₹2,800 (30% discount)\n• Cardiac Risk Assessment - ₹2,200 (25% discount)\n\nAll packages include free home collection. Which package interests you?";
    }
    
    if (lowerText.includes('home collection') || lowerText.includes('sample')) {
      return "Our home collection service is available 7 days a week! Here's what you need to know:\n\n✅ FREE above ₹600 (after discount)\n✅ Trained phlebotomists with PPE\n✅ Sealed, pre-barcoded sample kits\n✅ Cold-chain logistics\n✅ Same-day collection in most areas\n\nWould you like to book a home collection?";
    }
    
    if (lowerText.includes('tat') || lowerText.includes('report') || lowerText.includes('time')) {
      return "Our Turn Around Times (TAT) are:\n\n• Routine tests (CBC, Sugar) - 6 hours\n• Basic profiles (LFT, KFT) - 12 hours\n• Specialized tests (Thyroid, Vitamins) - 24 hours\n• Complex tests - 48-72 hours\n\nReports are available digitally with smart interpretation. Need help with any specific test?";
    }
    
    if (lowerText.includes('book') || lowerText.includes('appointment')) {
      return "I'd be happy to help you book! To get started, I need:\n\n📱 Your phone number\n📍 Your pincode\n🩺 Which tests/packages you need\n\nYou can also directly book at /book-now or call our 24×7 helpdesk at 9555009009.";
    }
    
    if (lowerText.includes('corporate') || lowerText.includes('company')) {
      return "We offer comprehensive corporate wellness programs:\n\n• Health camps at your office\n• Executive health packages\n• Employee wellness screenings\n• API integration for HR systems\n• Customized reporting dashboards\n\nFor corporate inquiries, please call 9555009009 or visit /corporate for more details.";
    }
    
    return "Thank you for your question! For specific information about tests, packages, or booking, I recommend:\n\n• Calling our 24×7 helpdesk: 9555009009\n• Browsing our test catalog at /tests\n• Checking out our health packages at /packages\n\nIs there something specific I can help you find?";
  };

  const handleChipClick = (chip: string) => {
    handleSendMessage(chip);
  };

  const handleEscalate = () => {
    const escalationMessage = `User requested human assistance. Session: ${sessionId}. Contact: ${JSON.stringify(userContact)}`;
    toast({
      title: "Escalating to Human Agent",
      description: "Our team will contact you shortly. You can also call 9555009009 for immediate assistance.",
    });
    // TODO: Send escalation to n8n webhook
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-brand-teal hover:bg-brand-teal-light shadow-lg animate-pulse-glow"
        size="sm"
      >
        <MessageCircle className="h-6 w-6 text-white" />
        <span className="sr-only">Open chat</span>
      </Button>

      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg h-[600px] flex flex-col p-0">
          {/* Header */}
          <DialogHeader className="p-4 border-b bg-brand-teal text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-saffron">
                  <Bot className="h-5 w-5 text-brand-teal" />
                </div>
                <div>
                  <DialogTitle className="text-white">Ask Nira</DialogTitle>
                  <p className="text-xs text-brand-teal-lighter">NirAmaya Assistant • Online</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-brand-teal-light"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {/* Quick Chips */}
          <div className="p-3 border-b bg-muted/30">
            <div className="flex flex-wrap gap-2">
              {quickChips.map((chip) => (
                <Badge
                  key={chip}
                  variant="secondary"
                  className="cursor-pointer hover:bg-brand-teal hover:text-white text-xs"
                  onClick={() => handleChipClick(chip)}
                >
                  {chip}
                </Badge>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-brand-saffron' 
                    : 'bg-brand-teal'
                }`}>
                  {message.role === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-brand-saffron text-white ml-auto'
                    : 'bg-muted'
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-teal">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-background">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                size="sm"
                className="bg-brand-teal hover:bg-brand-teal-light"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2 mt-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleEscalate}
                className="text-xs"
              >
                Talk to Human
              </Button>
              <Button 
                asChild
                size="sm" 
                className="bg-medical-accent hover:bg-medical-accent/90 text-medical-accent-foreground text-xs"
              >
                <a href="/book-now" target="_blank">Book Now</a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { Chatbot };