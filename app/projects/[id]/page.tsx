import Image from "next/image"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { VideoPlayer } from "../../components/video-player"
import styles from "./project-detail.module.css"
import { notFound } from "next/navigation"

// This would typically come from a database or CMS
const getProjectData = (id: string) => {
  const projects = {
    "1": {
      id: 1,
      title: "Crpypto Currency Dashboard",
      description: "A dashboard for tracking cryptocurrency prices and market trends.",
      longDescription: `
        This project is a cryptocurrency dashboard that provides real-time data on various cryptocurrencies.
        Users can view price trends, market capitalization, and other relevant statistics. The dashboard is built using React and Vite for fast performance and a smooth user experience.
        
        Key features include:
        - Real-time price updates
        - Interactive charts and graphs using Chart.js
        - User-friendly interface with responsive design
        - Search functionality for specific cryptocurrencies
        - Historical data analysis
        - Integration with CoinGecko API for accurate data
        - Favorites feature to track preferred cryptocurrencies
      `,
      technologies: ["React", "Vite", "Tailwind CSS", "Chart.js"],
      images: ["/images/Crypto-image-1.jpg", "/images/Crypto-image-2.jpg", "/images/Crypto-image-3.jpg"],
      videoUrl: "/videos/Crypto-video.mp4",
      liveUrl: "/videos/Coming-soon.mp4",
      githubUrl: "https://github.com/PMelchers/FrontEndCrypto",
      year: 2025,
    },
    "2": {
      id: 2,
      title: "Wand Plugin Minecraft",
      description: "A Minecraft plugin for creating custom spells and abilities using a wand.",
      longDescription: `
        This project is a Minecraft plugin that allows players to create custom spells and abilities using a wand.
        The plugin is built using Java and the Spigot API, providing a robust framework for Minecraft server development.
        
        The portfolio includes:
        - Custom spell creation with a user-friendly interface
        - Integration with Minecraft's existing mechanics
        - Support for multiple spells and abilities
        - Configuration options for server administrators
        - Extensive documentation for developers
      `,
      technologies: ["Java", "Maven", "Spigot API"],
      images: ["/images/Wand-image-1.png", "/images/Wand-image-2.png", "/images/Wand-image-3.jpg"],
      videoUrl: "/videos/Wand-video.mp4",
      liveUrl: "/videos/Coming-soon.mp4",
      githubUrl: "https://github.com/PMelchers/Wandplugin",
      year: 2025,
    },
    "3": {
      id: 3,
      title: "Social Media Platform",
      description: "A social media platform for sharing skills and connecting with others.",
      longDescription: `
        This project is a social media platform designed to connect users based on their skills and interests.
        Users can create profiles, share their skills, and connect with others in the community. The platform is built using React and Firebase for real-time data synchronization.
        
        The portfolio includes:
        - User profiles with skill showcases
        - Real-time chat functionality
        - Post creation and sharing
        - Commenting and liking system
        - Search functionality for users and skills
        - Responsive design for mobile and desktop
        - Integration with Firebase for authentication and data storage
      `,
      technologies: ["React", "JavaScript", "Vite", "Firebase"],
      images: ["/images/Skillrr-image-1.jpg", "/images/Skillrr-image-2.jpg", "/images/Skillrr-image-3.jpg"],
      videoUrl: "/videos/Coming-soon.mp4",
      liveUrl: "/videos/Coming-soon.mp4",
      githubUrl: "https://github.com/Roexoe/Frontedge2",
      year: 2025,
    },
    "4": {
      id: 4,
      title: "Kingdom Dashboard & Minecraft Integration",
      description: "A full-stack web dashboard and Minecraft plugin system for managing kingdoms, players, stats, and ranks with real-time server integration.",
      longDescription: `
        Kingdom Dashboard is a full-stack web application and Minecraft plugin system for managing Minecraft kingdoms, players, stats, and ranks, with real-time integration between your Minecraft server and a modern web dashboard.
        **Tech Stack**
        - Frontend: React, Axios
        - Backend: Node.js, Express, MongoDB, REST API
        - Minecraft Plugin: Java (Bukkit/Spigot API), HTTP integration with backend API
        - Hosting: Render.com (for backend and frontend), MongoDB Atlas (database)

        **Web Dashboard Features:**
        - Manage kingdoms, players, ranks, and admin users via a secure admin panel.
        - View global leaderboards (K/D, kills, score).
        - Assign players to kingdoms and ranks.
        - Real-time updates from Minecraft server actions.
        **Minecraft Plugin Features:**
        - Communicates with the backend API to keep data in sync.
        - Real-time updates to the web dashboard when players join or leave kingdoms.
        - Customizable ranks and permissions for players.
        `,

      technologies: [
        "React",
        "Axios",
        "CSS",
        "Node.js",
        "Express",
        "MongoDB",
        "Java",
        "Bukkit/Spigot API",
        "REST API"
      ],
      images: [
        "/images/Kingdomstats-image-1.jpg",
        "/images/Kingdomstats-image-2.jpg",
        "/images/Kingdomstats-image-3.jpg"
      ],
      videoUrl: "/videos/Coming-soon.mp4",
      liveUrl: "",
      githubUrl: "https://github.com/PMelchers/KD-Panel",
      year: 2025,
    },
    5: {
      id: 5,
      title: "HOI4 Discord Bot",
      description: "A Discord bot for managing Hearts of Iron IV multiplayer games and player assignments.",
      longDescription: `
        This project is a feature-rich Discord bot designed to streamline the organization of Hearts of Iron IV (HOI4) multiplayer games.
        The bot allows admins to assign players to countries, manage player history and warnings, and announce new games with ease.
        Built using Python and the discord.py library, it provides a smooth experience for both admins and players.

        The portfolio includes:
        - Country assignment and unassignment commands
        - Player history and warning tracking
        - Game announcement with ID, password, and start time
        - Real-time status message updates in a dedicated channel
        - Overview and missing player reports
        - Admin-only command protection
        - Persistent data storage using JSON files
        - Easy-to-use slash commands for all major actions
      `,
      technologies: ["Python", "discord.py", "JSON"],
      images: ["/images/Discordbot-image-1.jpg", "/images/Discordbot-image-1.jpg", "/images/Discordbot-image-3.jpg"],
      videoUrl: "/videos/Coming-soon.mp4",
      liveUrl: "",
      githubUrl: "",
      year: 2025,
    }
  }

  return projects[id as keyof typeof projects]
}

