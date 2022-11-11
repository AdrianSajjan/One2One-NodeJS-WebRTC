export interface Host {
  uuid: string;
  username: string;
  socketID: string;
  sdp?: RTCSessionDescription;
}
