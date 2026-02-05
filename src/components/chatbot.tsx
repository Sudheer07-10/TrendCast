import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { MessageCircle, X, HelpCircle, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const faqs = [
  {
    question: "What do the colors mean?",
    answer: "Green = BUY signal, Red = SELL signal, Yellow = HOLD signal. The confidence percentage shows how sure our AI is about the prediction."
  },
  {
    question: "How do I change language?",
    answer: "Click the globe icon (🌐) in the top navigation bar to select from available languages."
  },
  {
    question: "How do I set an alert?",
    answer: "Go to any stock's detail page and click the 'Set Alert' button. You'll be notified when the stock hits your target conditions."
  },
  {
    question: "How accurate are the predictions?",
    answer: "Our AI accuracy varies by market conditions. Check the History section to see our track record for specific stocks and time periods."
  },
  {
    question: "Can I see past predictions?",
    answer: "Yes! Click the History button in the navigation or your user menu to see all past predictions and their outcomes."
  },
  {
    question: "How do daily vs hourly predictions work?",
    answer: "Daily predictions analyze long-term trends and market movements, while hourly predictions focus on short-term price fluctuations and quick trading opportunities."
  },
  {
    question: "What is confidence level?",
    answer: "Confidence level indicates how certain our AI model is about its prediction. Higher confidence (80%+) means stronger signals, while lower confidence suggests more uncertainty."
  },
  {
    question: "How do I switch between daily and hourly mode?",
    answer: "You can toggle between daily and hourly confidence modes in the stock list view using the time selector buttons."
  }
];

const welcomeMessages = [
  "👋 Welcome to TrendCast! I'm here to help you navigate the world of stock predictions.",
  "🎯 I can answer questions about our features, explain how predictions work, and guide you through the app.",
  "💡 Feel free to ask me anything about stock analysis, confidence levels, or how to use TrendCast effectively!",
  "🚀 Ready to make smarter investment decisions? Let's get started!"
];

const getSmartResponse = (question: string): string => {
  const lowerQuestion = question.toLowerCase();
  
  // Handle greetings
  if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi') || lowerQuestion.includes('hey')) {
    return "Hello! 👋 Welcome to TrendCast! I'm excited to help you with your stock analysis journey. What would you like to know?";
  }
  
  // Handle confidence questions
  if (lowerQuestion.includes('confidence') || lowerQuestion.includes('percentage')) {
    return "Great question! 📊 Confidence levels show how certain our AI is about predictions. Green (80%+) = High confidence, Yellow (60-79%) = Medium confidence, Red (<60%) = Lower confidence. Higher confidence generally means more reliable signals!";
  }
  
  // Handle daily vs hourly
  if (lowerQuestion.includes('daily') || lowerQuestion.includes('hourly') || lowerQuestion.includes('time')) {
    return "📅 Daily predictions analyze long-term market trends and are great for swing trading or investment decisions. ⏰ Hourly predictions focus on short-term price movements, perfect for day trading. You can switch between them in the stock list view!";
  }
  
  // Handle colors/signals
  if (lowerQuestion.includes('color') || lowerQuestion.includes('green') || lowerQuestion.includes('red') || lowerQuestion.includes('signal')) {
    return "🎨 Our color system is simple: 🟢 Green = BUY (upward trend expected), 🔴 Red = SELL (downward trend expected), 🟡 Yellow = HOLD (sideways movement expected). Each comes with a confidence percentage!";
  }
  
  // Handle accuracy
  if (lowerQuestion.includes('accurate') || lowerQuestion.includes('reliable') || lowerQuestion.includes('trust')) {
    return "📈 Our AI accuracy varies by market conditions, typically ranging from 65-85%. Check the History section to see our track record for specific stocks. Remember, no prediction is 100% guaranteed - always do your own research!";
  }
  
  // Handle alerts
  if (lowerQuestion.includes('alert') || lowerQuestion.includes('notification')) {
    return "🔔 Setting alerts is easy! Go to any stock's detail page and click 'Set Alert'. You can set price targets, percentage changes, or prediction updates. We'll notify you when conditions are met!";
  }
  
  // Handle language
  if (lowerQuestion.includes('language') || lowerQuestion.includes('translate')) {
    return "🌐 TrendCast supports 7 languages! Click the globe icon (🌐) in the header to switch between English, Spanish, French, German, Chinese, Hindi, and Japanese.";
  }
  
  // Handle general app usage
  if (lowerQuestion.includes('how to use') || lowerQuestion.includes('getting started') || lowerQuestion.includes('tutorial')) {
    return "🚀 Getting started is simple! 1️⃣ Select your country/market 2️⃣ Browse stocks and their predictions 3️⃣ Click on any stock for detailed analysis 4️⃣ Set alerts for stocks you're watching 5️⃣ Check History to track our prediction accuracy!";
  }
  
  // Handle thanks
  if (lowerQuestion.includes('thank') || lowerQuestion.includes('thanks')) {
    return "You're very welcome! 😊 I'm always here to help. Feel free to ask more questions anytime - I love helping users succeed with TrendCast!";
  }
  
  // Default response
  return "🤔 That's an interesting question! While I might not have a specific answer for that, I can help with stock predictions, confidence levels, app features, and general guidance. Try asking about colors, confidence, daily vs hourly modes, or how to use TrendCast features!";
};

