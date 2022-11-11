import { OfferEvent } from "../interfaces/event";
import { useEventStore } from "../store/event";

export const handleOffer = async (peer: RTCPeerConnection, stream: MediaStream, data: OfferEvent) => {
  const desc = new RTCSessionDescription(data.sdp);

  await peer.setRemoteDescription(desc);

  stream.getTracks().forEach((track) => peer.addTrack(track, stream));

  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);

  const socket = useEventStore.getState().socket;
  const payload = { from: socket!.id, to: data.from, sdp: peer.localDescription };
  socket?.emit("answer", payload);
};
