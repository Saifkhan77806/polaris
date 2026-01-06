"use client";

import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import React from "react";
import { api } from "../../convex/_generated/api";

const page = () => {
  const projects = useQuery(api.projects.get);

  const createProject = useMutation(api.projects.create);

  return (
    <div>
      <Button
        onClick={() =>
          createProject({
            name: "New Project",
          })
        }
      >
        Cursor IDE
      </Button>

      {projects?.map((item, index) => (
        <div key={index}>
          {item.name} OwnerId:- {item.ownerId}
        </div>
      ))}
    </div>
  );
};

export default page;
