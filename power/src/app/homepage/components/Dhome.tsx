import React from 'react';
import Link from 'next/link';

const DHome: React.FC = () => {
  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      margin: 0,
      padding: 0,
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      position: 'sticky' as const,
      top: 0,
      zIndex: 1000
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#3b82f6',
      textDecoration: 'none'
    },
    navLinks: {
      display: 'flex',
      gap: '2rem',
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    navLink: {
      color: '#64748b',
      textDecoration: 'none',
      fontSize: '0.95rem',
      transition: 'color 0.3s ease',
      cursor: 'pointer'
    },
    ctaButton: {
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      padding: '0.5rem 1.5rem',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '0.95rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    },
    heroSection: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '4rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    heroContent: {
      flex: 1,
      paddingRight: '2rem'
    },
    heroTitle: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#1e293b',
      marginBottom: '1rem',
      lineHeight: 1.2
    },
    heroSubtitle: {
      fontSize: '1.25rem',
      color: '#64748b',
      marginBottom: '2rem',
      lineHeight: 1.6
    },
    heroButtons: {
      display: 'flex',
      gap: '1rem'
    },
    primaryButton: {
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      padding: '0.75rem 2rem',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: '#3b82f6',
      padding: '0.75rem 2rem',
      border: '2px solid #3b82f6',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    heroImage: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center'
    },
    imagePlaceholder: {
      width: '100%',
      maxWidth: '500px',
      height: '400px',
      backgroundColor: '#e0e7ff',
      borderRadius: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      color: '#6366f1'
    },
    featuresSection: {
      padding: '4rem 2rem',
      backgroundColor: '#ffffff'
    },
    sectionTitle: {
      textAlign: 'center' as const,
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#1e293b',
      marginBottom: '1rem'
    },
    sectionSubtitle: {
      textAlign: 'center' as const,
      fontSize: '1.125rem',
      color: '#64748b',
      marginBottom: '3rem',
      maxWidth: '600px',
      margin: '0 auto 3rem'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    featureCard: {
      backgroundColor: '#ffffff',
      padding: '2rem',
      borderRadius: '1rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    featureIcon: {
      width: '60px',
      height: '60px',
      backgroundColor: '#dbeafe',
      borderRadius: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      marginBottom: '1rem'
    },
    featureTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#1e293b',
      marginBottom: '0.5rem'
    },
    featureDescription: {
      color: '#64748b',
      lineHeight: 1.6
    },
    statsSection: {
      backgroundColor: '#f1f5f9',
      padding: '4rem 2rem'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2rem',
      maxWidth: '1000px',
      margin: '0 auto'
    },
    statCard: {
      textAlign: 'center' as const
    },
    statNumber: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#3b82f6',
      marginBottom: '0.5rem'
    },
    statLabel: {
      fontSize: '1.125rem',
      color: '#64748b'
    },
    footer: {
      backgroundColor: '#1e293b',
      color: '#ffffff',
      padding: '3rem 2rem 1rem'
    },
    footerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      marginBottom: '2rem'
    },
    footerSection: {
      marginBottom: '1rem'
    },
    footerTitle: {
      fontSize: '1.125rem',
      fontWeight: 'bold',
      marginBottom: '1rem'
    },
    footerLink: {
      display: 'block',
      color: '#94a3b8',
      textDecoration: 'none',
      marginBottom: '0.5rem',
      transition: 'color 0.3s ease'
    },
    footerBottom: {
      borderTop: '1px solid #334155',
      paddingTop: '1rem',
      textAlign: 'center' as const,
      color: '#94a3b8'
    }
  };

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.navbar}>
        <Link href="/" style={styles.logo}>ServiceMate</Link>
        <ul style={styles.navLinks}>
          <li><a href="#features" style={styles.navLink}>Features</a></li>
          <li><a href="#services" style={styles.navLink}>Services</a></li>
          <li><a href="#pricing" style={styles.navLink}>Pricing</a></li>
          <li><a href="#about" style={styles.navLink}>About</a></li>
        </ul>
        <button style={styles.ctaButton}>Get Started</button>
      </nav>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Manage Your Services<br />
            Like Never Before
          </h1>
          <p style={styles.heroSubtitle}>
            Streamline your business operations with our comprehensive service management platform. 
            Track, manage, and grow your services efficiently.
          </p>
          <div style={styles.heroButtons}>
            <button style={styles.primaryButton}>Start Free Trial</button>
            <button style={styles.secondaryButton}>Watch Demo</button>
          </div>
        </div>
        <div style={styles.heroImage}>
          <div style={styles.imagePlaceholder}>
            📊 Dashboard Preview
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Powerful Features</h2>
        <p style={styles.sectionSubtitle}>
          Everything you need to manage your services in one place
        </p>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📈</div>
            <h3 style={styles.featureTitle}>Analytics Dashboard</h3>
            <p style={styles.featureDescription}>
              Get real-time insights into your service performance with detailed analytics and reporting.
            </p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>👥</div>
            <h3 style={styles.featureTitle}>Team Collaboration</h3>
            <p style={styles.featureDescription}>
              Work seamlessly with your team. Assign tasks, track progress, and communicate effectively.
            </p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🔔</div>
            <h3 style={styles.featureTitle}>Smart Notifications</h3>
            <p style={styles.featureDescription}>
              Stay updated with intelligent notifications for important events and deadlines.
            </p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🔒</div>
            <h3 style={styles.featureTitle}>Secure & Reliable</h3>
            <p style={styles.featureDescription}>
              Your data is protected with enterprise-grade security and regular backups.
            </p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🚀</div>
            <h3 style={styles.featureTitle}>Fast Performance</h3>
            <p style={styles.featureDescription}>
              Optimized for speed and efficiency. Handle thousands of services without slowdown.
            </p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📱</div>
            <h3 style={styles.featureTitle}>Mobile Ready</h3>
            <p style={styles.featureDescription}>
              Access your services on the go with our responsive mobile-friendly interface.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>10K+</div>
            <div style={styles.statLabel}>Active Users</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>50K+</div>
            <div style={styles.statLabel}>Services Managed</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>99.9%</div>
            <div style={styles.statLabel}>Uptime</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>24/7</div>
            <div style={styles.statLabel}>Support</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Product</h4>
            <Link href="/features" style={styles.footerLink}>Features</Link>
            <Link href="/pricing" style={styles.footerLink}>Pricing</Link>
            <Link href="/integrations" style={styles.footerLink}>Integrations</Link>
            <Link href="/api" style={styles.footerLink}>API</Link>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Company</h4>
            <Link href="/about" style={styles.footerLink}>About</Link>
            <Link href="/blog" style={styles.footerLink}>Blog</Link>
            <Link href="/careers" style={styles.footerLink}>Careers</Link>
            <Link href="/contact" style={styles.footerLink}>Contact</Link>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Resources</h4>
            <Link href="/docs" style={styles.footerLink}>Documentation</Link>
            <Link href="/tutorials" style={styles.footerLink}>Tutorials</Link>
            <Link href="/community" style={styles.footerLink}>Community</Link>
            <Link href="/status" style={styles.footerLink}>Status</Link>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Legal</h4>
            <Link href="/privacy" style={styles.footerLink}>Privacy</Link>
            <Link href="/terms" style={styles.footerLink}>Terms</Link>
            <Link href="/security" style={styles.footerLink}>Security</Link>
            <Link href="/cookies" style={styles.footerLink}>Cookie Policy</Link>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p>&copy; 2024 ServiceMate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DHome;