import { useState, useEffect } from 'react'
import {
  Cloud, GitBranch, Shield, Terminal, Server, Activity,
  Mail, ChevronDown, Layers, Lock, Globe, Zap, Database, Award,
} from 'lucide-react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const SKILLS = [
  {
    category: 'Cloud Platforms',
    icon: <Cloud size={18} />,
    items: ['AWS (EC2, Lambda, S3, CloudFront)', 'DynamoDB · CloudWatch · WAF', 'Azure', 'CloudFormation'],
  },
  {
    category: 'Infrastructure as Code',
    icon: <Layers size={18} />,
    items: ['Terraform', 'Bicep', 'Ansible', 'Helm', 'CloudFormation', 'ARM Templates'],
  },
  {
    category: 'CI/CD & Automation',
    icon: <GitBranch size={18} />,
    items: ['GitHub Actions', 'Azure DevOps', 'Jenkins', 'GitLab CI', 'Python', 'Bash', 'PowerShell'],
  },
  {
    category: 'Containers & Orchestration',
    icon: <Server size={18} />,
    items: ['Kubernetes (AKS · EKS)', 'Docker', 'Helm', 'GitOps', 'Container Registry'],
  },
  {
    category: 'Monitoring & Observability',
    icon: <Activity size={18} />,
    items: ['Datadog', 'Prometheus', 'Grafana', 'ELK Stack', 'CloudWatch', 'PRTG'],
  },
  {
    category: 'Security & Compliance',
    icon: <Shield size={18} />,
    items: ['IAM · OIDC', 'Azure Key Vault', 'WAF', 'DevSecOps', 'Security Assessments', 'CloudTrail'],
  },
]

const PROJECTS = [
  {
    title: 'AWS E-Commerce Infrastructure',
    description:
      'Designed and manages AWS infrastructure supporting global e-commerce at Metagenics — CloudFront distributions, Lambda functions, WAF configurations, S3 workloads, and OIDC-based GitHub Actions auth.',
    tags: ['AWS', 'CloudFront', 'Lambda', 'WAF', 'Terraform', 'GitHub Actions'],
    icon: <Globe size={24} />,
    color: 'from-amber-500 to-orange-500',
  },
  {
    title: 'CDN Observability Pipeline',
    description:
      'Built an end-to-end CDN observability pipeline on Azure at 3Cloud — real-time metrics ingestion, log aggregation, and interactive Grafana dashboarding for full CDN traffic visibility.',
    tags: ['Azure', 'Grafana', 'Datadog', 'Log Analytics', 'CDN'],
    icon: <Activity size={24} />,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'AKS Migration at Scale',
    description:
      'Migrated 150+ monolithic applications from on-premise servers to Azure Kubernetes Service at Safeway Philtech, retiring legacy infrastructure and delivering full-stack observability with Prometheus + Grafana.',
    tags: ['AKS', 'Kubernetes', 'Helm', 'Terraform', 'Prometheus', 'Grafana'],
    icon: <Server size={24} />,
    color: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'Multi-Environment Azure Landing Zones',
    description:
      'Provisioned multi-environment Azure landing zones across five deployment stages using Bicep and Azure DevOps Release Pipelines — Storage Accounts, App Insights, and Log Analytics as a unified repeatable deployment.',
    tags: ['Bicep', 'Azure DevOps', 'Terraform', 'IaC', 'Azure'],
    icon: <Layers size={24} />,
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'AI-Driven Cloud Governance',
    description:
      'Prototyped an AI-driven cloud governance solution using Azure AI Foundry and Content Understanding for automated resource compliance enforcement — policy logic driven entirely by a natural language document, zero custom code.',
    tags: ['Azure AI Foundry', 'AI/ML', 'Compliance', 'Azure', 'Governance'],
    icon: <Zap size={24} />,
    color: 'from-violet-500 to-indigo-500',
  },
  {
    title: 'Automated Monitoring Sensor Pipeline',
    description:
      'Built an Azure DevOps Classic Release Pipeline with a self-hosted agent to automate infrastructure monitoring sensor creation, eliminating manual config and securing all credentials through Azure Key Vault.',
    tags: ['Azure DevOps', 'Key Vault', 'PRTG', 'Automation', 'Self-hosted Agent'],
    icon: <Lock size={24} />,
    color: 'from-rose-500 to-pink-500',
  },
]

