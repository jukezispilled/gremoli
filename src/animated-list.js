"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const AnimatedList = React.memo(({ className, children, delay = 2500 }) => {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  const childrenArray = React.Children.toArray(children);

  useEffect(() => {
    if (index < childrenArray.length) {
      const timeout = setTimeout(() => {
        setShow(false);
        setTimeout(() => {
          setIndex((prevIndex) => prevIndex + 1);
          setShow(true);
        }, 500); // Duration of exit animation
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [index, show, delay, childrenArray.length]);

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <AnimatePresence>
        {show && index < childrenArray.length && (
          <AnimatedListItem key={index}>
            {childrenArray[index]}
          </AnimatedListItem>
        )}
      </AnimatePresence>
    </div>
  );
});

AnimatedList.displayName = "AnimatedList";

export function AnimatedListItem({ children }) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  };

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  );
}