/* eslint-disable react-hooks/purity */

"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
// import crypto from "crypto";

export const userProjectsPartial = (limit: number) => {
  return useQuery(api.projects.getPartial, {
    limit,
  });
};

export const userProject = (projectId: Id<"projects">) => {
  return useQuery(api.projects.getById, { id: projectId });
};

export const userProjects = () => {
  return useQuery(api.projects.get);
};

export const useCreateProject = () => {
  return useMutation(api.projects.create).withOptimisticUpdate(
    (localStore, args) => {
      const existingProjects = localStore.getQuery(api.projects.get);

      if (!existingProjects) return;

      const now = Date.now();

      const newProject = {
        _id: crypto.randomUUID() as Id<"projects">,
        _creationTime: now,
        name: args.name,
        ownerId: "anonymous",
        updatedAt: now,
      };

      localStore.setQuery(api.projects.get, {}, [
        newProject,
        ...existingProjects,
      ]);
    },
  );
};

export const useRenameProject = (projectId: Id<"projects">) => {
  return useMutation(api.projects.rename).withOptimisticUpdate(
    (localStore, args) => {
      const existingProjects = localStore.getQuery(api.projects.getById, {
        id: projectId,
      });

      if (existingProjects !== undefined && existingProjects !== null) {
        localStore.setQuery(
          api.projects.getById,
          { id: projectId },
          {
            ...existingProjects,
            name: args.name,
            updatedAt: Date.now(),
          },
        );
      }

      const existingProjectes = localStore.getQuery(api.projects.get);

      if (existingProjectes !== undefined) {
        localStore.setQuery(
          api.projects.get,
          {},
          existingProjectes.map((project) => {
            return project._id === args.id
              ? { ...project, name: args.name, updatedAt: Date.now() }
              : project;
          }),
        );
      }
    },
  );
};
