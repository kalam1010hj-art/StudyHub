import { Building2, GraduationCap, LibraryBig, FileText } from "lucide-react";

export const universities = [
  { id: 1, code: "JNTUH", name: "Jawaharlal Nehru Technological University Hyderabad", location: "Telangana", collegeCount: 120, description: "A major public technological university serving engineering and technology education." },
  { id: 2, code: "OU", name: "Osmania University", location: "Hyderabad, Telangana", collegeCount: 95, description: "A historic university with a broad range of undergraduate and postgraduate programs." },
  { id: 3, code: "KU", name: "Kakatiya University", location: "Warangal, Telangana", collegeCount: 72, description: "A multidisciplinary university with programs across science, technology and humanities." },
  { id: 4, code: "BRAOU", name: "Dr. B.R. Ambedkar Open University", location: "Hyderabad, Telangana", collegeCount: 54, description: "Open and distance learning programs designed for flexible study." },
  { id: 5, code: "ANU", name: "Acharya Nagarjuna University", location: "Andhra Pradesh", collegeCount: 88, description: "A comprehensive university offering programs across multiple disciplines." },
  { id: 6, code: "VTU", name: "Visvesvaraya Technological University", location: "Karnataka", collegeCount: 210, description: "A leading technological university with a large affiliated college network." },
  { id: 7, code: "AU", name: "Andhra University", location: "Visakhapatnam, Andhra Pradesh", collegeCount: 82, description: "A prominent university offering diverse academic and professional programs." },
  { id: 8, code: "ANNA", name: "Anna University", location: "Tamil Nadu", collegeCount: 120, description: "A major technical university known for engineering and technology education." }
];

export const colleges = [
  { id: 1, code: "MRITS", name: "Mahbubnagar Institute of Technology & Science", location: "Mahbubnagar, Telangana", programCount: 8, university: "JNTUH" },
  { id: 2, code: "JNTUH-CEH", name: "JNTUH University College of Engineering", location: "Hyderabad, Telangana", programCount: 14, university: "JNTUH" },
  { id: 3, code: "CBIT", name: "Chaitanya Bharathi Institute of Technology", location: "Hyderabad, Telangana", programCount: 18, university: "OU" },
  { id: 4, code: "VNRVJIET", name: "VNR Vignana Jyothi Institute of Engineering & Technology", location: "Hyderabad, Telangana", programCount: 16, university: "JNTUH" },
  { id: 5, code: "MJCET", name: "Muffakham Jah College of Engineering and Technology", location: "Hyderabad, Telangana", programCount: 12, university: "OU" },
  { id: 6, code: "KITSW", name: "Kakatiya Institute of Technology & Science", location: "Warangal, Telangana", programCount: 15, university: "KU" }
];

export const programs = [
  { id: 1, code: "BTECH-CSE", degree: "B.Tech", name: "Computer Science & Engineering", resourceCount: 240, department: "Computer Science & Engineering" },
  { id: 2, code: "BTECH-ECE", degree: "B.Tech", name: "Electronics & Communication Engineering", resourceCount: 186, department: "Electronics & Communication Engineering" },
  { id: 3, code: "BTECH-EEE", degree: "B.Tech", name: "Electrical & Electronics Engineering", resourceCount: 154, department: "Electrical & Electronics Engineering" },
  { id: 4, code: "BTECH-MECH", degree: "B.Tech", name: "Mechanical Engineering", resourceCount: 132, department: "Mechanical Engineering" },
  { id: 5, code: "MBA", degree: "MBA", name: "Master of Business Administration", resourceCount: 118, department: "Management Studies" },
  { id: 6, code: "MCA", degree: "MCA", name: "Master of Computer Applications", resourceCount: 96, department: "Computer Applications" }
];

export const semesters = [
  { id: 1, name: "Semester 1", resources: 32 },
  { id: 2, name: "Semester 2", resources: 41 },
  { id: 3, name: "Semester 3", resources: 28 },
  { id: 4, name: "Semester 4", resources: 39 },
  { id: 5, name: "Semester 5", resources: 35 },
  { id: 6, name: "Semester 6", resources: 31 },
  { id: 7, name: "Semester 7", resources: 19 },
  { id: 8, name: "Semester 8", resources: 15 }
];

export const recentResources = [
  { id: 1, title: "Data Structures & Algorithms", type: "Notes", semester: "Semester 4", meta: "JNTUH · MRITS · B.Tech CSE", icon: FileText },
  { id: 2, title: "Operating Systems Previous Papers", type: "Question Papers", semester: "Semester 5", meta: "JNTUH · MRITS · B.Tech CSE", icon: LibraryBig },
  { id: 3, title: "Database Management Systems", type: "Study Notes", semester: "Semester 4", meta: "JNTUH · MRITS · B.Tech CSE", icon: FileText },
  { id: 4, title: "Computer Networks Lab Manual", type: "Lab Manual", semester: "Semester 6", meta: "JNTUH · MRITS · B.Tech CSE", icon: FileText }
];

export const academicIcons = { university: Building2, college: LibraryBig, program: GraduationCap };
