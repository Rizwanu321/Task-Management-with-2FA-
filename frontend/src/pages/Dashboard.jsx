import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getTasks } from "../utils/api";
import TaskModal from "../components/Task/TaskModal";
import TaskList from "../components/Task/TaskList";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import Spinner from "../components/UI/Spinner";
import { Plus, Search, X, RefreshCw, File, FileText } from "lucide-react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      toast.error(error.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTaskHandler = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setModalOpen(false);
    toast.success("Task added successfully!");
  };

  const updateTaskHandler = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
    setModalOpen(false);
    toast.success("Task updated successfully!");
  };

  const deleteTaskHandler = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    toast.success("Task deleted successfully!");
  };

  const editTaskHandler = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const openModal = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      filter === "all" || task.status.toLowerCase() === filter.toLowerCase();

    const searchMatch =
      searchTerm === "" ||
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(searchTerm.toLowerCase()));

    return statusMatch && searchMatch;
  });

  const statusCounts = tasks.reduce((acc, task) => {
    const status = task.status.toLowerCase();
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto py-6 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 transition-colors">
            Task Dashboard
          </h1>
          <Button onClick={openModal} size="md" leftIcon={<Plus size={16} />}>
            Add New Task
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <Card className="p-4 flex-1 min-w-[140px]">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Total Tasks
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {tasks.length}
            </div>
          </Card>
          <Card className="p-4 flex-1 min-w-[140px]">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Pending
            </div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {statusCounts["pending"] || 0}
            </div>
          </Card>
          <Card className="p-4 flex-1 min-w-[140px]">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              In Progress
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {statusCounts["in progress"] || 0}
            </div>
          </Card>
          <Card className="p-4 flex-1 min-w-[140px]">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Completed
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {statusCounts["completed"] || 0}
            </div>
          </Card>
        </div>

        <TaskModal
          isOpen={modalOpen}
          onClose={closeModal}
          editTask={editingTask}
          onAddTask={addTaskHandler}
          onUpdateTask={updateTaskHandler}
        />

        <Card className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 transition-colors">
              Your Tasks
            </h2>

            <div className="flex flex-col w-full sm:flex-row sm:w-auto gap-3">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 
                  rounded-md pl-9 pr-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400
                  text-gray-700 dark:text-gray-200 transition-colors w-full"
                />
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="flex flex-row w-full sm:w-auto gap-3">
                <select
                  className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 
                  rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400
                  text-gray-700 dark:text-gray-200 transition-colors flex-grow sm:flex-grow-0"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Tasks</option>
                  <option value="pending">Pending</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <Button
                  variant="outline"
                  size="md"
                  onClick={fetchTasks}
                  disabled={loading}
                  className="flex-grow-0"
                  leftIcon={!loading ? <RefreshCw size={16} /> : null}
                >
                  {loading ? <Spinner size="xs" /> : "Refresh"}
                </Button>
              </div>
            </div>
          </div>

          {searchTerm && (
            <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Found {filteredTasks.length}{" "}
              {filteredTasks.length === 1 ? "task" : "tasks"} matching "
              {searchTerm}"
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-16">
              <Spinner size="lg" />
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="mx-auto w-16 h-16 mb-4 text-gray-300 dark:text-gray-600">
                <FileText size={64} />
              </div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
                {searchTerm ? "No matching tasks found" : "No tasks found"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                {tasks.length === 0
                  ? "You haven't created any tasks yet. Click the 'Add New Task' button to get started!"
                  : searchTerm
                  ? `No tasks match your search for "${searchTerm}". Try a different search term or clear the search.`
                  : "No tasks match your current filter. Try changing the filter or adding new tasks."}
              </p>
            </div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onEdit={editTaskHandler}
              onDelete={deleteTaskHandler}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
