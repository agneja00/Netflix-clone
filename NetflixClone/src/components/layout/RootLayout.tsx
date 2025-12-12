import styles from "./RootLayout.module.scss";
import { Outlet } from "react-router-dom";
import Nav from "../Nav/Nav";

export const RootLayout = () => {
  return (
    <>
      <Nav />
      <main className={styles.root}>
        <Outlet />
      </main>
    </>
  );
};
