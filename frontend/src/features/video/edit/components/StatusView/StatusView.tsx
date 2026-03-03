import { VideoStatusChip } from "@/features/video/ui/Chip/VideoStatusChip";
import type { VideoStatus, VideoVisibility } from "@/domain/video/video.model";
import styles from "./StatusView.module.css";

type Props = {
  status: VideoStatus;
  visibility: VideoVisibility;
};

const STATUS_DESCRIPTION: Record<VideoStatus, string> = {
  initial: "動画のアップロードが完了していません。",
  uploaded: "動画がアップロードされました。処理を待っています。",
  queued: "処理キューに入っています。しばらくお待ちください。",
  processing: "動画を処理中です。しばらくお待ちください。",
  ready: "動画は再生可能な状態です。",
  failed: "処理に失敗しました。",
};

export const StatusView = ({ status, visibility }: Props) => {
  return (
    <div className={styles.container}>
      <VideoStatusChip status={status} isPublic={visibility === "public"} />
      <p className={styles.description}>{STATUS_DESCRIPTION[status]}</p>
    </div>
  );
};