// Generate static params for static generation
export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }]
}

// Make the component async to match Next.js 15's expectations
export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = getProjectData(params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className={styles.container}>
      {/* Back button */}
      <div className={styles.backButton}>
        <Button variant="ghost" asChild>
          <Link href="/projects">
            <svg
              className={styles.backIcon}
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
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to Projects
          </Link>
        </Button>
      </div>

      {/* Project header */}
      <div className={styles.header}>
        <h1 className={styles.title}>{project.title}</h1>
        <div className={styles.techTags}>
          {project.technologies.map((tech) => (
            <span key={tech} className={styles.techTag}>
              {tech}
            </span>
          ))}
        </div>
        <p className={styles.description}>{project.description}</p>
      </div>

      {/* Main project image/video */}
      <div className={styles.mainMedia}>
        {project.videoUrl ? (
          <VideoPlayer videoUrl={project.videoUrl} autoplay />
        ) : (
          <div className={styles.mainImageContainer}>
            <Image
              src={project.images[0] || "/placeholder.svg"}
              alt={`${project.title} main image`}
              fill
              className={styles.mainImage}
            />
          </div>
        )}
      </div>

      {/* Project details */}
      <div className={styles.content}>
        <div className={styles.mainContent}>
          <h2 className={styles.sectionTitle}>About this project</h2>
          <div className={styles.longDescription}>
            {project.longDescription.split("\n").map((paragraph, index) => (
              <p key={index} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.sidebar}>
          <div className={styles.projectDetails}>
            <h3 className={styles.sidebarTitle}>Project Details</h3>
            <dl className={styles.detailsList}>
              <div className={styles.detailItem}>
                <dt className={styles.detailTerm}>Year</dt>
                <dd>{project.year}</dd>
              </div>
              <div className={styles.detailItem}>
                <dt className={styles.detailTerm}>Technologies</dt>
                <dd>{project.technologies.join(", ")}</dd>
              </div>
            </dl>
          </div>
          <div className={styles.projectLinks}>
            {project.liveUrl && (
              <Button className={styles.fullWidthButton} asChild>
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  View Live Site
                  <svg
                    className={styles.linkIcon}
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
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <path d="M15 3h6v6" />
                    <path d="m10 14 11-11" />
                  </svg>
                </Link>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" className={styles.fullWidthButton} asChild>
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  View on GitHub
                  <svg
                    className={styles.linkIcon}
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
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Additional images */}
      {project.images.length > 1 && (
        <div className={styles.gallery}>
          <h2 className={styles.sectionTitle}>Project Gallery</h2>
          <div className={styles.galleryGrid}>
            {project.images.slice(1).map((image, index) => (
              <div key={index} className={styles.galleryItem}>
                <div className={styles.galleryImageContainer}>
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} screenshot ${index + 2}`}
                    fill
                    className={styles.galleryImage}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
