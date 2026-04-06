import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { LogOut, LayoutDashboard, MessageSquare, Code2, ArrowLeft, User } from 'lucide-react';

// Modular Components
import AdminProjects from '../components/admin/AdminProjects';
import AdminMessages from '../components/admin/AdminMessages';
import AdminProfile from '../components/admin/AdminProfile';

const API = import.meta.env.VITE_API_URL;

const Admin = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState({ 
    about: '', 
    skills: '', 
    experience: [], 
    education: [], 
    socialLinks: { github: '', linkedin: '', twitter: '' } 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'projects') {
        const { data } = await axios.get(`${API}/api/projects`);
        setProjects(data.data || []);
      } else if (activeTab === 'messages') {
        const { data } = await axios.get(`${API}/api/contact`, { withCredentials: true });
        setMessages(data.data || []);
      } else if (activeTab === 'profile') {
        const { data } = await axios.get(`${API}/api/profile`);
        if (data.data) {
          setProfile({
            ...data.data,
            skills: Array.isArray(data.data.skills) ? data.data.skills.join(', ') : data.data.skills,
            experience: data.data.experience || [],
            education: data.data.education || [],
            socialLinks: data.data.socialLinks || { github: '', linkedin: '', twitter: '' }
          });
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 transition-colors duration-300">
      {/* Admin Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 md:p-6 sticky top-0 z-40 transition-colors">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            <Code2 className="w-6 h-6 md:w-8 md:h-8 text-indigo-600 dark:text-indigo-400" />
            <span className="truncate">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto">
            <Link 
              to="/"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors font-medium text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /> 
              <span className="hidden xs:inline">Back to Site</span>
              <span className="xs:hidden">Site</span>
            </Link>
            <button 
              onClick={logout}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 rounded-lg transition-colors font-medium text-sm md:text-base"
            >
              <LogOut className="w-4 h-4 md:w-5 md:h-5" /> 
              <span className="hidden xs:inline">Logout</span>
              <span className="xs:hidden">Exit</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 mt-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-2 md:p-4 flex md:flex-col overflow-x-auto md:overflow-visible no-scrollbar space-x-2 md:space-x-0 md:space-y-2">
            <button 
              onClick={() => setActiveTab('projects')}
              className={`flex-1 md:w-full flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-xl transition-colors font-medium whitespace-nowrap ${
                activeTab === 'projects' 
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400' 
                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" /> 
              <span className="hidden sm:inline md:inline">Manage Projects</span>
              <span className="sm:hidden md:hidden">Projects</span>
            </button>
            <button 
              onClick={() => setActiveTab('messages')}
              className={`flex-1 md:w-full flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-xl transition-colors font-medium whitespace-nowrap ${
                activeTab === 'messages' 
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400' 
                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
              }`}
            >
              <MessageSquare className="w-5 h-5" /> 
              <span className="hidden sm:inline md:inline">Messages</span>
              <span className="sm:hidden md:hidden">Mail</span>
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex-1 md:w-full flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-xl transition-colors font-medium whitespace-nowrap ${
                activeTab === 'profile' 
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400' 
                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
              }`}
            >
              <User className="w-5 h-5" /> 
              <span className="hidden sm:inline md:inline">Edit Profile</span>
              <span className="sm:hidden md:hidden">Profile</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center p-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <>
              {activeTab === 'projects' && (
                <AdminProjects projects={projects} refreshData={fetchData} />
              )}

              {activeTab === 'messages' && (
                <AdminMessages messages={messages} />
              )}

              {activeTab === 'profile' && (
                <AdminProfile profile={profile} setProfile={setProfile} refreshData={fetchData} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
