import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Activity, Clock, ShieldCheck, X, Heart } from 'lucide-react';

interface User {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

interface ActivityLog {
  _id: string;
  userId: string;
  action: string;
  details: any;
  createdAt: string;
}

export const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const res = await fetch('/api/admin/users', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        }
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSelectUser = async (user: User) => {
    setSelectedUser(user);
    setActivities([]); // clear old
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`/api/admin/activity/${user._id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setActivities(data);
      }
    } catch (err) {
      console.error('Failed to fetch activity log:', err);
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'LOGIN': return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'VISITED_SECTION': return <Activity className="w-4 h-4 text-sky-400" />;
      case 'PROPOSAL_ACCEPTED': return <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />;
      case 'QUESTION_ANSWERED': return <Clock className="w-4 h-4 text-purple-400" />;
      case 'PROPOSAL_HUG_REQUESTED': return <Activity className="w-4 h-4 text-amber-400" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const formatDetails = (details: any) => {
    if (!details || Object.keys(details).length === 0) return '';
    
    if (details.section) {
      return `Section: ${details.section}`;
    }
    
    if (details.question && details.answer) {
      return `Q: "${details.question}"\nA: "${details.answer}"`;
    }
    
    if (details.message) {
      return details.message;
    }
    
    return JSON.stringify(details);
  };

  if (isLoading) {
    return (
      <div className="pt-28 pb-20 px-4 min-h-screen flex items-center justify-center">
        <p className="text-slate-400 animate-pulse">Loading Admin Dashboard...</p>
      </div>
    );
  }

  return (
    <section className="pt-28 pb-20 px-4 sm:px-6 min-h-screen max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
      
      {/* Users List Panel */}
      <div className={`w-full lg:w-1/3 glass-card-luxury rounded-3xl p-6 shadow-2xl border border-white/10 ${selectedUser ? 'hidden lg:block' : 'block'}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
            <Users className="w-6 h-6 text-emerald-400" />
          </div>
          <h2 className="font-serif-title font-bold text-2xl text-white tracking-wide text-glow">
            Users
          </h2>
        </div>

        <div className="space-y-3">
          {users.map(user => (
            <button
              key={user._id}
              onClick={() => handleSelectUser(user)}
              className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                selectedUser?._id === user._id 
                  ? 'bg-white/10 border-rose-400/50 shadow-inner' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-200 text-sm">{user.username}</h3>
                  <p className="text-xs text-slate-400">{user.email}</p>
                </div>
                {user.isAdmin && (
                  <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-500 mt-2">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Activity Timeline Panel */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-full lg:w-2/3 glass-card-luxury rounded-3xl p-6 shadow-2xl border border-white/10 relative"
          >
            <button 
              onClick={() => setSelectedUser(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-slate-400 transition-colors lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
              <div className="p-2 bg-rose-500/20 rounded-xl border border-rose-500/30">
                <Activity className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h2 className="font-serif-title font-bold text-xl text-white">
                  Activity Log: {selectedUser.username}
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  ID: {selectedUser._id}
                </p>
              </div>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              {activities.length === 0 ? (
                <p className="text-center text-slate-400 text-sm py-10">No activity recorded yet.</p>
              ) : (
                activities.map(activity => (
                  <div key={activity._id} className="flex gap-4 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                    <div className="pt-0.5">
                      {getActionIcon(activity.action)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-200">
                        {activity.action}
                      </p>
                      {formatDetails(activity.details) && (
                        <p className="text-[11px] text-slate-400 mt-0.5 whitespace-pre-wrap">
                          {formatDetails(activity.details)}
                        </p>
                      )}
                      <p className="text-[10px] text-slate-500 mt-1.5 font-mono">
                        {new Date(activity.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
