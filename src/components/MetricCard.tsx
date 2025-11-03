import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  variant?: "default" | "success" | "warning" | "danger";
}

const variantStyles = {
  default: "border-border",
  success: "border-success/50 bg-success/5",
  warning: "border-warning/50 bg-warning/5",
  danger: "border-destructive/50 bg-destructive/5",
};

export const MetricCard = ({
  icon: Icon,
  label,
  value,
  trend,
  trendValue,
  variant = "default",
}: MetricCardProps) => {
  return (
    <Card className={cn("p-4 border-2 transition-all duration-300 hover:scale-105", variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div className="space-y-1 flex-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
          {trend && trendValue && (
            <p
              className={cn(
                "text-xs font-medium",
                trend === "up" && "text-success",
                trend === "down" && "text-destructive",
                trend === "neutral" && "text-muted-foreground"
              )}
            >
              {trendValue}
            </p>
          )}
        </div>
        <div className="rounded-lg bg-primary/10 p-2">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </Card>
  );
};
