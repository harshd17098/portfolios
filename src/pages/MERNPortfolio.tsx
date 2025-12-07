import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Code, 
  Database, 
  Palette, 
  Rocket, 
  Smartphone,
  Server, 
  Cloud, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink,
  Cpu, 
  Globe, 
  GitBranch, 
  Heart, 
  ChevronRight, 
  Menu, 
  X, 
  Download, 
  Terminal,
  Layers, 
  Brain, 
  Award, 
  Shield,
  Briefcase,
  Building,
  Calendar,
  MapPin,
  Zap,
  Users,
  TrendingUp,
  BarChart3
} from 'lucide-react';

// ==================== TYPES ====================
interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  imageColor: string;
  featured: boolean;
}

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'ai';
  color: string;
}

interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  type: 'full-time' | 'contract' | 'freelance';
  achievements: string[];
}

// ==================== FAKE DATA ====================
const skills: Skill[] = [
  { name: 'React', level: 95, icon: <Code />, category: 'frontend', color: '#61DAFB' },
  { name: 'Node.js', level: 90, icon: <Server />, category: 'backend', color: '#339933' },
  { name: 'MongoDB', level: 85, icon: <Database />, category: 'database', color: '#47A248' },
  { name: 'TypeScript', level: 88, icon: <Terminal />, category: 'frontend', color: '#3178C6' },
  { name: 'Express.js', level: 87, icon: <Layers />, category: 'backend', color: '#000000' },
  { name: 'Tailwind CSS', level: 92, icon: <Palette />, category: 'frontend', color: '#06B6D4' },
  { name: 'Three.js', level: 75, icon: <Rocket />, category: 'frontend', color: '#000000' },
  { name: 'AWS', level: 80, icon: <Cloud />, category: 'tools', color: '#FF9900' },
  { name: 'Docker', level: 78, icon: <Cpu />, category: 'tools', color: '#2496ED' },
  { name: 'GraphQL', level: 82, icon: <GitBranch />, category: 'backend', color: '#E10098' },
  { name: 'Redux', level: 90, icon: <Code />, category: 'frontend', color: '#764ABC' },
  { name: 'React Native', level: 85, icon: <Smartphone />, category: 'frontend', color: '#61DAFB' },
  { name: 'TensorFlow.js', level: 70, icon: <Brain />, category: 'ai', color: '#FF6F00' },
  { name: 'Next.js', level: 88, icon: <Globe />, category: 'frontend', color: '#000000' },
  { name: 'PostgreSQL', level: 83, icon: <Database />, category: 'database', color: '#336791' },
  { name: 'Redis', level: 79, icon: <Database />, category: 'database', color: '#DC382D' },
];

