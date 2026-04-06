import React from 'react';
import axios from 'axios';
import { Plus, Trash2 } from 'lucide-react';

const API = import.meta.env.VITE_API_URL;

const AdminProfile = ({ profile, setProfile, refreshData }) => {
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...profile,
        skills: typeof profile.skills === 'string' ? profile.skills.split(',').map(s => s.trim()) : profile.skills
      };
      await axios.put(`${API}/api/profile`, payload, { withCredentials: true });
      alert('Profile updated successfully!');
      refreshData();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  const addExperience = () => {
    setProfile({
      ...profile,
      experience: [...profile.experience, { company: '', role: '', duration: '', description: '' }]
    });
  };

  const removeExperience = (index) => {
    const updatedExp = profile.experience.filter((_, i) => i !== index);
    setProfile({ ...profile, experience: updatedExp });
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExp = [...profile.experience];
    updatedExp[index][field] = value;
    setProfile({ ...profile, experience: updatedExp });
  };

  const addEducation = () => {
    setProfile({
      ...profile,
      education: [...profile.education, { school: '', degree: '', duration: '', description: '' }]
    });
  };

  const removeEducation = (index) => {
    const updatedEdu = profile.education.filter((_, i) => i !== index);
    setProfile({ ...profile, education: updatedEdu });
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEdu = [...profile.education];
    updatedEdu[index][field] = value;
    setProfile({ ...profile, education: updatedEdu });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold">Edit Profile</h2>
      </div>
      <div className="p-6">
        <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium mb-2">About (Bio)</label>
            <textarea 
              required 
              value={profile?.about || ''} 
              onChange={e => setProfile({...profile, about: e.target.value})} 
              className="w-full p-4 border rounded-xl dark:bg-gray-900 dark:border-gray-700 min-h-[120px] outline-none focus:border-indigo-500 transition-colors" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Skills (comma separated)</label>
            <input 
              required 
              value={profile?.skills || ''} 
              onChange={e => setProfile({...profile, skills: e.target.value})} 
              placeholder="HTML, CSS, JavaScript, React" 
              className="w-full p-4 border rounded-xl dark:bg-gray-900 dark:border-gray-700 outline-none focus:border-indigo-500 transition-colors" 
            />
          </div>

          {/* Experience Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Experience</h3>
              <button type="button" onClick={addExperience} className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1 font-medium bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-lg transition-colors">
                <Plus className="w-4 h-4" /> Add Experience
              </button>
            </div>
            {profile.experience.map((exp, idx) => (
              <div key={idx} className="p-4 border rounded-xl dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 relative space-y-3">
                <button type="button" onClick={() => removeExperience(idx)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-md transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input placeholder="Company" value={exp.company} onChange={e => handleExperienceChange(idx, 'company', e.target.value)} className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:border-indigo-500 outline-none" />
                  <input placeholder="Role" value={exp.role} onChange={e => handleExperienceChange(idx, 'role', e.target.value)} className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:border-indigo-500 outline-none" />
                </div>
                <input placeholder="Duration (e.g. 2023 - Present)" value={exp.duration} onChange={e => handleExperienceChange(idx, 'duration', e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:border-indigo-500 outline-none" />
                <textarea placeholder="Description" value={exp.description} onChange={e => handleExperienceChange(idx, 'description', e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:border-indigo-500 outline-none" rows="2"></textarea>
              </div>
            ))}
          </div>

          {/* Education Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Education</h3>
              <button type="button" onClick={addEducation} className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1 font-medium bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-lg transition-colors">
                <Plus className="w-4 h-4" /> Add Education
              </button>
            </div>
            {profile.education?.map((edu, idx) => (
              <div key={idx} className="p-4 border rounded-xl dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 relative space-y-3">
                <button type="button" onClick={() => removeEducation(idx)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-md transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input placeholder="School" value={edu.school} onChange={e => handleEducationChange(idx, 'school', e.target.value)} className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:border-indigo-500 outline-none" />
                  <input placeholder="Degree" value={edu.degree} onChange={e => handleEducationChange(idx, 'degree', e.target.value)} className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:border-indigo-500 outline-none" />
                </div>
                <input placeholder="Duration (e.g. 2019 - 2023)" value={edu.duration} onChange={e => handleEducationChange(idx, 'duration', e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:border-indigo-500 outline-none" />
                <textarea placeholder="Description" value={edu.description} onChange={e => handleEducationChange(idx, 'description', e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:border-indigo-500 outline-none" rows="2"></textarea>
              </div>
            ))}
          </div>

          {/* Social Links Section */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">GitHub URL</label>
                <input 
                  type="url" 
                  value={profile.socialLinks?.github || ''} 
                  onChange={e => setProfile({...profile, socialLinks: {...profile.socialLinks, github: e.target.value}})} 
                  placeholder="https://github.com/yourusername" 
                  className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:border-indigo-500 outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                <input 
                  type="url" 
                  value={profile.socialLinks?.linkedin || ''} 
                  onChange={e => setProfile({...profile, socialLinks: {...profile.socialLinks, linkedin: e.target.value}})} 
                  placeholder="https://linkedin.com/in/yourusername" 
                  className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:border-indigo-500 outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Twitter URL</label>
                <input 
                  type="url" 
                  value={profile.socialLinks?.twitter || ''} 
                  onChange={e => setProfile({...profile, socialLinks: {...profile.socialLinks, twitter: e.target.value}})} 
                  placeholder="https://twitter.com/yourusername" 
                  className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:border-indigo-500 outline-none" 
                />
              </div>
            </div>
          </div>

          <button type="submit" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition w-full md:w-auto shadow-lg shadow-indigo-500/20 active:scale-95">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