export function ChatBot() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Initialize welcome messages when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      let messageId = 0;
      const addWelcomeMessage = (text: string, delay: number) => {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: messageId++,
            text,
            sender: 'bot',
            timestamp: new Date()
          }]);
        }, delay);
      };

      welcomeMessages.forEach((msg, index) => {
        addWelcomeMessage(msg, index * 1000);
      });
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getSmartResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg relative overflow-hidden"
          size="sm"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0"
            whileHover={{ opacity: 0.3 }}
            transition={{ duration: 0.3 }}
          />
        </Button>
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-end p-6"
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Card className="relative w-full max-w-md h-[600px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-0 shadow-2xl flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
                  <CardTitle className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </motion.div>
                    TrendCast Assistant
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowChat(!showChat)}
                      className="hover:bg-accent"
                    >
                      {showChat ? 'FAQs' : 'Chat'}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                {showChat ? (
                  // Chat Mode
                  <>
                    <CardContent className="flex-1 overflow-auto p-4 space-y-3">
                      <AnimatePresence>
                        {messages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                message.sender === 'user' 
                                  ? 'bg-blue-500' 
                                  : 'bg-gradient-to-r from-purple-500 to-blue-500'
                              }`}>
                                {message.sender === 'user' ? (
                                  <User className="w-4 h-4 text-white" />
                                ) : (
                                  <Bot className="w-4 h-4 text-white" />
                                )}
                              </div>
                              <div className={`p-3 rounded-2xl ${
                                message.sender === 'user'
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-100 dark:bg-gray-800 text-foreground'
                              }`}>
                                <p className="text-sm">{message.text}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-start"
                        >
                          <div className="flex items-start gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                              <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-800">
                              <div className="flex space-x-1">
                                <motion.div
                                  className="w-2 h-2 bg-gray-400 rounded-full"
                                  animate={{ y: [0, -5, 0] }}
                                  transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                                />
                                <motion.div
                                  className="w-2 h-2 bg-gray-400 rounded-full"
                                  animate={{ y: [0, -5, 0] }}
                                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                                />
                                <motion.div
                                  className="w-2 h-2 bg-gray-400 rounded-full"
                                  animate={{ y: [0, -5, 0] }}
                                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                    
                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <Input
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Ask me anything about TrendCast..."
                          className="flex-1"
                        />
                        <motion.div whileTap={{ scale: 0.9 }}>
                          <Button 
                            onClick={handleSendMessage}
                            size="sm"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </>
                ) : (
                  // FAQ Mode
                  <CardContent className="flex-1 overflow-auto">
                    <div className="space-y-3">
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-muted-foreground mb-4"
                      >
                        Find quick answers to common questions:
                      </motion.p>
                      
                      {faqs.map((faq, index) => (
                        <motion.div 
                          key={index} 
                          className="border rounded-lg"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Button
                            variant="ghost"
                            className="w-full justify-start p-4 h-auto text-left hover:bg-accent transition-all duration-200"
                            onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                          >
                            <div className="flex-1">
                              <p className="font-medium">{faq.question}</p>
                            </div>
                            <motion.span 
                              className="text-lg ml-2"
                              animate={{ rotate: selectedFaq === index ? 45 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              +
                            </motion.span>
                          </Button>
                          
                          <AnimatePresence>
                            {selectedFaq === index && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="p-4 pt-0 border-t bg-gray-50 dark:bg-gray-800/50">
                                  <p className="text-sm text-muted-foreground">
                                    {faq.answer}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}

                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                      >
                        <p className="text-sm">
                          <strong>Need more help?</strong><br />
                          Try our interactive chat or contact support@trendcast.com
                        </p>
                      </motion.div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}