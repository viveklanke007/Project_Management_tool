import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Clock, User, Trash2, CheckCircle2, X } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', description: '', assignedTo: '', deadline: '', status: 'Todo', priority: 'Medium' });

    useEffect(() => {
        fetchProjectData();
    }, [id]);

    const fetchProjectData = async () => {
        try {
            const projectRes = await axios.get(`${API_BASE}/projects/${id}`);
            const tasksRes = await axios.get(`${API_BASE}/tasks/project/${id}`);
            setProject(projectRes.data);
            setTasks(tasksRes.data);
        } catch (err) {
            console.error('Error fetching project details', err);
        }
    };

    const [activeTask, setActiveTask] = useState(null);
    const [commentText, setCommentText] = useState('');

    const openTaskModal = (task = null) => {
        if (task) {
            setActiveTask(task);
            setNewTask({ ...task, deadline: task.deadline ? task.deadline.split('T')[0] : '' });
        } else {
            setActiveTask(null);
            setNewTask({ title: '', description: '', assignedTo: '', deadline: '', status: 'Todo', priority: 'Medium' });
        }
        setShowTaskModal(true);
    };

    const handleTaskSubmit = async (e) => {
        e.preventDefault();
        try {
            if (activeTask) {
                await axios.put(`${API_BASE}/tasks/${activeTask._id}`, newTask);
            } else {
                await axios.post(`${API_BASE}/tasks`, { ...newTask, projectId: id });
            }
            setShowTaskModal(false);
            fetchProjectData();
            setActiveTask(null);
        } catch (err) {
            console.error('Error saving task', err);
        }
    };

    const addComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            await axios.post(`${API_BASE}/tasks/${activeTask._id}/comments`, {
                text: commentText,
                author: user.username
            });
            // Refresh local task data just for the active task (optimistic or re-fetch)
            const updatedTask = { ...activeTask, comments: [...(activeTask.comments || []), { text: commentText, author: user.username, createdAt: new Date() }]};
            setActiveTask(updatedTask);
            setCommentText('');
            // Also refresh background data
            fetchProjectData();
        } catch (err) {
            console.error('Error adding comment', err);
        }
    };

    const deleteComment = async (taskId, commentId) => {
        // Optional: Implement delete comment if needed
    };

    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            await axios.put(`${API_BASE}/tasks/${taskId}`, { status: newStatus });
            fetchProjectData();
        } catch (err) {
            console.error('Error updating task', err);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`${API_BASE}/tasks/${taskId}`);
            fetchProjectData();
        } catch (err) {
            console.error('Error deleting task', err);
        }
    };

    const getPriorityClass = (priority) => {
        switch(priority) {
            case 'Urgent': return 'badge priority-urgent';
            case 'High': return 'badge priority-high';
            case 'Medium': return 'badge priority-medium';
            case 'Low': return 'badge priority-low';
            default: return 'badge priority-medium';
        }
    };

    const columns = ['Todo', 'In Progress', 'Review', 'Done'];

    if (!project) return <div className="container" style={{paddingTop: '100px'}}>Loading...</div>;

    return (
        <div className="container animate-enter">
            <header style={{ marginBottom: '24px', paddingTop: '30px', flexShrink: 0 }}>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="btn btn-secondary" 
                  style={{ marginBottom: '24px', padding: '8px 16px', fontSize: '0.9rem' }}
                >
                    <ArrowLeft size={16} /> Back to Dashboard
                </button>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: 1 }}>{project.name}</h1>
                            <select
                                value={project.status}
                                onChange={async (e) => {
                                    const newStatus = e.target.value;
                                    try {
                                        await axios.put(`${API_BASE}/projects/${id}`, { status: newStatus });
                                        fetchProjectData();
                                    } catch (err) {
                                        console.error('Error updating status', err);
                                    }
                                }}
                                style={{ 
                                    background: 'rgba(255,255,255,0.05)', 
                                    border: '1px solid rgba(255,255,255,0.1)', 
                                    color: 'var(--text-secondary)',
                                    borderRadius: '8px',
                                    padding: '4px 8px',
                                    fontSize: '0.8rem',
                                    width: 'auto',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="Planning">Planning</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="On Hold">On Hold</option>
                            </select>
                        </div>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', fontSize: '1.1rem' }}>{project.description}</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowTaskModal(true)}>
                        <Plus size={20} /> Add Task
                    </button>
                </div>
            </header>

            <div className="content-scroll" style={{ paddingBottom: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', minWidth: '1000px' }}>
                    {columns.map(column => (
                    <div key={column} style={{ minWidth: '280px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '0 4px' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{column}</h3>
                            <span style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                                {tasks.filter(t => t.status === column).length}
                            </span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '500px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', padding: '16px', border: '1px solid rgba(255,255,255,0.03)' }}>
                            <AnimatePresence>
                                {tasks.filter(t => t.status === column).map(task => (
                                    <motion.div
                                        key={task._id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="glass-card"
                                        style={{ padding: '20px', position: 'relative', cursor: 'pointer' }}
                                        whileHover={{ y: -4, boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}
                                        onClick={() => openTaskModal(task)}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                            <span className={getPriorityClass(task.priority)}>
                                                {task.priority || 'Medium'}
                                            </span>
                                            <div style={{ display: 'flex', gap: '4px' }}>
                                                {column !== 'Done' && (
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); updateTaskStatus(task._id, columns[columns.indexOf(column) + 1]); }}
                                                        className="btn-icon-bg"
                                                        style={{ color: 'var(--success)', width: '28px', height: '28px', padding: 0 }}
                                                        title="Advance Status"
                                                    >
                                                        <CheckCircle2 size={16} />
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); deleteTask(task._id); }}
                                                    className="btn-icon-bg"
                                                    style={{ color: 'var(--danger)', width: '28px', height: '28px', padding: 0 }}
                                                    title="Delete Task"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                        <h4 style={{ marginBottom: '8px', fontSize: '1rem', lineHeight: '1.4' }}>{task.title}</h4>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px', lineHeight: '1.5' }}>{task.description}</p>
                                        
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <User size={14} />
                                                </div>
                                                <span>{task.assignedTo || 'Unassigned'}</span>
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                                {task.comments?.length || 0} comments
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                ))}
                </div>
            </div>

            {/* Task Creation/Edit Modal */}
            {showTaskModal && (
                <div style={{ 
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
                    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 
                }}>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="glass-card" 
                        style={{ width: '100%', maxWidth: '800px', padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}
                    >
                        <div style={{ padding: '32px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{activeTask ? 'Edit Task' : 'Add New Task'}</h2>
                            <button 
                                onClick={() => setShowTaskModal(false)} 
                                className="btn-icon-bg" 
                                style={{background: 'transparent', border: '1px solid var(--glass-border)', cursor: 'pointer', color: 'var(--text-main)'}}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div style={{ display: 'flex', overflow: 'hidden', flexDirection: 'row', height: '100%' }}>
                            {/* Left Side: Edit Form */}
                            <div style={{ flex: 1, padding: '32px', borderRight: '1px solid var(--glass-border)', overflowY: 'auto' }}>
                                <form onSubmit={handleTaskSubmit} id="taskForm">
                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Task Title</label>
                                        <input 
                                            required
                                            type="text" 
                                            value={newTask.title}
                                            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                                            placeholder="What needs to be done?"
                                        />
                                    </div>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Description</label>
                                        <textarea 
                                            value={newTask.description}
                                            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                                            style={{ minHeight: '120px' }}
                                            placeholder="Add details..."
                                        />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Assign To</label>
                                            <input 
                                                type="text" 
                                                value={newTask.assignedTo}
                                                onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                                                placeholder="Username"
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Deadline</label>
                                            <input 
                                                type="date" 
                                                value={newTask.deadline}
                                                onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: '32px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Priority</label>
                                        <select 
                                            value={newTask.priority}
                                            onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                                        >
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                            <option value="Urgent">Urgent</option>
                                        </select>
                                    </div>
                                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowTaskModal(false)}>Cancel</button>
                                        <button type="submit" className="btn btn-primary">{activeTask ? 'Save Changes' : 'Create Task'}</button>
                                    </div>
                                </form>
                            </div>

                            {/* Right Side: Comments (Only if editing) */}
                            {activeTask && (
                                <div style={{ flex: 0.8, background: 'rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ padding: '24px', borderBottom: '1px solid var(--glass-border)' }}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Comments</h3>
                                    </div>
                                    
                                    <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
                                        {activeTask.comments && activeTask.comments.length > 0 ? (
                                            activeTask.comments.map((comment, index) => (
                                                <div key={index} style={{ marginBottom: '20px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.85rem' }}>
                                                        <span style={{ fontWeight: '600', color: 'var(--primary)' }}>{comment.author}</span>
                                                        <span style={{ color: 'var(--text-muted)' }}>{new Date(comment.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '0 12px 12px 12px', fontSize: '0.9rem' }}>
                                                        {comment.text}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div style={{ textAlign: 'center', color: 'var(--text-muted)', paddingTop: '40px' }}>
                                                No comments yet. Start the conversation!
                                            </div>
                                        )}
                                    </div>

                                    <div style={{ padding: '20px', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)' }}>
                                        <form onSubmit={addComment}>
                                            <textarea 
                                                value={commentText}
                                                onChange={(e) => setCommentText(e.target.value)}
                                                placeholder="Write a comment..." 
                                                style={{ minHeight: '80px', marginBottom: '12px', fontSize: '0.9rem' }}
                                            />
                                            <button type="submit" className="btn btn-secondary" style={{ width: '100%', fontSize: '0.9rem', padding: '8px' }}>
                                                Post Comment
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetails;
