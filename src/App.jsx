import { useState, useEffect, useRef } from 'react'
import {
  Cloud, GitBranch, Shield, Server, Activity, Mail, ChevronDown,
  Layers, Globe, Zap, Database, Sparkles, ExternalLink,
  ArrowUpRight, Radio, MapPin, Boxes, Gauge, FolderGit2,
  Users, Workflow, Rocket, Bot, Siren, ListChecks, TrendingDown, Briefcase,
  CloudRain, Wallet,
} from 'lucide-react'

const GITHUB_URL = 'https://github.com/eaarrll'
const LINKEDIN_URL = 'https://www.linkedin.com/in/earl-martin-sioson/'
const EMAIL = 'emc.sioson@gmail.com'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'AI', href: '#ai' },
  { label: 'Lab', href: '#lab' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const TECH_MARQUEE = [
  'AWS', 'Azure', 'Kubernetes', 'Terraform', 'Docker', 'GitHub Actions',
  'Azure DevOps', 'Bicep', 'CloudFormation', 'Helm', 'GitLab CI', 'Jenkins',
  'Datadog', 'Prometheus', 'Grafana', 'PowerShell', 'Python', 'Ansible',
  'Claude Code', 'MCP',
]

const SKILLS = [
  {
    category: 'CI/CD & Release Automation',
    icon: <GitBranch size={18} />,
    items: ['GitHub Actions', 'Azure DevOps Pipelines (Classic & YAML)', 'Jenkins', 'GitLab CI', 'Reusable Templates', 'Approval Gates', 'Release Management'],
  },
  {
    category: 'AI & Agentic Ops',
    icon: <Bot size={18} />,
    items: ['Claude Code', 'MCP (Model Context Protocol)', 'Azure AI Foundry Agents', 'ChatGPT', 'FastAPI', 'Agentic Workflows'],
  },
  {
    category: 'Containers & IaC',
    icon: <Layers size={18} />,
    items: ['Docker', 'Kubernetes (AKS, EKS)', 'Helm', 'Terraform', 'Bicep', 'ARM Templates', 'CloudFormation', 'Ansible'],
  },
  {
    category: 'AWS',
    icon: <Globe size={18} />,
    items: ['Lambda', 'API Gateway', 'DynamoDB', 'S3', 'EC2', 'EKS', 'CloudFront', 'Route 53', 'IAM'],
  },
  {
    category: 'Azure',
    icon: <Cloud size={18} />,
    items: ['AKS', 'App Services', 'Storage', 'Key Vault', 'VNets', 'Landing Zones', 'Azure Monitor', 'Log Analytics', 'Application Insights'],
  },
  {
    category: 'Security & DevSecOps',
    icon: <Shield size={18} />,
    items: ['GitHub OIDC', 'Least-Privilege IAM / RBAC', 'Azure Key Vault', 'AWS Secrets Manager', 'AWS WAF', 'Cloudflare WAF'],
  },
  {
    category: 'Observability',
    icon: <Activity size={18} />,
    items: ['Datadog', 'Prometheus', 'Grafana', 'Loki', 'PRTG', 'Azure Monitor', 'CloudWatch', 'ELK'],
  },
  {
    category: 'Scripting',
    icon: <Workflow size={18} />,
    items: ['PowerShell', 'Python', 'Bash', 'Azure CLI', 'AWS CLI'],
  },
  {
    category: 'ITSM & Delivery',
    icon: <ListChecks size={18} />,
    items: ['ServiceNow', 'Jira', 'Confluence', 'CAB / Change Management', 'RCA & Runbook Writing'],
  },
]

const PROJECTS = [
  {
    title: 'CI/CD Re-Architecture, 40% Faster',
    description:
      'Re-architected global e-commerce CI/CD on AWS with parallel execution, approval gates, reusable patterns, and rollback workflows — cutting release cycle time ~40% — with CAB-governed releases run end to end, secured with GitHub OIDC and least-privilege IAM.',
    tags: ['AWS', 'GitHub Actions', 'OIDC', 'Terraform', 'Rollback'],
    icon: <Rocket size={24} />,
    color: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Azure DevOps Pipeline Platform',
    description:
      'Reusable Azure DevOps pipeline templates (Classic & YAML) for build validation, automated testing, deployment approvals, secret integration, and environment promotion — standardizing delivery and cutting per-client setup effort ~50%.',
    tags: ['Azure DevOps', 'YAML', 'Bicep', 'Key Vault', 'Release Gates'],
    icon: <Workflow size={24} />,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Serverless DR & Cost Optimization',
    description:
      'Designed cross-region disaster recovery for a serverless AWS stack (Lambda, API Gateway, DynamoDB, S3) with defined RTO/RPO targets — and led a FinOps audit that cut AWS spend ~30% (~$180K/year).',
    tags: ['AWS', 'Disaster Recovery', 'Serverless', 'FinOps'],
    icon: <Shield size={24} />,
    color: 'from-rose-500 to-pink-500',
  },
  {
    title: '150+ App Migration to AKS',
    description:
      'Led migration of 150+ applications to Azure Kubernetes Service — delivered 2 months ahead of schedule with zero production downtime — and established the org’s first IaC standards with Terraform and Helm.',
    tags: ['AKS', 'Kubernetes', 'Helm', 'Terraform', 'Zero Downtime'],
    icon: <Server size={24} />,
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Multi-Cloud Landing Zones',
    description:
      'Built self-service pipelines that let teams stand up compliant, policy-aligned cloud environments on demand — backed by reusable Terraform and Bicep module libraries with governance and FinOps built in.',
    tags: ['Terraform', 'Bicep', 'Azure', 'Landing Zones', 'FinOps'],
    icon: <Layers size={24} />,
    color: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'AI Agents for TechOps',
    description:
      'An incident-triage agent for a high-volume ServiceNow queue, an Azure AI Foundry tagging agent for a 30-company multinational, and Claude Code + MCP automation for release notes, ticket rollups, and PR reviews.',
    tags: ['Claude Code', 'MCP', 'Azure AI Foundry', 'ServiceNow'],
    icon: <Sparkles size={24} />,
    color: 'from-violet-500 to-indigo-500',
  },
]

/* Personal projects pulled from github.com/eaarrll */
const LAB_FEATURED = {
  title: 'Infra Status Dashboard',
  description:
    'A real-time uptime board that aggregates official status feeds from major cloud and developer platforms via RSS — server-rendered with Next.js ISR and auto-refreshed every 60 seconds. The single pane of glass I wished every on-call engineer had open.',
  tags: ['Next.js 16', 'React 19', 'TypeScript', 'RSS', 'ISR', 'Vercel'],
  live: 'https://infra-status-dashboard.vercel.app',
  repo: 'https://github.com/eaarrll/infra-status-dashboard',
}

const LAB = [
  {
    title: 'Abiso — Barangay Alert Relay',
    kind: 'Civic Tech',
    description:
      'Turns PAGASA’s province-wide warnings into barangay-level SMS in Filipino and English, tracks who acknowledged, and escalates to the municipal DRRMO when nobody replies. Fails closed, dry-run by default, with CI, Docker, and Terraform on Azure.',
    tags: ['Python', 'GitHub Actions', 'Docker', 'Terraform', 'Azure'],
    repo: 'https://github.com/eaarrll/abiso',
    icon: <CloudRain size={22} />,
    accent: 'from-sky-500 to-indigo-500',
  },
  {
    title: 'SRE-PH · Life Admin',
    kind: 'Web App',
    web: true,
    description:
      'Treats Philippine bureaucracy like production infrastructure — an SRE-style dashboard that tracks IDs, licenses, and renewals with SLAs, expiry alerts, and Gemini-powered guidance.',
    tags: ['TypeScript', 'Gemini API', 'Vite', 'Vercel'],
    live: 'https://id-tracker-psi.vercel.app',
    repo: 'https://github.com/eaarrll/id-tracker',
    icon: <Radio size={22} />,
    accent: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Manila Outages',
    kind: 'Android',
    description:
      'Metro Manila power & water interruption tracker with a crowdsourced outage map and AI-summarized advisories. Native Android, built in Kotlin.',
    tags: ['Android', 'Kotlin', 'Gemini API', 'Maps'],
    repo: 'https://github.com/eaarrll/manila-outages',
    icon: <Zap size={22} />,
    accent: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Para Po! — Commuter ETA',
    kind: 'Android',
    description:
      'Crowdsourced ETA tracking for jeepneys, UV Express, and provincial buses with no GPS trackers — commuters help commuters wait less. Kotlin + Gemini.',
    tags: ['Android', 'Kotlin', 'Gemini API', 'Crowdsourced'],
    repo: 'https://github.com/eaarrll/ph-commute-eta-tracker',
    icon: <MapPin size={22} />,
    accent: 'from-green-500 to-emerald-500',
  },
  {
    title: 'BIR Discount Validator',
    kind: 'Android',
    description:
      'Philippine BIR compliance calculator with an OCR receipt scanner and logbook parser for senior-citizen & PWD discounts — purpose-built for small businesses.',
    tags: ['Android', 'Kotlin', 'Gemini API', 'OCR'],
    repo: 'https://github.com/eaarrll/BIR-discount-calculator',
    icon: <Boxes size={22} />,
    accent: 'from-violet-500 to-indigo-500',
  },
  {
    title: 'Pondo — Personal Finance',
    kind: 'Local-first App',
    description:
      'A single-user finance tracker that runs entirely on your machine with one SQLite file: banks, GCash/Maya e-wallets, cards, budgets, bills, and daily-to-annual dashboards.',
    tags: ['TypeScript', 'SQLite', 'Local-first'],
    repo: 'https://github.com/eaarrll/pondo',
    icon: <Wallet size={22} />,
    accent: 'from-rose-500 to-pink-500',
  },
]

/* Custom Claude Code skills & AI automations Earl runs day to day */
const AI_SKILLS = [
  {
    kind: 'Agent · Building',
    title: 'AI Incident Triage Agent',
    description:
      'For a high-volume ServiceNow TechOps queue: pulls the matching SOPs and audit forms from the internal wiki, surfaces prior tickets on the same system, and runs read-only Azure CLI checks, so engineers start every ticket with context instead of from zero.',
    tags: ['ServiceNow', 'Azure CLI', 'Retrieval', 'Read-only'],
    icon: <Siren size={22} />,
    accent: 'from-rose-500 to-orange-500',
  },
  {
    kind: 'Agent · POC',
    title: 'Azure Tagging Agent',
    description:
      'Built on Azure AI Foundry (GPT-4o-mini) for a multinational with 30 operating companies: infers resource tags from naming conventions and drafts policy for a human to review before anything is enforced.',
    tags: ['Azure AI Foundry', 'GPT-4o-mini', 'Azure Policy', 'Governance'],
    icon: <Bot size={22} />,
    accent: 'from-cyan-500 to-blue-500',
  },
  {
    kind: 'Claude Code + MCP',
    title: 'Release & Ticket Automation',
    description:
      'Nine custom commands that run my release workflow end to end — deploy-readiness checklists, release notes, ticket rollups, PR review summaries, fix-version tagging, and Jira sync — turning a manual pre-deploy ritual into a single command.',
    tags: ['Claude Code', 'MCP', 'Jira', 'Release Mgmt'],
    icon: <ListChecks size={22} />,
    accent: 'from-violet-500 to-indigo-500',
  },
  {
    kind: 'Claude Code Skill',
    title: 'Incident & Ops Comms Engine',
    description:
      'A custom Claude Code skill that drafts RCA write-ups, PR audit reports, release notes, and ticket-status summaries in my team’s established formats — verdict-first, evidence-before-recommendation, and never inventing facts.',
    tags: ['Claude Code', 'RCA', 'Incident Response', 'PR Review'],
    icon: <Briefcase size={22} />,
    accent: 'from-amber-500 to-orange-500',
  },
  {
    kind: 'Guardrail',
    title: 'Evidence-First Investigation Gate',
    description:
      'A rule in my Claude Code setup that walks every root-cause analysis through nine steps — ticket history, attachments, runbooks, code, reproduction, failure-first monitoring, timeline, scale, and a disprove pass — before any conclusion gets posted.',
    tags: ['Claude Code', 'RCA', 'Guardrails'],
    icon: <Shield size={22} />,
    accent: 'from-green-500 to-emerald-500',
  },
  {
    kind: 'Cost Engineering',
    title: '60–90% Lower LLM Token Cost',
    description:
      'Run my AI dev toolchain through RTK, an open-source token-optimizing CLI proxy, cutting token consumption 60–90% on routine operations with transparent command rewriting and per-command savings analytics.',
    tags: ['RTK', 'Cost Optimization', 'LLM', 'FinOps'],
    icon: <TrendingDown size={22} />,
    accent: 'from-sky-500 to-cyan-500',
  },
]

const STATS = [
  { value: 8, suffix: '+', label: 'Years in DevOps & Cloud', icon: <Cloud size={20} /> },
  { value: 150, suffix: '+', label: 'Apps Migrated to Kubernetes', icon: <Server size={20} /> },
  { value: 500, suffix: '+', label: 'Cloud Instances Administered', icon: <Database size={20} /> },
  { value: 25, suffix: '+', label: 'Engineers Mentored & Upskilled', icon: <Users size={20} /> },
]

const EXPERIENCE = [
  {
    role: 'Senior DevOps Engineer',
    company: 'ConnectOS',
    period: '2025 – Present',
    description: 'Managed DevOps services for two enterprise clients in parallel — a global e-commerce platform on AWS and a multinational with 30 operating companies on Azure — embedded with client engineering and TechOps teams.',
    highlights: [
      'Own production releases and CI/CD for a global e-commerce platform — re-architected pipelines with parallel execution, approval gates, reusable patterns, and rollback workflows (release cycle time down ~40%), run CAB-governed releases end to end, and automated release notes, ticket rollups, and PR review summaries with Claude Code and MCP',
      'Building an AI incident-triage agent for a high-volume ServiceNow TechOps queue that retrieves the matching SOPs and audit forms, surfaces prior tickets on the same system, and runs read-only Azure CLI checks, so engineers start every ticket with context',
      'Led remediation of a credential-exposure finding — moved GitHub Actions deployments to OIDC federated access, removed long-lived keys, and hardened IAM to least privilege, closing the high-risk scan findings',
      'Led a cost-optimization audit that cut AWS spend ~30% (~$180K/year) through rightsizing, Reserved Instance planning, and decommissioning idle resources',
      'Designed the disaster-recovery strategy for a serverless platform (Lambda, API Gateway, DynamoDB, S3): cross-region failover, automated backups, and defined RTO/RPO targets',
      'Drive production incident investigation and RCA across a multi-vendor stack (AWS, CloudFront, Cloudflare, Vercel); an audit of production Datadog monitoring showed that alert design, not threshold tuning, was the core reliability gap',
      'Delivered Azure governance work: an AI tagging agent (POC) on Azure AI Foundry that infers tags from naming conventions and drafts policy for human review, plus EOL and service-retirement assessments ahead of Microsoft deadlines',
      'Built CDN monitoring for Akamai DataStream 2 and Fastly on Azure (Prometheus, Grafana, Loki, custom FastAPI receiver) and took it from proof of concept to a live client project',
    ],
  },
  {
    role: 'DevOps Engineer',
    company: '3Cloud',
    period: 'Jul 2023 – 2025',
    description: 'Delivered enterprise Azure DevOps automation and infrastructure for multiple consulting clients — from reusable pipeline templates to self-service landing zones and FinOps.',
    highlights: [
      'Designed and maintained Azure DevOps pipeline templates (Classic & YAML) for build validation, automated testing, deployment approvals, secret integration, and environment promotion',
      'Built self-service pipelines for Azure resource provisioning and landing zones, letting teams stand up compliant, policy-aligned environments on demand',
      'Authored reusable Terraform and Bicep module libraries and standardized pipeline patterns — reducing per-client setup effort by ~50% and configuration drift',
      'Implemented FinOps practices — resource tagging, budget alerts, and rightsizing — giving clients clear spend visibility and cutting waste across subscriptions',
      'Replaced a manual, RDP-dependent deployment with an Azure DevOps release pipeline on a self-hosted agent',
    ],
  },
  {
    role: 'Senior DevOps Engineer',
    company: 'Asurion',
    period: 'Jun 2022 – Feb 2023',
    description: 'Operated fault-tolerant, multi-cloud infrastructure across AWS and Azure for customer-facing device-insurance services, with 24/7 production ownership.',
    highlights: [
      'Led production Kubernetes version upgrades across EKS and AKS clusters with minimal-to-zero downtime using controlled node rotation and surge capacity',
      'Built multi-cloud infrastructure and deployment automation with Terraform and Ansible, standardizing compute, networking, access controls, and patching across AWS and Azure',
      'Automated patch management across 50+ instances with Ansible — raising patch compliance above 99% and closing a recurring security audit finding',
      'Led 24/7 on-call incident response with structured RCA and playbooks, mentored 3 junior engineers, and delivered ~$120K in annual cloud savings',
    ],
  },
  {
    role: 'DevOps Engineer',
    company: 'Safeway Philtech Inc.',
    period: 'Jun 2020 – May 2022',
    description: 'Drove the largest containerization effort at this Albertsons IT subsidiary (2,200+ US retail stores) — migrating 150+ apps to AKS and setting IaC standards.',
    highlights: [
      'Led migration of 150+ applications to Azure Kubernetes Service — delivered 2 months ahead of schedule with zero production downtime',
      'Established the company’s first Infrastructure-as-Code standards with Terraform and Helm, enforcing environment parity from dev through production',
      'Built CI/CD workflows for containerized apps — automated build, test, image publishing, Helm deployment, and controlled release promotion into AKS',
      'Mentored 9 system administrators into DevOps engineers through a structured Git, Jenkins, Terraform, Docker, Kubernetes, and Helm curriculum',
    ],
  },
  {
    role: 'DevOps Specialist',
    company: 'Home Credit Philippines',
    period: 'Oct 2019 – May 2020',
    description: 'Introduced CI/CD automation and release governance for a BSP-regulated consumer-finance platform processing 1M+ monthly transactions.',
    highlights: [
      'Built GitLab CI pipelines for application delivery and test automation, with automated rollback reducing deployment failure rate by ~80%',
      'Strengthened release governance with approval gates, deployment logs, and access restrictions in a regulated, BSP-compliant environment — zero critical audit findings',
      'Automated cloud provisioning with Terraform and Ansible, eliminating environment drift between development and production',
    ],
  },
  {
    role: 'DevOps Engineer',
    company: 'Accenture Inc.',
    period: 'Dec 2017 – Sep 2019',
    description: 'Built AWS infrastructure and CI/CD automation for Fortune 500 clients including Best Buy, establishing IaC and deployment standards from the ground up.',
    highlights: [
      'Built Jenkins CI/CD workflows with zero-downtime blue-green deployments for a retail employee portal serving 100,000+ associates',
      'Created reusable Terraform and Ansible frameworks that cut environment provisioning from 2 weeks to 2 days',
      'Trained 15+ developers on CI/CD and Infrastructure-as-Code best practices across client engagements',
    ],
  },
]

const CERTS = [
  { name: 'Azure DevOps Engineer Expert', code: 'AZ-400', issuer: 'Microsoft Certified', color: 'from-blue-500 to-indigo-500' },
  { name: 'Azure Administrator Associate', code: 'AZ-104', issuer: 'Microsoft Certified', color: 'from-cyan-500 to-blue-500' },
  { name: 'Azure Fundamentals', code: 'AZ-900', issuer: 'Microsoft Certified', color: 'from-sky-500 to-cyan-500' },
  { name: 'AWS Solutions Architect Associate', code: 'SAA-C03', issuer: 'AWS', color: 'from-amber-500 to-orange-500', inProgress: true },
]

function GithubIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

/* ── Hooks ──────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach(e => e.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(en => {
          if (en.isIntersecting) {
            en.target.classList.add('is-visible')
            io.unobserve(en.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [])
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(en => {
          if (en.isIntersecting) setActive(en.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [ids])
  return active
}

function Counter({ value, suffix = '', duration = 1500 }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const tick = t => {
          const p = Math.min(1, (t - start) / duration)
          const eased = 1 - Math.pow(1 - p, 3)
          setN(Math.round(eased * value))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [value, duration])
  return <span ref={ref}>{n}{suffix}</span>
}

/* ── Background & chrome ────────────────────────────── */
function Background() {
  const ref = useRef(null)
  useEffect(() => {
    let raf = 0
    const onMove = e => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = ref.current
        if (!el) return
        el.style.setProperty('--mx', `${e.clientX}px`)
        el.style.setProperty('--my', `${e.clientY}px`)
      })
    }
    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <div ref={ref} className="bg-fx" aria-hidden="true">
      <div className="bg-grid-base" />
      <div className="bg-grid-spot" />
      <div className="bg-spotlight" />
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
    </div>
  )
}

function ScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setP(max > 0 ? h.scrollTop / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="progress-bar" style={{ transform: `scaleX(${p})` }} aria-hidden="true" />
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(['about', 'skills', 'work', 'ai', 'lab', 'experience', 'contact'])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-blur' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="font-black text-lg gradient-text mono tracking-tight">&gt;_ES</a>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200 ${active === link.href.slice(1) ? 'active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </div>
        <a href={`mailto:${EMAIL}`} className="btn-primary px-4 py-2 rounded-lg text-sm font-semibold text-white">
          Hire Me
        </a>
      </div>
    </nav>
  )
}

/* ── Sections ───────────────────────────────────────── */
const TERMINAL_LINES = [
  { t: <><span className="text-cyan-400">$</span> whoami</> },
  { t: <span className="text-slate-300">earl-sioson — senior devops &amp; cloud engineer</span> },
  { t: <><span className="text-cyan-400">$</span> cat stack.txt</> },
  { t: <span className="text-indigo-300">aws · azure · kubernetes · terraform</span> },
  { t: <><span className="text-cyan-400">$</span> terraform apply --auto-approve</> },
  { t: <span className="text-green-400">✓ multi-cloud infra provisioned</span> },
  { t: <span className="text-green-400">✓ pipeline green · 0 downtime</span> },
  { t: <><span className="text-cyan-400">$</span> <span className="cursor" /></> },
]

