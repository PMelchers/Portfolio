import { projects } from "../data/projects"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "./components/ui/button"
import ScrollAnimation from "./components/scroll-animation"
import TerminalWindow from "./components/terminal-window"
import CodeEditor from "./components/code-editor"
import SystemMonitor from "./components/system-monitor"
import DesktopOnly from "./components/desktop-only"
import styles from "./page.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Animated Hero Components */}
      <DesktopOnly>
        <div className={styles.heroAnimatedElements}>
          <ScrollAnimation animation="fadeInLeft" delay={200}>
            <div className={styles.heroCodeEditor}>
              <CodeEditor />
            </div>
          </ScrollAnimation>
          <ScrollAnimation animation="fadeInRight" delay={300}>
            <div className={styles.heroSystemMonitor}>
              <SystemMonitor />
            </div>
          </ScrollAnimation>
        </div>
      </DesktopOnly>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.profileImageContainer}>
          <Image
            src="/images/CV-foto.jpg"
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
          <ScrollAnimation animation="fadeInUp">
            <h2 className={styles.sectionTitle}>Featured Projects</h2>
          </ScrollAnimation>
          <div className={styles.projectGrid}>
            {projects.slice(0, 3).map((project, index) => (
              <ScrollAnimation key={project.id} animation="fadeInUp" delay={index * 200}>
                <Link href={`/projects/${project.id}`} className={styles.projectCard}>
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
                    <div className={styles.projectTechnologies}>
                      {project.technologies.map((tech) => (
                        <span key={tech} className={styles.techTag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
          <ScrollAnimation animation="fadeInUp" delay={600}>
            <div className={styles.viewAllContainer}>
              <Button asChild variant="outline">
                <Link href="/projects">
                  View All Projects <ArrowRight className={styles.buttonIcon} />
                </Link>
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Upcoming Projects Teaser Section */}
      <section className={styles.upcomingTeaser}>
        <div className={styles.sectionContainer}>
          <ScrollAnimation animation="fadeInLeft">
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
                    <span className={styles.featureIcon}>🛠️</span>
                    <span>Minimalist Portfolio Builder</span>
                  </div>
                  <div className={styles.teaserFeature}>
                    <span className={styles.featureIcon}>🤖</span>
                    <span>Auto Cryptocurrency Trader</span>
                  </div>
                </div>
                <Button asChild variant="default" className={styles.teaserButton}>
                  <Link href="/upcoming-projects">
                    Sneak Peek <ArrowRight className={styles.buttonIcon} />
                  </Link>
                </Button>
              </div>
              <ScrollAnimation animation="fadeInRight" delay={300}>
                <div className={styles.teaserVisual}>
                  <TerminalWindow />
                </div>
              </ScrollAnimation>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Developer Tools Section */}
      <section className={styles.developerTools}>
        <div className={styles.sectionContainer}>
          <ScrollAnimation animation="fadeInUp">
            <h2 className={styles.sectionTitle}>Developer Environment</h2>
            <p className={styles.sectionSubtitle}>
              Peek behind the scenes of my development setup and workflow
            </p>
          </ScrollAnimation>
          
          <div className={styles.toolsGrid}>
            <ScrollAnimation animation="fadeInLeft" delay={200}>
              <div className={styles.toolCard}>
                <CodeEditor />
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fadeInRight" delay={400}>
              <div className={styles.toolCard}>
                <SystemMonitor />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </div>
  )
}
