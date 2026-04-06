import React from 'react';
import { ExternalLink, Terminal } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const ProjectCard = ({ title, description, tags, link, github, image }) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 flex flex-col h-full group"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
          <div className="flex gap-4">
            {link && (
              <a href={link} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-slate-900 rounded-full hover:bg-cyan-50 hover:scale-110 active:scale-95 transition-all shadow-lg">
                <ExternalLink className="w-6 h-6" />
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 text-white rounded-full hover:bg-slate-800 hover:scale-110 active:scale-95 transition-all shadow-lg border border-slate-700">
                <Terminal className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="p-8 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-cyan-400 transition-all">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed flex-grow text-lg font-light">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag, index) => (
            <span key={index} className="px-4 py-2 bg-indigo-50/80 dark:bg-indigo-500/10 text-indigo-700 dark:text-cyan-400 border border-indigo-100 dark:border-indigo-500/20 font-medium tracking-wide rounded-xl text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
