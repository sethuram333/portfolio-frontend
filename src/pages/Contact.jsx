// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, text: '' }); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, text: '' });

    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        message: formData.message,
      };
      
      const res = await axios.post(`${API}/api/contact`, payload);
      setStatus({ type: 'success', text: res.data.message || 'Thank you! Your message has been sent.' });
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', text: error.response?.data?.message || 'Something went wrong. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 min-h-[90vh]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-500 tracking-tight">
          Get In Touch
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
          Have a question or want to work together? Leave a message below, and I'll get back to you as soon as possible.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-6xl mx-auto grid md:grid-cols-5 gap-0 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800/60"
      >
        {/* Contact Info Sidebar */}
        <div className="md:col-span-2 bg-gradient-to-br from-indigo-600 to-cyan-800 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-cyan-400 opacity-20 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-10">Contact Information</h3>
            <div className="space-y-8">
               <div className="flex items-start gap-5">
                 <div className="p-3 bg-indigo-500/50 rounded-xl">
                   <Mail className="w-6 h-6 text-indigo-50" />
                 </div>
                 <div className="pt-1">
                   <h4 className="font-semibold text-lg text-indigo-50">Email</h4>
                   <p className="text-indigo-200 text-lg mt-1">sethurammohan.m@gmail.com</p>
                 </div>
               </div>
               <div className="flex items-start gap-5">
                 <div className="p-3 bg-indigo-500/50 rounded-xl">
                   <Phone className="w-6 h-6 text-indigo-50" />
                 </div>
                 <div className="pt-1">
                   <h4 className="font-semibold text-lg text-indigo-50">Phone</h4>
                   <p className="text-indigo-200 text-lg mt-1">+91 6383788705</p>
                 </div>
               </div>
               <div className="flex items-start gap-5">
                 <div className="p-3 bg-indigo-500/50 rounded-xl">
                   <MapPin className="w-6 h-6 text-indigo-50" />
                 </div>
                 <div className="pt-1">
                   <h4 className="font-semibold text-lg text-indigo-50">Location</h4>
                   <p className="text-indigo-200 text-lg mt-1 leading-relaxed">Sholinganallur, Chennai<br/>tamilnadu</p>
                 </div>
               </div>
            </div>
          </div>
          <div className="mt-16 relative z-10">
            <p className="text-indigo-200 text-lg font-medium">Looking forward to hearing from you!</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="md:col-span-3 p-12 lg:p-16 flex flex-col justify-center bg-slate-50/50 dark:bg-slate-900/50">
          {status.type && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`p-5 mb-8 rounded-2xl flex items-center gap-4 ${status.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'}`}>
               {status.type === 'success' ? <CheckCircle className="w-7 h-7 flex-shrink-0" /> : <AlertCircle className="w-7 h-7 flex-shrink-0" />}
               <span className="font-semibold text-lg">{status.text}</span>
            </motion.div>
          )}
          
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">First Name</label>
                <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 focus:border-cyan-500 dark:focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all text-lg shadow-sm hover:border-slate-300 dark:hover:border-slate-600" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">Last Name</label>
                <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 focus:border-cyan-500 dark:focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all text-lg shadow-sm hover:border-slate-300 dark:hover:border-slate-600" placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">Email Address</label>
              <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 focus:border-cyan-500 dark:focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all text-lg shadow-sm hover:border-slate-300 dark:hover:border-slate-600" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">Message</label>
              <textarea required name="message" value={formData.message} onChange={handleChange} rows="5" className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 focus:border-cyan-500 dark:focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all resize-none text-lg shadow-sm hover:border-slate-300 dark:hover:border-slate-600" placeholder="How can I help you?"></textarea>
            </div>
            <button disabled={loading} type="submit" className={`w-full py-5 text-white rounded-xl font-bold text-xl transition-all flex items-center justify-center gap-3 mt-4 active:scale-[0.98] ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-cyan-500 hover:to-indigo-500 shadow-xl hover:shadow-cyan-500/25'}`}>
              {loading ? (
                 <div className="w-7 h-7 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <><Send className="w-6 h-6" /> Send Message</>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
