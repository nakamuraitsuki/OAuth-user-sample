import type { Video } from "@/domain/video/video.model"
import { VideoThumbnailCanvas } from "@/features/video/thumbnail";
import styles from "./MyVideoCard.module.css";
import { VideoStatusChip } from "../../../ui/Chip/VideoStatusChip";
import { FiSettings } from "react-icons/fi";

type Props = {
  video: Video;
  onCardClick?: (video: Video) => void;
  onSettingsClick?: (video: Video) => void;
};

export const MyVideoCard = ({ video, onCardClick, onSettingsClick }: Props) => {
  return (
    <div
      className={styles.card}
    >
      <div className={styles.thumbnail}
        onClick={() => onCardClick?.(video)}
      >
        <VideoThumbnailCanvas
          videoId={video.id}
          title={video.title}
        />
      </div>
      <div className={styles.cardBody}
        onClick={() => onCardClick?.(video)}
      >
        {video.status ? (
          <VideoStatusChip status={video.status} isPublic={video.visibility === "public"} />
        ) : null}
        <div className={styles.meta}>
          <h3 className={styles.title}>{video.title}</h3>
          <span className={styles.description}>{video.description}</span>
        </div>
      </div>
      <div className={styles.settingsIconWrapper}>
        <div className={styles.settingsIconBackground}>
          <FiSettings
            size={24}
            onClick={() => onSettingsClick?.(video)}
          />
        </div>
      </div>
    </div>
  );
};