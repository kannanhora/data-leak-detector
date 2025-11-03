import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => {
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [currentSite, setCurrentSite] = useState<string>("");

  useEffect(() => {
    // Get current tab URL when extension popup opens
    if (chrome?.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.url) {
          setCurrentUrl(tabs[0].url);
          try {
            const url = new URL(tabs[0].url);
            setCurrentSite(url.hostname);
          } catch (e) {
            setCurrentSite("unknown-site");
          }
        }
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div style={{ width: "800px", height: "800px", overflow: "auto" }}>
          <Index currentUrl={currentUrl} currentSite={currentSite} />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
