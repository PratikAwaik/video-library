"use client";

import {
  MediaControlBar,
  MediaController,
  MediaFullscreenButton,
  MediaLoadingIndicator,
  MediaMuteButton,
  MediaPlayButton,
  MediaPosterImage,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
} from "media-chrome/react";

type VideoPlayerProps = {
  cloudinaryUrl?: string;
  thumbnailUrl?: string;
};

export function VideoPlayer({ cloudinaryUrl, thumbnailUrl }: VideoPlayerProps) {
  return (
    <div className="flex w-full flex-wrap items-center justify-center rounded-md border-b border-t">
      <MediaController style={{ width: "100%", height: "100%" }}>
        <video
          slot="media"
          src={cloudinaryUrl}
          preload="auto"
          muted
          crossOrigin=""
        />
        <MediaPosterImage
          slot="poster"
          src={thumbnailUrl}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        ></MediaPosterImage>
        <MediaLoadingIndicator
          noautohide
          slot="centered-chrome"
          style={{ "--media-loading-indicator-icon-height": "200px" }}
        ></MediaLoadingIndicator>
        <MediaControlBar>
          <MediaPlayButton></MediaPlayButton>
          <MediaSeekBackwardButton></MediaSeekBackwardButton>
          <MediaSeekForwardButton></MediaSeekForwardButton>
          <MediaTimeRange></MediaTimeRange>
          <MediaTimeDisplay showDuration></MediaTimeDisplay>
          <MediaMuteButton></MediaMuteButton>
          <MediaVolumeRange></MediaVolumeRange>
          <MediaFullscreenButton></MediaFullscreenButton>
        </MediaControlBar>
      </MediaController>
    </div>
  );
}
