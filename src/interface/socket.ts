export interface SocketOfferData {
  sdp: RTCSessionDescription;
  to: string;
  from: string;
}

export interface SocketIceCandidateData {
  candidate: RTCIceCandidate;
  to: string;
  from: string;
}

export interface SocketAnswerData {
  sdp: RTCSessionDescription;
  to: string;
  from: string;
}
