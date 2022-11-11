import { useEventStore } from "../store/event";

export const handleIceCandidate = (event: RTCPeerConnectionIceEvent, userID: string) => {
  if (!event.candidate) return;
  const socket = useEventStore.getState().socket;
  socket?.emit("ice-candidate", { candidate: event.candidate, to: userID, from: socket.id! });
};
