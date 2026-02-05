import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { BarChart3, TrendingUp, Sun, Moon, Globe, User, Settings, Home, LogOut, Clock, Info, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../utils/translations';
import { motion } from 'motion/react';
import trendcastLogo from 'figma:asset/b32301deef2613f7b2ed6b2f6da7066845dc30c2.png';

interface HeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
  onShowHistory: () => void;
  onShowAbout: () => void;
  onGoHome: () => void;
  onLogout: () => void;
  userName?: string;
  userEmail?: string;
  selectedCountry?: { name: string; flag: string };
  onSelectCountry?: (country: { name: string; flag: string }) => void;
}

const countries = [
  { name: 'United States', flag: '🇺🇸' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'Japan', flag: '🇯🇵' },
  { name: 'Canada', flag: '🇨🇦' }
];

const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
  { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
  { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh' as Language, name: '中文', flag: '🇨🇳' },
  { code: 'hi' as Language, name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ja' as Language, name: '日本語', flag: '🇯🇵' }
];

export function Header({ 
  isDark, 
  onThemeToggle, 
  onShowHistory,
  onShowAbout,
  onGoHome,
  onLogout, 
  userName = 'Demo User',
  userEmail = 'demo@trendcast.com',
  selectedCountry,
  onSelectCountry
}: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [languageOpen, setLanguageOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={onGoHome}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="relative"
              whileHover={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={trendcastLogo} 
                alt="TrendCast Logo" 
                className="w-10 h-10 object-contain"
              />
            </motion.div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            {/* Home */}
            <Button variant="ghost" size="sm" onClick={onGoHome}>
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline ml-1">{t.home}</span>
            </Button>

            {/* History */}
            <Button variant="ghost" size="sm" onClick={onShowHistory}>
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline ml-1">{t.history}</span>
            </Button>

            {/* Country Selector */}
            {selectedCountry && onSelectCountry && (
              <Select
                value={selectedCountry.name}
                onValueChange={(value) => {
                  const country = countries.find(c => c.name === value);
                  if (country) onSelectCountry(country);
                }}
              >
                <SelectTrigger className="w-auto border-0 bg-transparent hover:bg-accent">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{selectedCountry.flag}</span>
                    <span className="hidden sm:inline">{selectedCountry.name}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.name} value={country.name}>
                      <div className="flex items-center gap-2">
                        <span>{country.flag}</span>
                        <span>{country.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" onClick={onThemeToggle}>
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {/* Language Selector */}
          <Popover open={languageOpen} onOpenChange={setLanguageOpen}>
            <PopoverTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`hover:bg-accent gap-1 transition-all duration-200 ${languageOpen ? 'bg-accent shadow-md' : ''}`}
                >
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs">
                    {mounted && languages.find(l => l.code === language)?.flag}
                  </span>
                  <motion.div
                    animate={{ rotate: languageOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-3 h-3" />
                  </motion.div>
                  <span className="sr-only">Select Language</span>
                </Button>
              </motion.div>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2" align="end">
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-1"
              >
                <p className="text-sm font-medium px-2 py-1 border-b pb-2 mb-2">{t.selectLanguage}</p>
                {languages.map((lang, index) => (
                  <motion.div
                    key={lang.code}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Button
                      variant={language === lang.code ? "secondary" : "ghost"}
                      size="sm"
                      className="w-full justify-start hover:scale-105 transition-all duration-200"
                      onClick={() => {
                        setLanguage(lang.code);
                        setLanguageOpen(false);
                      }}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      <span className="flex-1 text-left">{lang.name}</span>
                      {language === lang.code && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-xs text-blue-500"
                        >
                          ✓
                        </motion.span>
                      )}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </PopoverContent>
          </Popover>



          {/* About */}
          <Button variant="ghost" size="sm" onClick={onShowAbout}>
            <Info className="w-4 h-4" />
          </Button>

          {/* Settings */}
          <Popover open={settingsOpen} onOpenChange={setSettingsOpen}>
            <PopoverTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`hover:bg-accent gap-1 transition-all duration-200 ${settingsOpen ? 'bg-accent shadow-md' : ''}`}
                >
                  <motion.div
                    animate={{ rotate: settingsOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Settings className="w-4 h-4" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: settingsOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-3 h-3" />
                  </motion.div>
                  <span className="sr-only">Settings</span>
                </Button>
              </motion.div>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                  <h3 className="font-semibold mb-3 text-foreground">{t.settings}</h3>
                  <motion.div 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <motion.div 
                      className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <User className="w-7 h-7 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="font-semibold text-base">{userName}</p>
                      <p className="text-sm text-muted-foreground">{userEmail}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <motion.div 
                          className="w-2 h-2 bg-green-500 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        />
                        <span className="text-xs text-green-600 dark:text-green-400">Online</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
                <div className="p-2 space-y-1">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start hover:bg-accent hover:scale-105 transition-all duration-200" 
                      onClick={() => {
                        onShowAbout();
                        setSettingsOpen(false);
                      }}
                    >
                      <Info className="w-4 h-4 mr-3" />
                      <span>{t.aboutTrendcast}</span>
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:scale-105 transition-all duration-200" 
                      onClick={() => {
                        onLogout();
                        setSettingsOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      <span>{t.logout}</span>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}