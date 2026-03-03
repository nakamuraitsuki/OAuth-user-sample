import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServices } from "@/context/ServiceContext";
import { useAuth } from "@/context/AuthContext";
import { updateVideoMeta } from "@/application/video/updateVideoMeta.usecase";
import type { VideoId, VideoTag, VideoVisibility } from "@/domain/video/video.model";

type UpdateParams = {
  videoId: VideoId;
  title: string;
  description: string;
  tags: VideoTag[];
  visibility: VideoVisibility;
};

export const useUpdateVideoMutation = () => {
  const { videoRepo } = useServices();
  const { session } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: UpdateParams) => {
      const usecase = updateVideoMeta({ session, videoRepo });
      const res = await usecase.execute(params);
      if (res.type !== "success") {
        throw new Error(res.type);
      }
      return res.video;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myVideos"] });
    },
  });
};
