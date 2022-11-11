import create from "zustand";
import { EventStore } from "../interfaces/event";

export const useEventStore = create<EventStore>((set) => ({
  socket: null,
  initialize: (socket) => set((state) => ({ ...state, socket })),
}));
