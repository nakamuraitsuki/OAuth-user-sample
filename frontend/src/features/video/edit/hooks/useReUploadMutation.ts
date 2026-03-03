import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServices } from "@/context/ServiceContext";
import { uploadVideoSource } from "@/application/video/uploadVideoSource.usecase";
import type { VideoId } from "@/domain/video/video.model";

export const useReUploadMutation = () => {
  const { videoRepo } = useServices();
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState(0);

  const mutation = useMutation({
    mutationFn: async ({ videoId, file }: { videoId: VideoId; file: File }) => {
      setProgress(0);
      const usecase = uploadVideoSource({ videoRepo });
      const res = await usecase.execute({ videoId, file, onProgress: (p) => setProgress(p) });
      if (res.type !== "success") {
        throw new Error(res.type);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myVideos"] });
    },
  });

  return { ...mutation, progress };
};