const EXPERIENCE = [
  {
    role: 'DevOps Engineer',
    company: 'Metagenics',
    period: '2025 – Present',
    description:
      'Design and manage AWS cloud infrastructure supporting global e-commerce operations. Lead incident response, enforce security best practices, and drive observability across production systems.',
    highlights: [
      'Manage CloudFront, Lambda, WAF, and S3-based workloads at global scale',
      'Implemented OIDC-based GitHub Actions auth and IAM least-privilege policies',
      'Lead RCA and incident resolution for production AWS issues',
      'Drive Datadog observability across production, proactively resolving bottlenecks',
    ],
  },
  {
    role: 'DevOps Engineer',
    company: '3Cloud',
    period: 'Jul 2023 – 2025',
    description:
      'Delivered cloud infrastructure and DevOps solutions for enterprise clients across multi-environment Azure deployments using Terraform, Bicep, and Azure DevOps.',
    highlights: [
      'Provisioned multi-environment Azure landing zones across 5 deployment stages',
      'Built CDN observability pipeline with real-time metrics and dashboarding',
      'Prototyped AI-driven cloud governance using Azure AI Foundry',
      'Automated monitoring sensor creation, eliminating manual configuration',
    ],
  },
  {
    role: 'Senior DevOps Engineer',
    company: 'Asurion',
    period: 'Jun 2022 – Feb 2023',
    description:
      'Designed AWS-based architectures for high-traffic applications. Administered 50+ EC2 instances, managed multi-DB environments, and provided 24/7 on-call production support.',
    highlights: [
      'Designed EC2, DynamoDB, Lambda, S3 architectures with Terraform',
      'Administered 50+ EC2 instances and Azure VMs using Ansible',
      'Built and optimized CI/CD pipelines using GitHub Actions and Jenkins',
      'Conducted infrastructure reviews and security assessments',
    ],
  },
  {
    role: 'DevOps Engineer',
    company: 'Safeway Philtech Inc.',
    period: 'Jun 2020 – May 2022',
    description:
      'Led large-scale AKS migration, administered Kubernetes clusters end-to-end, and built full-stack observability with Prometheus and Grafana across production workloads.',
    highlights: [
      'Migrated 150+ monolithic apps from on-premise to AKS',
      'Administered AKS clusters — provisioning, scaling, upgrades, HA config',
      'Configured Prometheus + Grafana across all Kubernetes infrastructure',
      'Designed CI/CD pipelines using Jenkins and Terraform for containerized workloads',
    ],
  },
  {
    role: 'DevOps Specialist',
    company: 'Home Credit Philippines',
    period: 'Oct 2019 – May 2020',
    description:
      'Built GitLab CI pipelines for microservices deployment, automated cloud provisioning with Terraform and Ansible, and integrated real-time monitoring solutions.',
    highlights: [
      'Built and maintained GitLab CI pipelines for microservices deployment',
      'Automated ETL deployments and integrated real-time monitoring',
      'Automated cloud resource provisioning and config management with Terraform',
    ],
  },
  {
    role: 'DevOps Engineer',
    company: 'Accenture Inc.',
    period: 'Dec 2017 – Sep 2019',
    description:
      'Designed and maintained AWS architectures, automated deployments with Jenkins and Terraform, and conducted AWS security audits across managed accounts.',
    highlights: [
      'Designed Lambda, CloudFormation, S3, and CloudWatch monitoring solutions',
      'Automated deployments using Jenkins, Terraform, and Python',
      'Conducted AWS security audits and enforced cloud security best practices',
    ],
  },
]

