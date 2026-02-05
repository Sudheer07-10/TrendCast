import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ArrowLeft, CheckCircle, XCircle, TrendingUp, TrendingDown, Calendar, BarChart3 } from 'lucide-react';

interface HistoryEntry {
  id: number;
  ticker: string;
  country: string;
  flag: string;
  prediction: 'BUY' | 'SELL' | 'HOLD';
  horizon: 'Hourly' | 'Daily';
  predictedPrice: number;
  actualPrice: number;
  date: string;
  time: string;
  accuracy: 'correct' | 'incorrect';
  confidence: number;
  outcome: string;
}

const mockHistory: HistoryEntry[] = [
  {
    id: 1,
    ticker: 'AAPL',
    country: 'US',
    flag: '🇺🇸',
    prediction: 'BUY',
    horizon: 'Daily',
    predictedPrice: 175.00,
    actualPrice: 178.43,
    date: '2024-01-15',
    time: '14:30',
    accuracy: 'correct',
    confidence: 87,
    outcome: '+$3.43 (+1.96%)'
  },
  {
    id: 2,
    ticker: 'TSLA',
    country: 'US',
    flag: '🇺🇸',
    prediction: 'SELL',
    horizon: 'Hourly',
    predictedPrice: 240.00,
    actualPrice: 235.67,
    date: '2024-01-15',
    time: '11:15',
    accuracy: 'correct',
    confidence: 81,
    outcome: '-$4.33 (-1.80%)'
  },
  {
    id: 3,
    ticker: 'GOOGL',
    country: 'US',
    flag: '🇺🇸',
    prediction: 'HOLD',
    horizon: 'Daily',
    predictedPrice: 138.00,
    actualPrice: 139.21,
    date: '2024-01-14',
    time: '09:45',
    accuracy: 'correct',
    confidence: 73,
    outcome: '+$1.21 (+0.88%)'
  },
  {
    id: 4,
    ticker: 'MSFT',
    country: 'US',
    flag: '🇺🇸',
    prediction: 'BUY',
    horizon: 'Daily',
    predictedPrice: 350.00,
    actualPrice: 344.73,
    date: '2024-01-14',
    time: '13:20',
    accuracy: 'incorrect',
    confidence: 92,
    outcome: '-$5.27 (-1.51%)'
  },
  {
    id: 5,
    ticker: 'NVDA',
    country: 'US',
    flag: '🇺🇸',
    prediction: 'BUY',
    horizon: 'Hourly',
    predictedPrice: 420.00,
    actualPrice: 432.18,
    date: '2024-01-13',
    time: '16:10',
    accuracy: 'correct',
    confidence: 95,
    outcome: '+$12.18 (+2.90%)'
  },
  {
    id: 6,
    ticker: 'META',
    country: 'US',
    flag: '🇺🇸',
    prediction: 'SELL',
    horizon: 'Daily',
    predictedPrice: 290.00,
    actualPrice: 294.82,
    date: '2024-01-13',
    time: '10:35',
    accuracy: 'incorrect',
    confidence: 68,
    outcome: '+$4.82 (+1.66%)'
  }
];

interface HistoryViewProps {
  onBack: () => void;
}

export function HistoryView({ onBack }: HistoryViewProps) {
  const last30Predictions = mockHistory.slice(0, 30); // Simulate last 30 predictions
  const correctPredictions = last30Predictions.filter(entry => entry.accuracy === 'correct').length;
  const totalPredictions = last30Predictions.length;
  const accuracyRate = Math.round((correctPredictions / totalPredictions) * 100);

  const getAccuracyIcon = (accuracy: string) => {
    return accuracy === 'correct' ? 
      <CheckCircle className="w-5 h-5 text-green-500" /> : 
      <XCircle className="w-5 h-5 text-red-500" />;
  };

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case 'BUY':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'SELL':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'HOLD':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Calculate trend data for mini graph
  const trendData = mockHistory.slice().reverse().map((entry, index) => ({
    x: index,
    y: entry.accuracy === 'correct' ? 1 : 0
  }));

  const generatePath = () => {
    const width = 200;
    const height = 60;
    const points = trendData.map((point, index) => {
      const x = (index / (trendData.length - 1)) * width;
      const y = height - (point.y * height);
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
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
            <div>
              <h1 className="text-3xl font-bold">Prediction History</h1>
              <p className="text-muted-foreground">Track your prediction accuracy over time</p>
            </div>
          </div>

          {/* Accuracy Summary */}
          <Card className="mb-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">
                  Last 30 predictions: <span className="text-green-600 dark:text-green-400">{accuracyRate}% accurate</span>
                </h2>
                <p className="text-muted-foreground">
                  {correctPredictions} correct out of {totalPredictions} total predictions
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{correctPredictions}</p>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>

                <div className="text-center">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">{totalPredictions - correctPredictions}</p>
                  <p className="text-sm text-muted-foreground">Incorrect</p>
                </div>

                <div className="text-center">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalPredictions}</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accuracy Trend Chart */}
          <Card className="mb-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Prediction Accuracy Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-20 flex items-center justify-center">
                <svg width="200" height="60" className="border rounded">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.3 }} />
                      <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.3 }} />
                    </linearGradient>
                  </defs>
                  <path
                    d={generatePath()}
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    fill="none"
                    className="drop-shadow-sm"
                  />
                  {trendData.map((point, index) => (
                    <circle
                      key={index}
                      cx={(index / (trendData.length - 1)) * 200}
                      cy={60 - (point.y * 60)}
                      r="3"
                      fill={point.y === 1 ? '#22c55e' : '#ef4444'}
                      className="drop-shadow-sm"
                    />
                  ))}
                </svg>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-2">
                Green dots: Correct predictions • Red dots: Incorrect predictions
              </p>
            </CardContent>
          </Card>

          {/* Prediction History Table */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Prediction History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date/Time</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Horizon</TableHead>
                      <TableHead>Prediction</TableHead>
                      <TableHead>Confidence %</TableHead>
                      <TableHead>Actual Outcome</TableHead>
                      <TableHead>Hit/Miss</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockHistory.map((entry) => (
                      <TableRow key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <TableCell>
                          <div className="text-sm">
                            <div>{formatDate(entry.date)}</div>
                            <div className="text-muted-foreground">{entry.time}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{entry.flag}</span>
                            <span className="font-semibold">{entry.ticker}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {entry.horizon}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPredictionColor(entry.prediction)}>
                            <div className="flex items-center gap-1">
                              {entry.prediction === 'BUY' && <TrendingUp className="w-3 h-3" />}
                              {entry.prediction === 'SELL' && <TrendingDown className="w-3 h-3" />}
                              {entry.prediction === 'HOLD' && <div className="w-3 h-0.5 bg-current" />}
                              {entry.prediction}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={`font-medium ${
                            entry.confidence >= 80 ? 'text-green-600 dark:text-green-400' :
                            entry.confidence >= 60 ? 'text-yellow-600 dark:text-yellow-400' :
                            'text-red-600 dark:text-red-400'
                          }`}>
                            {entry.confidence}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={entry.accuracy === 'correct' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                            {entry.outcome}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center">
                            {getAccuracyIcon(entry.accuracy)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline">
                  Load More History
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}