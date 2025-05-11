import Link from "next/link"
import Image from "next/image"
import styles from "./projects.module.css"

export default function ProjectsPage() {
  // Sample project data - in a real app, this would come from a database or CMS
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-featured online store with product management, cart functionality, and payment processing.",
      technologies: ["React", "Next.js", "CSS Modules", "Stripe"],
      image: "/placeholder.svg?height=400&width=600&text=E-commerce",
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing creative work and professional experience.",
      technologies: ["React", "Framer Motion", "CSS Modules"],
      image: "/placeholder.svg?height=400&width=600&text=Portfolio",
    },
    {
      id: 3,
      title: "Task Management App",
      description: "A productivity application for managing tasks, projects, and team collaboration.",
      technologies: ["React", "TypeScript", "Redux", "Firebase"],
      image: "/placeholder.svg?height=400&width=600&text=Task+App",
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description: "Real-time weather information with forecasts, maps, and location-based data.",
      technologies: ["React", "Chart.js", "Weather API"],
      image: "/placeholder.svg?height=400&width=600&text=Weather+App",
    },
    {
      id: 5,
      title: "Social Media Dashboard",
      description: "Analytics and management platform for social media accounts and campaigns.",
      technologies: ["React", "Next.js", "D3.js", "Social APIs"],
      image: "/placeholder.svg?height=400&width=600&text=Social+Dashboard",
    },
    {
      id: 6,
      title: "Fitness Tracker",
      description: "Mobile-first application for tracking workouts, nutrition, and fitness goals.",
      technologies: ["React Native", "TypeScript", "Health APIs"],
      image: "/placeholder.svg?height=400&width=600&text=Fitness+App",
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Projects</h1>
        <p className={styles.subtitle}>A collection of my recent work, showcasing various skills and technologies.</p>
      </div>

      <div className={styles.projectGrid}>
        {projects.map((project) => (
          <Link href={`/projects/${project.id}`} key={project.id} className={styles.projectCard}>
            <div className={styles.projectImageContainer}>
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className={styles.projectImage}
              />
            </div>
            <div className={styles.projectInfo}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>{project.description}</p>
              <div className={styles.techTags}>
                {project.technologies.map((tech) => (
                  <span key={tech} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>
              <div className={styles.viewProject}>
                <span className={styles.viewProjectText}>View Project</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}