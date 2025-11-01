import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { PixelBoostSite } from './components/PixelBoostSite';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import { SEOHead } from './components/SEOHead';
import { ResponsiveOptimizations } from './components/ResponsiveOptimizations';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <SEOHead />
      <ResponsiveOptimizations />
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      {!isLoading && <PixelBoostSite />}
    </>
  );
}
