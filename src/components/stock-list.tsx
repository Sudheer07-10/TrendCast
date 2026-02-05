import { useState, useMemo } from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, TrendingUp, TrendingDown, Minus, Filter, ArrowLeft, Clock, Calendar } from 'lucide-react';
import { formatPrice } from '../utils/currency';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

interface Stock {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  prediction: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  hourlyConfidence: number;
  volume: number;
  sector: string;
}

const mockStocks: Stock[] = [
  { ticker: 'AAPL', name: 'Apple Inc.', price: 175.43, change: 2.34, changePercent: 1.35, prediction: 'BUY', confidence: 87, hourlyConfidence: 72, volume: 52847392, sector: 'Technology' },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', price: 138.21, change: -1.23, changePercent: -0.88, prediction: 'HOLD', confidence: 73, hourlyConfidence: 68, volume: 28472618, sector: 'Technology' },
  { ticker: 'MSFT', name: 'Microsoft Corp.', price: 344.73, change: 5.67, changePercent: 1.67, prediction: 'BUY', confidence: 92, hourlyConfidence: 85, volume: 31847295, sector: 'Technology' },
  { ticker: 'TSLA', name: 'Tesla Inc.', price: 238.45, change: -8.21, changePercent: -3.33, prediction: 'SELL', confidence: 81, hourlyConfidence: 89, volume: 89472615, sector: 'Automotive' },
  { ticker: 'AMZN', name: 'Amazon.com Inc.', price: 127.74, change: 0.95, changePercent: 0.75, prediction: 'HOLD', confidence: 65, hourlyConfidence: 58, volume: 45738291, sector: 'E-commerce' },
  { ticker: 'NVDA', name: 'NVIDIA Corp.', price: 421.13, change: 12.45, changePercent: 3.05, prediction: 'BUY', confidence: 95, hourlyConfidence: 91, volume: 67391847, sector: 'Technology' },
  { ticker: 'META', name: 'Meta Platforms Inc.', price: 284.27, change: -3.52, changePercent: -1.22, prediction: 'HOLD', confidence: 68, hourlyConfidence: 75, volume: 23847192, sector: 'Technology' },
  { ticker: 'NFLX', name: 'Netflix Inc.', price: 392.65, change: 7.83, changePercent: 2.03, prediction: 'BUY', confidence: 79, hourlyConfidence: 83, volume: 18472935, sector: 'Entertainment' }
];

interface StockListProps {
  country: { name: string; flag: string; code: string };
  onSelectStock: (stock: Stock) => void;
  onBack: () => void;
}

