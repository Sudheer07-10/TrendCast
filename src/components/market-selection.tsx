import { useState, useMemo } from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Search, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';

interface Country {
  code: string;
  name: string;
  flag: string;
  trend: 'up' | 'down' | 'neutral';
  performance: string;
  markets: number;
}

const countries: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', trend: 'up', performance: '+2.4%', markets: 1247 },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', trend: 'up', performance: '+1.8%', markets: 892 },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', trend: 'down', performance: '-0.7%', markets: 634 },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', trend: 'up', performance: '+3.2%', markets: 1156 },
  { code: 'CN', name: 'China', flag: '🇨🇳', trend: 'neutral', performance: '0.0%', markets: 934 },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', trend: 'up', performance: '+1.2%', markets: 445 },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', trend: 'down', performance: '-1.1%', markets: 323 },
  { code: 'FR', name: 'France', flag: '🇫🇷', trend: 'up', performance: '+0.9%', markets: 512 },
  { code: 'IN', name: 'India', flag: '🇮🇳', trend: 'up', performance: '+4.1%', markets: 867 },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', trend: 'neutral', performance: '-0.2%', markets: 289 },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', trend: 'down', performance: '-2.3%', markets: 178 },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', trend: 'up', performance: '+1.5%', markets: 134 }
];

interface MarketSelectionProps {
  onSelectCountry: (country: Country) => void;
}

export function MarketSelection({ onSelectCountry }: MarketSelectionProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return countries;
    return countries.filter(country =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const getTrendIcon = (trend: Country['trend']) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: Country['trend']) => {
    switch (trend) {
      case 'up':
        return 'text-green-600 dark:text-green-400';
      case 'down':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000 opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse delay-2000 opacity-50"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-3000 opacity-30"></div>
        
        {/* Floating lines */}
        <div className="absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent animate-pulse opacity-20"></div>
        <div className="absolute bottom-1/4 right-0 w-24 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent animate-pulse delay-1000 opacity-20"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t.selectMarket}
            </h1>
            <p className="text-muted-foreground">
              {t.globalMarkets}
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder={`${t.search}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Country Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCountries.map((country) => (
              <Card 
                key={country.code}
                className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 group"
                onClick={() => onSelectCountry(country)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{country.flag}</span>
                    <div className="flex-1">
                      <h3 className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {country.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{country.code}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{t.performance}</span>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(country.trend)}
                        <span className={`text-sm font-medium ${getTrendColor(country.trend)}`}>
                          {country.performance}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{t.markets}</span>
                      <span className="text-sm font-medium">{country.markets.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCountries.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No countries found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}