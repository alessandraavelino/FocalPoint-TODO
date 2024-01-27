import React, { useState, useEffect } from "react";
import style from "./task.module.css";
import Image from "next/image";
import Modal from "../modal/ModalAdd";
import ModalDel from "../modal/ModalDel";

function Task() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const updateLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleCloseDelModal = () => {
    setIsDelModalOpen(false);
  };
  const handleOpenDelModal = (task) => {
    setTaskToDelete(task);
    setIsDelModalOpen(true);
  };

  const handleAddTask = (newTask, isCompleted = false) => {
    const updatedTasks = [...tasks, { ...newTask, isCompleted }];
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  const handleTaskCompletion = (index, isCompleted) => {
    const updatedTasks = [...tasks];
    const completedTask = updatedTasks.splice(index, 1)[0];

    if (isCompleted) {
      setCompletedTasks([...completedTasks, completedTask]);
    } else {
      setCompletedTasks(
        completedTasks.filter((task) => task.id !== completedTask.id)
      );
    }

    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  const handleRemoveTask = () => {
    if (taskToDelete) {
      let updatedTasks = [];

      if (completedTasks.some((task) => task.id === taskToDelete.id)) {
        updatedTasks = completedTasks.filter(
          (task) => task.id !== taskToDelete.id
        );
        setCompletedTasks(updatedTasks);
      } else {
        updatedTasks = tasks.filter((task) => task.id !== taskToDelete.id);
        setTasks(updatedTasks);
      }

      updateLocalStorage(updatedTasks);
      setIsDelModalOpen(false);
      setTaskToDelete(null);
    }
  };
  return (
    <div className={style.global}>
      <div className={style.main}>
        <div>
          <div className={style.container}>
            <span className={style.header}>Suas tarefas de hoje</span>
            <div className={style.body}>
              {tasks.map((task, index) => (
                <div key={task.id} className={style.task}>
                  <input
                    className={style.check}
                    type="checkbox"
                    onChange={(e) =>
                      handleTaskCompletion(index, e.target.checked)
                    }
                  />
                  <label className={style.label}>{task.task}</label>
                  <Image
                    src="/trash.svg"
                    alt="Lixeira"
                    width={24}
                    height={24}
                    className={style.trash}
                    onClick={() => handleOpenDelModal(task)}
                  />
                </div>
              ))}
            </div>
            <span className={style.header}>Tarefas finalizadas</span>
            <div className={style.body}>
              {completedTasks.map((task) => (
                <div key={task.id} className={style.task}>
                  <input
                    className={style.check}
                    type="checkbox"
                    checked
                    readOnly
                  />
                  <label className={style.taskFinished}>{task.task}</label>
                  <Image
                    src="/trash.svg"
                    alt="Lixeira"
                    width={24}
                    height={24}
                    className={style.trash}
                    onClick={() => handleOpenDelModal(task)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={style.position}>
            <button className={style.acaoButton} onClick={handleOpenModal}>
              Adicionar nova tarefa
            </button>
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAddTask={handleAddTask}
        />
        <ModalDel
          isOpen={isDelModalOpen}
          onClose={handleCloseDelModal}
          onRemoveTask={handleRemoveTask}
          taskId={taskToDelete ? taskToDelete.id : null}
        />
      </div>
    </div>
  );
}

export default Task;
