"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function FAQ({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="grid gap-4">
      {items.map((item, index) => (
        <div key={item.question} className="rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
          <button className="flex w-full items-center justify-between gap-4 p-5 text-left" type="button" onClick={() => setOpen(open === index ? -1 : index)}>
            <span className="font-bold text-[#1C1C1C]">{item.question}</span>
            <ChevronDown className={cn("shrink-0 text-slate-500 transition", open === index && "rotate-180")} size={20} />
          </button>
          <AnimatePresence initial={false}>
            {open === index ? (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                <p className="px-5 pb-5 text-sm leading-7 text-slate-600">{item.answer}</p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
