import { useState, useEffect } from 'react'
import {
  Cloud, GitBranch, Shield, Terminal, Server, Activity,
  Mail, ChevronDown, Layers, Lock, Globe, Zap,
} from 'lucide-react'

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
    items: ['Azure', 'AWS', 'GCP', 'Azure DevOps', 'MACH Architecture'],
  },
  {
    category: 'Infrastructure as Code',
    icon: <Layers size={18} />,
    items: ['Terraform', 'Bicep', 'ARM Templates', 'Helm', 'Checkov', 'tfsec'],
  },
  {
    category: 'CI/CD & Automation',
    icon: <GitBranch size={18} />,
    items: ['GitHub Actions', 'Azure Pipelines', 'Ansible', 'Bash', 'PowerShell', 'Python'],
  },
  {
    category: 'Containers & Orchestration',
    icon: <Server size={18} />,
    items: ['Kubernetes', 'Docker', 'Helm', 'GitOps', 'AKS', 'Container Registry'],
  },
  {
    category: 'Security & Compliance',
    icon: <Shield size={18} />,
    items: ['Trivy', 'Gitleaks', 'Azure Key Vault', 'RBAC', 'DevSecOps', 'Secret Scanning'],
  },
  {
    category: 'Observability',
    icon: <Activity size={18} />,
    items: ['Azure Monitor', 'Log Analytics', 'Datadog', 'Grafana', 'k6', 'Artillery'],
  },
]

const PROJECTS = [
  {
    title: 'Multi-Region AKS Platform',
    description:
      'Designed and deployed a Kubernetes platform on Azure AKS with multi-region failover, GitOps workflows via Flux, and full observability stack.',
    tags: ['AKS', 'Terraform', 'GitOps', 'Kubernetes', 'Azure'],
    icon: <Server size={24} />,
    color: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'DevSecOps Pipeline Framework',
    description:
      'Built reusable GitHub Actions and Azure Pipelines templates with integrated security scanning (Trivy, Checkov, Gitleaks) and automated release gating.',
    tags: ['GitHub Actions', 'Trivy', 'Checkov', 'Security', 'CI/CD'],
    icon: <Lock size={24} />,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'MACH E-Commerce Infrastructure',
    description:
      'Provisioned and maintained cloud infrastructure for a MACH-architecture e-commerce platform using Terraform, Azure, and MACH Composer.',
    tags: ['MACH', 'Azure', 'Terraform', 'Microservices', 'Helm'],
    icon: <Globe size={24} />,
    color: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Automated Runbook System',
    description:
      'Developed Ansible playbooks and PowerShell scripts reducing manual operational toil by 70%, covering backups, scaling, and patching.',
    tags: ['Ansible', 'PowerShell', 'Automation', 'Bash', 'Operations'],
    icon: <Terminal size={24} />,
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Secrets Management Overhaul',
    description:
      'Migrated all hardcoded secrets to Azure Key Vault with managed identity, eliminating secret sprawl and achieving full compliance.',
    tags: ['Key Vault', 'Managed Identity', 'RBAC', 'Compliance', 'Azure'],
    icon: <Shield size={24} />,
    color: 'from-rose-500 to-pink-500',
  },
  {
    title: 'Cloud Cost Optimization',
    description:
      'Built a cost monitoring and alerting system using Azure Cost Management and custom dashboards, driving a 30% reduction in monthly spend.',
    tags: ['Azure', 'Cost Management', 'Monitoring', 'Grafana', 'Cloud'],
    icon: <Zap size={24} />,
    color: 'from-violet-500 to-indigo-500',
  },
]

