import { useState, useEffect } from 'react';
import { Login } from './components/login';
import { MarketSelection } from './components/market-selection';
import { StockList } from './components/stock-list';
import { StockDetail } from './components/stock-detail';
import { HistoryView } from './components/history-view';
import { AboutUs } from './components/about-us';
import { Header } from './components/header';
import { ChatBot } from './components/chatbot';
import { LanguageProvider } from './contexts/LanguageContext';
import { AlertProvider } from './contexts/AlertContext';
import { Toaster } from './components/ui/sonner';

type AppState = 'login' | 'market-selection' | 'stock-list' | 'stock-detail' | 'history' | 'about';

interface Country {
  code: string;
  name: string;
  flag: string;
  trend: 'up' | 'down' | 'neutral';
  performance: string;
  markets: number;
}

interface Stock {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  prediction: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  volume: number;
  sector: string;
}

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>('login');
  const [isDark, setIsDark] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [userName, setUserName] = useState<string>('');

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Handle theme changes
  const handleThemeToggle = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogin = (username: string, password: string) => {
    // Simple demo authentication
    if (username && password) {
      setUserName(username);
      setCurrentState('market-selection');
    }
  };

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setCurrentState('stock-list');
  };

  const handleSelectStock = (stock: Stock) => {
    setSelectedStock(stock);
    setCurrentState('stock-detail');
  };

  const handleBackToMarketSelection = () => {
    setSelectedCountry(null);
    setCurrentState('market-selection');
  };

  const handleBackToStockList = () => {
    setSelectedStock(null);
    setCurrentState('stock-list');
  };

  const handleShowHistory = () => {
    setCurrentState('history');
  };

  const handleBackFromHistory = () => {
    if (selectedStock) {
      setCurrentState('stock-detail');
    } else if (selectedCountry) {
      setCurrentState('stock-list');
    } else {
      setCurrentState('market-selection');
    }
  };

  const handleBackFromAbout = () => {
    if (selectedStock) {
      setCurrentState('stock-detail');
    } else if (selectedCountry) {
      setCurrentState('stock-list');
    } else {
      setCurrentState('market-selection');
    }
  };

  const handleShowAbout = () => {
    setCurrentState('about');
  };

  const handleGoHome = () => {
    setSelectedStock(null);
    setSelectedCountry(null);
    setCurrentState('market-selection');
  };

  const handleLogout = () => {
    setUserName('');
    setSelectedCountry(null);
    setSelectedStock(null);
    setCurrentState('login');
  };

  // Render login screen
  if (currentState === 'login') {
    return (
      <LanguageProvider>
        <Login onLogin={handleLogin} />
      </LanguageProvider>
    );
  }

  // Render main app with header
  return (
    <LanguageProvider>
      <AlertProvider>
        <div className="min-h-screen bg-background">
          <Header 
            isDark={isDark}
            onThemeToggle={handleThemeToggle}
            onShowHistory={handleShowHistory}
            onShowAbout={handleShowAbout}
            onGoHome={handleGoHome}
            onLogout={handleLogout}
            userName={userName}
            selectedCountry={selectedCountry}
            onSelectCountry={handleSelectCountry}
          />
          
          <main className="flex-1">
            {currentState === 'market-selection' && (
              <MarketSelection onSelectCountry={handleSelectCountry} />
            )}
            
            {currentState === 'stock-list' && selectedCountry && (
              <StockList 
                country={selectedCountry}
                onSelectStock={handleSelectStock}
                onBack={handleBackToMarketSelection}
              />
            )}
            
            {currentState === 'stock-detail' && selectedStock && (
              <StockDetail 
                stock={selectedStock}
                onBack={handleBackToStockList}
                countryCode={selectedCountry?.code}
              />
            )}
            
            {currentState === 'history' && (
              <HistoryView onBack={handleBackFromHistory} />
            )}

            {currentState === 'about' && (
              <AboutUs onBack={handleBackFromAbout} />
            )}
          </main>

          {/* ChatBot - only show when logged in */}
          <ChatBot />
          <Toaster />
        </div>
      </AlertProvider>
    </LanguageProvider>
  );
}