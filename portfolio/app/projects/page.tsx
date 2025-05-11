import { projects } from "../../data/projects";
import Link from "next/link";
import Image from "next/image";
import styles from "./projects.module.css";

export default function ProjectsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Projects</h1>
        <p className={styles.subtitle}>
          A collection of my recent work, showcasing various skills and technologies.
        </p>
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}