// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get(`${API}/api/projects`);
        setProjects(data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto px-4 py-20 pb-32 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl md:text-6xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-500 tracking-tight">
          Selected Works
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
          Here are some of the projects I've worked on recently. They demonstrate my ability to build dynamic, scalable, and beautifully designed full-stack web applications.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
        </div>
      ) : error ? (
        <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-2xl max-w-2xl mx-auto border border-red-200 dark:border-red-900">
          <h3 className="text-2xl font-bold mb-3">Oops!</h3>
          <p className="text-lg">{error}</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center p-16 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-700 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">No projects found.</h3>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Check back later to see my latest work!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
            >
              <ProjectCard 
                title={project.title}
                description={project.description}
                tags={project.techStack}
                link={project.liveLink}
                github={project.githubLink}
                image={project.image}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
