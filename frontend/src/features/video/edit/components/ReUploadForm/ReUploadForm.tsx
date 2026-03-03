import { useForm } from "react-hook-form";
import styles from "./ReUploadForm.module.css";

type FormValues = { videoFile: FileList };

type Props = {
  onSubmit: (file: File) => void;
  isPending: boolean;
  progress: number;
};

export const ReUploadForm = ({ onSubmit, isPending, progress }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: "onChange" });

  return (
    <form className={styles.form} onSubmit={handleSubmit(({ videoFile }) => onSubmit(videoFile[0]))}>
      <div className={styles.field}>
        <label htmlFor="videoFile">動画ファイル</label>
        <input
          id="videoFile"
          type="file"
          accept="video/*"
          className={styles.input}
          {...register("videoFile", { required: "ファイルを選択してください" })}
          disabled={isPending}
        />
        {errors.videoFile && <p className={styles.errorText}>{errors.videoFile.message}</p>}
      </div>

      {isPending && (
        <div className={styles.progressSection}>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }} />
          </div>
          <p className={styles.progressLabel}>
            {progress < 100 ? `アップロード中... ${progress}%` : "処理中..."}
          </p>
        </div>
      )}

      <button type="submit" disabled={!isValid || isPending}>
        {isPending ? "アップロード中..." : "アップロード"}
      </button>
    </form>
  );
};
