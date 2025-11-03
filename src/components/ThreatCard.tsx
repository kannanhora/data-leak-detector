import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThreatCardProps {
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  category: string;
  detected: string;
}

const severityConfig = {
  low: {
    icon: Info,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/50",
  },
  medium: {
    icon: AlertTriangle,
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/50",
  },
  high: {
    icon: AlertTriangle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/50",
  },
};

export const ThreatCard = ({ title, description, severity, category, detected }: ThreatCardProps) => {
  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <Card className={cn("p-4 border-2 transition-all duration-300 hover:shadow-lg", config.borderColor, config.bgColor)}>
      <div className="flex items-start gap-3">
        <div className={cn("rounded-lg p-2", config.bgColor)}>
          <Icon className={cn("h-5 w-5", config.color)} />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-foreground">{title}</h4>
            <Badge variant={severity === "high" ? "destructive" : "secondary"} className="capitalize">
              {severity}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{category}</span>
            <span className="text-muted-foreground">Detected: {detected}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
