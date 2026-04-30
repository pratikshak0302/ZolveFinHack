import { create } from "zustand";

export const useUserStore = create((set) => ({
  xp: 320,
  level: 3,

  addXP: (amount) =>
    set((state) => {
      const newXP = state.xp + amount;
      return {
        xp: newXP,
        level: Math.floor(newXP / 100),
      };
    }),
}));
