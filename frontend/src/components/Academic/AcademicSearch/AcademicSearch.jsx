import { Search, X } from "lucide-react";
import styles from "./AcademicSearch.module.css";

export default function AcademicSearch({
  placeholder = "Search universities...",
  value = "",
  onChange,
}) {
  return (
    <div className={styles.search}>
      <Search size={19} className={styles.icon} aria-hidden="true" />
      <label className={styles.srOnly} htmlFor="academic-search">
        {placeholder}
      </label>
      <input
        id="academic-search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {value && (
        <button
          type="button"
          className={styles.clear}
          aria-label="Clear search"
          onClick={() => onChange?.({ target: { value: "" } })}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