export function StockList({ country, onSelectStock, onBack }: StockListProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string>('confidence');
  const [filterBy, setFilterBy] = useState<string>('all');
  const [showRingAnimation, setShowRingAnimation] = useState(true);
  const [timeFrame, setTimeFrame] = useState<'daily' | 'hourly'>('daily');

  const filteredAndSortedStocks = useMemo(() => {
    let filtered = mockStocks.filter(stock => {
      const matchesSearch = stock.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          stock.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (filterBy === 'all') return matchesSearch;
      return matchesSearch && stock.prediction === filterBy;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'confidence':
          const aConfidence = timeFrame === 'daily' ? a.confidence : a.hourlyConfidence;
          const bConfidence = timeFrame === 'daily' ? b.confidence : b.hourlyConfidence;
          return bConfidence - aConfidence;
        case 'performance':
          return b.changePercent - a.changePercent;
        case 'volume':
          return b.volume - a.volume;
        case 'alphabetical':
          return a.ticker.localeCompare(b.ticker);
        default:
          return 0;
      }
    });
  }, [searchQuery, sortBy, filterBy, timeFrame]);

  const getPredictionColor = (prediction: Stock['prediction']) => {
    switch (prediction) {
      case 'BUY':
        return 'bg-green-500 text-white border-green-500';
      case 'SELL':
        return 'bg-red-500 text-white border-red-500';
      case 'HOLD':
        return 'bg-yellow-500 text-black border-yellow-500';
    }
  };

  const getPredictionIcon = (prediction: Stock['prediction']) => {
    switch (prediction) {
      case 'BUY':
        return <TrendingUp className="w-3 h-3" />;
      case 'SELL':
        return <TrendingDown className="w-3 h-3" />;
      case 'HOLD':
        return <Minus className="w-3 h-3" />;
    }
  };

  const getConfidenceRing = (stock: Stock) => {
    const confidence = timeFrame === 'daily' ? stock.confidence : stock.hourlyConfidence;
    const circumference = 2 * Math.PI * 20;
    const strokeDasharray = `${(confidence / 100) * circumference} ${circumference}`;
    
    return (
      <motion.div 
        className="relative w-12 h-12"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-gray-200 dark:text-gray-700"
          />
          <motion.circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className={`${
              confidence >= 80 ? 'text-green-500' :
              confidence >= 60 ? 'text-yellow-500' : 'text-red-500'
            }`}
            initial={{ strokeDasharray: '0 125.66' }}
            animate={{ strokeDasharray }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          />
        </svg>
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <span className="text-xs font-medium">{confidence}%</span>
        </motion.div>
        
        {/* Animated glow effect for high confidence */}
        {confidence >= 80 && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-green-400"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{country.flag}</span>
              <div>
                <h1 className="text-2xl font-bold">{t.stocksIn} {country.name}</h1>
                <p className="text-muted-foreground">Real-time predictions and market insights</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {/* Time Frame Selector */}
              <div className="flex bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-1 border">
                <motion.button
                  className={`px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-all duration-200 ${
                    timeFrame === 'daily' 
                      ? 'bg-blue-500 text-white shadow-md' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setTimeFrame('daily')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Calendar className="w-4 h-4" />
                  Daily
                </motion.button>
                <motion.button
                  className={`px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-all duration-200 ${
                    timeFrame === 'hourly' 
                      ? 'bg-purple-500 text-white shadow-md' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setTimeFrame('hourly')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Clock className="w-4 h-4" />
                  Hourly
                </motion.button>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <SelectValue placeholder={t.filterBy} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confidence">{t.confidence}</SelectItem>
                  <SelectItem value="performance">{t.performance}</SelectItem>
                  <SelectItem value="volume">Volume</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-32 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <Filter className="w-4 h-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.all}</SelectItem>
                  <SelectItem value="BUY">{t.buy}</SelectItem>
                  <SelectItem value="SELL">{t.sell}</SelectItem>
                  <SelectItem value="HOLD">{t.hold}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Time Frame Info Banner */}
          <motion.div 
            key={timeFrame}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-4 p-3 rounded-lg border backdrop-blur-sm ${
              timeFrame === 'daily' 
                ? 'bg-blue-50/80 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                : 'bg-purple-50/80 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
            }`}
          >
            <div className="flex items-center gap-2">
              {timeFrame === 'daily' ? (
                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              ) : (
                <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              )}
              <p className="text-sm">
                {timeFrame === 'daily' 
                  ? '📈 Daily predictions analyze long-term trends and market movements - perfect for swing trading and investment decisions.'
                  : '⚡ Hourly predictions focus on short-term price fluctuations - ideal for day trading and quick opportunities.'
                }
              </p>
            </div>
          </motion.div>

          {/* Stock Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filteredAndSortedStocks.map((stock, index) => (
                <motion.div
                  key={`${stock.ticker}-${timeFrame}`}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className="cursor-pointer transition-all duration-300 hover:shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 group overflow-hidden relative"
                    onClick={() => onSelectStock(stock)}
                  >
                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Time frame indicator */}
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs ${
                      timeFrame === 'daily' 
                        ? 'bg-blue-500/20 text-blue-700 dark:text-blue-300' 
                        : 'bg-purple-500/20 text-purple-700 dark:text-purple-300'
                    }`}>
                      {timeFrame === 'daily' ? '📅' : '⏰'}
                    </div>

                    <CardContent className="p-4 relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <motion.h3 
                              className="font-bold text-lg"
                              whileHover={{ scale: 1.05 }}
                            >
                              {stock.ticker}
                            </motion.h3>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Badge className={getPredictionColor(stock.prediction)}>
                                <div className="flex items-center gap-1">
                                  {getPredictionIcon(stock.prediction)}
                                  {stock.prediction}
                                </div>
                              </Badge>
                            </motion.div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{stock.name}</p>
                          <motion.p 
                            className="text-lg font-semibold"
                            whileHover={{ scale: 1.05 }}
                          >
                            {formatPrice(stock.price, country.code)}
                          </motion.p>
                          <motion.p 
                            className={`text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}
                            animate={{ 
                              scale: [1, 1.05, 1],
                              transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                            }}
                          >
                            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                          </motion.p>
                        </div>
                        
                        <div className="flex flex-col items-center gap-1">
                          {getConfidenceRing(stock)}
                          <motion.span 
                            className="text-xs text-muted-foreground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                          >
                            {timeFrame === 'daily' ? 'Daily' : 'Hourly'}
                          </motion.span>
                        </div>
                      </div>
                      
                      <motion.div 
                        className="flex items-center justify-between text-xs text-muted-foreground"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <span>Volume: {(stock.volume / 1000000).toFixed(1)}M</span>
                        <span>{stock.sector}</span>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredAndSortedStocks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No stocks found matching your criteria</p>
            </div>
          )}
        </div>
      </div>


    </div>
  );
}