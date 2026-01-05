import styles from "./RootLayout.module.scss";
import { Outlet } from "react-router-dom";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

export const RootLayout = () => {
  return (
    <div className={styles.root}>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
