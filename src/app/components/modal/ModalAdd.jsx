import React, { useState } from "react";
import style from "./modal.module.css";

function Modal({ isOpen, onClose, onAddTask }) {
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const taskObject = { id: Date.now(), task: newTask, completed: false };
      onAddTask(taskObject);
      setNewTask("");
      onClose();
    }
  };

  return (
    isOpen && (
      <div className={style.modal}>
        <div className={style.modalContent}>
          <h2>Nova Tarefa</h2>
          <span className={style.teste}>Título</span>
          <div>
            <input
              className={style.inputTitle}
              type="text"
              placeholder="Digite"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </div>
          <div className={style.modalButtons}>
            <button onClick={onClose} className={style.btnCancel}>
              Cancelar
            </button>
            <button onClick={handleAddTask} className={style.btnAdd}>
              Adicionar
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default Modal;