function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-start lg:items-center px-6 pt-28 pb-16 relative">
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
        {/* Left — intro */}
        <div className="fade-in text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-7">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Open to Relocation · Remote / Hybrid / On-site
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 leading-none tracking-tight">
            <span className="gradient-text">Earl</span>{' '}
            <span className="text-white">Sioson</span>
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-slate-300 mb-5">
            Senior DevOps &amp; <span className="gradient-text">Cloud</span> Engineer
          </p>
          <p className="text-slate-400 text-lg max-w-xl mx-auto lg:mx-0 mb-9 leading-relaxed">
            8+ years building CI/CD pipelines and multi-cloud infrastructure that ship fast and stay up —
            <span className="text-slate-200 font-medium"> AWS &amp; Azure · Kubernetes · Terraform</span>. Lately, I
            automate the ops toolchain itself with custom <span className="text-slate-200 font-medium">AI agents &amp; Claude Code skills</span>.
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <a href="#lab" className="btn-primary px-8 py-3.5 rounded-xl font-semibold text-white text-base">
              View My Work
            </a>
            <a href="#contact" className="btn-secondary px-8 py-3.5 rounded-xl font-semibold text-white text-base">
              Get In Touch
            </a>
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-4 mt-9">
            {[
              { icon: <GithubIcon size={20} />, href: GITHUB_URL, label: 'GitHub' },
              { icon: <LinkedinIcon size={20} />, href: LINKEDIN_URL, label: 'LinkedIn' },
              { icon: <Mail size={20} />, href: `mailto:${EMAIL}`, label: 'Email' },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={s.label}
                className="p-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right — terminal */}
        <div className="fade-in" style={{ animationDelay: '0.15s' }}>
          <div className="terminal max-w-md mx-auto lg:ml-auto">
            <div className="terminal-bar">
              <span className="term-dot" style={{ background: '#ff5f57' }} />
              <span className="term-dot" style={{ background: '#febc2e' }} />
              <span className="term-dot" style={{ background: '#28c840' }} />
              <span className="ml-2 text-xs text-slate-500 mono">earl@cloud — zsh</span>
            </div>
            <div className="terminal-body">
              {TERMINAL_LINES.map((line, i) => (
                <div key={i} className="term-line" style={{ animationDelay: `${0.5 + i * 0.45}s` }}>
                  {line.t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <a href="#about" aria-label="Scroll to about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-slate-300 transition-colors animate-bounce">
        <ChevronDown size={24} />
      </a>
    </section>
  )
}

function Marquee() {
  const items = [...TECH_MARQUEE, ...TECH_MARQUEE]
  return (
    <div className="py-8 border-y border-white/5 bg-black/20">
      <div className="marquee">
        <div className="marquee-track">
          {items.map((t, i) => (
            <span key={i} className="marquee-item mono">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="reveal">
          <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">About Me</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            Engineering reliability<br />
            <span className="gradient-text">at cloud scale</span>
          </h2>
          <div className="space-y-4 text-slate-400 text-base leading-relaxed">
            <p>
              Senior DevOps &amp; Cloud Engineer with 8+ years designing, building, and maintaining CI/CD pipelines
              and multi-cloud infrastructure that let teams ship quickly and reliably. Equally at home on
              <span className="text-slate-200 font-medium"> AWS and Azure</span> — from EC2, Lambda, and EKS to AKS,
              App Services, and Azure DevOps — with deep Terraform, Bicep, and Kubernetes experience. At ConnectOS I
              support two enterprise clients in parallel, owning production releases, incident investigation,
              security hardening, and cost work.
            </p>
            <p>
              I diagnose build and release failures fast, harden pipelines with secrets management and policy gates,
              and keep developer productivity unblocked. Increasingly, I automate that work itself — building custom
              <a href="#ai" className="text-indigo-300 hover:text-white underline underline-offset-4 decoration-indigo-500/40"> AI agents &amp; Claude Code skills</a> for
              incident triage, releases, and code reviews. Along the way I've led 24/7 incident
              response and mentored 25+ engineers into DevOps roles. Azure DevOps Engineer Expert (AZ-400) certified,
              with AWS Solutions Architect in progress.
            </p>
            <p>
              Off the clock, I ship <a href="#lab" className="text-indigo-300 hover:text-white underline underline-offset-4 decoration-indigo-500/40">side projects</a> —
              from a disaster-alert relay for Philippine barangays and a live infra status dashboard to AI-powered
              Android apps solving everyday Filipino problems.
            </p>
            <p className="flex items-center gap-2 text-slate-500 text-sm">
              <MapPin size={15} className="text-indigo-400" /> Manila, Philippines · Open to Relocation, Hybrid &amp; Remote
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="reveal card-glow rounded-2xl p-6 text-center" style={{ '--d': `${i * 0.08}s` }}>
              <div className="flex items-center justify-center mb-3 text-indigo-400">{stat.icon}</div>
              <div className="text-3xl font-black gradient-text mb-1">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
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
        <div className="text-center mb-16 reveal">
          <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">Tech Stack</p>
          <h2 className="text-4xl md:text-5xl font-black text-white section-heading">Skills &amp; Tools</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((group, i) => (
            <div key={group.category} className="reveal card-glow rounded-2xl p-6" style={{ '--d': `${(i % 3) * 0.08}s` }}>
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
    <section id="work" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">Selected Work</p>
          <h2 className="text-4xl md:text-5xl font-black text-white section-heading">What I've Shipped</h2>
          <p className="text-slate-400 mt-5 max-w-2xl mx-auto">Enterprise infrastructure and platform work delivered across six companies.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <div key={project.title} className="reveal card-glow rounded-2xl p-6 flex flex-col group" style={{ '--d': `${(i % 3) * 0.08}s` }}>
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

function LiveLinks({ live, repo, compact }) {
  return (
    <div className="flex items-center gap-3">
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noreferrer"
          className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
        >
          Live Demo <ArrowUpRight size={15} />
        </a>
      )}
      <a
        href={repo}
        target="_blank"
        rel="noreferrer"
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-200 ${
          live
            ? 'text-slate-300 border-white/10 hover:border-indigo-500/40 hover:text-white'
            : 'text-slate-300 border-white/10 hover:border-indigo-500/40 hover:text-white'
        }`}
      >
        <GithubIcon size={15} /> {compact ? 'Source' : 'View Source'}
      </a>
    </div>
  )
}

function Lab() {
  return (
    <section id="lab" className="py-24 px-6 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3 inline-flex items-center gap-2 justify-center">
            <Sparkles size={14} /> Personal Lab
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white section-heading">Things I Build for Fun</h2>
          <p className="text-slate-400 mt-5 max-w-2xl mx-auto">
            Nights-and-weekends projects from{' '}
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="text-indigo-300 hover:text-white underline underline-offset-4 decoration-indigo-500/40">
              github.com/eaarrll
            </a>{' '}
            — shipping real tools for real problems, from Python pipelines with Terraform and CI to Kotlin and Next.js apps on the Gemini API.
          </p>
        </div>

        {/* Featured — Infra Status Dashboard */}
        <div className="reveal card-glow card-ring rounded-3xl p-7 md:p-9 mb-6 grid lg:grid-cols-2 gap-8 items-center overflow-hidden">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold badge-live">
                <span className="live-dot" /> Live
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Featured · Web App
              </span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white">
                <Gauge size={24} />
              </div>
              <h3 className="font-black text-white text-2xl">{LAB_FEATURED.title}</h3>
            </div>
            <p className="text-slate-400 leading-relaxed mb-5">{LAB_FEATURED.description}</p>
            <div className="flex flex-wrap gap-2 mb-7">
              {LAB_FEATURED.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-slate-400 border border-white/8 mono">
                  {tag}
                </span>
              ))}
            </div>
            <LiveLinks live={LAB_FEATURED.live} repo={LAB_FEATURED.repo} />
          </div>

          {/* Faux status board preview */}
          <div className="terminal">
            <div className="browser-bar">
              <span className="term-dot" style={{ background: '#ff5f57' }} />
              <span className="term-dot" style={{ background: '#febc2e' }} />
              <span className="term-dot" style={{ background: '#28c840' }} />
              <span className="browser-url mono">infra-status-dashboard.vercel.app</span>
            </div>
            <div className="p-4 space-y-2.5">
              {[
                { name: 'Amazon Web Services', ok: true },
                { name: 'GitHub', ok: true },
                { name: 'Cloudflare', ok: false },
                { name: 'Vercel', ok: true },
                { name: 'Microsoft Azure', ok: true },
              ].map(row => (
                <div key={row.name} className="status-row">
                  <span className="text-slate-300">{row.name}</span>
                  <span className={`inline-flex items-center gap-1.5 font-semibold ${row.ok ? 'text-green-400' : 'text-amber-400'}`}>
                    <span className="w-2 h-2 rounded-full" style={{ background: row.ok ? '#4ade80' : '#fbbf24' }} />
                    {row.ok ? 'Operational' : 'Degraded'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grid of the rest */}
        <div className="grid md:grid-cols-2 gap-6">
          {LAB.map((p, i) => (
            <div key={p.title} className="reveal card-glow card-ring rounded-2xl flex flex-col group overflow-hidden" style={{ '--d': `${(i % 2) * 0.08}s` }}>
              {p.web && (
                <div className="browser-bar">
                  <span className="term-dot" style={{ background: '#ff5f57' }} />
                  <span className="term-dot" style={{ background: '#febc2e' }} />
                  <span className="term-dot" style={{ background: '#28c840' }} />
                  <span className="browser-url mono">{p.live.replace('https://', '')}</span>
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${p.accent} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                    {p.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    {p.live && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold badge-live">
                        <span className="live-dot" /> Live
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-white/5 text-slate-400 border border-white/10">
                      {p.kind}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-white text-lg mb-2.5 leading-tight">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-slate-400 border border-white/8 mono">
                      {tag}
                    </span>
                  ))}
                </div>
                <LiveLinks live={p.live} repo={p.repo} compact />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-white"
          >
            <FolderGit2 size={18} /> Browse all repositories on GitHub
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}

function AiAutomation() {
  return (
    <section id="ai" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3 inline-flex items-center gap-2 justify-center">
            <Bot size={14} /> AI Automation
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white section-heading">DevOps, Automated with AI</h2>
          <p className="text-slate-400 mt-5 max-w-2xl mx-auto">
            I don't just use AI tools — I build them into the workflow. These are the agents I'm building for
            client TechOps teams, plus the Claude Code skills and guardrails I run day to day.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {AI_SKILLS.map((s, i) => (
            <div key={s.title} className="reveal card-glow card-ring rounded-2xl p-6 flex flex-col group" style={{ '--d': `${i * 0.08}s` }}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.accent} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                  {s.icon}
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/5 text-slate-400 border border-white/10">
                  {s.kind}
                </span>
              </div>
              <h3 className="font-bold text-white text-lg mb-2.5 leading-tight">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{s.description}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-slate-400 border border-white/8 mono">
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

function Consulting() {
  const services = ['Cloud & token-cost audits', 'Incident & release automation', 'CI/CD & platform engineering']
  return (
    <section id="consulting" className="px-6 pt-4 pb-10">
      <div className="max-w-5xl mx-auto reveal">
        <div className="card-glow card-ring rounded-3xl p-8 md:p-11 text-center">
          <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3 inline-flex items-center gap-2 justify-center">
            <Briefcase size={14} /> Consulting
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
            Bring DevOps <span className="gradient-text">+ AI automation</span> to your team
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-7 leading-relaxed">
            I help engineering teams cut cloud and LLM costs, automate incident response and release workflows,
            and ship faster on AWS &amp; Azure — available for advisory and project-based engagements.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {services.map(s => (
              <span key={s} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-500/10 text-indigo-200 border border-indigo-500/20">
                {s}
              </span>
            ))}
          </div>
          <a
            href="mailto:emc.sioson@gmail.com?subject=Consulting%20inquiry"
            className="btn-primary inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-white"
          >
            <Mail size={18} /> Book an intro call
          </a>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">Career</p>
          <h2 className="text-4xl md:text-5xl font-black text-white section-heading">Experience</h2>
        </div>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-cyan-500 to-transparent" />
          <div className="space-y-8">
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="pl-20 relative reveal" style={{ '--d': `${Math.min(i, 3) * 0.05}s` }}>
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
        <div className="mt-16 reveal">
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
        <div className="mt-10 reveal">
          <h3 className="text-2xl font-black text-white mb-6 text-center">Certifications</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTS.map(cert => (
              <div key={cert.code} className="card-glow rounded-2xl p-5 text-center relative">
                {cert.inProgress && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    In Progress
                  </span>
                )}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${cert.color} text-white font-black text-sm mb-3`}>
                  {cert.code}
                </div>
                <p className="text-white font-semibold text-sm leading-tight">{cert.issuer}</p>
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
      <div className="max-w-3xl mx-auto text-center reveal">
        <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">Contact</p>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
          Let's build something<br />
          <span className="gradient-text">remarkable together</span>
        </h2>
        <p className="text-slate-400 text-lg mb-10 leading-relaxed">
          Open to senior DevOps, platform engineering, and cloud roles across AWS and Azure — happy to relocate,
          or work hybrid or remote. Let's talk about how I can help your team ship faster and sleep better.
        </p>
        <a href={`mailto:${EMAIL}`}
          className="btn-primary inline-flex items-center gap-3 px-10 py-4 rounded-xl font-semibold text-white text-lg mb-12">
          <Mail size={20} />
          {EMAIL}
        </a>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {[
            { icon: <GithubIcon size={22} />, label: 'GitHub', href: GITHUB_URL },
            { icon: <LinkedinIcon size={22} />, label: 'LinkedIn', href: LINKEDIN_URL },
            { icon: <Mail size={22} />, label: 'Email', href: `mailto:${EMAIL}` },
          ].map(s => (
            <a key={s.label} href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
              aria-label={s.label}
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
        © {new Date().getFullYear()} Earl Martin Sioson · Manila, Philippines · Open to Relocation &amp; Remote
      </p>
      <p className="text-slate-700 text-xs mt-2 mono">Built with React · Vite · Tailwind</p>
    </footer>
  )
}

export default function App() {
  useScrollReveal()
  return (
    <div className="min-h-screen relative">
      <Background />
      <ScrollProgress />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <AiAutomation />
        <Lab />
        <Experience />
        <Consulting />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}
