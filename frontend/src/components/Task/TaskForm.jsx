import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { createTask, updateTask } from "../../utils/api";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Spinner from "../UI/Spinner";

const TaskForm = ({ onAddTask, onUpdateTask, editTask, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title || "");
      setDescription(editTask.description || "");
      setStatus(editTask.status || "Pending");
    } else {
      resetForm();
    }
  }, [editTask]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("Pending");
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (editTask) {
        const updatedTask = await updateTask(editTask.id, {
          title,
          description,
          status,
        });

        onUpdateTask(updatedTask);
      } else {
        const newTask = await createTask({
          title,
          description,
          status,
          createdAt: new Date().toISOString(),
        });

        onAddTask(newTask);
        resetForm();
      }
    } catch (error) {
      toast.error(error.message || "Failed to save task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Input
          label="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) {
              setErrors({ ...errors, title: undefined });
            }
          }}
          placeholder="Enter task title"
          required
          error={errors.title}
        />
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600
                  bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400
                  transition-colors duration-200"
          rows={3}
        />
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Status
        </label>
        <div className="relative">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full pl-3 pr-10 py-2.5 border border-gray-300 dark:border-gray-600
                    bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                    rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400
                    transition-colors duration-200 appearance-none"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>

        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner size="sm" />
              <span>{editTask ? "Updating..." : "Creating..."}</span>
            </div>
          ) : editTask ? (
            "Update Task"
          ) : (
            "Create Task"
          )}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
