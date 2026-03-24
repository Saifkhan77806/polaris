import { useMutation, useQuery } from "convex/react";
import { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";

export const useFile = (fileId: Id<"files"> | null) => {
  return useQuery(api.files.getFile, fileId ? { id: fileId } : "skip");
};

export const useFilePath = (fileId: Id<"files"> | null) => {
  return useQuery(api.files.getFilePath, fileId ? { id: fileId } : "skip");
};

export const useCreateFile = () => {
  return useMutation(api.files.createFile);
  // TODO: Add optimsitic mutation
};

export const useCreateFolder = () => {
  return useMutation(api.files.createFolder);
  // TODO: Add optimsitic mutation
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
  // TODO: Add optimsitic mutation
};

export const useRenameFile = () => {
  return useMutation(api.files.renameFile);
  // TODO: Add optimsitic mutation
};

export const useUpdatedFile = () => {
  return useMutation(api.files.updatedFile);
};
