"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ImagePlus, X } from "lucide-react";
import { useState } from "react";

export function Gallery({ images }: { images: string[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
        <button
          type="button"
          onClick={() => setActive(images[0])}
          className="group relative h-[320px] overflow-hidden rounded-[2rem] text-left md:h-[520px]"
        >
          <img src={images[0]} alt="Vista principal do resort" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-[#0F3D2E] backdrop-blur-xl">
            Ver galeria
          </span>
        </button>
        <div className="hide-scrollbar flex gap-3 overflow-x-auto lg:grid lg:grid-cols-2 lg:overflow-visible">
          {images.slice(1).map((image, index) => (
            <button
              type="button"
              key={image}
              onClick={() => setActive(image)}
              className="group relative h-40 min-w-[72%] overflow-hidden rounded-[1.5rem] md:h-[253px] md:min-w-[42%] lg:min-w-0"
            >
              <img src={image} alt={`Galeria do resort ${index + 2}`} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              {index === 3 ? (
                <span className="absolute inset-0 flex items-center justify-center bg-[#0F3D2E]/40 text-sm font-bold text-white backdrop-blur-[2px]">
                  <ImagePlus className="mr-2" size={18} /> Mais fotos
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0F3D2E]/88 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-5 top-5 rounded-full bg-white/15 p-3 text-white backdrop-blur-xl transition hover:bg-white/25"
              aria-label="Fechar galeria"
            >
              <X size={24} />
            </button>
            <motion.img
              src={active}
              alt="Foto ampliada do destino"
              className="max-h-[86vh] w-full max-w-6xl rounded-[2rem] object-cover shadow-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
