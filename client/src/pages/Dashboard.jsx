import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Clock, Trash2, LogOut, BarChart3, Search, LayoutGrid, List, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

const API_BASE = 'http://localhost:5000/api';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '', deadline: '' });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      fetchProjects();
    }
  }, [navigate]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_BASE}/projects`);
      setProjects(res.data);
    } catch (err) {
      console.error('Error fetching projects', err);
    }
  };

  const getChartData = () => {
    const counts = { 'Planning': 0, 'In Progress': 0, 'Completed': 0, 'On Hold': 0 };
    projects.forEach(p => counts[p.status]++);
    return Object.keys(counts).map(key => ({ name: key, count: counts[key] }));
  };

  const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444'];

  const createProject = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/projects`, newProject);
      setNewProject({ name: '', description: '', deadline: '' });
      setShowModal(false);
      fetchProjects();
    } catch (err) {
      console.error('Error creating project', err);
    }
  };

  const deleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${API_BASE}/projects/${id}`);
        fetchProjects();
      } catch (err) {
        console.error('Error deleting project', err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Planning': return 'badge badge-planning';
      case 'In Progress': return 'badge badge-inprogress';
      case 'Completed': return 'badge badge-completed';
      default: return 'badge badge-onhold';
    }
  };


  const [searchTerm, setSearchTerm] = useState('');
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container animate-enter" style={{ height: '100vh', display: 'flex', flexDirection: 'column', padding: '0', maxWidth: '100%' }}>
      {/* Top Header */}
      <header className="app-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '40px', height: '40px', background: 'var(--primary-gradient)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)' }}>
            <LayoutGrid color="white" size={20} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: '700', lineHeight: 1 }}>Project Studio</h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Welcome back, {user?.username}</p>
          </div>
        </div>

        <div className="header-actions">
            <div className="search-wrapper">
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                    type="text" 
                    placeholder="Search projects..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ 
                        paddingLeft: '40px', 
                        background: 'rgba(255,255,255,0.03)', 
                        borderColor: 'rgba(255,255,255,0.05)',
                        height: '40px',
                        fontSize: '0.9rem'
                    }}
                />
            </div>
            <button className="btn btn-primary" onClick={() => setShowModal(true)} style={{ height: '40px' }}>
                <Plus size={18} /> New Project
            </button>
            <button className="btn btn-danger-solid" onClick={handleLogout} style={{ height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px' }} title="Logout">
                <LogOut size={18} />
                <span className='text-white'>Logout</span>
            </button>
        </div>
      </header>

      {/* Main Content Area */}
      {/* Main Content Area */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Main Grid Section */}
        <div className="dashboard-body">
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>Dashboard</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Overview of your active projects and progress.</p>
                </div>
                
                {/* Mini Stats Row */}
                <div className="stats-row">
                    <div className="glass-card" style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: '140px', flex: 1 }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Total</span>
                        <span style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-main)' }}>{projects.length}</span>
                    </div>
                    <div className="glass-card" style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: '140px', flex: 1 }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Active</span>
                        <span style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--primary)' }}>
                            {projects.filter(p => p.status === 'In Progress').length}
                        </span>
                    </div>
                    {/* Clickable Mini Chart */}
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setShowAnalyticsModal(true)}
                        className="glass-card" 
                        style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', cursor: 'pointer', minWidth: '160px' }}
                    >
                        <div style={{ width: '100px', height: '40px' }}>
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={getChartData()}>
                                    <Bar dataKey="count" radius={[2, 2, 2, 2]}>
                                        {getChartData().map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ marginLeft: '12px' }}>
                             <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Analytics</span>
                             <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600' }}>View Details</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {filteredProjects.length === 0 ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                    <Search size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                    <h3>No projects found</h3>
                    <p>Try adjusting your search query.</p>
                </div>
            ) : (
                <div className="project-grid">
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project._id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="glass-card"
                                style={{ padding: '24px', position: 'relative', display: 'flex', flexDirection: 'column', cursor: 'pointer', minHeight: '220px', border: '1px solid rgba(255,255,255,0.05)' }}
                                onClick={() => navigate(`/project/${project._id}`)}
                                whileHover={{ y: -4, borderColor: 'rgba(99, 102, 241, 0.3)', boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.6)' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'flex-start' }}>
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <select
                                            value={project.status}
                                            onChange={async (e) => {
                                                const newStatus = e.target.value;
                                                try {
                                                    await axios.put(`${API_BASE}/projects/${project._id}`, { status: newStatus });
                                                    fetchProjects();
                                                } catch (err) {
                                                    console.error('Error updating status', err);
                                                }
                                            }}
                                            className={getStatusBadgeClass(project.status)}
                                            style={{ 
                                                border: 'none', 
                                                cursor: 'pointer', 
                                                fontSize: '0.75rem', 
                                                padding: '6px 24px 6px 12px',
                                                appearance: 'none',
                                                textAlign: 'center',
                                                maxWidth: '120px'
                                            }}
                                        >
                                            <option value="Planning">Planning</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                            <option value="On Hold">On Hold</option>
                                        </select>
                                    </div>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteProject(project._id);
                                        }}
                                        className="btn-danger-ghost"
                                        style={{ borderRadius: '8px', opacity: 0.6 }}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                
                                <h3 style={{ marginBottom: '8px', fontSize: '1.3rem', fontWeight: '600' }}>{project.name}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px', flexGrow: 1, lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {project.description || 'No description provided.'}
                                </p>
                                
                                <div style={{ marginTop: 'auto' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px', color: 'var(--text-muted)' }}>
                                        <span>Progress</span>
                                        <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{project.progress}%</span>
                                    </div>
                                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${project.progress}%` }}
                                            style={{ height: '100%', background: 'var(--primary-gradient)', borderRadius: '2px' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--glass-border)' }}>
                                    <Clock size={14} />
                                    <span>{project.deadline ? new Date(project.deadline).toLocaleDateString(undefined, { dateStyle: 'medium' }) : 'No deadline'}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
      
        {/* Analytics Modal */}
        {showAnalyticsModal && (
            <div style={{ 
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 
            }}>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card" 
                    style={{ width: '100%', maxWidth: '600px', padding: '32px' }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Project Analytics</h2>
                        <button onClick={() => setShowAnalyticsModal(false)} className="btn-icon-bg" style={{background: 'transparent', border: '1px solid var(--glass-border)', cursor: 'pointer', color: 'var(--text-main)'}}>
                            <X size={20} />
                        </button>
                    </div>

                    <div style={{ height: '300px', marginBottom: '24px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={getChartData()}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <Tooltip 
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                        return (
                                            <div style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)',   borderRadius: '8px', padding: '12px' }}>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '4px' }}>{payload[0].payload.name}</p>
                                            <p style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>{payload[0].value} Projects</p>
                                            </div>
                                        );
                                        }
                                        return null;
                                    }}
                                />
                                <Bar name="Projects" dataKey="count" radius={[4, 4, 4, 4]}>
                                    {getChartData().map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        {getChartData().map((entry, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: COLORS[index % COLORS.length] }} />
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{entry.name}</span>
                                </div>
                                <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>{entry.count}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        )}
      </div>




      {showModal && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 
        }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass-card" 
            style={{ width: '100%', maxWidth: '500px', padding: '40px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
          >
            <h2 style={{ marginBottom: '8px', fontSize: '1.8rem' }}>New Project</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Start a new journey for your team.</p>
            
            <form onSubmit={createProject}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Project Name</label>
                <input 
                  required
                  type="text" 
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  placeholder="e.g. Website Redesign"
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Description</label>
                <textarea 
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  style={{ minHeight: '120px' }}
                  placeholder="Summarize your project goals..."
                />
              </div>
              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Deadline</label>
                <input 
                  type="date" 
                  value={newProject.deadline}
                  onChange={(e) => setNewProject({...newProject, deadline: e.target.value})}
                />
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Project</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
