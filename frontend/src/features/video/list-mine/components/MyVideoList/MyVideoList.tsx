import type { Video } from "@/domain/video/video.model";
import { useMyVideosQuery } from "../../hooks/useMyVideosQuery";
import styles from "./MyVideoList.module.css";
import { MyVideoCard } from "../MyVideoCard/MyVideoCard";
import { Spinner } from "@/ui/Spinner/Spinner";

type Props = {
  limit?: number;
  onCardSelect?: (video: Video) => void;
  onSettingsClick?: (video: Video) => void;
}

export const MyVideoList = ({ limit = 20, onCardSelect, onSettingsClick }: Props) => {
  const { data, isLoading, error } = useMyVideosQuery(limit);

  if (error) return <p>{error.message}</p>

  return (
    <div className={styles.grid}>
      <Spinner isLoading={isLoading} />
      {data?.videos.map((video: Video) => (
        <MyVideoCard
          key={video.id}
          video={video}
          onCardClick={onCardSelect}
          onSettingsClick={onSettingsClick}
        />
      ))}
    </div>
  );
};