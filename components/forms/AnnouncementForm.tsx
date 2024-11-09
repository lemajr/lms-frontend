"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod validation schema for announcement form
const announcementSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title is too long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description is too long"),
  date: z.string().min(10, "Please provide a valid date"),
});

type AnnouncementFormData = z.infer<typeof announcementSchema>;

const AnnouncementForm = ({ type, data}: { type: "create" | "update"; data?: any;}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementSchema),
    defaultValues: data || {
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0], // Current date as default
    }
  });

  const onSubmit = async (formData: AnnouncementFormData) => {
    if (type === "create") {
      // Handle creating announcement
      console.log("Create announcement:", formData);
    } else if (type === "update") {
      // Handle updating announcement
      console.log("Update announcement:", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      <h1 className="text-xl font-semibold">Create a new Announcement </h1>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          {...register("description")}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          id="date"
          type="date"
          {...register("date")}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
      </div>

      <div className="flex justify-end">
      
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          {type === "create" ? "Create Announcement" : "Update Announcement"}
        </button>
      </div>
    </form>
  );
};

export default AnnouncementForm;
