import React from "react";
import styles from "./FilterLink.module.scss";
import { Link } from "react-router-dom";
import classNames from "classnames";

interface FilterLinkProps {
  to: string;
  active?: boolean;
  className?: string;
  children: React.ReactNode;
}

const FilterLink = ({ active, to, className, children }: FilterLinkProps) => {
  return (
    <Link
      className={classNames(
        styles.filterLink,
        className,
        active && styles["filterLink--active"]
      )}
      to={to}
    >
      {children}
    </Link>
  );
};

export default FilterLink;
