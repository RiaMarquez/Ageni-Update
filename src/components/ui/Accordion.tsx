"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type AccordionItemData = {
  question: string;
  answer: string;
};

function AccordionItem({ question, answer }: AccordionItemData) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-muted/10 bg-white transition-all hover:shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-sm font-medium text-dark">{question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-dark text-white"
        >
          <ChevronDown className="h-5 w-5" />
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
            <p className="px-6 pb-6 text-sm leading-relaxed text-muted">{answer}</p>
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
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <AccordionItem
          key={item.question}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  );
}
