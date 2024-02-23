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
          placeholderSrc="data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUADADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAECBAP/xAAdEAEBAAEEAwAAAAAAAAAAAAAAARECAxITFCFR/8QAGQEAAwADAAAAAAAAAAAAAAAAAAEDAgQF/8QAGBEBAQEBAQAAAAAAAAAAAAAAAAETERL/2gAMAwEAAhEDEQA/ANeC4ldyI1b2EtIzzrrIqYZLvl5FGkGdbfQzGPvo76WsPxXLlfqbaA5va2iVJADgPELACsD/2Q=="
          style={{ width: "100%", height: "100%" }}
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
