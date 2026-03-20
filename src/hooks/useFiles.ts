import { useMutation, useQuery } from "convex/react";
import { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";

export const useCreateFile = () => {
  return useMutation(api.files.createFile);
};

export const useCreateFolder = () => {
  return useMutation(api.files.createFolder);
};

export const useFolderContent = ({
  enabled,
  parentId,
  projectId,
}: {
  projectId: Id<"projects">;
  parentId?: Id<"files">;
  enabled?: boolean;
}) => {
  // console.log(
  //   "rootfiles",
  //   useQuery(
  //     api.files.getFolderContent,
  //     enabled ? { projectId, parentId } : "skip",
  //   ),
  //   "project id",
  //   projectId,
  //   "parentId",
  //   parentId,
  // );

  return useQuery(
    api.files.getFolderContent,
    enabled ? { projectId, parentId } : "skip",
  );
};

export const useDeleteFile = () => {
  return useMutation(api.files.deleteFile);
};

export const useRenameFile = () => {
  return useMutation(api.files.renameFile);
};
