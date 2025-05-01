import React from "react";
import Modal from "../UI/Modal";
import TaskForm from "./TaskForm";

const TaskModal = ({ isOpen, onClose, editTask, onAddTask, onUpdateTask }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editTask ? "Edit Task" : "Create New Task"}
      size="md"
    >
      <TaskForm
        onAddTask={onAddTask}
        onUpdateTask={onUpdateTask}
        editTask={editTask}
        onCancel={onClose}
      />
    </Modal>
  );
};

export default TaskModal;
