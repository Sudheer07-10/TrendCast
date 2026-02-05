import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { BarChart3, TrendingUp, ArrowLeft, Zap, Shield, Target } from 'lucide-react';

interface AboutUsProps {
  onBack: () => void;
}

export function AboutUs({ onBack }: AboutUsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-3xl font-bold">About TrendCast</h1>
          </div>

          {/* Brand Section */}
          <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="relative p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
                  <BarChart3 className="w-16 h-16 text-white" />
                  <TrendingUp className="w-8 h-8 text-green-400 absolute -top-1 -right-1" />
                </div>
              </div>
              
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TrendCast
              </h2>
              
              <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
                Making stock predictions simple using quantum-powered signals.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Quantum-Powered</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced AI algorithms analyze market patterns with unprecedented accuracy
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Simple & Intuitive</h3>
                  <p className="text-sm text-muted-foreground">
                    Complex market data simplified into clear buy, sell, or hold signals
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Confidence-Based</h3>
                  <p className="text-sm text-muted-foreground">
                    Every prediction comes with a confidence score for informed decisions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mission Section */}
          <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">
                TrendCast democratizes stock market analysis by transforming complex financial data into 
                simple, actionable insights. Our quantum-powered AI analyzes thousands of market indicators 
                in real-time, providing you with clear predictions and the confidence levels to make 
                informed investment decisions.
              </p>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  What makes us different?
                </h4>
                <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                  <li>• Real-time quantum signal processing</li>
                  <li>• Multi-market global coverage</li>
                  <li>• Confidence-weighted predictions</li>
                  <li>• Simple, beginner-friendly interface</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer Section */}
          <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                <Shield className="w-5 h-5" />
                Important Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-yellow-800 dark:text-yellow-200">
                <p className="font-semibold">
                  This is a hackathon prototype. Not financial advice.
                </p>
                
                <div className="text-sm space-y-2">
                  <p>
                    • TrendCast is a demonstration project created for educational and hackathon purposes
                  </p>
                  <p>
                    • All predictions and market data shown are simulated and should not be used for actual trading
                  </p>
                  <p>
                    • Always consult with qualified financial advisors before making investment decisions
                  </p>
                  <p>
                    • Past performance does not guarantee future results
                  </p>
                  <p>
                    • Cryptocurrency and stock investments carry inherent risks of loss
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact/Support Section */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Built with ❤️ for the future of financial technology
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline">
                Contact Support
              </Button>
              <Button variant="outline">
                GitHub Repository
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}