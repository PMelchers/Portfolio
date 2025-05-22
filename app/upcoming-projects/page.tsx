import Link from "next/link"
import { Button } from "../components/ui/button"
import styles from "./upcoming-projects.module.css"

// Upcoming projects data
const upcomingProjects = [
  {
    id: 1,
    title: "Mobile App Tire & Rim Management",
    description:
      "A mobile application for managing tire and rim inventory, including tracking usage, maintenance schedules, and performance metrics.",
    technologies: ["Android Studio", "Kotlin", "Room DB"],
    timeline: "Q3 2025",
    status: "Research",
    features: [
      "Inventory management for tires and rims",
      "be able to see information about the tire and rim",
      "scan barcode to add items",
      "PDF export of inventory",
    ],
  },
  {
    id: 2,
    title: "Minimalist Portfolio Builder",
    description:
      "A simple web application that allows users to build and customize a personal portfolio website without needing to write code.",
    technologies: ["React", "Firebase", "Tailwind CSS"],
    timeline: "Q3 2025",
    status: "Planning",
    features: [
      "Drag-and-drop section builder",
      "Live preview of portfolio layout",
      "Custom themes and colors",
      "Hosting with a shareable public URL",
      "Editable bio, projects, and contact sections",
      "Firebase authentication and data storage",
      "Mobile-friendly output templates",
    ],
  },
  {
    id: 3,
    title: "Automatic Cryptocurrency Trader",
    description:
      "A full-stack platform for automated cryptocurrency trading using Binance API, with a FastAPI backend (Python) and a React frontend for monitoring and control.",
    technologies: ["Python", "FastAPI", "Binance API", "React", "Tailwind CSS"],
    timeline: "Q2 2025",
    status: "Development",
    features: [
      "Automated trading strategies (buy/sell) on Binance",
      "Real-time portfolio and trade monitoring dashboard",
      "User authentication and API key management",
      "Customizable trading parameters and risk controls",
      "Trade history and performance analytics",
      "Notifications for trade events and errors",
      "Secure storage of sensitive credentials",
    ],
  },
]

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "planning":
        return styles.statusPlanning
      case "research":
        return styles.statusResearch
      case "concept":
        return styles.statusConcept
      case "idea":
        return styles.statusIdea
      case "development":
        return styles.statusDevelopment
      default:
        return ""
    }
  }

  return <span className={`${styles.statusBadge} ${getStatusColor(status)}`}>{status}</span>
}

export default function UpcomingProjectsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Upcoming Projects</h1>
        <p className={styles.subtitle}>
          Explore the projects I'm planning to work on in the near future. These are ideas and concepts that are
          currently in various stages of development.
        </p>
      </div>

      <div className={styles.projectsList}>
        {upcomingProjects.map((project) => (
          <div key={project.id} className={styles.projectCard}>
            <div className={styles.projectHeader}>
              <h2 className={styles.projectTitle}>{project.title}</h2>
              <StatusBadge status={project.status} />
            </div>

            <p className={styles.projectDescription}>{project.description}</p>

            <div className={styles.projectDetails}>
              <div className={styles.detailSection}>
                <h3 className={styles.detailTitle}>Technologies</h3>
                <div className={styles.techTags}>
                  {project.technologies.map((tech, index) => (
                    <span key={index} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.detailSection}>
                <h3 className={styles.detailTitle}>Planned Features</h3>
                <ul className={styles.featuresList}>
                  {project.features.map((feature, index) => (
                    <li key={index} className={styles.featureItem}>
                      <span className={styles.featureDot}></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.timelineSection}>
                <h3 className={styles.detailTitle}>Expected Timeline</h3>
                <p className={styles.timeline}>{project.timeline}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.contactSection}>
        <h2 className={styles.contactTitle}>Have a Project Idea?</h2>
        <p className={styles.contactText}>
          If you have a project in mind or would like to collaborate on any of these upcoming projects, I'd love to hear
          from you.
        </p>
        <Button asChild>
          <Link href="/contact">Get in Touch</Link>
        </Button>
      </div>
    </div>
  )
}
