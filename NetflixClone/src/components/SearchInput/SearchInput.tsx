import styles from "./SearchInput.module.scss";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchInput = ({
  value,
  onChange,
  onKeyDown,
  placeholder = "",
  ...props
}: InputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className={styles.input}
      {...props}
    />
  );
};

export default SearchInput;
