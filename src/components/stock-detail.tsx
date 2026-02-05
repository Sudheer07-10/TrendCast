import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Calendar, Bell, RefreshCw, Settings } from 'lucide-react';
import { formatPrice } from '../utils/currency';
import { useLanguage } from '../contexts/LanguageContext';
import { useAlerts } from '../contexts/AlertContext';
import { toast } from 'sonner@2.0.3';

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

interface StockDetailProps {
  stock: Stock;
  onBack: () => void;
  countryCode?: string;
}

const simpleReasons = [
  'Strong earnings growth',
  'High trading volume',
  'Positive market sentiment'
];

export function StockDetail({ stock, onBack, countryCode = 'US' }: StockDetailProps) {
  const { t } = useLanguage();
  const { alerts, addAlert, removeAlert } = useAlerts();
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [alertHorizon, setAlertHorizon] = useState<'hourly' | 'daily'>('daily');
  const [confidenceThreshold, setConfidenceThreshold] = useState([70]);

  // Check if there's an existing alert for this stock
  const existingAlert = alerts.find(alert => alert.stockTicker === stock.ticker && alert.isActive);
  const [alertEnabled, setAlertEnabled] = useState(!!existingAlert);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const handleSetAlert = () => {
    if (alertEnabled && existingAlert) {
      // Remove existing alert
      removeAlert(existingAlert.id);
      setAlertEnabled(false);
      toast.success('Alert removed successfully - You will no longer receive SMS/Email notifications');
    } else {
      // Add new alert
      addAlert({
        stockTicker: stock.ticker,
        horizon: alertHorizon,
        confidenceThreshold: confidenceThreshold[0],
        isActive: true,
      });
      setAlertEnabled(true);
      setIsAlertDialogOpen(false);
      toast.success('Alert set successfully! You will receive SMS/Email notifications when conditions are met.');
    }
  };

  const getPredictionColor = (prediction: Stock['prediction']) => {
    switch (prediction) {
      case 'BUY':
        return 'text-green-600 dark:text-green-400';
      case 'SELL':
        return 'text-red-600 dark:text-red-400';
      case 'HOLD':
        return 'text-yellow-600 dark:text-yellow-400';
    }
  };

  const getPredictionBg = (prediction: Stock['prediction']) => {
    switch (prediction) {
      case 'BUY':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'SELL':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'HOLD':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    }
  };

  const getConfidenceLevel = (confidence: number) => {
    if (confidence >= 80) return { level: t.highConfidence, color: 'text-green-600 dark:text-green-400' };
    if (confidence >= 60) return { level: t.mediumConfidence, color: 'text-yellow-600 dark:text-yellow-400' };
    return { level: t.lowConfidence, color: 'text-red-600 dark:text-red-400' };
  };

  const confidenceMeta = getConfidenceLevel(stock.confidence);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold">{stock.ticker}</h1>
                <Badge variant="secondary">{stock.sector}</Badge>
              </div>
              <p className="text-muted-foreground">{stock.name}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-2xl font-bold">{formatPrice(stock.price, countryCode)}</span>
                <span className={`flex items-center gap-1 ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stock.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="ml-auto"
                >
                  <RefreshCw className={`w-4 h-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {t.refresh}
                </Button>
              </div>
            </div>
          </div>

          {/* Two Main Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Prediction Panel */}
            <Card className={`${getPredictionBg(stock.prediction)} backdrop-blur-sm`}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  {stock.prediction === 'BUY' && <TrendingUp className="w-5 h-5" />}
                  {stock.prediction === 'SELL' && <TrendingDown className="w-5 h-5" />}
                  {stock.prediction === 'HOLD' && <Minus className="w-5 h-5" />}
                  {t.prediction}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className={`text-4xl font-bold ${getPredictionColor(stock.prediction)} mb-2`}>
                    {stock.prediction}
                  </div>
                  <p className="text-muted-foreground">
                    {stock.prediction === 'BUY' && 'Strong buy signal detected'}
                    {stock.prediction === 'SELL' && 'Consider selling position'}
                    {stock.prediction === 'HOLD' && 'Maintain current position'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Strength</span>
                    <span className="font-medium">{stock.confidence}%</span>
                  </div>
                  <Progress value={stock.confidence} className="h-2" />
                  
                  <div className="flex justify-center pt-2">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">Last Updated</p>
                      <p className="font-medium">{isRefreshing ? 'Updating...' : 'Just now'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Confidence Circle */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle>{t.confidenceLevel}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 mb-4">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeDasharray={`${(stock.confidence / 100) * 314} 314`}
                        strokeLinecap="round"
                        className={`${
                          stock.confidence >= 80 ? 'text-green-500' :
                          stock.confidence >= 60 ? 'text-yellow-500' : 'text-red-500'
                        } transition-all duration-1000`}
                        style={{
                          animation: 'dash 2s ease-in-out'
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold">{stock.confidence}%</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className={`text-xl font-semibold ${confidenceMeta.color} mb-2`}>
                      {confidenceMeta.level} {t.confidence}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {stock.confidence >= 80 && t.veryReliable}
                      {stock.confidence >= 60 && stock.confidence < 80 && t.moderatelyReliable}
                      {stock.confidence < 60 && t.lowerReliability}
                    </p>
                  </div>

                  <div className="w-full mt-6 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{t.algorithmScore}</span>
                      <span className="font-medium">{stock.confidence}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Market Sentiment</span>
                      <span className="font-medium">{stock.prediction === 'BUY' ? 'Bullish' : stock.prediction === 'SELL' ? 'Bearish' : 'Neutral'}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Reason Board */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle>Why?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {simpleReasons.map((reason, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{reason}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Alert Setting */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  {t.stockAlert}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t.getNotifications} {stock.ticker}</p>
                      <p className="text-sm text-muted-foreground">
                        {t.receiveAlerts}
                      </p>
                    </div>
                    <Switch
                      checked={alertEnabled}
                      onCheckedChange={setAlertEnabled}
                    />
                  </div>
                  
                  {alertEnabled && existingAlert && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        ✓ Alert active: {existingAlert.horizon} updates, ≥{existingAlert.confidenceThreshold}% confidence
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        You'll receive SMS/Email notifications when conditions are met
                      </p>
                    </div>
                  )}
                  
                  <Dialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant={alertEnabled && existingAlert ? "destructive" : "default"}
                        className="w-full"
                        onClick={() => {
                          if (alertEnabled && existingAlert) {
                            handleSetAlert(); // Remove alert directly
                          } else {
                            setIsAlertDialogOpen(true); // Open config dialog
                          }
                        }}
                      >
                        {alertEnabled && existingAlert ? 'Remove Alert' : t.setAlert}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Configure Alert for {stock.ticker}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6 py-4">
                        <div>
                          <label className="text-sm font-medium">{t.horizon}</label>
                          <Select value={alertHorizon} onValueChange={(value: 'hourly' | 'daily') => setAlertHorizon(value)}>
                            <SelectTrigger className="mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hourly">{t.hourly}</SelectItem>
                              <SelectItem value="daily">{t.daily}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">{t.confidenceThreshold}: {confidenceThreshold[0]}%</label>
                          <Slider
                            value={confidenceThreshold}
                            onValueChange={setConfidenceThreshold}
                            max={100}
                            min={1}
                            step={1}
                            className="mt-2"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>1%</span>
                            <span>100%</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => setIsAlertDialogOpen(false)} className="flex-1">
                            {t.cancel}
                          </Button>
                          <Button onClick={handleSetAlert} className="flex-1">
                            {t.enableAlert}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes dash {
          from {
            stroke-dasharray: 0 314;
          }
        }
      `}</style>
    </div>
  );
}