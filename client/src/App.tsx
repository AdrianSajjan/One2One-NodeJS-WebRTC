import * as React from "react";
import { io } from "socket.io-client";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import RoomPage from "./pages/Room";
import { useEventStore } from "./store/event";

const App: React.FC = () => {
  const event = useEventStore();

  React.useEffect(() => {
    const socket = io("http://localhost:5000");
    event.initialize(socket);
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/room/:roomID" element={<RoomPage />} />
    </Routes>
  );
};

export default App;
