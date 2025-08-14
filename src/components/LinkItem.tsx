// components/LinkItem.tsx
import React from 'react';
import './LinkItem.module.css';

interface Link {
  id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  tagsInput?: string;
}

interface LinkItemProps {
  link: Link;
  onDelete: (id: string) => void;
  onEdit: (link: Link) => void;
}

export const LinkItem: React.FC<LinkItemProps> = ({ link, onDelete, onEdit }) => {
  return (
    <div className="link-item">
      <div className="link-header">
        <h3>{link.title}</h3>
        <div className="actions">
          <button onClick={() => onEdit(link)}>Edit</button>
          <button onClick={() => onDelete(link.id)}>Delete</button>
        </div>
      </div>
      <a href={link.url} target="_blank" rel="noopener noreferrer">
        {link.url}
      </a>
      {link.description && <p>{link.description}</p>}
      {link.tags.length > 0 && (
        <div className="tags">
          {link.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
};