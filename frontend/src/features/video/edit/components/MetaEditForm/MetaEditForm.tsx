import { useForm, Controller } from "react-hook-form";
import type { VideoTag, VideoVisibility } from "@/domain/video/video.model";
import styles from "./MetaEditForm.module.css";

const ALL_TAGS: VideoTag[] = [
  "competition_programming",
  "web_development",
  "machine_learning",
  "game_development",
  "infrastructure",
  "other",
];

type FormValues = {
  title: string;
  description: string;
  tags: VideoTag[];
  visibility: VideoVisibility;
};

type Props = {
  defaultValues: FormValues;
  onSubmit: (values: FormValues) => void;
  isPending: boolean;
};

export const MetaEditForm = ({ defaultValues, onSubmit, isPending }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label htmlFor="title">タイトル</label>
        <input
          id="title"
          className={errors.title ? styles.inputError : styles.input}
          {...register("title", { required: "タイトルは必須です" })}
          disabled={isPending}
        />
        {errors.title && <p className={styles.errorText}>{errors.title.message}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="description">説明</label>
        <textarea
          id="description"
          className={styles.textarea}
          rows={4}
          {...register("description")}
          disabled={isPending}
        />
      </div>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>タグ</span>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <div className={styles.tagGrid}>
              {ALL_TAGS.map((tag) => {
                const selected = field.value.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    className={selected ? styles.tagButtonSelected : styles.tagButton}
                    onClick={() =>
                      field.onChange(
                        selected
                          ? field.value.filter((t) => t !== tag)
                          : [...field.value, tag],
                      )
                    }
                    disabled={isPending}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          )}
        />
      </div>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>公開設定</span>
        <div className={styles.visibilityRow}>
          <label className={styles.radioLabel}>
            <input type="radio" value="public" {...register("visibility")} disabled={isPending} />
            公開
          </label>
          <label className={styles.radioLabel}>
            <input type="radio" value="private" {...register("visibility")} disabled={isPending} />
            非公開
          </label>
        </div>
      </div>

      <button type="submit" className={styles.submitButton} disabled={isPending}>
        {isPending ? "保存中..." : "変更を保存"}
      </button>
    </form>
  );
};
