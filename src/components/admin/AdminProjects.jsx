import React, { useState } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit } from 'lucide-react';

const API = import.meta.env.VITE_API_URL;

const AdminProjects = ({ projects, refreshData }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', techStack: '', image: '', githubLink: '', liveLink: ''
  });

  const resetForm = () => {
    setFormData({ title: '', description: '', techStack: '', image: '', githubLink: '', liveLink: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEditClick = (project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(', '),
      image: project.image,
      githubLink: project.githubLink,
      liveLink: project.liveLink || ''
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectPayload = {
        ...formData,
        techStack: formData.techStack.split(',').map(tech => tech.trim())
      };
      
      if (editingId) {
        await axios.put(`${API}/api/projects/${editingId}`, projectPayload, { withCredentials: true });
      } else {
        await axios.post(`${API}/api/projects`, projectPayload, { withCredentials: true });
      }
      
      resetForm();
      refreshData();
    } catch (error) {
      console.error('Error submitting project:', error);
      alert('Failed to save project. Check all URLs and required fields.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await axios.delete(`${API}/api/projects/${id}`, { withCredentials: true });
      refreshData();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Projects</h2>
        <button 
          onClick={() => { if(showForm) resetForm(); else setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium text-sm"
        >
          {showForm ? 'Cancel' : <><Plus className="w-4 h-4" /> Add Project</>}
        </button>
      </div>

      {/* Add/Edit Project Form */}
      {showForm && (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
            <h3 className="text-lg font-bold mb-4">{editingId ? 'Edit Project' : 'Add New Project'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tech Stack (comma separated)</label>
                <input required value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} placeholder="React, Node, MongoDB" className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700" rows="3"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input required type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">GitHub Link</label>
                <input required type="url" value={formData.githubLink} onChange={e => setFormData({...formData, githubLink: e.target.value})} className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Live Link</label>
                <input type="url" value={formData.liveLink} onChange={e => setFormData({...formData, liveLink: e.target.value})} className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700" />
              </div>
            </div>
            <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
              {editingId ? 'Update Project' : 'Submit Project'}
            </button>
          </form>
        </div>
      )}

      {/* Project List */}
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {projects.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No projects found. Create one above!</div>
        ) : projects.map(project => (
          <div key={project._id} className="p-6 flex flex-col md:flex-row gap-6 items-start hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <img src={project.image} alt={project.title} className="w-full md:w-48 h-32 object-cover rounded-xl border border-gray-200 dark:border-gray-700" />
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <span key={tech} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-md font-medium">{tech}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 self-end md:self-start">
              <button onClick={() => handleEditClick(project)} className="p-2 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg">
                <Edit className="w-5 h-5" />
              </button>
              <button onClick={() => handleDelete(project._id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;
