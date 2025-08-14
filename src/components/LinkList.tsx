// components/LinkList.tsx
import React from 'react';
import { LinkItem } from './LinkItem';
import  './LinkList.module.css';

interface Link {
  id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  tagsInput?: string;
}

interface LinkListProps {
  links: Link[];
  onDelete: (id: string) => void;
  onEdit: (link: Link) => void;
}

export const LinkList: React.FC<LinkListProps> = ({ links, onDelete, onEdit }) => {
  return (
    <div className="link-list">
      {links.map(link => (
        <LinkItem
          key={link.id}
          link={link}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};