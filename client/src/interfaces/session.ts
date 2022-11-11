export interface SessionStore {
  uuid: string;
  username: string;
  isSessionInitialized: boolean;
  initialize: (username: string) => void;
}
