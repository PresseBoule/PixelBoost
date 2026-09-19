import { useState } from 'react';
import { RouterProvider } from 'react-router';
import { AnimatePresence } from 'motion/react';
import { router } from './routes';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import PixelBoostAgent from './components/PixelBoostAgent';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      {!isLoading && <>
        <RouterProvider router={router} />
        <PixelBoostAgent />
      </>}
    </>
  );
}
