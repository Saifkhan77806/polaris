import React, { useState } from "react";
import { FileIcon, FolderIcon } from "@react-symbols/icons/utils";
import { cn } from "@/lib/utils";
import {
  useCreateFile,
  useCreateFolder,
  useDeleteFile,
  useFolderContent,
  useRenameFile,
} from "@/hooks/useFiles";
import { getItemPadding } from "./constant";
import Loadingrow from "./Loadingrow";
import { CreateInput } from "./CreateInput";
import { Doc, Id } from "../../../../convex/_generated/dataModel";

const Tree = ({
  item,
  projectId,
  level,
}: {
  item: Doc<"files">;
  level?: number;
  projectId: Id<"projects">;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [creating, setCreating] = useState<"file" | "folder" | null>(null);

  const renameFile = useRenameFile();
  const deleteFile = useDeleteFile();
  const createFile = useCreateFile();
  const createFolder = useCreateFolder();

  const folderContents = useFolderContent({
    projectId,
    parentId: item._id,
    enabled: item.type === "folder" && isOpen,
  });

  if (item.type === "file") {
    return <div>I am file</div>;
  }

  if (item.type === "folder") {
    return <div>I am folder</div>;
  }
};

export default Tree;
