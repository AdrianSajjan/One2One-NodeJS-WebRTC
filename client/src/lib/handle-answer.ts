import { AnswerEvent } from "../interfaces/event";

export const handleAnswer = async (peer: RTCPeerConnection, data: AnswerEvent) => {
  const desc = new RTCSessionDescription(data.sdp);
  await peer.setRemoteDescription(desc);
};
