// filepath: c:\Users\pimme\Documents\GitHub\Portfolio\portfolio\app\page.tsx
import { projects } from "../data/projects"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "./components/ui/button"
import styles from "./page.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.profileImageContainer}>
          <Image
            src="/images/CV-groot.jpg"
            alt="Pim Melchers"
            fill
            sizes="(max-width: 768px) 100vw, (min-width: 768px) 50vw"
            className={styles.profileImage}
            priority
          />
        </div>
        <h1 className={styles.heroTitle}>
          Hi, I'm <span className={styles.highlight}>Pim Melchers</span>
        </h1>
        <p className={styles.heroSubtitle}>Developer & Designer creating meaningful digital experiences</p>
        <div className={styles.buttonGroup}>
          <Button asChild>
            <Link href="/projects">
              View My Work <ArrowRight className={styles.buttonIcon} />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/about">About Me</Link>
          </Button>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className={styles.featuredProjects}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <div className={styles.projectGrid}>
            {projects.slice(0, 3).map((project) => (
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
                </div>
              </Link>
            ))}
          </div>
          <div className={styles.viewAllContainer}>
            <Button asChild variant="outline">
              <Link href="/projects">
                View All Projects <ArrowRight className={styles.buttonIcon} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Projects Teaser Section */}
      <section className={styles.upcomingTeaser}>
        <div className={styles.sectionContainer}>
          <div className={styles.teaserContent}>
            <div className={styles.teaserTextContent}>
              <h2 className={styles.teaserTitle}>
                <span className={styles.highlight}>Secret Projects</span> in the Works!
              </h2>
              <p className={styles.teaserSubtitle}>You won't believe what I'm building next... 🔥</p>
              <div className={styles.teaserFeatures}>
                <div className={styles.teaserFeature}>
                  <span className={styles.featureIcon}>📱</span>
                  <span>Tire & Rim Management App</span>
                </div>
                <div className={styles.teaserFeature}>
                  <span className={styles.featureIcon}>⚔️</span>
                  <span>Minecraft Kingdom Web Platform</span>
                </div>
                <div className={styles.teaserFeature}>
                  <span className={styles.featureIcon}>🎮</span>
                  <span>Wordle Game</span>
                </div>
              </div>
              <Button asChild variant="default" className={styles.teaserButton}>
                <Link href="/upcoming-projects">
                  Sneak Peek <ArrowRight className={styles.buttonIcon} />
                </Link>
              </Button>
            </div>
            <div className={styles.teaserVisual}>
              <div className={styles.comingSoonBadge}>Coming Soon</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