const projects: Project[] = [
  {
    id: 1,
    title: 'MERN E-Commerce Platform',
    description: 'Full-featured e-commerce with real-time inventory, payment integration, and admin dashboard',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    imageColor: 'from-blue-600 via-cyan-600 to-teal-600',
    featured: true,
  },
  {
    id: 2,
    title: 'Real-time Collaboration Tool',
    description: 'MERN stack collaboration platform with WebSocket real-time updates and document sharing',
    technologies: ['Socket.io', 'React', 'MongoDB', 'Express', 'JWT'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    imageColor: 'from-purple-600 via-pink-600 to-rose-600',
    featured: true,
  },
  {
    id: 3,
    title: 'MERN Dashboard Analytics',
    description: 'Comprehensive analytics dashboard with real-time data visualization and reporting',
    technologies: ['Chart.js', 'React', 'Node.js', 'MongoDB', 'Express'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    imageColor: 'from-emerald-600 via-green-600 to-lime-600',
    featured: false,
  },
  {
    id: 4,
    title: 'Social Media Platform',
    description: 'Full-stack social media app with posts, comments, likes, and user authentication',
    technologies: ['MERN Stack', 'Cloudinary', 'JWT', 'Redis', 'Socket.io'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    imageColor: 'from-orange-600 via-red-600 to-pink-600',
    featured: true,
  },
  {
    id: 5,
    title: 'AI-Powered Content Platform',
    description: 'Content management system with AI writing assistance and analytics',
    technologies: ['Next.js', 'OpenAI', 'MongoDB', 'Express', 'Prisma'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    imageColor: 'from-violet-600 via-purple-600 to-fuchsia-600',
    featured: false,
  },
  {
    id: 6,
    title: 'IoT Monitoring Dashboard',
    description: 'Real-time IoT device monitoring with MERN stack and WebSocket connections',
    technologies: ['React', 'Node.js', 'MongoDB', 'MQTT', 'Express'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    imageColor: 'from-amber-600 via-yellow-600 to-lime-600',
    featured: false,
  },
];

const experiences: Experience[] = [
  {
    id: 1,
    title: 'Senior MERN Stack Developer',
    company: 'TechVision Solutions',
    location: 'San Francisco, CA (Remote)',
    period: '2022 - Present',
    description: [
      'Lead development of enterprise-scale MERN applications for Fortune 500 clients',
      'Architected microservices-based backend systems handling 1M+ daily requests',
      'Implemented CI/CD pipelines reducing deployment time by 70%',
      'Mentored 5 junior developers in React best practices and clean architecture'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Docker', 'AWS', 'GraphQL', 'Redis', 'Kubernetes'],
    type: 'full-time',
    achievements: [
      'Increased application performance by 40% through optimization',
      'Reduced server costs by 30% with efficient AWS architecture',
      'Achieved 99.9% uptime for critical production systems'
    ]
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'Innovate Digital',
    location: 'New York, NY',
    period: '2020 - 2022',
    description: [
      'Developed 10+ full-stack applications using MERN stack',
      'Implemented real-time features using WebSocket and Socket.io',
      'Designed RESTful APIs serving 500K+ monthly users',
      'Collaborated with UX designers to create responsive interfaces'
    ],
    technologies: ['React', 'Express.js', 'MongoDB', 'Socket.io', 'JWT', 'Redux', 'Tailwind'],
    type: 'full-time',
    achievements: [
      'Delivered projects 20% faster than estimated timelines',
      'Improved client satisfaction scores by 35%',
      'Reduced page load times by 60% through optimization'
    ]
  },
  {
    id: 3,
    title: 'Frontend Developer',
    company: 'WebCraft Studios',
    location: 'Boston, MA',
    period: '2019 - 2020',
    description: [
      'Built responsive web applications with React and modern CSS',
      'Implemented state management with Redux and Context API',
      'Collaborated with backend teams on API integration',
      'Optimized applications for SEO and performance'
    ],
    technologies: ['React', 'Redux', 'TypeScript', 'SASS', 'Webpack', 'Jest'],
    type: 'full-time',
    achievements: [
      'Increased conversion rates by 25% through UX improvements',
      'Achieved perfect Lighthouse scores for performance',
      'Reduced bundle size by 40% through code splitting'
    ]
  },
  {
    id: 4,
    title: 'Freelance Web Developer',
    company: 'Self-Employed',
    location: 'Remote',
    period: '2018 - 2019',
    description: [
      'Developed custom websites and web applications for small businesses',
      'Implemented e-commerce solutions with payment integration',
      'Provided ongoing maintenance and support',
      'Built portfolio of 20+ successful client projects'
    ],
    technologies: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    type: 'freelance',
    achievements: [
      'Maintained 100% client satisfaction rate',
      'Increased client revenue by an average of 45%',
      'Built sustainable freelance business from scratch'
    ]
  }
];

const techStack = [
  { name: 'React', icon: '⚛️', level: 'Expert' },
  { name: 'Node.js', icon: '🚀', level: 'Expert' },
  { name: 'MongoDB', icon: '🍃', level: 'Advanced' },
  { name: 'Express.js', icon: '⚡', level: 'Advanced' },
  { name: 'TypeScript', icon: '📘', level: 'Advanced' },
  { name: 'Three.js', icon: '🎨', level: 'Intermediate' },
  { name: 'Docker', icon: '🐳', level: 'Intermediate' },
  { name: 'GraphQL', icon: '🔗', level: 'Advanced' },
];

const GlowingCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000" />
      <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-xl p-6 border border-gray-800">
        {children}
      </div>
    </div>
  );
};

const HolographicButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative px-8 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg font-semibold overflow-hidden group"
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
    </motion.button>
  );
};

// ==================== ANIMATED EXPERIENCE SECTION ====================
const ExperienceTimeline = () => {
  const [activeExperience, setActiveExperience] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const experienceTypes = {
    'full-time': { color: 'from-green-500 to-emerald-500', label: 'Full Time' },
    'contract': { color: 'from-blue-500 to-cyan-500', label: 'Contract' },
    'freelance': { color: 'from-purple-500 to-pink-500', label: 'Freelance' }
  };

  return (
    <section id="experience" className="py-20 px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-950 opacity-50" />
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-500 to-transparent"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${Math.sin(i) * 50}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-xl border border-cyan-500/30 mb-6 group">
              <Briefcase className="w-5 h-5 mr-3 text-cyan-400" />
              <span className="text-base font-medium bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                Professional Journey
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">Career</span>{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Timeline
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              5+ years of building scalable applications and leading development teams
            </p>
          </div>

          {/* Timeline Visualization */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Timeline Navigation */}
            <div className="space-y-6">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500/30 via-purple-500/30 to-pink-500/30" />
                
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative mb-8"
                    onClick={() => setActiveExperience(exp.id)}
                  >
                    {/* Timeline Dot */}
                    <motion.div
                      className={`absolute left-6 w-4 h-4 rounded-full cursor-pointer z-10 ${
                        activeExperience === exp.id 
                          ? 'scale-125 bg-gradient-to-r from-cyan-500 to-purple-500' 
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {activeExperience === exp.id && (
                        <motion.div
                          className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 blur opacity-50"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.div>

                    {/* Experience Card */}
                    <motion.div
                      className={`ml-12 p-6 rounded-2xl backdrop-blur-xl border cursor-pointer transition-all duration-300 ${
                        activeExperience === exp.id
                          ? 'bg-gray-900/90 border-cyan-500/50 shadow-2xl shadow-cyan-500/20'
                          : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      animate={activeExperience === exp.id ? { y: -5 } : {}}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                          <div className="flex items-center text-gray-400 text-sm mb-2">
                            <Building className="w-4 h-4 mr-2" />
                            <span>{exp.company}</span>
                            <span className="mx-2">•</span>
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                        <div className={`px-3 py-1 text-xs rounded-full bg-gradient-to-r ${experienceTypes[exp.type].color} bg-opacity-20`}>
                          {experienceTypes[exp.type].label}
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-400 mb-4">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{exp.period}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.slice(0, 3).map(tech => (
                          <span 
                            key={tech}
                            className="px-3 py-1 text-xs bg-gray-800/50 rounded-full border border-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                        {exp.technologies.length > 3 && (
                          <span className="px-3 py-1 text-xs text-gray-500">
                            +{exp.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Experience Details */}
            <div className="lg:sticky lg:top-24 h-fit">
              {experiences.map(exp => (
                <AnimatePresence mode="wait" key={exp.id}>
                  {activeExperience === exp.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <GlowingCard className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                            <div className="flex items-center text-gray-400">
                              <Building className="w-5 h-5 mr-2" />
                              <span className="text-lg">{exp.company}</span>
                            </div>
                          </div>
                          <motion.div
                            className={`px-4 py-2 rounded-full bg-gradient-to-r ${experienceTypes[exp.type].color} bg-opacity-20`}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <span className="font-semibold">{experienceTypes[exp.type].label}</span>
                          </motion.div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          <div className="text-center p-4 rounded-xl bg-gray-800/30">
                            <div className="text-3xl font-bold text-cyan-400 mb-1">5+</div>
                            <div className="text-sm text-gray-400">Years Experience</div>
                          </div>
                          <div className="text-center p-4 rounded-xl bg-gray-800/30">
                            <div className="text-3xl font-bold text-purple-400 mb-1">50+</div>
                            <div className="text-sm text-gray-400">Projects</div>
                          </div>
                          <div className="text-center p-4 rounded-xl bg-gray-800/30">
                            <div className="text-3xl font-bold text-green-400 mb-1">99%</div>
                            <div className="text-sm text-gray-400">Satisfaction</div>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                          <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                            Responsibilities
                          </h4>
                          <ul className="space-y-3">
                            {exp.description.map((item, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start"
                              >
                                <ChevronRight className="w-5 h-5 text-cyan-400 mr-2 mt-1 flex-shrink-0" />
                                <span className="text-gray-300">{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div className="mb-8">
                          <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <Code className="w-5 h-5 mr-2 text-purple-400" />
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {exp.technologies.map((tech, idx) => (
                              <motion.span
                                key={tech}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-colors"
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        {/* Achievements */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <Award className="w-5 h-5 mr-2 text-yellow-400" />
                            Key Achievements
                          </h4>
                          <div className="space-y-4">
                            {exp.achievements.map((achievement, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.15 }}
                                className="p-4 rounded-xl bg-gradient-to-r from-gray-800/30 to-gray-900/30 border border-gray-700/50"
                              >
                                <div className="flex items-center">
                                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-cyan-500 mr-3 animate-pulse" />
                                  <span className="text-gray-300">{achievement}</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </GlowingCard>

                      {/* Career Growth Visualization */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl blur" />
                        <div className="relative p-6 rounded-2xl bg-gray-900/80 backdrop-blur-xl border border-gray-800">
                          <h4 className="text-lg font-semibold mb-6 flex items-center">
                            <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                            Career Progression
                          </h4>
                          <div className="space-y-4">
                            {experiences.map((e, idx) => (
                              <motion.div
                                key={e.id}
                                className="flex items-center"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                <div className={`w-3 h-3 rounded-full mr-4 ${
                                  exp.id >= e.id 
                                    ? 'bg-gradient-to-r from-green-500 to-cyan-500' 
                                    : 'bg-gray-700'
                                }`} />
                                <div className="flex-1">
                                  <div className="flex justify-between mb-1">
                                    <span className={`font-medium ${
                                      exp.id >= e.id ? 'text-white' : 'text-gray-500'
                                    }`}>
                                      {e.title}
                                    </span>
                                    <span className="text-sm text-gray-400">{e.period}</span>
                                  </div>
                                  <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                                    <motion.div
                                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                                      initial={{ width: 0 }}
                                      animate={{ width: exp.id >= e.id ? '100%' : '0%' }}
                                      transition={{ duration: 1, delay: idx * 0.2 }}
                                    />
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>
          </div>

          {/* Additional Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '5+', label: 'Years Experience', icon: Calendar, color: 'cyan' },
                { value: '50+', label: 'Projects Delivered', icon: Code, color: 'purple' },
                { value: '100%', label: 'Client Retention', icon: Users, color: 'green' },
                { value: '40%', label: 'Avg. Performance Gain', icon: BarChart3, color: 'yellow' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-${stat.color}-500/20 to-${stat.color}-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 group-hover:border-transparent transition-all text-center">
                    <stat.icon className={`w-10 h-10 mx-auto mb-4 text-${stat.color}-400`} />
                    <div className={`text-4xl font-bold mb-2 text-${stat.color}-300`}>{stat.value}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ==================== SIMPLIFIED 3D BACKGROUND ====================
const FloatingCube = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[3, 0, -5]} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color="#00ff88" 
        emissive="#00ff88"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

const DataSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -1, -10]} castShadow>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial 
        color="#06b6d4" 
        emissive="#06b6d4"
        emissiveIntensity={0.2}
        transparent
        opacity={0.3}
        wireframe={true}
      />
    </mesh>
  );
};

const Advanced3DBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-950" />
      <div className="absolute inset-0">
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ff88" castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8b5cf6" />
          <pointLight position={[0, 10, 0]} intensity={0.5} color="#06b6d4" />
          
          <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
          
          {/* Futuristic Elements */}
          <FloatingCube />
          <DataSphere />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.2}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-gray-900/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/50 to-black" />
      
      {/* Animated scan line effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-scan-line" />
      </div>
    </div>
  );
};

// ==================== ENHANCED HERO SECTION ====================
const EnhancedHeroSection = ({ scrollToSection }: { scrollToSection: (sectionId: string) => void }) => {
  const [typingIndex, setTypingIndex] = useState(0);
  const roles = [
    "MERN Stack Developer",
    "Frontend Specialist",
    "Backend Architect",
    "Full Stack Developer",
    "Web 3.0 Enthusiast"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTypingIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="pt-40 pb-20 px-6 relative">
      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 gap-1">
            {Array.from({ length: 96 }).map((_, i) => (
              <motion.div
                key={i}
                className="bg-gray-800/20 border border-gray-700/20"
                animate={{
                  scale: [1, 1.2, 1],
                  backgroundColor: [
                    'rgba(31, 41, 55, 0.2)',
                    'rgba(6, 182, 212, 0.3)',
                    'rgba(31, 41, 55, 0.2)'
                  ]
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.02,
                  repeat: Infinity
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Enhanced Status Badge */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 mb-12 group"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative mr-4">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 animate-pulse" />
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full blur opacity-20 group-hover:opacity-40" />
            </div>
            <span className="text-base font-medium bg-gradient-to-r from-cyan-300 to-green-300 bg-clip-text text-transparent">
              MERN Stack Expert • Available for Full Stack Projects
            </span>
          </motion.div>

          {/* Main Heading with Typing Effect */}
          <div className="mb-12">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="block bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                HARSH
              </span>
              <span className="block bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text text-transparent">
                DESAI
              </span>
              <div className="h-20 mt-4">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={typingIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="block text-3xl md:text-5xl bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent"
                  >
                    {roles[typingIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </h1>
            
            {/* Animated Binary Code Line */}
            <div className="mb-8">
              <div className="font-mono text-xs md:text-sm text-green-400">
                <div className="flex space-x-1">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <motion.span
                      key={i}
                      animate={{ opacity: Math.random() > 0.5 ? 1 : 0.3 }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                    >
                      {Math.random() > 0.5 ? '1' : '0'}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl">
              I specialize in building <span className="text-cyan-300 font-bold">scalable MERN applications</span> with{" "}
              <span className="text-purple-300">modern frontend frameworks</span>,{" "}
              <span className="text-green-300">robust backend architectures</span>, and{" "}
              <span className="text-pink-300">real-time features</span> to create{" "}
              <span className="relative inline-block">
                <span className="relative z-10">exceptional digital experiences</span>
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500 animate-pulse" />
              </span>
              .
            </p>
          </div>

          {/* Interactive CTA Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Left: Tech Globe */}
            <div className="space-y-4">
              <div className="relative w-64 h-64 mx-auto">
                <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30" />
                <motion.div
                  className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10"
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl">⚛️</div>
                  </div>
                  <div className="absolute inset-0">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 rounded-full bg-cyan-500"
                        style={{
                          left: `${50 + 40 * Math.cos((i * Math.PI) / 4)}%`,
                          top: `${50 + 40 * Math.sin((i * Math.PI) / 4)}%`,
                        }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 1, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
              <p className="text-center text-gray-400 text-sm">MERN Stack • Full Stack Solutions</p>
            </div>
            
            {/* Center: CTA Buttons */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4 justify-center">
                <HolographicButton onClick={() => scrollToSection('projects')}>
                  <span className="flex items-center space-x-2">
                    <Rocket size={20} />
                    <span>View Projects</span>
                  </span>
                </HolographicButton>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-lg bg-gray-900/80 backdrop-blur-sm border border-gray-700 hover:border-green-500/50 flex items-center space-x-2 group"
                  onClick={() => scrollToSection('experience')}
                >
                  <Briefcase className="w-5 h-5 group-hover:animate-pulse" />
                  <span>View Experience</span>
                </motion.button>
              </div>
              
              {/* MERN Stack Badges */}
              <div className="flex justify-center space-x-4">
                {['MongoDB', 'Express', 'React', 'Node.js'].map((tech) => (
                  <motion.div
                    key={tech}
                    whileHover={{ scale: 1.1 }}
                    className="px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700"
                  >
                    <span className="text-sm">{tech}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Right: Skill Radar */}
            <div className="space-y-4">
              <div className="relative w-64 h-64 mx-auto">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full relative">
                    {/* Radar circles */}
                    {[1, 2, 3, 4].map((circle) => (
                      <div
                        key={circle}
                        className="absolute inset-0 border border-cyan-500/20 rounded-full"
                        style={{
                          top: `${circle * 15}%`,
                          left: `${circle * 15}%`,
                          right: `${circle * 15}%`,
                          bottom: `${circle * 15}%`,
                        }}
                      />
                    ))}
                    
                    {/* Radar sweep */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5">
                        <div className="absolute right-0 w-4 h-4 bg-cyan-500 rounded-full blur-sm" />
                        <div className="absolute right-0 w-full h-0.5 bg-gradient-to-l from-cyan-500/50 to-transparent" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-400 text-sm">Skill Radar • Full Stack Coverage</p>
            </div>
          </div>

          {/* Enhanced Tech Stack with 3D Effects */}
          <div className="relative py-12">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
            <div className="relative">
              <h3 className="text-center text-2xl font-bold mb-8">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Core Technology Stack
                </span>
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-800 group-hover:border-cyan-500/50 transition-colors">
                      <div className="text-3xl mb-2">{tech.icon}</div>
                      <div className="font-semibold text-sm">{tech.name}</div>
                      <div className="text-xs text-gray-400 mt-1">{tech.level}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Stats Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {[
              { 
                value: '50+', 
                label: 'Projects Built', 
                icon: <Code />, 
                color: 'from-blue-500 to-cyan-500',
                trend: '+5'
              },
              { 
                value: '99%', 
                label: 'Client Satisfaction', 
                icon: <Award />, 
                color: 'from-green-500 to-emerald-500',
                trend: '+2.5%'
              },
              { 
                value: '2K+', 
                label: 'Code Commits', 
                icon: <GitBranch />, 
                color: 'from-purple-500 to-pink-500',
                trend: '+200'
              },
              { 
                value: '24/7', 
                label: 'Support Ready', 
                icon: <Shield />, 
                color: 'from-orange-500 to-red-500',
                trend: 'Always'
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <GlowingCard className="h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                      {stat.icon}
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-gray-800 to-gray-900"
                    >
                      <span className="text-green-400">{stat.trend}</span>
                    </motion.div>
                  </div>
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                  {/* Animated progress line */}
                  <div className="mt-4 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2, delay: index * 0.2 }}
                    />
                  </div>
                </GlowingCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ==================== ENHANCED HEADER ====================
const EnhancedHeader = ({ 
  activeTab, 
  scrollToSection, 
  mobileMenuOpen, 
  setMobileMenuOpen 
}: { 
  activeTab: string;
  scrollToSection: (sectionId: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-gray-900/10 backdrop-blur-xl border-b border-gray-800/30"
    >
      {/* Progress Bar */}
      <motion.div 
        className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
        style={{ width: `${scrollProgress}%` }}
        transition={{ type: "spring", stiffness: 100 }}
      />
      
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo with Animation */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 group"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                <Terminal className="w-6 h-6" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity" />
            </motion.div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                HARSH DESAI
              </div>
              <div className="text-xs text-gray-400 flex items-center space-x-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse" />
                  <span>MERN STACK DEVELOPER</span>
                </div>
                <span>•</span>
                <span>AVAILABLE</span>
              </div>
            </div>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {[
              { id: 'home', label: 'Home' },
              { id: 'projects', label: 'Projects' },
              { id: 'skills', label: 'Skills' },
              { id: 'experience', label: 'Experience' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative group"
              >
                <span className={`text-sm font-medium transition-all duration-300 ${
                  activeTab === item.id 
                    ? 'text-cyan-300' 
                    : 'text-gray-400 group-hover:text-white'
                }`}>
                  {item.label}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg bg-gray-800/50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.a 
              whileHover={{ scale: 1.1 }}
              href="/resume.pdf"
              download
              className="px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 flex items-center space-x-2"
            >
              <Download size={16} />
              <span>Resume</span>
            </motion.a>
            <HolographicButton onClick={() => scrollToSection('contact')}>
              <span className="flex items-center space-x-2">
                <Mail size={18} />
                <span>Hire Me</span>
              </span>
            </HolographicButton>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 space-y-4 overflow-hidden"
            >
              {['home', 'projects', 'skills', 'experience', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    scrollToSection(item);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

// ==================== MAIN COMPONENT ====================
const MERNPortfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'projects' | 'skills' | 'experience' | 'contact'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveTab(sectionId as any);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      {/* Enhanced 3D Background with Futuristic Elements */}
      <Advanced3DBackground />

      {/* Custom Cursor Effect */}
      <div 
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Enhanced Header */}
        <EnhancedHeader 
          activeTab={activeTab}
          scrollToSection={scrollToSection}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Enhanced Hero Section */}
        <EnhancedHeroSection scrollToSection={scrollToSection} />

        {/* Featured Projects Section */}
        <section id="projects" className="py-20 px-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    MERN Stack
                  </span>{' '}
                  <span className="text-white">Projects</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Scalable full-stack applications built with MongoDB, Express, React, and Node.js
                </p>
              </div>

              {/* Featured Projects Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {projects.filter(p => p.featured).map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="group cursor-pointer"
                  >
                    <GlowingCard className="h-full">
                      <div className={`h-48 rounded-xl bg-gradient-to-r ${project.imageColor} mb-6 relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute top-4 right-4">
                          <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs">
                            MERN Stack
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <div className="text-2xl font-bold">{project.title.split(' ')[0]}</div>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                      <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span 
                            key={tech}
                            className="px-3 py-1 text-xs bg-gray-800/50 rounded-full border border-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-3 py-1 text-xs text-gray-400">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <motion.a 
                            whileHover={{ scale: 1.1 }}
                            href={project.githubUrl}
                            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
                          >
                            <Github size={16} />
                          </motion.a>
                          <motion.a 
                            whileHover={{ scale: 1.1 }}
                            href={project.liveUrl}
                            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
                          >
                            <ExternalLink size={16} />
                          </motion.a>
                        </div>
                        <ChevronRight className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
                      </div>
                    </GlowingCard>
                  </motion.div>
                ))}
              </div>

              {/* View All Projects Button */}
              <div className="text-center">
                <HolographicButton onClick={() => {
                  const allProjects = document.querySelector('[data-all-projects]');
                  if (allProjects) {
                    allProjects.scrollIntoView({ behavior: 'smooth' });
                  }
                }}>
                  View All MERN Projects
                </HolographicButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* All Projects Section */}
        <section data-all-projects className="py-20 px-6 bg-gray-900/20">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-white">All</span>{' '}
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Projects
                  </span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <GlowingCard className="h-full">
                      <div className={`h-40 rounded-xl bg-gradient-to-r ${project.imageColor} mb-6 relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/30" />
                        {project.featured && (
                          <div className="absolute top-4 right-4">
                            <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs">
                              ⭐ Featured
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span 
                            key={tech}
                            className="px-2 py-1 text-xs bg-gray-800/50 rounded border border-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </GlowingCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-6 relative">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="text-white">MERN STACK</span>{' '}
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    SKILLSET
                  </span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                  Full spectrum of technologies for building modern web applications
                </p>
              </div>

              {/* MERN Stack Visualization */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {[
                  { 
                    name: 'MongoDB', 
                    icon: '🍃', 
                    color: 'from-green-500 to-emerald-500',
                    description: 'NoSQL Database',
                    level: 'Advanced'
                  },
                  { 
                    name: 'Express.js', 
                    icon: '⚡', 
                    color: 'from-gray-500 to-gray-700',
                    description: 'Backend Framework',
                    level: 'Expert'
                  },
                  { 
                    name: 'React', 
                    icon: '⚛️', 
                    color: 'from-cyan-500 to-blue-500',
                    description: 'Frontend Library',
                    level: 'Expert'
                  },
                  { 
                    name: 'Node.js', 
                    icon: '🚀', 
                    color: 'from-green-600 to-green-400',
                    description: 'Runtime Environment',
                    level: 'Expert'
                  },
                ].map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative group"
                  >
                    <GlowingCard className="h-full">
                      <div className="text-4xl mb-4">{tech.icon}</div>
                      <div className="text-xl font-bold mb-2">{tech.name}</div>
                      <div className="text-gray-400 text-sm mb-3">{tech.description}</div>
                      <div className={`px-3 py-1 text-xs rounded-full bg-gradient-to-r ${tech.color} bg-opacity-20 text-center`}>
                        {tech.level}
                      </div>
                    </GlowingCard>
                  </motion.div>
                ))}
              </div>

              {/* Additional Skills */}
              <div className="space-y-6">
                {skills.slice(0, 6).map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    <GlowingCard className="!p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                          <div 
                            className="p-2 rounded-lg backdrop-blur-sm"
                            style={{ 
                              backgroundColor: `${skill.color}20`,
                              color: skill.color
                            }}
                          >
                            {skill.icon}
                          </div>
                          <div>
                            <div className="font-bold text-lg">{skill.name}</div>
                            <div className="text-sm text-gray-400 capitalize">{skill.category}</div>
                          </div>
                        </div>
                        <div className="text-2xl font-bold" style={{ color: skill.color }}>
                          {skill.level}%
                        </div>
                      </div>
                      
                      <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: index * 0.1 }}
                          className="h-full rounded-full relative"
                          style={{ 
                            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)`
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                        </motion.div>
                      </div>
                    </GlowingCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <ExperienceTimeline />

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <GlowingCard>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    Let's Build Your Next{' '}
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      MERN Project
                    </span>
                  </h2>
                  <p className="text-gray-400 mb-8">
                    Looking for a skilled MERN stack developer? Let's discuss your project requirements.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
                        <Mail className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Email</div>
                        <div className="font-semibold">harsh@mernportfolio.com</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
                        <Terminal className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Specialization</div>
                        <div className="font-semibold">MERN Stack Development</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex space-x-4">
                    <motion.a 
                      whileHover={{ scale: 1.1 }}
                      href="https://github.com"
                      className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700"
                    >
                      <Github size={20} />
                    </motion.a>
                    <motion.a 
                      whileHover={{ scale: 1.1 }}
                      href="https://linkedin.com"
                      className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700"
                    >
                      <Linkedin size={20} />
                    </motion.a>
                  </div>
                </div>
                
                <div>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-cyan-500 focus:outline-none"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-cyan-500 focus:outline-none"
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Project Details</label>
                      <textarea 
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-cyan-500 focus:outline-none"
                        placeholder="Tell me about your MERN stack project..."
                      />
                    </div>
                    
                    <HolographicButton>
                      Send Message
                    </HolographicButton>
                  </form>
                </div>
              </div>
            </GlowingCard>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800/50 bg-gray-900/20 backdrop-blur-xl">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">Harsh Desai</div>
                    <div className="text-sm text-gray-400">MERN Stack Developer</div>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">
                  Building robust web applications with MongoDB, Express, React, and Node.js
                </p>
              </div>
              
              <div className="flex space-x-6">
                <motion.a 
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="https://github.com"
                  className="text-gray-400 hover:text-white"
                >
                  <Github size={24} />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="https://linkedin.com"
                  className="text-gray-400 hover:text-white"
                >
                  <Linkedin size={24} />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="mailto:harsh@example.com"
                  className="text-gray-400 hover:text-white"
                >
                  <Mail size={24} />
                </motion.a>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-800/50 text-center">
              <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                <p>© {new Date().getFullYear()} Harsh Desai. All rights reserved.</p>
                <div className="flex items-center mt-4 md:mt-0">
                  <span className="flex items-center">
                    Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> using 
                    <span className="mx-1 text-cyan-400">MERN</span> Stack
                  </span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-4 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 shadow-lg shadow-cyan-500/25 z-50"
      >
        <ChevronRight className="w-6 h-6 rotate-90" style={{ transform: 'rotate(-90deg)' }} />
      </motion.button>
    </div>
  );
};

export default MERNPortfolio;