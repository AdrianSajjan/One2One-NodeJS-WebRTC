import * as React from "react";
import { Navigate, useParams } from "react-router-dom";
import { Paper, Grid } from "@mantine/core";

import { useSessionStore } from "../store";
import { MediaType } from "../interfaces/enum";
import { initializeStream } from "../lib/initialize-stream";
import { useEventStore } from "../store/event";
import { AnswerEvent, IceCandidateEvent, OfferEvent } from "../interfaces/event";
import { createPeerConnection } from "../lib/create-peer-connection";
import { handleOffer } from "../lib/handle-offer";
import { handleAnswer } from "../lib/handle-answer";
import { handleNewIceCandidate } from "../lib/handle-new-ice-candidate";

const RoomPage: React.FC = () => {
  const params = useParams();
  const event = useEventStore();
  const session = useSessionStore();

  // const mobile = useMediaQuery("(max-width: 600px)");

  const partner = React.useRef("");
  const localVideo = React.useRef<HTMLVideoElement>(null);
  const remoteVideo = React.useRef<HTMLVideoElement>(null);
  const userStream = React.useRef<MediaStream | null>(null);

  const peer = React.useRef<RTCPeerConnection | null>(null);

  React.useEffect(() => {
    initializeStream(MediaType.User, { video: true, audio: true }, localVideo.current!).then((stream) => {
      userStream.current = stream;

      event.socket?.emit("join-room", params.roomID);

      event.socket?.on("user-joined", (userID: string) => {
        peer.current = createPeerConnection(remoteVideo.current!, userID);
        userStream.current!.getTracks().forEach((track) => peer.current?.addTrack(track, userStream.current!));
        partner.current = userID;
      });

      event.socket?.on("partner-data", (userID: string) => {
        partner.current = userID;
      });

      event.socket?.on("offer", (data: OfferEvent) => {
        peer.current = createPeerConnection(remoteVideo.current!, partner.current);
        handleOffer(peer.current!, userStream.current!, data);
      });

      event.socket?.on("answer", (data: AnswerEvent) => {
        handleAnswer(peer.current!, data);
      });

      event.socket?.on("ice-candidate", (data: IceCandidateEvent) => {
        handleNewIceCandidate(peer.current!, data);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!session.isSessionInitialized) return <Navigate to="/" />;

  return (
    <Paper>
      <Grid gutter={0}>
        <Grid.Col>
          <Grid>
            <Grid.Col span={6} bg="black">
              <video muted id="local" height="100%" width="100%" autoPlay ref={localVideo}></video>
            </Grid.Col>
            <Grid.Col span={6} bg="black">
              <video id="remote" height="100%" width="100%" autoPlay ref={remoteVideo}></video>
            </Grid.Col>
            <Grid.Col span={6}>User Information</Grid.Col>
            <Grid.Col span={6}>Chat</Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default RoomPage;
