// Currency formatting utility based on country
export interface CurrencyInfo {
  symbol: string;
  code: string;
  name: string;
}

export const getCurrencyByCountry = (countryCode: string): CurrencyInfo => {
  const currencyMap: Record<string, CurrencyInfo> = {
    'US': { symbol: '$', code: 'USD', name: 'US Dollar' },
    'IN': { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
    'GB': { symbol: '£', code: 'GBP', name: 'British Pound' },
    'UK': { symbol: '£', code: 'GBP', name: 'British Pound' },
    'JP': { symbol: '¥', code: 'JPY', name: 'Japanese Yen' },
    'DE': { symbol: '€', code: 'EUR', name: 'Euro' },
    'FR': { symbol: '€', code: 'EUR', name: 'Euro' },
    'CN': { symbol: '¥', code: 'CNY', name: 'Chinese Yuan' },
    'CA': { symbol: 'C$', code: 'CAD', name: 'Canadian Dollar' },
    'AU': { symbol: 'A$', code: 'AUD', name: 'Australian Dollar' },
    'KR': { symbol: '₩', code: 'KRW', name: 'South Korean Won' },
    'BR': { symbol: 'R$', code: 'BRL', name: 'Brazilian Real' },
    'MX': { symbol: '$', code: 'MXN', name: 'Mexican Peso' }
  };

  return currencyMap[countryCode] || { symbol: '$', code: 'USD', name: 'US Dollar' };
};

export const formatPrice = (price: number, countryCode: string): string => {
  const currency = getCurrencyByCountry(countryCode);
  
  // Convert USD price to approximate local currency (mock conversion)
  let convertedPrice = price;
  const conversionRates: Record<string, number> = {
    'USD': 1,
    'INR': 83.12,
    'GBP': 0.79,
    'JPY': 149.50,
    'EUR': 0.92,
    'CNY': 7.23,
    'CAD': 1.36,
    'AUD': 1.53,
    'KRW': 1310.50,
    'BRL': 4.95,
    'MXN': 17.85
  };

  if (currency.code !== 'USD') {
    convertedPrice = price * (conversionRates[currency.code] || 1);
  }

  // Format based on currency
  if (currency.code === 'JPY' || currency.code === 'KRW') {
    return `${currency.symbol}${Math.round(convertedPrice).toLocaleString()}`;
  }
  
  return `${currency.symbol}${convertedPrice.toFixed(2)}`;
};