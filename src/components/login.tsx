import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader } from './ui/card';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import trendcastLogo from 'figma:asset/b32301deef2613f7b2ed6b2f6da7066845dc30c2.png';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const { t } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    onLogin(username, password);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          {/* TrendCast Logo */}
          <motion.div 
            className="flex flex-col items-center justify-center mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="relative mb-3"
              whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={trendcastLogo} 
                alt="TrendCast Logo" 
                className="w-16 h-16 object-contain"
              />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-center"
            >
              <p className="text-sm text-muted-foreground">Stock Prediction Platform</p>
            </motion.div>
          </motion.div>
          <p className="text-muted-foreground">
            {t.welcome}
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">{t.username}</Label>
              <Input
                id="username"
                type="text"
                placeholder={`Enter your ${t.username.toLowerCase()}`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-white/50 dark:bg-gray-700/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <Input
                id="password"
                type="password"
                placeholder={`Enter your ${t.password.toLowerCase()}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/50 dark:bg-gray-700/50"
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              disabled={isLoading || !username || !password}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t.loading}
                </div>
              ) : (
                t.signIn
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Demo credentials: <span className="font-medium">demo / password</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}