import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutGrid, BarChart3, Users, ArrowRight, CheckCircle2, List, Clock, AlignLeft } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  return (
    <div className="container" style={{ height: '100vh', overflowY: 'auto', display: 'block', padding: 0 }}>
      {/* Background Ambience */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }}></div>
        <div style={{ 
            position: 'absolute', inset: 0, 
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', 
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
        }}></div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backdropFilter: 'blur(10px)', position: 'fixed', width: '100%', top: 0, zIndex: 100, borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', background: 'var(--primary-gradient)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)' }}>
            <LayoutGrid color="white" size={20} />
          </div>
          <span style={{ fontSize: '1.2rem', fontWeight: '700', letterSpacing: '-0.02em' }}>Project Studio</span>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          {token ? (
            <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
              Go to Dashboard <ArrowRight size={16} />
            </button>
          ) : (
            <>
              <button className="btn btn-secondary" onClick={() => navigate('/login')}>Login</button>
              <button className="btn btn-primary" onClick={() => navigate('/register')}>Get Started</button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '160px', paddingBottom: '80px', paddingLeft: '20px', paddingRight: '20px', textAlign: 'center' }}>
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           style={{ maxWidth: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', marginBottom: '32px', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '500' }}>
                <span style={{ display: 'block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></span>
                New: Status Analytics & Reporting
            </div>
            
            <h1 style={{ 
                fontSize: 'clamp(3rem, 8vw, 5rem)', 
                fontWeight: '800', 
                lineHeight: 1.1, 
                marginBottom: '24px', 
                letterSpacing: '-0.03em',
                background: 'linear-gradient(to bottom, #ffffff, #94a3b8)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                textShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
                Manage projects with <br/> <span style={{ color: 'var(--primary)', WebkitTextFillColor: 'var(--primary)' }}>clarity</span> and focus.
            </h1>
            
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 48px', lineHeight: 1.6 }}>
                Track progress, assign tasks, and maintain momentum. The simple, powerful workspace for getting things done.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '80px' }}>
                <button className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1.1rem', borderRadius: '16px' }} onClick={() => navigate(token ? '/dashboard' : '/register')}>
                    Start Planning <ArrowRight size={20} />
                </button>
            </div>
        </motion.div>

        {/* Dashboard Preview Mockup - Matching Real App Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "circOut" }}
          style={{ 
              width: '100%', maxWidth: '1100px', 
              borderRadius: '24px', 
              border: '1px solid rgba(255,255,255,0.1)', 
              boxShadow: '0 40px 100px -20px rgba(0,0,0,0.5)',
              overflow: 'hidden',
              background: '#0f1115',
              position: 'relative'
          }}
        >
          {/* Browser Bar */}
          <div style={{ background: '#1e293b', padding: '16px 24px', display: 'flex', gap: '8px', borderBottom: '1px solid var(--glass-border)' }}>
             <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></div>
             <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }}></div>
             <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}></div>
             <div style={{ marginLeft: '16px', background: 'rgba(0,0,0,0.3)', padding: '4px 12px', borderRadius: '6px', fontSize: '0.7rem', color: 'var(--text-muted)', flex: 1, textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>projectstudio.app/dashboard</div>
          </div>

          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px', background: 'var(--bg-dark)', minHeight: '600px' }}>
              {/* App Header Mockup */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--primary-gradient)' }}></div>
                      <div>
                          <div style={{ height: '20px', width: '150px', background: 'rgba(255,255,255,0.8)', borderRadius: '4px', marginBottom: '4px' }}></div>
                          <div style={{ height: '14px', width: '100px', background: 'rgba(255,255,255,0.3)', borderRadius: '4px' }}></div>
                      </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                      <div style={{ width: '200px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)' }}></div>
                      <div style={{ width: '120px', height: '40px', borderRadius: '12px', background: 'var(--primary)', opacity: 0.8 }}></div>
                  </div>
              </div>

              {/* Stats Row Mockup */}
              <div style={{ display: 'flex', gap: '24px' }}>
                   <div style={{ flex: 1, height: '100px', borderRadius: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '20px' }}>
                        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>TOTAL PROJECTS</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>12</div>
                   </div>
                   <div style={{ flex: 1, height: '100px', borderRadius: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '20px' }}>
                        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>ACTIVE</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--primary)' }}>8</div>
                   </div>
                   <div style={{ width: '180px', height: '100px', borderRadius: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '20px' }}>
                        {/* Mini Chart Mockup */}
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '100%' }}>
                             {[40, 70, 50, 90, 60].map((h, i) => (
                                 <div key={i} style={{ flex: 1, height: `${h}%`, background: 'var(--primary)', borderRadius: '2px', opacity: 0.7 }}></div>
                             ))}
                        </div>
                   </div>
              </div>

              {/* Project Grid Mockup */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                  {[1, 2, 3].map(i => (
                      <div key={i} style={{ height: '220px', borderRadius: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '24px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                              <div style={{ width: '80px', height: '24px', borderRadius: '20px', background: i === 2 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)', color: i===2 ? '#34d399' : '#fbbf24', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{i === 2 ? 'COMPLETED' : 'IN PROGRESS'}</div>
                              <div style={{ width: '24px', height: '24px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}></div>
                          </div>
                          <div style={{ height: '20px', width: '70%', background: 'rgba(255,255,255,0.8)', borderRadius: '4px', marginBottom: '12px' }}></div>
                          <div style={{ height: '60px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: 'auto' }}></div>
                          
                          <div style={{ marginTop: '20px' }}>
                               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
                                   <span>Progress</span>
                                   <span>{i === 2 ? '100%' : '65%'}</span>
                               </div>
                               <div style={{ height: '6px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
                                   <div style={{ height: '100%', width: i === 2 ? '100%' : '65%', background: i === 2 ? 'var(--success)' : 'var(--primary)', borderRadius: '3px' }}></div>
                               </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
        </motion.div>
      </section>

      {/* Actual Features Section */}
      <section style={{ padding: '60px 20px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
           <FeatureCard 
             icon={<CheckCircle2 color="#10b981" />} 
             title="Progress Tracking" 
             desc="Visualize completion rates with instant progress bars calculated from your tasks."
           />
           <FeatureCard 
             icon={<List color="#6366f1" />} 
             title="Task Management" 
             desc="Assign priorities, set deadlines, and manage status from Todo to Done."
           />
           <FeatureCard 
             icon={<BarChart3 color="#f59e0b" />} 
             title="Project Stats" 
             desc="Get a clear overview of your workspace with real-time status distribution charts."
           />
        </div>
      </section>
      
      <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '80px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '24px', color: 'var(--text-main)' }}>Ready to streamline your workflow?</h2>
        <button className="btn btn-primary" onClick={() => navigate('/register')}>Get Started Now</button>
        <p style={{ marginTop: '40px', fontSize: '0.9rem' }}>&copy; 2026 Project Studio.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card" 
    style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)' }}
  >
    <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
      {icon}
    </div>
    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</p>
  </motion.div>
);

export default LandingPage;
