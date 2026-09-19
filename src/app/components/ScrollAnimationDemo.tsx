import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function ScrollAnimationDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress pour tout le container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transformations basées sur le scroll
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 2, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.3, 0.3, 1]);

  return (
    <div ref={containerRef} className="relative">
      {/* Section Hero */}
      <section className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 sticky top-0">
        <div className="text-center text-white z-10">
          <h1 className="mb-4">Animations au Scroll</h1>
          <p className="text-xl opacity-80">Faites défiler pour voir la magie ✨</p>
        </div>
      </section>

      {/* Section 1: Rotation simple */}
      <section className="min-h-screen flex items-center justify-center bg-slate-950 relative">
        <div className="text-center">
          <h2 className="text-white mb-12">Rotation Simple (360°)</h2>
          <motion.div
            style={{ rotate }}
            className="w-64 h-64 mx-auto bg-gradient-to-br from-cyan-400 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl"
          >
            <div className="text-white text-6xl">🎯</div>
          </motion.div>
          <p className="text-white/60 mt-8">L'élément tourne quand vous scrollez</p>
        </div>
      </section>

      {/* Section 2: Rotation 3D */}
      <section className="min-h-screen flex items-center justify-center bg-slate-900 relative">
        <div className="text-center">
          <h2 className="text-white mb-12">Rotation 3D (rotateX)</h2>
          <div className="perspective-1000">
            <motion.div
              style={{ rotateX }}
              className="w-64 h-64 mx-auto bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl flex items-center justify-center shadow-2xl"
            >
              <div className="text-white text-6xl">🚀</div>
            </motion.div>
          </div>
          <p className="text-white/60 mt-8">Rotation 3D sur l'axe X (2 tours complets)</p>
        </div>
      </section>

      {/* Section 3: Scale + Rotation */}
      <section className="min-h-screen flex items-center justify-center bg-slate-800 relative">
        <div className="text-center">
          <h2 className="text-white mb-12">Scale + Rotation Combinés</h2>
          <motion.div
            style={{ 
              rotate,
              scale
            }}
            className="w-64 h-64 mx-auto bg-gradient-to-br from-amber-400 to-orange-600 rounded-full flex items-center justify-center shadow-2xl"
          >
            <div className="text-white text-6xl">⭐</div>
          </motion.div>
          <p className="text-white/60 mt-8">Grandit puis rétrécit en tournant</p>
        </div>
      </section>

      {/* Section 4: Cube 3D complet */}
      <section className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
        <div className="text-center">
          <h2 className="text-white mb-12">Cube 3D Complet</h2>
          <Cube3D scrollProgress={scrollYProgress} />
          <p className="text-white/60 mt-8">Un vrai cube 3D qui tourne au scroll</p>
        </div>
      </section>

      {/* Section 5: Parallax complexe */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 to-teal-900 relative">
        <div className="text-center max-w-2xl">
          <h2 className="text-white mb-12">Effet Parallax Multiple</h2>
          <div className="relative h-96">
            <ParallaxLayers scrollProgress={scrollYProgress} />
          </div>
          <p className="text-white/60 mt-8">Plusieurs couches qui bougent à des vitesses différentes</p>
        </div>
      </section>

      {/* Section finale */}
      <section className="h-screen flex items-center justify-center bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900">
        <motion.div 
          style={{ opacity }}
          className="text-center text-white"
        >
          <h2 className="mb-4">Fin de la démo ! 🎉</h2>
          <p className="text-xl opacity-80">Remontez pour voir tout en sens inverse</p>
        </motion.div>
      </section>
    </div>
  );
}

// Composant Cube 3D
function Cube3D({ scrollProgress }: { scrollProgress: any }) {
  const rotateY = useTransform(scrollProgress, [0, 1], [0, 720]);
  const rotateX = useTransform(scrollProgress, [0, 1], [0, 360]);

  return (
    <div className="perspective-[1000px] w-64 h-64 mx-auto">
      <motion.div
        style={{ rotateY, rotateX }}
        className="relative w-full h-full preserve-3d"
      >
        {/* Face avant */}
        <div className="absolute w-full h-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white text-4xl border-2 border-white/20 backface-hidden translate-z-32">
          🎨
        </div>
        {/* Face arrière */}
        <div className="absolute w-full h-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-4xl border-2 border-white/20 backface-hidden rotate-y-180 translate-z-32">
          🎭
        </div>
        {/* Face droite */}
        <div className="absolute w-full h-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-4xl border-2 border-white/20 backface-hidden rotate-y-90 translate-z-32">
          🎪
        </div>
        {/* Face gauche */}
        <div className="absolute w-full h-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white text-4xl border-2 border-white/20 backface-hidden rotate-y--90 translate-z-32">
          🎬
        </div>
        {/* Face haut */}
        <div className="absolute w-full h-full bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center text-white text-4xl border-2 border-white/20 backface-hidden rotate-x-90 translate-z-32">
          🎯
        </div>
        {/* Face bas */}
        <div className="absolute w-full h-full bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center text-white text-4xl border-2 border-white/20 backface-hidden rotate-x--90 translate-z-32">
          🎲
        </div>
      </motion.div>
    </div>
  );
}

// Composant Parallax avec plusieurs couches
function ParallaxLayers({ scrollProgress }: { scrollProgress: any }) {
  const y1 = useTransform(scrollProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollProgress, [0, 1], [0, -50]);
  const rotate1 = useTransform(scrollProgress, [0, 1], [0, 180]);
  const rotate2 = useTransform(scrollProgress, [0, 1], [0, -180]);

  return (
    <>
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-60"
      />
      <motion.div
        style={{ y: y2, rotate: rotate2 }}
        className="absolute top-20 right-10 w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl opacity-70"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl opacity-50"
      />
    </>
  );
}
