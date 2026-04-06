import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Database, Layout, Server, FileJson, Code, ArrowRight, Mail } from 'lucide-react';

const Home = () => {
  const skills = [
    { name: 'React', icon: <Layout className="text-cyan-500 w-10 h-10" /> },
    { name: 'Node.js', icon: <Server className="text-indigo-400 w-10 h-10" /> },
    { name: 'MongoDB', icon: <Database className="text-emerald-500 w-10 h-10" /> },
    { name: 'Express', icon: <FileJson className="text-slate-600 dark:text-slate-300 w-10 h-10" /> },
    { name: 'Tailwind CSS', icon: <Code className="text-cyan-400 w-10 h-10" /> },
  ];

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="min-h-[85vh] flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-cyan-600 dark:text-cyan-400 font-bold tracking-widest uppercase text-sm mb-6 block">
            Welcome to my portfolio
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-[1.1]">
            Hi, I'm a <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-indigo-400 to-cyan-400">
              Full Stack Developer
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            I build scalable, modern web applications using the MERN stack. Passionate about clean code, stunning typography, and beautiful interactions.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50 hover:scale-105"
            >
              View My Work <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-full font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:scale-105"
            >
              <Mail className="w-5 h-5" /> Contact Me
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="py-24 border-t border-slate-200 dark:border-slate-800/50">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Tech Stack</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400">The tools I use to bring ideas to life</p>
        </div>

        <div className="flex flex-wrap justify-center gap-10 md:gap-20">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-6 group cursor-pointer"
              whileHover={{ scale: 1.15 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
            >
              <div className="p-7 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 group-hover:shadow-2xl transition-all duration-300 group-hover:border-cyan-200 dark:group-hover:border-cyan-900/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {skill.icon}
              </div>
              <span className="font-semibold text-slate-800 dark:text-slate-200 tracking-wide">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 mb-16">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>

          <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10 leading-tight tracking-tighter">
            Let's build something <br /> amazing together.
          </h2>
          <p className="text-indigo-200/80 mb-12 max-w-2xl mx-auto text-xl relative z-10 font-light">
            Whether you have a project in mind or just want to chat about technology, my inbox is always open.
          </p>
          <Link
            to="/contact"
            className="inline-block px-10 py-5 bg-white text-slate-900 rounded-full font-bold hover:bg-cyan-50 transition-colors shadow-xl relative z-10 text-lg hover:scale-105 active:scale-95 duration-200"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
