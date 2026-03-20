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
import TreeItemWrapper from "./TreeItemWrapper";
import { ChevronRightIcon } from "lucide-react";

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

  const handleCreate = (name: string) => {
    const type = creating; // capture first
    setCreating(null);

    if (type === "file") {
      createFile({
        projectId,
        name,
        content: "",
        parentId: item._id,
      });
    } else if (type === "folder") {
      createFolder({
        projectId,
        name,
        parentId: item._id,
      });
    }
  };

  const startCreating = (type: "file" | "folder") => {
    setIsOpen(true);
    setCreating(type);
  };

  if (item.type === "file") {
    const fileName = item.name;
    return (
      <TreeItemWrapper
        item={item}
        level={level ?? 0}
        isActive={false}
        onClick={() => {}}
        onDoubleClick={() => {}}
        onRename={() => setIsRenaming(true)}
        onDelete={() => {
          // TODO: Close tab
          deleteFile({ id: item._id });
        }}
      >
        <FileIcon fileName={fileName} autoAssign className="size-4" />
        <span className="truncate text-sm">{fileName}</span>
      </TreeItemWrapper>
    );
  }

  const folderName = item.name;

  const folderContent = (
    <>
      <div className="flex items-center gap-0.5">
        <ChevronRightIcon
          className={cn(
            "size-4 shrink-0 text-muted-foreground",
            isOpen && "rotate-90",
          )}
        />

        <FolderIcon folderName={folderName} className="size-4" />
      </div>
      <span className="truncate text-sm">{folderName}</span>
    </>
  );

  if (creating) {
    return (
      <>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center gap-1 h-5 hover:bg-accent/30 w-full"
        >
          {folderContent}
        </button>
        {isOpen && (
          <>
            {folderContents === undefined && (
              <Loadingrow level={(level ?? 0) + 1} />
            )}
            <CreateInput
              type={creating}
              level={level ?? +1}
              onSubmit={handleCreate}
              onCancel={() => setCreating(null)}
            />

            {folderContents?.map((subItem) => (
              <Tree
                key={subItem._id}
                item={subItem}
                level={(level ?? 0) + 1}
                projectId={projectId}
              />
            ))}
          </>
        )}
      </>
    );
  }

  return (
    <>
      <TreeItemWrapper
        item={item}
        level={level ?? 0}
        onClick={() => setIsOpen(!isOpen)}
        onRename={() => setIsRenaming(true)}
        onDelete={() => {
          // TODO: Close tab
          deleteFile({ id: item._id });
        }}
        onCreateFile={() => startCreating("file")}
        onCreateFolder={() => startCreating("folder")}
      >
        {folderContent}
      </TreeItemWrapper>
      {isOpen && (
        <>
          {folderContents === undefined && (
            <Loadingrow level={(level ?? 0) + 1} />
          )}
          {folderContents?.map((subItem) => (
            <Tree
              key={subItem._id}
              item={subItem}
              level={(level ?? 0) + 1}
              projectId={projectId}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Tree;
