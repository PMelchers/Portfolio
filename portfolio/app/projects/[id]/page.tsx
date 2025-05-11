import Image from "next/image"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { VideoPlayer } from "../../components/video-player"
import styles from "./project-detail.module.css"

// This would typically come from a database or CMS
const getProjectData = (id: string) => {
  const projects = {
    "1": {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-featured online store with product management, cart functionality, and payment processing.",
      longDescription: `
        This e-commerce platform provides businesses with a complete solution for selling products online. 
        The application features a responsive design, product catalog with filtering and search capabilities, 
        shopping cart functionality, secure checkout process, and an admin dashboard for managing products, 
        orders, and customers.
        
        Key features include:
        - User authentication and account management
        - Product catalog with categories and search
        - Shopping cart and wishlist functionality
        - Secure payment processing with Stripe
        - Order tracking and history
        - Admin dashboard for inventory management
        - Analytics and reporting tools
      `,
      technologies: ["React", "Next.js", "CSS Modules", "Stripe", "PostgreSQL"],
      images: [
        "/placeholder.svg?height=600&width=800&text=E-commerce+Screenshot+1",
        "/placeholder.svg?height=600&width=800&text=E-commerce+Screenshot+2",
        "/placeholder.svg?height=600&width=800&text=E-commerce+Screenshot+3",
      ],
      videoUrl: "/videos/voorbeeld.mp4",
      liveUrl: "https://ecommerce-example.com",
      githubUrl: "https://github.com/pimmelchers/ecommerce-platform",
      year: 2023,
    },
    "2": {
      id: 2,
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing creative work and professional experience.",
      longDescription: `
        This portfolio website was designed to showcase creative work in an elegant and interactive way. 
        The site features smooth animations, responsive design, and optimized performance.
        
        The portfolio includes:
        - Project showcase with detailed case studies
        - Interactive gallery with filtering options
        - Contact form with validation
        - Blog section for sharing insights
        - Resume and skills presentation
        - Dark/light mode toggle
      `,
      technologies: ["React", "Framer Motion", "CSS Modules", "Next.js"],
      images: [
        "/placeholder.svg?height=600&width=800&text=Portfolio+Screenshot+1",
        "/placeholder.svg?height=600&width=800&text=Portfolio+Screenshot+2",
      ],
      videoUrl: "/videos/voorbeeld.mp4",
      liveUrl: "https://portfolio-example.com",
      githubUrl: "https://github.com/pimmelchers/portfolio-website",
      year: 2022,
    },
    "3": {
      id: 3,
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing creative work and professional experience.",
      longDescription: `
        This portfolio website was designed to showcase creative work in an elegant and interactive way. 
        The site features smooth animations, responsive design, and optimized performance.
        
        The portfolio includes:
        - Project showcase with detailed case studies
        - Interactive gallery with filtering options
        - Contact form with validation
        - Blog section for sharing insights
        - Resume and skills presentation
        - Dark/light mode toggle
      `,
      technologies: ["React", "Framer Motion", "CSS Modules", "Next.js"],
      images: [
        "/placeholder.svg?height=600&width=800&text=Portfolio+Screenshot+1",
        "/placeholder.svg?height=600&width=800&text=Portfolio+Screenshot+2",
      ],
      videoUrl: "/videos/voorbeeld.mp4",
      liveUrl: "https://portfolio-example.com",
      githubUrl: "https://github.com/pimmelchers/portfolio-website",
      year: 2022,
    },
    "4": {
      id: 4,
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing creative work and professional experience.",
      longDescription: `
        This portfolio website was designed to showcase creative work in an elegant and interactive way. 
        The site features smooth animations, responsive design, and optimized performance.
        
        The portfolio includes:
        - Project showcase with detailed case studies
        - Interactive gallery with filtering options
        - Contact form with validation
        - Blog section for sharing insights
        - Resume and skills presentation
        - Dark/light mode toggle
      `,
      technologies: ["React", "Framer Motion", "CSS Modules", "Next.js"],
      images: [
        "/placeholder.svg?height=600&width=800&text=Portfolio+Screenshot+1",
        "/placeholder.svg?height=600&width=800&text=Portfolio+Screenshot+2",
      ],
      videoUrl: "/videos/voorbeeld.mp4",
      liveUrl: "https://portfolio-example.com",
      githubUrl: "https://github.com/pimmelchers/portfolio-website",
      year: 2022,
    },
    "5": {
      id: 5,
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing creative work and professional experience.",
      longDescription: `
        This portfolio website was designed to showcase creative work in an elegant and interactive way. 
        The site features smooth animations, responsive design, and optimized performance.
        
        The portfolio includes:
        - Project showcase with detailed case studies
        - Interactive gallery with filtering options
        - Contact form with validation
        - Blog section for sharing insights
        - Resume and skills presentation
        - Dark/light mode toggle
      `,
      technologies: ["React", "Framer Motion", "CSS Modules", "Next.js"],
      images: [
        "/placeholder.svg?height=600&width=800&text=Portfolio+Screenshot+1",
        "/placeholder.svg?height=600&width=800&text=Portfolio+Screenshot+2",
      ],
      videoUrl: "/videos/voorbeeld.mp4",
      liveUrl: "https://portfolio-example.com",
      githubUrl: "https://github.com/pimmelchers/portfolio-website",
      year: 2022,
    },
    "6": {
      id: 6,
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing creative work and professional experience.",
      longDescription: `
        This portfolio website was designed to showcase creative work in an elegant and interactive way. 
        The site features smooth animations, responsive design, and optimized performance.
        
        The portfolio includes:
        - Project showcase with detailed case studies
        - Interactive gallery with filtering options
        - Contact form with validation
        - Blog section for sharing insights
        - Resume and skills presentation
        - Dark/light mode toggle
      `,
      technologies: ["React", "Framer Motion", "CSS Modules", "Next.js"],
      images: [
        "/placeholder.svg?height=600&width=800&text=Portfolio+Screenshot+1",
        "/placeholder.svg?height=600&width=800&text=Portfolio+Screenshot+2",
      ],
      videoUrl: "/videos/voorbeeld.mp4",
      liveUrl: "https://portfolio-example.com",
      githubUrl: "https://github.com/pimmelchers/portfolio-website",
      year: 2022,
    },
    // Add more projects as needed
  }

  return projects[id as keyof typeof projects]
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = getProjectData(params.id)

  if (!project) {
    return (
      <div className={styles.notFound}>
        <h1 className={styles.notFoundTitle}>Project Not Found</h1>
        <p className={styles.notFoundText}>The project you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
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
    )
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
          <VideoPlayer videoUrl={project.videoUrl} />
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