import React from 'react';

const AdminMessages = ({ messages }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold">Contact Submissions</h2>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {messages.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No messages yet.</div>
        ) : messages.map((msg, idx) => (
          <div key={idx} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{msg.name}</h3>
              <span className="text-sm text-gray-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
            </div>
            <a href={`mailto:${msg.email}`} className="text-sm text-indigo-600 dark:text-indigo-400 mb-4 inline-block">{msg.email}</a>
            <p className="text-gray-700 dark:text-gray-300 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl whitespace-pre-wrap">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMessages;
