"use client";
import { cn } from "@/lib/utils";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useState } from "react";
import { Github } from "lucide-react";

const Tab = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 h-full px-3 cursor-pointer text-muted-foreground border-r hover:bg-accent/30",
        isActive && "bg-background text-foreground",
      )}
    >
      <span className="text-sm">{label}</span>
    </div>
  );
};

const ProjectIdView = ({ projectId }: { projectId: Id<"projects"> }) => {
  const [activeView, setActiveview] = useState<"editor" | "preview">("preview");

  return (
    <div className="h-full flex-col flex">
      <nav className="h-8.75 flex items-center bg-sidebar border-b">
        <Tab
          label="Preview"
          isActive={activeView === "preview"}
          onClick={() => setActiveview("preview")}
        />
        <Tab
          label="Code"
          isActive={activeView === "editor"}
          onClick={() => setActiveview("editor")}
        />
        <div className="flex-1 flex justify-end h-full">
          <div className="flex items-center gap-1.5 h-full px-3 cursor-pointer text-muted-foreground border-l hover:bg-accent/30">
            <Github className="size-3.5" />
            <span className="text-sm">Export</span>
          </div>
        </div>
      </nav>
      <div className="flex-1 relative">
        <div
          className={cn(
            "absolute inset-0",
            activeView === "editor" ? "visible" : "invisible",
          )}
        >
          <div>editor</div>
        </div>

        <div
          className={cn(
            "absolute inset-0",
            activeView === "preview" ? "visible" : "invisible",
          )}
        >
          <div>preview</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectIdView;
