import { useEventStore } from "../store/event";

export const handleNegotationNeededEvent = async (peer: RTCPeerConnection, userID: string) => {
  const socket = useEventStore.getState().socket!;
  const offer = await peer.createOffer();
  await peer.setLocalDescription(offer);
  const payload = { to: userID, from: socket.id, sdp: peer.localDescription };
  socket?.emit("offer", payload);
};
