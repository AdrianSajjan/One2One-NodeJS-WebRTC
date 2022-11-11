import { Socket } from "socket.io-client";

export interface EventStore {
  socket: Socket | null;
  initialize: (socket: Socket) => void;
}

export interface AnswerEvent {
  to: string;
  from: string;
  sdp: RTCSessionDescription;
}

export interface OfferEvent {
  to: string;
  from: string;
  sdp: RTCSessionDescription;
}

export interface IceCandidateEvent {
  to: string;
  from: string;
  candidate: RTCIceCandidate;
}

export interface ConnectEvent {}

export interface DisconnectEvent {}
