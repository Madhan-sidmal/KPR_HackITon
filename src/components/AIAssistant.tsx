import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, X, Minimize2, Maximize2, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your JeevaDhara AI Assistant. I can help you with:\n\n• Finding restoration projects\n• Water quality data\n• NGO partnerships\n• Policy information\n• How to get involved\n\nWhat would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");

  // Show welcome popup after 3 seconds if user hasn't opened chat
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('chatbot-popup-seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        if (!isOpen) {
          setShowWelcomePopup(true);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOpenChat = () => {
    setShowWelcomePopup(false);
    setIsOpen(true);
    sessionStorage.setItem('chatbot-popup-seen', 'true');
  };

  const handleDismissPopup = () => {
    setShowWelcomePopup(false);
    sessionStorage.setItem('chatbot-popup-seen', 'true');
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your location, there are 3 active restoration projects within 5km. Would you like to see them?",
        "I can help you understand the water quality data for your region. The latest readings show good conditions with pH 7.2 and dissolved oxygen at 6.5 mg/L.",
        "To report a water issue, go to the Citizen Portal and use the 'Report Issue' feature. You'll earn 25 EcoPoints for verified reports!",
        "There are 45 verified NGOs working on water restoration projects in your state. I can show you the top-rated ones.",
        "You can donate to verified projects through our Marketplace. All donations are tracked on blockchain for complete transparency."
      ];
      
      const aiMessage: Message = {
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const suggestedQuestions = [
    "How can I volunteer?",
    "Show me nearby projects",
    "What are EcoPoints?",
    "How to donate?"
  ];

  return (
    <>
      {/* Welcome Popup Dialog */}
      <Dialog open={showWelcomePopup} onOpenChange={setShowWelcomePopup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl">Meet Your AI Assistant!</DialogTitle>
                <DialogDescription>
                  Get instant answers about JeevaDhara
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              I can help you navigate the platform, find projects, understand environmental data, and more!
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AI-Powered
              </span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">24/7 Available</span>
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Instant Answers</span>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleOpenChat} className="flex-1 bg-gradient-to-r from-primary to-secondary">
                <Bot className="w-4 h-4 mr-2" />
                Start Chatting
              </Button>
              <Button variant="outline" onClick={handleDismissPopup}>
                Maybe Later
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={handleOpenChat}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-water bg-gradient-to-r from-primary to-secondary hover:scale-110 transition-all z-50"
          size="icon"
        >
          <Bot className="w-8 h-8" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 z-50 transition-all ${
          isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
        }`}>
          <Card className="w-full h-full flex flex-col shadow-water">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-3 bg-gradient-to-r from-primary to-secondary text-white rounded-t-lg">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <CardTitle className="text-white text-base">AI Knowledge Assistant</CardTitle>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-8 w-8 text-white hover:bg-white/20"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            {!isMinimized && (
              <CardContent className="flex-1 p-4 overflow-hidden flex flex-col">
                <ScrollArea className="flex-1 pr-4 mb-4">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Suggested Questions */}
                {messages.length === 1 && (
                  <div className="mb-4 space-y-2">
                    <p className="text-xs text-muted-foreground">Try asking:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setInput(question);
                            setTimeout(() => handleSend(), 100);
                          }}
                          className="text-xs h-7"
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask me anything..."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSend}
                    size="icon"
                    className="bg-gradient-to-r from-primary to-secondary"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default AIAssistant;