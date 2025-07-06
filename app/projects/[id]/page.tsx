import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Github, Play } from "lucide-react"
import { projects } from "../../../data/projects"
import ScrollAnimation from "../../components/scroll-animation"
import { VideoPlayer } from "../../components/video-player"
import styles from "./project-detail.module.css"

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }))
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = projects.find((p) => p.id === parseInt(id))

  if (!project) {
    notFound()
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/projects" className={styles.backButton}>
          <ArrowLeft className={styles.backIcon} />
          Back to Projects
        </Link>
      </div>

      <ScrollAnimation animation="fadeInUp">
        <div className={styles.projectHero}>
          <div className={styles.heroContent}>
            <h1 className={styles.projectTitle}>{project.title}</h1>
            <p className={styles.projectYear}>{project.year}</p>
            <p className={styles.projectDescription}>{project.description}</p>
            
            <div className={styles.projectTechnologies}>
              {project.technologies?.map((tech) => (
                <span key={tech} className={styles.techTag}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className={styles.heroImage}>
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className={styles.projectImage}
            />
          </div>
        </div>
      </ScrollAnimation>

      <ScrollAnimation animation="fadeInUp" delay={200}>
        <div className={styles.projectContent}>
          <div className={styles.aboutSection}>
            <h2 className={styles.sectionTitle}>About this project</h2>
            <p className={styles.sectionText}>{project.fullDescription}</p>
          </div>

          {project.features && (
            <div className={styles.featuresSection}>
              <h2 className={styles.sectionTitle}>Key features</h2>
              <ul className={styles.featuresList}>
                {project.features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.detailsSection}>
            <h2 className={styles.sectionTitle}>Project Details</h2>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Year</span>
                <span className={styles.detailValue}>{project.year}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Technologies</span>
                <span className={styles.detailValue}>{project.technologies?.join(", ")}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Category</span>
                <span className={styles.detailValue}>{project.category}</span>
              </div>
            </div>
          </div>

          {project.videoUrl && (
            <div className={styles.videoSection}>
              <h2 className={styles.sectionTitle}>Project Video</h2>
              <VideoPlayer videoUrl={project.videoUrl} />
            </div>
          )}

          {project.images && (
            <div className={styles.gallerySection}>
              <h2 className={styles.sectionTitle}>Project Gallery</h2>
              <div className={styles.imageGrid}>
                {project.images.map((image, index) => (
                  <div key={index} className={styles.galleryImage}>
                    <Image
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      fill
                      className={styles.galleryImg}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={styles.actionsSection}>
            <div className={styles.actionButtons}>
              {project.github && (
                <Link href={project.github} className={styles.actionButton}>
                  <Github className={styles.actionIcon} />
                  View on GitHub
                </Link>
              )}
            </div>
          </div>
        </div>
      </ScrollAnimation>
    </div>
  )
}
