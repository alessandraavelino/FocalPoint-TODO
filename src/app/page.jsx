"use client";
import Header from "./components/header/Header";
import Task from "./components/list/Task";
import '../styles/globals.css'; 

export default function Home() {
  return (
    <>
      <Header />
      <Task />
    </>
  );
}
