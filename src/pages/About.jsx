import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, Building2 } from 'lucide-react';

const API = import.meta.env.VITE_API_URL;

const About = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${API}/api/profile`);
        setProfile(data.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        {/* Bio Section */}
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-6xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-500 tracking-tight">
            About Me
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto font-light">
            {profile?.about || "I'm a passionate full-stack developer who loves building clean, performant, and user-friendly web applications."}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Experience */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl text-indigo-600 dark:text-indigo-400">
                <Briefcase className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold">Experience</h2>
            </div>
            <div className="space-y-10">
              {!profile?.experience || profile.experience.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400">No experience added yet.</p>
              ) : (
                profile.experience.map((exp, index) => (
                  <div key={index} className="relative pl-8 border-l-2 border-indigo-100 dark:border-indigo-900/50 group">
                    <div className="absolute -left-[11px] top-1 w-5 h-5 bg-indigo-500 rounded-full border-4 border-white dark:border-slate-900 group-hover:scale-125 group-hover:bg-cyan-400 transition-all duration-300"></div>
                    <div className="p-5 rounded-2xl transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800/40 -mt-4 border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-2 mb-4">
                        <span className="flex items-center gap-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
                          <Building2 className="w-4 h-4" /> {exp.company}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-indigo-600 dark:text-cyan-400 font-medium">
                          <Calendar className="w-4 h-4" /> {exp.duration}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light">{exp.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/40 rounded-xl text-purple-600 dark:text-purple-400">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold">Education</h2>
            </div>
            <div className="space-y-10">
              {!profile?.education || profile.education.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400">No education added yet.</p>
              ) : (
                profile.education.map((edu, index) => (
                  <div key={index} className="relative pl-8 border-l-2 border-cyan-100 dark:border-cyan-900/50 group">
                    <div className="absolute -left-[11px] top-1 w-5 h-5 bg-cyan-500 rounded-full border-4 border-white dark:border-slate-900 group-hover:scale-125 group-hover:bg-indigo-400 transition-all duration-300"></div>
                    <div className="p-5 rounded-2xl transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800/40 -mt-4 border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{edu.degree}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-2 mb-4">
                        <span className="flex items-center gap-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
                          <Building2 className="w-4 h-4" /> {edu.school}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-cyan-600 dark:text-indigo-400 font-medium">
                          <Calendar className="w-4 h-4" /> {edu.duration}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light">{edu.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
