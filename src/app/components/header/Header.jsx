import React, { useState, useEffect } from "react";
import style from "./header.module.css";
import Image from "next/image";

function Header() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formattedDateString = capitalizeFirstLetter(
      date.toLocaleDateString("pt-BR", options)
    );

    setFormattedDate(formattedDateString);
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div>
      <header className={style.header}>
        <Image
          src="/logo.svg"
          alt="Logo Focal"
          width={windowWidth < 839 ? 150 : 240}
          height={36}
          priority
        />
        <div className={style.content}>Bem-vindo de volta, Marcus</div>
        <div className={style.date}>{formattedDate}</div>
      </header>
    </div>
  );
}

export default Header;
