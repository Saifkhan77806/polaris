"use client";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Github, SparkleIcon } from "lucide-react";
import ProjectsList from "./ProjectsList";
import { useCreateProject } from "@/hooks/use-projects";
import ProjectsCommandDialog from "./ProjectsCommandDialog";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const ProjectsView = () => {
  const createProject = useCreateProject();

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === "k") {
          e.preventDefault();
          setCommandDialog(true);
        }
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  const [commandDialog, setCommandDialog] = useState(false);

  return (
    <>
      <ProjectsCommandDialog
        open={commandDialog}
        onOpenChange={setCommandDialog}
      />
      <div className="min-h-screen bg-sidebar flex flex-col items-center justify-center p6 md:p-16">
        <div className="w-full max-w-sm mx-auto flex flex-col gap-4 items-center">
          <div className="flex justify-between gap-4 w-full items-center">
            <div className="flex items-center gap-2 w-full group/logo">
              <img
                src="/logo.svg"
                className="size-[32px] md:size-[46px]"
                alt=""
              />
              <h1
                className={cn(
                  "text-4xl md:text-5xl font-semibold",
                  font.className,
                )}
              >
                Polaris
              </h1>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={"outline"}
                onClick={() => {
                  createProject({
                    name: "xyz",
                  });
                }}
                className="h-full items-start justify-start p-4 bg-background border flex flex-col gap-6 rounded-none"
              >
                <div className="flex items-center justify-between w-full ">
                  <SparkleIcon className="size-4" />
                  <kbd className="bg-accent border">ctrl+j</kbd>
                </div>

                <div>
                  <span className="text-sm">New</span>
                </div>
              </Button>

              <Button
                variant={"outline"}
                //   onClick={() => {}}
                className="h-full items-start justify-start p-4 bg-background border flex flex-col gap-6 rounded-none"
              >
                <div className="flex items-center justify-between w-full ">
                  <Github className="size-4" />
                  <kbd className="bg-accent border">ctrl+i</kbd>
                </div>

                <div>
                  <span className="text-sm">Import projects</span>
                </div>
              </Button>
            </div>
            <ProjectsList onViewAll={() => setCommandDialog(true)} />
          </div>
        </div>
      </div>
    </>
  );
};
