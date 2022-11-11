import { IceCandidateEvent } from "../interfaces/event";

export const handleNewIceCandidate = async (peer: RTCPeerConnection, data: IceCandidateEvent) => {
  try {
    const candidate = new RTCIceCandidate(data.candidate);
    await peer.addIceCandidate(candidate);
  } catch (error) {
    console.log(error);
  }
};
