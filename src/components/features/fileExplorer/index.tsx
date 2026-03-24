import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  ChevronRightIcon,
  CopyMinusIcon,
  FilePlusCorner,
  FolderPlusIcon,
} from "lucide-react";
import { useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { userProject } from "@/hooks/use-projects";
import { Button } from "@/components/ui/button";
import {
  useCreateFile,
  useCreateFolder,
  useFolderContent,
} from "@/hooks/useFiles";
import { CreateInput } from "./CreateInput";
import Loadingrow from "./Loadingrow";
import Tree from "./Tree";

export const FileExplorer = ({ projectId }: { projectId: Id<"projects"> }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [collaspeKey, setCollaspeKey] = useState(0);
  const [creating, setCreating] = useState<"file" | "folder" | null>(null);

  const rootFiles = useFolderContent({
    projectId,
    enabled: isOpen,
  });
  const project = userProject(projectId);
  const createFile = useCreateFile();
  const createFolder = useCreateFolder();

  const handleCreate = (name: string) => {
    setCreating(null);
    if (creating === "file") {
      createFile({
        projectId,
        name,
        content: "",
        parentId: undefined,
      });
    } else {
      createFolder({
        projectId,
        name,
        parentId: undefined,
      });
    }
  };

  return (
    <div className="h-full bg-sidebar">
      <ScrollArea>
        <div
          role="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group/project cursor-pointer w-full text-left flex items-center gap-0.5 h-5 bg-accent font-bold"
        >
          <ChevronRightIcon
            className={cn(
              "size-4 shrink-0 text-muted-foreground",
              isOpen && "rotate-90",
            )}
          />

          <p className="text-xs uppercase line-clamp-1">
            {project?.name ?? "Loading..."}
          </p>

          <div className="opacity-0 group-hover/project:opacity-100 transform-none duration-0 flex items-center gap-0.5 ml-auto">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsOpen(true);
                setCreating("file");
              }}
              variant="highlight"
              size="icon-xs"
              className="mr-1"
            >
              <FilePlusCorner className="size-3.5" />
            </Button>

            <Button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsOpen(true);
                setCreating("folder");
              }}
              variant="highlight"
              size="icon-xs"
              className="mr-1"
            >
              <FolderPlusIcon className="size-3.5" />
            </Button>

            <Button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setCollaspeKey((value) => value + 1);
              }}
              variant="highlight"
              size="icon-xs"
              className="mr-1"
            >
              <CopyMinusIcon className="size-3.5" />
            </Button>
          </div>
        </div>

        {isOpen && (
          <>
            {rootFiles === undefined && <Loadingrow level={0} />}
            {creating && (
              <CreateInput
                type={creating}
                level={0}
                onSubmit={handleCreate}
                onCancel={() => setCreating(null)}
              />
            )}
            {rootFiles?.map((item) => (
              <Tree
                key={`${item._id}-${collaspeKey}`}
                item={item}
                level={0}
                projectId={projectId}
              />
            ))}
          </>
        )}
      </ScrollArea>
    </div>
  );
};
