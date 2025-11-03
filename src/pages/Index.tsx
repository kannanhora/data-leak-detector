import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SecurityBadge } from "@/components/SecurityBadge";
import { RiskMeter } from "@/components/RiskMeter";
import { MetricCard } from "@/components/MetricCard";
import { ScanningAnimation } from "@/components/ScanningAnimation";
import { DetailedAnalysisModal } from "@/components/DetailedAnalysisModal";
import { Shield, Activity, Database, Network, Eye, Lock, Zap, Globe, Copy, CheckCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ThreatCard } from "@/components/ThreatCard";

interface IndexProps {
  currentUrl: string;
  currentSite: string;
}

interface ScanResult {
  riskScore: number;
  riskLevel: "safe" | "low" | "medium" | "high";
  dataLeakDetected: boolean;
  sensitiveDataFound: boolean;
  encryptionStrength: string;
  dataHandlingPractices: string;
  connectionSpeed: string;
  threats: {
    title: string;
    description: string;
    severity: "low" | "medium" | "high";
    category: string;
    detected: string;
  }[];
  timestamp: string;
}

const Index = ({ currentUrl, currentSite }: IndexProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const { toast } = useToast();

  const handleScan = () => {
    setIsScanning(true);
    
    // Use Chrome extension API to communicate with background script
    if (chrome?.runtime) {
      chrome.runtime.sendMessage({ action: 'scanPage', url: currentUrl }, (response) => {
        if (response) {
          setScanResult(response);
          toast({
            title: "Scan Complete",
            description: `Risk Score: ${response.riskScore}`,
          });
        }
        setIsScanning(false);
      });
    } else {
      // Fallback for development environment
      setTimeout(() => {
        const mockResult: ScanResult = {
          riskScore: 45,
          riskLevel: "medium",
          dataLeakDetected: false,
          sensitiveDataFound: true,
          encryptionStrength: "moderate",
          dataHandlingPractices: "moderate",
          connectionSpeed: "650ms",
          threats: [
            {
              title: "Cookie Tracking",
              description: "This site uses extensive cookie tracking that may collect personal data",
              severity: "medium",
              category: "Privacy",
              detected: new Date().toLocaleString()
            }
          ],
          timestamp: new Date().toISOString()
        };
        setScanResult(mockResult);
        setIsScanning(false);
      }, 3000);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    toast({
      title: "URL Copied",
      description: "Site URL copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-cyber p-2 shadow-glow-cyber">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
                  AI Data Leak Detector
                </h1>
                <p className="text-xs text-muted-foreground">Real-time protection powered by AI</p>
              </div>
            </div>
            <Button onClick={handleScan} disabled={isScanning} className="bg-gradient-cyber hover:opacity-90">
              {isScanning ? "Scanning..." : "Scan Current Site"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-12">
          <div className="inline-block">
            <Shield className="h-20 w-20 text-primary mx-auto mb-4 animate-pulse-glow" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-cyber bg-clip-text text-transparent">
              Protect Your Digital Identity
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time AI-powered monitoring to detect data leaks, assess website risks, 
            and safeguard your personal information across the web.
          </p>
        </section>

        {/* Current Site Monitoring */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Current Site Status</h3>
            <Button
              variant="outline"
              onClick={() => setShowAnalysis(true)}
              className="border-primary/50 hover:bg-primary/10"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Detailed Analysis
            </Button>
          </div>

          {/* URL Display Card */}
          <Card className="p-4 border-2 border-primary/50 bg-primary/5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-cyber p-2 shadow-glow-cyber">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Current Site URL</p>
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono text-foreground truncate flex-1 bg-background/50 px-3 py-1.5 rounded border border-border">
                    {currentUrl}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCopyUrl}
                    className="shrink-0 hover:bg-primary/10"
                  >
                    {copied ? (
                      <CheckCheck className="h-4 w-4 text-success" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 border-2 border-border">
              <SecurityBadge 
                riskLevel={scanResult?.riskLevel || "medium"} 
                siteName={currentSite} 
                isScanning={isScanning} 
              />
              <div className="mt-6">
                <RiskMeter score={scanResult?.riskScore || 50} />
              </div>
            </Card>

            <Card className="p-6 border-2 border-border flex items-center justify-center">
              {isScanning ? (
                <ScanningAnimation isActive={isScanning} />
              ) : scanResult ? (
                <div className="w-full space-y-4">
                  <h3 className="text-lg font-semibold">Detected Issues</h3>
                  {scanResult.threats.length > 0 ? (
                    <div className="space-y-3">
                      {scanResult.threats.map((threat, index) => (
                        <ThreatCard
                          key={index}
                          title={threat.title}
                          description={threat.description}
                          severity={threat.severity}
                          category={threat.category}
                          detected={threat.detected}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground">No threats detected</p>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <Shield className="h-16 w-16 text-primary mx-auto opacity-50" />
                  <p className="text-muted-foreground">
                    Click "Scan Current Site" to analyze security threats
                  </p>
                </div>
              )}
            </Card>
          </div>
        </section>

        {/* Metrics Grid */}
        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Real-time Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {scanResult ? (
              <>
                <MetricCard
                  icon={Eye}
                  label="Data Leak"
                  value={scanResult.dataLeakDetected ? "Detected" : "Not Detected"}
                  variant={scanResult.dataLeakDetected ? "destructive" : "success"}
                  trend={scanResult.dataLeakDetected ? "down" : "up"}
                  trendValue={scanResult.dataLeakDetected ? "Risk detected" : "No leaks found"}
                />
                <MetricCard
                  icon={Database}
                  label="Sensitive Data"
                  value={scanResult.sensitiveDataFound ? "Found" : "Not Found"}
                  variant={scanResult.sensitiveDataFound ? "warning" : "success"}
                  trend={scanResult.sensitiveDataFound ? "down" : "up"}
                  trendValue={scanResult.sensitiveDataFound ? "Potential exposure" : "Data protected"}
                />
                <MetricCard
                  icon={Network}
                  label="Connection"
                  value={scanResult.connectionSpeed}
                  variant="default"
                  trend="neutral"
                  trendValue="Network latency"
                />
                <MetricCard
                  icon={Lock}
                  label="Encryption"
                  value={scanResult.encryptionStrength}
                  variant={scanResult.encryptionStrength === "strong" ? "success" : 
                           scanResult.encryptionStrength === "weak" ? "destructive" : "warning"}
                  trend={scanResult.encryptionStrength === "strong" ? "up" : 
                         scanResult.encryptionStrength === "weak" ? "down" : "neutral"}
                  trendValue={`${scanResult.encryptionStrength} protection`}
                />
              </>
            ) : (
              <>
                <MetricCard
                  icon={Activity}
                  label="Active Monitoring"
                  value="24/7"
                  variant="success"
                  trend="up"
                  trendValue="Always protected"
                />
                <MetricCard
                  icon={Database}
                  label="Data Breaches"
                  value="0"
                  variant="success"
                  trend="neutral"
                  trendValue="No breaches detected"
                />
                <MetricCard
                  icon={Network}
                  label="Network Speed"
                  value="847 ms"
                  variant="default"
                  trend="up"
                  trendValue="+12% faster"
                />
                <MetricCard
                  icon={Lock}
                  label="Encryption"
                  value="TLS 1.3"
                  variant="success"
                  trend="neutral"
                  trendValue="Strong encryption"
                />
              </>
            )}
          </div>
        </section>

        {/* Features */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold">Protection Features</h3>
          {scanResult && (
            <Card className="p-6 border-2 border-border mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Data Handling Practices</h3>
                <Button variant="outline" size="sm" onClick={() => setShowAnalysis(true)}>
                  View Detailed Analysis
                </Button>
              </div>
              <p className="text-muted-foreground">{scanResult.dataHandlingPractices}</p>
            </Card>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 border-2 border-primary/50 bg-primary/5 hover:scale-105 transition-transform duration-300">
              <div className="rounded-lg bg-gradient-cyber p-3 w-fit mb-4 shadow-glow-cyber">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Real-time Threat Detection</h4>
              <p className="text-sm text-muted-foreground">
                AI-powered algorithms continuously monitor websites for potential data leaks and security vulnerabilities.
              </p>
            </Card>

            <Card className="p-6 border-2 border-success/50 bg-success/5 hover:scale-105 transition-transform duration-300">
              <div className="rounded-lg bg-gradient-success p-3 w-fit mb-4 shadow-glow-success">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Predictive Risk Analysis</h4>
              <p className="text-sm text-muted-foreground">
                Machine learning models predict potential security risks before they become critical threats.
              </p>
            </Card>

            <Card className="p-6 border-2 border-warning/50 bg-warning/5 hover:scale-105 transition-transform duration-300">
              <div className="rounded-lg bg-gradient-warning p-3 w-fit mb-4 shadow-glow-warning">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Instant Alerts</h4>
              <p className="text-sm text-muted-foreground">
                Receive immediate notifications when suspicious activity or data leaks are detected on any website.
              </p>
            </Card>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold">Powered by Advanced Technology</h3>
          <Card className="p-8 border-2 border-border bg-gradient-to-br from-primary/5 to-transparent">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">AI/ML</div>
                <p className="text-sm text-muted-foreground">Machine Learning Models</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">NLP</div>
                <p className="text-sm text-muted-foreground">Natural Language Processing</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">Web Scraping</div>
                <p className="text-sm text-muted-foreground">Real-time Data Collection</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <p className="text-sm text-muted-foreground">Continuous Monitoring</p>
              </div>
            </div>
          </Card>
        </section>
      </main>

      {/* Detailed Analysis Modal */}
      <DetailedAnalysisModal
        open={showAnalysis}
        onOpenChange={setShowAnalysis}
        siteName={currentSite}
        riskScore={scanResult?.riskScore || 0}
        riskLevel={scanResult?.riskLevel || "medium"}
        threats={scanResult?.threats || []}
        timestamp={scanResult?.timestamp || new Date().toISOString()}
      />
    </div>
  );
};

export default Index;
