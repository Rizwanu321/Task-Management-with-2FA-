import React, { useState } from "react";
import toast from "react-hot-toast";
import { deleteTask as deleteTaskApi } from "../../utils/api";
import Button from "../UI/Button";
import Spinner from "../UI/Spinner";
import {
  Clock,
  AlertTriangle,
  Edit,
  Trash2,
  CheckCircle,
  Circle,
  ArrowUp,
} from "lucide-react";

const TaskItem = ({ task, onEdit, onDelete }) => {
  const [deleting, setDeleting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const statusColors = {
    Pending: {
      light: "bg-yellow-100 text-yellow-800 border-yellow-200",
      dark: "dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800/50",
      icon: <Clock className="w-3 h-3 mr-1.5" />,
    },
    "In Progress": {
      light: "bg-blue-100 text-blue-800 border-blue-200",
      dark: "dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/50",
      icon: <ArrowUp className="w-3 h-3 mr-1.5" />,
    },
    Completed: {
      light: "bg-green-100 text-green-800 border-green-200",
      dark: "dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/50",
      icon: <CheckCircle className="w-3 h-3 mr-1.5" />,
    },
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    setDeleting(true);

    try {
      await deleteTaskApi(task.id);
      onDelete(task.id);
      closeDeleteModal();
    } catch (error) {
      toast.error(error.message || "Failed to delete task");
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const statusClass = task.status
    ? statusColors[task.status]?.light + " " + statusColors[task.status]?.dark
    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow transition-all duration-300">
        <div className="p-4">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">
              {task.title}
            </h3>

            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center text-xs px-2.5 py-1 rounded-full border ${statusClass}`}
              >
                {statusColors[task.status]?.icon}
                {task.status}
              </span>
            </div>
          </div>

          <div className="mt-2 flex text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-gray-400 dark:text-gray-500" />
              {formatDate(task.createdAt)}
            </div>
          </div>

          {task.description && (
            <div className="mt-3">
              <p
                className={`text-gray-700 dark:text-gray-300 text-sm ${
                  !isExpanded && "line-clamp-2"
                }`}
              >
                {task.description}
              </p>
              {task.description.length > 100 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline mt-1 focus:outline-none"
                >
                  {isExpanded ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/60 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(task)}
            leftIcon={<Edit className="w-4 h-4" />}
          >
            Edit
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={handleDeleteClick}
            leftIcon={<Trash2 className="w-4 h-4" />}
          >
            Delete
          </Button>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-auto overflow-hidden animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-center text-gray-900 dark:text-gray-100 mb-2">
                Delete Task
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  "{task.title}"
                </span>
                ? This action cannot be undone.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button
                  variant="outline"
                  size="md"
                  className="w-full sm:w-auto order-2 sm:order-1"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  size="md"
                  className="w-full sm:w-auto order-1 sm:order-2"
                  disabled={deleting}
                  onClick={handleDelete}
                >
                  {deleting ? (
                    <>
                      <Spinner size="xs" className="mr-2" /> Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskItem;
