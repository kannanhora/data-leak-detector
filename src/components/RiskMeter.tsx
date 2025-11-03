import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface RiskMeterProps {
  score: number; // 0-100
  label?: string;
}

export const RiskMeter = ({ score, label = "Security Score" }: RiskMeterProps) => {
  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-primary";
    if (score >= 40) return "text-warning";
    return "text-destructive";
  };

  const getRiskLevel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Poor";
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <div className="flex items-baseline gap-1">
          <span className={cn("text-2xl font-bold", getRiskColor(score))}>{score}</span>
          <span className="text-sm text-muted-foreground">/100</span>
        </div>
      </div>
      <Progress value={score} className="h-3" />
      <p className={cn("text-xs font-medium text-right", getRiskColor(score))}>
        {getRiskLevel(score)}
      </p>
    </div>
  );
};
