import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RiskMeter } from "./RiskMeter";
import { MetricCard } from "./MetricCard";
import { ThreatCard } from "./ThreatCard";
import { Activity, Database, Lock, Network, Shield, Zap } from "lucide-react";

interface DetailedAnalysisModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  siteName: string;
}

export const DetailedAnalysisModal = ({ open, onOpenChange, siteName }: DetailedAnalysisModalProps) => {
  // Demo data - in real app, this would come from API
  const threats = [
    {
      title: "Outdated SSL Certificate",
      description: "The SSL certificate is nearing expiration. This could lead to security warnings.",
      severity: "medium" as const,
      category: "Encryption",
      detected: "2 hours ago",
    },
    {
      title: "Suspicious Third-party Scripts",
      description: "Detected 3 unverified third-party scripts that could potentially track user data.",
      severity: "high" as const,
      category: "Privacy",
      detected: "1 hour ago",
    },
    {
      title: "No Content Security Policy",
      description: "Missing CSP headers increase vulnerability to XSS attacks.",
      severity: "medium" as const,
      category: "Security Headers",
      detected: "30 min ago",
    },
    {
      title: "Minor Cookie Tracking",
      description: "Some non-essential cookies detected. These cookies are used for analytics but pose minimal risk.",
      severity: "low" as const,
      category: "Privacy",
      detected: "5 min ago",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0 bg-card border-2 border-border">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Detailed Security Analysis
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">{siteName}</p>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-100px)]">
          <div className="p-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="threats">Threats</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-4">
                  <RiskMeter score={67} label="Overall Security Score" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <MetricCard
                    icon={Shield}
                    label="SSL Status"
                    value="Valid"
                    variant="success"
                    trend="neutral"
                    trendValue="Expires in 45 days"
                  />
                  <MetricCard
                    icon={Database}
                    label="Data Breaches"
                    value="0"
                    variant="success"
                    trend="neutral"
                    trendValue="No known breaches"
                  />
                  <MetricCard
                    icon={Network}
                    label="Connection Speed"
                    value="847 ms"
                    variant="default"
                    trend="up"
                    trendValue="+12% faster"
                  />
                  <MetricCard
                    icon={Lock}
                    label="Security Headers"
                    value="6/10"
                    variant="warning"
                    trend="neutral"
                    trendValue="Needs improvement"
                  />
                  <MetricCard
                    icon={Zap}
                    label="Page Load"
                    value="2.3s"
                    variant="success"
                    trend="up"
                    trendValue="Fast"
                  />
                  <MetricCard
                    icon={Activity}
                    label="Active Threats"
                    value="3"
                    variant="warning"
                    trend="down"
                    trendValue="Moderate risk"
                  />
                </div>

                <div className="rounded-lg border-2 border-primary/50 bg-primary/5 p-4">
                  <h3 className="font-semibold text-primary mb-2">AI Risk Assessment</h3>
                  <p className="text-sm text-muted-foreground">
                    Based on our AI analysis, this website has a <span className="text-warning font-medium">moderate risk level</span>. 
                    We detected several security concerns that should be addressed, particularly regarding third-party scripts 
                    and security headers. However, the site maintains valid SSL encryption and has no known data breach history.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="threats" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Detected Threats ({threats.length})</h3>
                  <div className="flex gap-2 text-xs">
                    <span className="text-destructive">● {threats.filter(t => t.severity === 'high').length} High</span>
                    <span className="text-warning">● {threats.filter(t => t.severity === 'medium').length} Medium</span>
                    <span className="text-primary">● {threats.filter(t => t.severity === 'low').length} Low</span>
                  </div>
                </div>
                {threats.map((threat, index) => (
                  <ThreatCard key={index} {...threat} />
                ))}
              </TabsContent>

              <TabsContent value="performance" className="space-y-4">
                <div className="space-y-4">
                  <RiskMeter score={82} label="Performance Score" />
                  <RiskMeter score={75} label="Network Security" />
                  <RiskMeter score={58} label="Privacy Protection" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="rounded-lg border-2 border-border p-4 space-y-2">
                    <h4 className="font-semibold text-success">Strengths</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Fast page load times</li>
                      <li>Valid SSL certificate</li>
                      <li>No known data breaches</li>
                      <li>HTTPS enabled</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border-2 border-border p-4 space-y-2">
                    <h4 className="font-semibold text-warning">Weaknesses</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Missing security headers</li>
                      <li>Unverified third-party scripts</li>
                      <li>No content security policy</li>
                      <li>Tracking cookies detected</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4">
                <div className="space-y-4">
                  <div className="rounded-lg border-2 border-success/50 bg-success/5 p-4 space-y-2">
                    <h4 className="font-semibold text-success flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Immediate Actions
                    </h4>
                    <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                      <li>Review and audit all third-party scripts for security compliance</li>
                      <li>Implement Content Security Policy (CSP) headers</li>
                      <li>Update security headers (X-Frame-Options, X-Content-Type-Options)</li>
                    </ol>
                  </div>

                  <div className="rounded-lg border-2 border-primary/50 bg-primary/5 p-4 space-y-2">
                    <h4 className="font-semibold text-primary flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Long-term Improvements
                    </h4>
                    <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                      <li>Set up SSL certificate auto-renewal</li>
                      <li>Implement regular security audits</li>
                      <li>Enable two-factor authentication for admin access</li>
                      <li>Deploy Web Application Firewall (WAF)</li>
                    </ol>
                  </div>

                  <div className="rounded-lg border-2 border-border p-4 space-y-2">
                    <h4 className="font-semibold text-foreground">Additional Resources</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• <a href="#" className="text-primary hover:underline">Security Best Practices Guide</a></li>
                      <li>• <a href="#" className="text-primary hover:underline">SSL Certificate Management</a></li>
                      <li>• <a href="#" className="text-primary hover:underline">Content Security Policy Tutorial</a></li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