const CERTS = [
  { name: 'Azure DevOps Engineer Expert', code: 'AZ-400', color: 'from-blue-500 to-indigo-500' },
  { name: 'Azure Administrator Associate', code: 'AZ-104', color: 'from-cyan-500 to-blue-500' },
  { name: 'Azure Fundamentals', code: 'AZ-900', color: 'from-sky-500 to-cyan-500' },
]

function GithubIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-blur' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-bold text-lg gradient-text">ES</span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href} className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200">
              {link.label}
            </a>
          ))}
        </div>
        <a href="mailto:emc.sioson@gmail.com" className="btn-primary px-4 py-2 rounded-lg text-sm font-semibold text-white">
          Hire Me
        </a>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section id="hero" className="hero-bg min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Open to Remote Opportunities · Manila, Philippines
        </div>
        <h1 className="text-6xl md:text-8xl font-black mb-4 leading-none tracking-tight">
          <span className="gradient-text">Earl</span>{' '}
          <span className="text-white">Sioson</span>
        </h1>
        <p className="text-2xl md:text-3xl font-bold text-slate-300 mb-6">
          DevOps &amp; Cloud Engineer
        </p>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          7+ years designing, automating, and operating cloud-native infrastructure at enterprise scale —
          AWS · Kubernetes · Terraform · CI/CD.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#projects" className="btn-primary px-8 py-3.5 rounded-xl font-semibold text-white text-base">
            View My Work
          </a>
          <a href="#contact" className="btn-secondary px-8 py-3.5 rounded-xl font-semibold text-white text-base">
            Get In Touch
          </a>
        </div>
        <div className="flex items-center justify-center gap-4 mt-10">
          {[
            { icon: <GithubIcon size={20} />, href: 'https://github.com/eaarrll', label: 'GitHub' },
            { icon: <LinkedinIcon size={20} />, href: 'https://www.linkedin.com/in/earl-martin-sioson/', label: 'LinkedIn' },
            { icon: <Mail size={20} />, href: 'mailto:emc.sioson@gmail.com', label: 'Email' },
          ].map(s => (
            <a key={s.label} href={s.href} aria-label={s.label}
              className="p-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all duration-200">
              {s.icon}
            </a>
          ))}
        </div>
      </div>
      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-slate-300 transition-colors animate-bounce">
        <ChevronDown size={24} />
      </a>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">About Me</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            Engineering reliability<br />
            <span className="gradient-text">at cloud scale</span>
          </h2>
          <div className="space-y-4 text-slate-400 text-base leading-relaxed">
            <p>
              Results-driven DevOps Engineer with 7+ years of experience designing, automating, and
              operating cloud-native infrastructure at enterprise scale. Deep expertise across AWS services,
              Kubernetes orchestration, and CI/CD pipeline automation using Terraform, Bicep, and GitHub Actions.
            </p>
            <p>
              Proven track record in incident response, root cause analysis, and maintaining high-availability
              production systems. Experienced in distributed, remote-first environments — collaborating across
              engineering and non-technical stakeholders to deliver mission-critical solutions securely and reliably.
            </p>
            <p className="flex items-center gap-2 text-slate-500 text-sm">
              <span className="text-indigo-400">📍</span> Manila, Philippines · Open to Remote
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: '7+', label: 'Years in Cloud & DevOps', icon: <Cloud size={20} /> },
            { value: '150+', label: 'Apps Migrated to Kubernetes', icon: <Server size={20} /> },
            { value: '50+', label: 'EC2 Instances Administered', icon: <Database size={20} /> },
            { value: '3x', label: 'Microsoft Azure Certified', icon: <Award size={20} /> },
          ].map(stat => (
            <div key={stat.label} className="card-glow rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center mb-3 text-indigo-400">{stat.icon}</div>
              <div className="text-3xl font-black gradient-text mb-1">{stat.value}</div>
              <div className="text-slate-400 text-xs leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">Tech Stack</p>
          <h2 className="text-4xl md:text-5xl font-black text-white section-heading">Skills &amp; Tools</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map(group => (
            <div key={group.category} className="card-glow rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-indigo-500/15 text-indigo-400">{group.icon}</div>
                <h3 className="font-bold text-white text-sm">{group.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map(item => (
                  <span key={item} className="skill-badge px-3 py-1 rounded-lg text-xs font-medium text-slate-300 cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-black text-white section-heading">Featured Projects</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map(project => (
            <div key={project.title} className="card-glow rounded-2xl p-6 flex flex-col group cursor-pointer">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {project.icon}
              </div>
              <h3 className="font-bold text-white text-lg mb-3 leading-tight">{project.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-slate-400 border border-white/8">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-black/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">Career</p>
          <h2 className="text-4xl md:text-5xl font-black text-white section-heading">Experience</h2>
        </div>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-cyan-500 to-transparent" />
          <div className="space-y-8">
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="pl-20 relative">
                <div className="timeline-dot absolute left-6 top-1.5 w-4 h-4 rounded-full -translate-x-1/2" />
                <div className="card-glow rounded-2xl p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-black text-xl text-white">{exp.role}</h3>
                      <p className="text-indigo-400 font-semibold">{exp.company}</p>
                    </div>
                    <span className="text-slate-400 text-sm font-medium bg-white/5 px-3 py-1 rounded-full border border-white/8 shrink-0">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{exp.description}</p>
                  <ul className="space-y-1.5">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-slate-300">
                        <span className="text-indigo-400 mt-0.5 shrink-0">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mt-16">
          <h3 className="text-2xl font-black text-white mb-6 text-center">Education</h3>
          <div className="card-glow rounded-2xl p-6 flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl shrink-0">
              🎓
            </div>
            <div>
              <p className="font-bold text-white">Bachelor of Science in Information Technology</p>
              <p className="text-indigo-400 font-semibold text-sm">Colegio de San Juan de Letran</p>
              <p className="text-slate-500 text-sm">2011 – 2017</p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-10">
          <h3 className="text-2xl font-black text-white mb-6 text-center">Certifications</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {CERTS.map(cert => (
              <div key={cert.code} className="card-glow rounded-2xl p-5 text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${cert.color} text-white font-black text-sm mb-3`}>
                  {cert.code}
                </div>
                <p className="text-white font-semibold text-sm leading-tight">Microsoft Certified</p>
                <p className="text-slate-400 text-xs mt-1">{cert.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">Contact</p>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
          Let's build something<br />
          <span className="gradient-text">remarkable together</span>
        </h2>
        <p className="text-slate-400 text-lg mb-10 leading-relaxed">
          Open to senior DevOps, platform engineering, and cloud architecture roles — remote preferred.
          Let's talk about how I can help your team ship faster and sleep better.
        </p>
        <a href="mailto:emc.sioson@gmail.com"
          className="btn-primary inline-flex items-center gap-3 px-10 py-4 rounded-xl font-semibold text-white text-lg mb-12">
          <Mail size={20} />
          emc.sioson@gmail.com
        </a>
        <div className="flex items-center justify-center gap-4">
          {[
            { icon: <GithubIcon size={22} />, label: 'GitHub', href: 'https://github.com/eaarrll' },
            { icon: <LinkedinIcon size={22} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/earl-martin-sioson/' },
            { icon: <Mail size={22} />, label: 'Email', href: 'mailto:emc.sioson@gmail.com' },
          ].map(s => (
            <a key={s.label} href={s.href} aria-label={s.label}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all duration-200 font-medium text-sm">
              {s.icon}
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5 text-center">
      <p className="text-slate-600 text-sm">
        © {new Date().getFullYear()} Earl Martin Sioson · Manila, Philippines · Open to Remote
      </p>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  )
}
