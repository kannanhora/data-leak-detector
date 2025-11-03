import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScanningAnimationProps {
  isActive: boolean;
}

export const ScanningAnimation = ({ isActive }: ScanningAnimationProps) => {
  if (!isActive) return null;

  return (
    <div className="relative flex items-center justify-center p-8">
      <div className="relative">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-pulse-glow" style={{ width: '120px', height: '120px' }} />
        
        {/* Middle ring */}
        <div className="absolute inset-0 rounded-full border-4 border-primary/50 animate-pulse-glow" style={{ width: '120px', height: '120px', animationDelay: '0.2s' }} />
        
        {/* Inner circle with icon */}
        <div className="relative flex items-center justify-center rounded-full bg-primary/20 shadow-glow-cyber" style={{ width: '120px', height: '120px' }}>
          <Shield className="h-12 w-12 text-primary animate-pulse-glow" />
        </div>
        
        {/* Scanning line */}
        <div className="absolute inset-0 overflow-hidden rounded-full" style={{ width: '120px', height: '120px' }}>
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
        </div>
      </div>
      
      <p className="absolute bottom-0 text-sm text-primary font-medium animate-pulse">
        Scanning for threats...
      </p>
    </div>
  );
};
