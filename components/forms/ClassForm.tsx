"use client";

import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type FormData = {
  id?: string;
  name: string;
  capacity: number;
  supervisorId: string;
  gradeId: number;
};

const ClassForm = ({
  type,
  data,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  relatedData?: any;
  lecturer?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: data,
  });

  const router = useRouter();
  const { lecturers, grades } = relatedData || {};



  
  // Form submission handler
  const onSubmit = async (formData: FormData) => {
    try {
      console.log("Form Data:", formData);

      // Mock API call for creating/updating class (replace with actual API endpoint)
      if (type === "create") {
        toast.success("Class created successfully!");
      } else {
        toast.success("Class updated successfully!");
      }

      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new class" : "Update the class"}
      </h1>

      {/* Form fields */}
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Class Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Capacity"
          name="capacity"
          type="number"
          defaultValue={data?.capacity}
          register={register}
          error={errors?.capacity}
        />

        {data && (
          <InputField
            label="ID"
            name="id"
            defaultValue={data?.id}
            register={register}
          />
        )}

        {/* Supervisor selection */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Supervisor</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("supervisorId", { required: "Please select a supervisor" })}
            defaultValue={data?.supervisorId}
          >
            {/* <option value="">Select a supervisor</option>
            {lecturers.map(
              (lecturer: { id: string; name: string; surname: string }) => (
                <option
                  value={lecturer.id}
                  key={lecturer.id}
                  selected={data && lecturer.id === data.supervisorId}
                >
                  {lecturer.name + " " + lecturer.surname}
                </option>
              )
            )} */}
          </select>
          {errors.supervisorId && (
            <p className="text-xs text-red-400">{errors.supervisorId.message}</p>
          )}
        </div>

        {/* Grade selection */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Grade</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("gradeId", { required: "Please select a grade" })}
            defaultValue={data?.gradeId}
          >
            <option value="">Select a grade</option>
            {/* {grades.map((grade: { id: number; level: number }) => (
              <option value={grade.id} key={grade.id}>
                {grade.level}
              </option>
            ))} */}
          </select>
          {errors.gradeId && (
            <p className="text-xs text-red-400">{errors.gradeId.message}</p>
          )}
        </div>
      </div>

      {/* Submission button */}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ClassForm;
