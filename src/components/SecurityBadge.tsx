import { Shield, ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type RiskLevel = "safe" | "low" | "medium" | "high" | "critical";

interface SecurityBadgeProps {
  riskLevel: RiskLevel;
  siteName: string;
  isScanning?: boolean;
}

const riskConfig = {
  safe: {
    icon: ShieldCheck,
    label: "Safe",
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/50",
    glowClass: "shadow-glow-success",
  },
  low: {
    icon: Shield,
    label: "Low Risk",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/50",
    glowClass: "shadow-glow-cyber",
  },
  medium: {
    icon: AlertTriangle,
    label: "Medium Risk",
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/50",
    glowClass: "shadow-glow-warning",
  },
  high: {
    icon: ShieldAlert,
    label: "High Risk",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/50",
    glowClass: "shadow-glow-warning",
  },
  critical: {
    icon: ShieldAlert,
    label: "Critical",
    color: "text-destructive",
    bgColor: "bg-destructive/20",
    borderColor: "border-destructive",
    glowClass: "shadow-glow-warning",
  },
};

export const SecurityBadge = ({ riskLevel, siteName, isScanning }: SecurityBadgeProps) => {
  const config = riskConfig[riskLevel];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "relative flex items-center gap-3 rounded-xl border-2 p-4 transition-all duration-300",
        config.bgColor,
        config.borderColor,
        config.glowClass,
        isScanning && "animate-pulse-glow"
      )}
    >
      <div className={cn("relative", isScanning && "animate-pulse-glow")}>
        <Icon className={cn("h-8 w-8", config.color)} />
        {isScanning && (
          <div className={cn("absolute inset-0 rounded-full blur-md", config.color, "opacity-50")} />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className={cn("font-semibold", config.color)}>{config.label}</h3>
          {isScanning && (
            <span className="text-xs text-muted-foreground animate-pulse">Scanning...</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground truncate">{siteName}</p>
      </div>
    </div>
  );
};
