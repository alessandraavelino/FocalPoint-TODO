import React, { useState } from "react";
import style from "./modal.module.css";

function ModalDel({ isOpen, onClose, onRemoveTask, taskId }) {
  const handleRemoveTask = () => {
    onRemoveTask(taskId);
    onClose();
  };

  return (
    isOpen && (
      <div className={style.modal}>
        <div className={style.modalContent}>
          <h2>Deletar Tarefa</h2>
          <span className={style.teste}>
            Tem certeza que você deseja deletar essa tarefa?
          </span>
          <div></div>
          <div className={style.modalButtons}>
            <button onClick={onClose} className={style.btnCancel}>
              Cancelar
            </button>
            <button onClick={handleRemoveTask} className={style.btnDelete}>
              Deletar
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default ModalDel;
