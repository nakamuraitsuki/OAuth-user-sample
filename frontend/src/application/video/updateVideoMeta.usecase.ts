import type { VideoId, Video, VideoTag, VideoVisibility } from "../../domain/video/video.model";
import type { IVideoRepository } from "../../domain/video/video.repository";
import type { AuthSession } from "../../domain/auth/auth.model";

export type UpdateVideoMetaResult =
  | { type: "success"; video: Video }
  | { type: "update_failed"; error: string }
  | { type: "unauthenticated" };

export type UpdateVideoMetaDeps = {
  session: AuthSession;
  videoRepo: IVideoRepository;
};

export type UpdateVideoMetaParams = {
  videoId: VideoId;
  title: string;
  description: string;
  tags: VideoTag[];
  visibility: VideoVisibility;
};

export interface IUpdateVideoMetaUseCase {
  execute(params: UpdateVideoMetaParams): Promise<UpdateVideoMetaResult>;
}

export const updateVideoMeta =
  ({ session, videoRepo }: UpdateVideoMetaDeps): IUpdateVideoMetaUseCase => ({
    execute: async ({ videoId, title, description, tags, visibility }) => {
      if (session.status !== "authenticated") {
        return { type: "unauthenticated" };
      }
      const res = await videoRepo.update(videoId, title, description, tags, visibility);
      if (!res.success) {
        return { type: "update_failed", error: res.error };
      }
      return { type: "success", video: res.data };
    },
  });
