import React, { useState, useEffect } from 'react';
import { LinkForm } from './components/LinkForm';
import { LinkList } from './components/LinkList';
import { SearchBar } from './components/SearchBar';
import './App.css';

interface Link {
  id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  tagsInput?: string;
}

const App: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  useEffect(() => {
    const savedLinks = localStorage.getItem('links');
    if (savedLinks) setLinks(JSON.parse(savedLinks));
  }, []);

  useEffect(() => {
    localStorage.setItem('links', JSON.stringify(links));
  }, [links]);

  const handleAddLink = (newLink: Omit<Link, 'id'>) => {
    const id = Date.now().toString();
    setLinks([...links, { ...newLink, id }]);
  };

  const handleUpdateLink = (updatedLink: Link) => {
    setLinks(
      links.map(link => (link.id === updatedLink.id ? updatedLink : link))
    );
    setEditingLink(null);
  };

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const normalizedQuery = searchQuery.toLowerCase();

  const filteredLinks = links.filter(link =>
    link.title.toLowerCase().includes(normalizedQuery) ||
    link.url.toLowerCase().includes(normalizedQuery) ||
    link.description.toLowerCase().includes(normalizedQuery) ||
    link.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
  );

  return (
    <div className="app">
      <h1>Links Vault</h1>

      <div className="form-wrapper">
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent actual page reload
          }}
          className="link-form-container"
        >
          {/* Search bar at the top of the form */}
          <SearchBar value={searchQuery} onChange={setSearchQuery} />

          {/* Link input form */}
          <LinkForm
            onSubmit={editingLink ? handleUpdateLink : handleAddLink}
            editingLink={editingLink}
          />
        </form>

        {/* Link list shown under the form */}
        <LinkList
          links={filteredLinks}
          onDelete={handleDeleteLink}
          onEdit={setEditingLink}
        />
      </div>
    </div>
  );
};

export default App;
