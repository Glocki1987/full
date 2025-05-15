import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import SplashScreen from "@/components/SplashScreen";
import { useState, useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Small delay to ensure animations run smoothly
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 2500); // Match this with the SplashScreen duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <TooltipProvider>
      <SplashScreen />
      <div className={`transition-opacity duration-500 ${appReady ? 'opacity-100' : 'opacity-0'}`}>
        <Toaster />
        <Router />
      </div>
    </TooltipProvider>
  );
}

export default App;
