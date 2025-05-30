import Image from "next/image"
import { Button } from "../components/ui/button"
import styles from "./about.module.css"

export default function AboutPage() {
  // Skills dataset
  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "HTML/CSS", "Vue"] },
    { category: "Backend", items: ["Node.js", ".NET Core", "Laravel", "Firebase", "PHP"] },
    { category: "Database", items: ["MySQL", "Firebase"] },
    { category: "Tools", items: ["Git", "Docker", "Vercel", "Figma"] },
  ]

  // Experience data
  const experiences = [
    {
      title: "Engineer Support",
      company: "Royal SMIT Transformers",
      period: "2024 - 2025",
      description:
        "Assisted in the development of a web application for managing users. Gained experience in frontend technologies and agile development. Worked closely with the engineering team to understand user needs and translate them into technical requirements.",
    },
  ]

  // Education data
  const education = [
    {
      degree: "Software Engineering",
      institution: "ROC Nijmegen",
      period: "2023 - Now",
      description: "Currently pursuing a degree in Software Engineering, focusing on web development and software design principles. Gained hands-on experience in various programming languages and frameworks.",
    },
  ]

  return (
    <div className={styles.container}>
      {/* About Me Section */}
      <section className={styles.aboutSection}>
        <div className={styles.profileColumn}>
          <div className={styles.profileImageContainer}>
            <Image
            src="/images/CV-Groot.jpg"
            alt="Pim Melchers"
            fill
            sizes="(max-width: 768px) 100vw, (min-width: 768px) 50vw"
            className={styles.profileImage}
            priority
          />
          </div>
          <div className={styles.profileInfo}>
            <h1 className={styles.name}>Pim Melchers</h1>
            <p className={styles.jobTitle}>Frontend Developer & Designer</p>
            <Button asChild>
              <a href="/CV/CV-Pim-2.pdf" download className={styles.downloadButton}>
                <svg
                  className={styles.downloadIcon}
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
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Resume
              </a>
            </Button>
          </div>
        </div>

        <div className={styles.bioColumn}>
          <h2 className={styles.sectionTitle}>About Me</h2>
          <div className={styles.bioText}>
            <p>
              Hello! I'm Pim Melchers, a passionate frontend developer with a keen eye for design and a love for
              creating engaging user experiences. I specialize in building responsive and interactive web applications
            </p>
            <p>
              I have a strong foundation in modern web technologies, including React, Next.js, and TypeScript. My
              journey in software development has been driven by a desire to solve real-world problems and make a
              positive impact through technology.
            </p>
            <p>
              I thrive in collaborative environments and enjoy working closely with designers and developers to bring
              ideas to life. My goal is to create seamless and intuitive interfaces that enhance user satisfaction and
              drive engagement.
            </p>
            <p>
              When I'm not coding, you can find me playing volleybal and play games. I'm always eager to learn and grow, and I'm excited about the opportunities
              that lie ahead in my career.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={styles.skillsSection}>
        <h2 className={styles.sectionTitle}>Skills & Expertise</h2>
        <div className={styles.skillsGrid}>
          {skills.map((skillGroup) => (
            <div key={skillGroup.category} className={styles.skillCard}>
              <h3 className={styles.skillCategory}>{skillGroup.category}</h3>
              <ul className={styles.skillList}>
                {skillGroup.items.map((skill) => (
                  <li key={skill} className={styles.skillItem}>
                    <span className={styles.skillDot}></span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className={styles.experienceSection}>
        <h2 className={styles.sectionTitle}>Work Experience</h2>
        <div className={styles.timelineContainer}>
          {experiences.map((exp, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineHeader}>
                <h3 className={styles.timelineTitle}>{exp.title}</h3>
                <span className={styles.timelinePeriod}>{exp.period}</span>
              </div>
              <p className={styles.timelineCompany}>{exp.company}</p>
              <p className={styles.timelineDescription}>{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className={styles.educationSection}>
        <h2 className={styles.sectionTitle}>Education</h2>
        <div className={styles.timelineContainer}>
          {education.map((edu, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineHeader}>
                <h3 className={styles.timelineTitle}>{edu.degree}</h3>
                <span className={styles.timelinePeriod}>{edu.period}</span>
              </div>
              <p className={styles.timelineCompany}>{edu.institution}</p>
              <p className={styles.timelineDescription}>{edu.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}