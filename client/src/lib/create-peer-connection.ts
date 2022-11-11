import { handleNegotationNeededEvent } from "./handle-negotations";
import { handleTrack } from "./handle-track";
import { handleIceCandidate } from "./handle-ice-candidate";

export const createPeerConnection = (remote: HTMLVideoElement, userID: string): RTCPeerConnection => {
  const peer = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.stunprotocol.org" }] });
  peer.addEventListener("negotiationneeded", () => handleNegotationNeededEvent(peer, userID));
  peer.addEventListener("icecandidate", (event) => handleIceCandidate(event, userID));
  peer.addEventListener("track", (event) => handleTrack(event, remote));
  return peer;
};
