"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

type AccordionItemData = {
  question: string;
  answer: string;
};

function AccordionItem({ question, answer, index }: AccordionItemData & { index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`group border-b border-dark/[0.06] transition-colors ${
        open ? "bg-white" : "hover:bg-white/60"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center gap-6 px-6 py-6 text-left md:px-8"
      >
        <span className={`shrink-0 text-xs font-semibold tabular-nums transition-colors ${
          open ? "text-primary" : "text-dark/20"
        }`}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className={`flex-1 text-[15px] font-medium transition-colors ${
          open ? "text-dark" : "text-dark/70"
        }`}>
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
            open ? "bg-primary text-white" : "bg-dark/[0.04] text-dark/30 group-hover:bg-dark/[0.08]"
          }`}
        >
          <Plus className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 pl-[4.25rem] text-sm leading-relaxed text-muted md:pl-[4.75rem]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type AccordionProps = {
  items: AccordionItemData[];
};

export default function Accordion({ items }: AccordionProps) {
  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-dark/[0.06]">
      {items.map((item, i) => (
        <AccordionItem key={item.question} question={item.question} answer={item.answer} index={i} />
      ))}
    </div>
  );
}
