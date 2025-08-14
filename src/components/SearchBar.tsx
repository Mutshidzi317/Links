// components/SearchBar.tsx
import React from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <input className={styles.input}
        type="text"
        placeholder="Search links..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};