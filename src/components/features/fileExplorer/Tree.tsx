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
import { RenameInput } from "./RenameInput";
import { useEditor } from "@/hooks/use-editor";

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

  const { openFile, closeTab, activeTabId } = useEditor(projectId);

  const folderRender = useFolderContent({
    projectId,
    parentId: item._id,
    enabled: item.type === "folder" && isOpen,
  });

  const handleRename = (newName: string) => {
    setIsRenaming(false);
    if (newName === item.name) return;

    renameFile({ id: item._id, newName });
  };

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
    const isActive = activeTabId === item._id;

    if (isRenaming) {
      return (
        <RenameInput
          type="file"
          defaultValue={fileName}
          level={level ?? 0}
          onSubmit={handleRename}
          onCancel={() => setIsRenaming(false)}
        />
      );
    }

    return (
      <TreeItemWrapper
        item={item}
        level={level ?? 0}
        isActive={isActive}
        onClick={() => openFile(item._id, { pinned: false })}
        onDoubleClick={() => openFile(item._id, { pinned: true })}
        onRename={() => setIsRenaming(true)}
        onDelete={() => {
          closeTab(item._id);
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
            {folderRender === undefined && (
              <Loadingrow level={(level ?? 0) + 1} />
            )}
            <CreateInput
              type={creating}
              level={level ?? +1}
              onSubmit={handleCreate}
              onCancel={() => setCreating(null)}
            />

            {folderRender?.map((subItem) => (
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

  if (isRenaming) {
    return (
      <>
        <RenameInput
          type="folder"
          defaultValue={folderName}
          isOpen={isOpen}
          level={level ?? 0}
          onSubmit={handleRename}
          onCancel={() => setIsRenaming(false)}
        />
        {isOpen && (
          <>
            {folderRender === undefined && (
              <Loadingrow level={(level ?? 0) + 1} />
            )}
            {/* <CreateInput
              type={creating}
              level={level ?? +1}
              onSubmit={handleCreate}
              onCancel={() => setCreating(null)}
            /> */}

            {folderRender?.map((subItem) => (
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
          {folderRender === undefined && (
            <Loadingrow level={(level ?? 0) + 1} />
          )}
          {folderRender?.map((subItem) => (
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
