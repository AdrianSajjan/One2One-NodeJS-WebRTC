import create from "zustand";
import * as uuid from "uuid";
import { SessionStore } from "../interfaces/session";

export const useSessionStore = create<SessionStore>((set) => ({
  uuid: "",
  username: "",
  isSessionInitialized: false,
  initialize: (username) => set((state) => ({ ...state, username, uuid: uuid.v4(), isSessionInitialized: true })),
}));