const EXPERIENCE = [
  {
    role: 'DevOps Engineer',
    company: 'Metagenics',
    period: '2023 – Present',
    description:
      'Lead DevOps engineering for the DOPS team supporting a MACH-architecture e-commerce platform. Own the full CI/CD ecosystem, cloud infrastructure, security posture, and release lifecycle across Azure DevOps and GitHub.',
    highlights: [
      'Built and maintain a 12-agent DevOps automation system powered by Claude AI',
      'Designed multi-environment promotion pipeline (DEV → QA → Staging → Prod)',
      'Implemented DevSecOps practices with zero-secrets-in-code policy',
      'Reduced deployment failures by 60% via improved pipeline gates and runbooks',
    ],
  },
  {
    role: 'Cloud Infrastructure Engineer',
    company: 'Previous Role',
    period: '2021 – 2023',
    description:
      'Managed cloud infrastructure across AWS and Azure, built automation tooling, and led the migration of legacy systems to container-based architectures on Kubernetes.',
    highlights: [
      'Migrated 20+ microservices to Kubernetes with zero downtime',
      'Authored Terraform modules adopted across 3 engineering teams',
      'Reduced infrastructure provisioning time from days to under 30 minutes',
    ],
  },
]

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
            <a
              key={link.href}
              href={link.href}
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="mailto:emc.sioson@gmail.com"
          className="btn-primary px-4 py-2 rounded-lg text-sm font-semibold text-white"
        >
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
          Available for opportunities
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-4 leading-none tracking-tight">
          <span className="gradient-text">Earl</span>{' '}
          <span className="text-white">Sioson</span>
        </h1>

        <p className="text-2xl md:text-3xl font-bold text-slate-300 mb-6">
          DevOps &amp; Cloud Engineer
        </p>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Building resilient cloud infrastructure, automating everything, and shipping software
          faster — from IaC to CI/CD to Kubernetes at scale.
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
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="p-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all duration-200"
            >
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
              I'm a DevOps and Cloud Engineer with a passion for building the systems that let
              teams ship with confidence. From provisioning infrastructure with Terraform to
              designing zero-downtime deployment pipelines, I bridge the gap between development
              speed and operational stability.
            </p>
            <p>
              At Metagenics, I lead the DOPS team's cloud engineering efforts — owning CI/CD,
              AKS infrastructure, security posture, and the entire release lifecycle for a
              modern MACH e-commerce platform on Azure.
            </p>
            <p>
              When I'm not automating toil, I'm exploring AI-augmented DevOps workflows —
              including multi-agent systems that help teams move faster without burning out.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { value: '5+', label: 'Years in Cloud & DevOps', icon: <Cloud size={20} /> },
            { value: '99.9%', label: 'Platform Uptime Target', icon: <Activity size={20} /> },
            { value: '60%', label: 'Fewer Deployment Failures', icon: <GitBranch size={20} /> },
            { value: '30%', label: 'Cloud Cost Reduction', icon: <Zap size={20} /> },
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

          <div className="space-y-10">
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="pl-20 relative">
                <div className="timeline-dot absolute left-6 top-1.5 w-4 h-4 rounded-full -translate-x-1/2" />
                <div className="card-glow rounded-2xl p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-black text-xl text-white">{exp.role}</h3>
                      <p className="text-indigo-400 font-semibold">{exp.company}</p>
                    </div>
                    <span className="text-slate-400 text-sm font-medium bg-white/5 px-3 py-1 rounded-full border border-white/8">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{exp.description}</p>
                  <ul className="space-y-2">
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
          Open to senior DevOps, platform engineering, and cloud architecture roles.
          Let's talk about how I can help your team ship faster and sleep better.
        </p>

        <a
          href="mailto:emc.sioson@gmail.com"
          className="btn-primary inline-flex items-center gap-3 px-10 py-4 rounded-xl font-semibold text-white text-lg mb-12"
        >
          <Mail size={20} />
          emc.sioson@gmail.com
        </a>

        <div className="flex items-center justify-center gap-4">
          {[
            { icon: <GithubIcon size={22} />, label: 'GitHub', href: 'https://github.com/eaarrll' },
            { icon: <LinkedinIcon size={22} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/earl-martin-sioson/' },
            { icon: <Mail size={22} />, label: 'Email', href: 'mailto:emc.sioson@gmail.com' },
          ].map(s => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all duration-200 font-medium text-sm"
            >
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
        © {new Date().getFullYear()} Earl Sioson · Built with React + Tailwind
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
