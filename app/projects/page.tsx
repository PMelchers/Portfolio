import { projects } from "../../data/projects";
import Image from "next/image";
import Link from "next/link";
import ScrollAnimation from "../components/scroll-animation";
import DrivingGame from "../components/driving-game";
import DesktopOnly from "../components/desktop-only";
import styles from "./projects.module.css";

export default function ProjectsPage() {
  return (
    <div className={styles.container}>
      <ScrollAnimation animation="fadeInUp">
        <div className={styles.header}>
          <h1 className={styles.title}>My Projects</h1>
          <p className={styles.subtitle}>
            Explore the applications and solutions I've built using modern technologies.
          </p>
        </div>
      </ScrollAnimation>

      <div className={styles.projectsGrid}>
        {projects.map((project, index) => (
          <ScrollAnimation key={project.id} animation="fadeInUp" delay={index * 100}>
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

      {/* Web-based Games Section */}
      <DesktopOnly>
        <ScrollAnimation animation="fadeInUp" delay={400}>
          <section className={styles.gamesSection}>
            <div className={styles.gamesSectionHeader}>
              <h2 className={styles.gamesSectionTitle}>Web-based Games</h2>
              <p className={styles.gamesSectionSubtitle}>
                Interactive experiences built with modern web technologies
              </p>
            </div>
            <div className={styles.gamesContainer}>
              <DrivingGame />
            </div>
          </section>
        </ScrollAnimation>
      </DesktopOnly>
    </div>
  );
}