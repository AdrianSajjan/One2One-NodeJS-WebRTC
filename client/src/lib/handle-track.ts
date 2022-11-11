export const handleTrack = (event: RTCTrackEvent, video: HTMLVideoElement | null) => {
  if (!video) return;
  video.srcObject = event.streams[0];
};
