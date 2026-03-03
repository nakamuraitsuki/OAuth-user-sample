import type { Video } from "@/domain/video/video.model";
import { StatusView } from "../StatusView/StatusView";
import { MetaEditForm } from "../MetaEditForm/MetaEditForm";
import { ReUploadForm } from "../ReUploadForm/ReUploadForm";
import { useUpdateVideoMutation } from "../../hooks/useUpdateVideoMutation";
import { useReUploadMutation } from "../../hooks/useReUploadMutation";
import styles from "./VideoEditPanel.module.css";

type Props = { video: Video };

export const VideoEditPanel = ({ video }: Props) => {
  const updateMutation = useUpdateVideoMutation();
  const reUploadMutation = useReUploadMutation();

  const status = video.status ?? "initial";
  const visibility = video.visibility ?? "public";

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>ステータス</h3>
        <StatusView status={status} visibility={visibility} />
      </section>

      {status === "initial" && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>動画ファイルのアップロード</h3>
          <ReUploadForm
            onSubmit={(file) => reUploadMutation.mutate({ videoId: video.id, file })}
            isPending={reUploadMutation.isPending}
            progress={reUploadMutation.progress}
          />
          {reUploadMutation.isSuccess && (
            <p className={styles.successText}>アップロードが完了しました。</p>
          )}
        </section>
      )}

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>動画情報の編集</h3>
        <MetaEditForm
          defaultValues={{
            title: video.title,
            description: video.description,
            tags: video.tags,
            visibility,
          }}
          onSubmit={(values) => updateMutation.mutate({ videoId: video.id, ...values })}
          isPending={updateMutation.isPending}
        />
        {updateMutation.isSuccess && (
          <p className={styles.successText}>変更が保存されました。</p>
        )}
      </section>
    </div>
  );
};
