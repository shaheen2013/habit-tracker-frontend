// Animation variants
export const variants = {
  enter: (direction: "left" | "right") => ({
    x: direction === "right" ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: "left" | "right") => ({
    x: direction === "right" ? -1000 : 1000,
    opacity: 0,
  }),
};
