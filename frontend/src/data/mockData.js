import { 
  GraduationCap, 
  Cpu, 
  Terminal, 
  Briefcase, 
  FlaskConical, 
  Atom, 
  FileText, 
  HelpCircle, 
  BookOpen, 
  CheckCircle2 
} from "lucide-react";

export const platformStats = [
  { label: "Universities", value: "120+", change: "Across 28 states" },
  { label: "Colleges", value: "450+", change: "Top affiliated institutes" },
  { label: "Programs", value: "1,200+", change: "UG, PG & Diploma" },
  { label: "Verified Resources", value: "85,000+", change: "Updated daily" },
];

export const academicPrograms = [
  {
    id: "btech",
    icon: GraduationCap,
    name: "B.Tech",
    description: "Bachelor of Technology core engineering & CS subjects.",
    resourceCount: "42,300+ Resources",
  },
  {
    id: "mtech",
    icon: Cpu,
    name: "M.Tech",
    description: "Master of Technology specialization papers & research notes.",
    resourceCount: "12,100+ Resources",
  },
  {
    id: "mca",
    icon: Terminal,
    name: "MCA",
    description: "Master of Computer Applications software & theory guides.",
    resourceCount: "15,400+ Resources",
  },
  {
    id: "mba",
    icon: Briefcase,
    name: "MBA",
    description: "Management, finance, strategy & case study archives.",
    resourceCount: "8,900+ Resources",
  },
  {
    id: "bsc",
    icon: FlaskConical,
    name: "B.Sc",
    description: "Bachelor of Science foundational science & lab material.",
    resourceCount: "9,800+ Resources",
  },
  {
    id: "msc",
    icon: Atom,
    name: "M.Sc",
    description: "Advanced physics, math, and computational science papers.",
    resourceCount: "6,500+ Resources",
  },
];

export const featuredResources = [
  {
    id: 1,
    title: "Data Structures & Algorithms - Master Exam Guide",
    type: "Notes",
    typeIcon: FileText,
    program: "B.Tech · CSE",
    subject: "Data Structures",
    university: "JNTU Hyderabad",
    uploadDate: "2 days ago",
    downloads: "1.4k",
    verified: true,
  },
  {
    id: 2,
    title: "Operating Systems End-Sem Question Papers (2020-2025)",
    type: "Question Paper",
    typeIcon: HelpCircle,
    program: "B.Tech · CSE",
    subject: "Operating Systems",
    university: "Osmania University",
    uploadDate: "5 days ago",
    downloads: "980",
    verified: true,
  },
  {
    id: 3,
    title: "Database Management Systems (DBMS) Complete Architecture Notes",
    type: "Notes",
    typeIcon: BookOpen,
    program: "B.Tech · AIML / CSE",
    subject: "Database Management",
    university: "VTU Belagavi",
    uploadDate: "1 week ago",
    downloads: "2.1k",
    verified: true,
  },
  {
    id: 4,
    title: "Computer Networks Solved PYQs & Lab Manual",
    type: "Previous Papers",
    typeIcon: CheckCircle2,
    program: "B.Tech · IT",
    subject: "Computer Networks",
    university: "Anna University",
    uploadDate: "2 weeks ago",
    downloads: "3.2k",
    verified: true,
  },
];

export const howItWorksSteps = [
  {
    stepNumber: "01",
    title: "Find Your Path",
    description: "Select your university, specific college campus, and current degree program in seconds.",
  },
  {
    stepNumber: "02",
    title: "Discover Resources",
    description: "Filter through verified lecture notes, previous question papers, and syllabus roadmaps.",
  },
  {
    stepNumber: "03",
    title: "Learn & Excel",
    description: "Preview documents online or download clean PDFs to prepare smarter for exams.",
  },
];