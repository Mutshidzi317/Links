// components/LinkForm.tsx
import React, { useState, useEffect } from 'react';
import './LinkForm.module.css';

interface Link {
  id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  tagsInput?: string; // For form input
}

interface LinkFormProps {
  onSubmit: (link: Link) => void;
  editingLink: Link | null;
}

export const LinkForm: React.FC<LinkFormProps> = ({ onSubmit, editingLink }) => {
  const [formData, setFormData] = useState<Link>({
    id: '',
    title: '',
    url: '',
    description: '',
    tags: [],
    tagsInput: '' // Add initial value for tagsInput
  });

  useEffect(() => {
    if (editingLink) {
      setFormData({
        ...editingLink,
        tagsInput: editingLink.tags.join(', ') // Convert tags to comma-separated string
      });
    }
  }, [editingLink]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = (formData.tagsInput || '').split(',').map(tag => tag.trim());
    
    const newLink = {
      ...formData,
      id: editingLink?.id || Date.now().toString(),
      tags
    };

    onSubmit(newLink);
    setFormData({
      id: '',
      title: '',
      url: '',
      description: '',
      tags: [],
      tagsInput: ''
    });
  };

  return (
    <form className="link-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={e => setFormData({...formData, title: e.target.value})}
        required
      />
      <input
        type="url"
        placeholder="URL"
        value={formData.url}
        onChange={e => setFormData({...formData, url: e.target.value})}
        required
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={e => setFormData({...formData, description: e.target.value})}
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={formData.tagsInput || ''}
        onChange={e => setFormData({...formData, tagsInput: e.target.value})}
      />
      <button type="submit">{editingLink ? 'Update' : 'Add'} Link</button>
    </form>
  );
};