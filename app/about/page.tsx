import Image from "next/image"
import { Mail, MapPin, Calendar, Code, Database, Server, Smartphone } from "lucide-react"
import { Button } from "../components/ui/button"
import ScrollAnimation from "../components/scroll-animation"
import styles from "./about.module.css"

export default function About() {
  const skills = [
    { name: "Frontend", icon: <Code className={styles.skillIcon} />, technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { name: "Backend", icon: <Server className={styles.skillIcon} />, technologies: ["Node.js", "Express", "Python", "REST APIs"] },
    { name: "Database", icon: <Database className={styles.skillIcon} />, technologies: ["PostgreSQL", "MongoDB", "Redis", "GraphQL"] },
    { name: "Mobile", icon: <Smartphone className={styles.skillIcon} />, technologies: ["React Native", "Flutter", "iOS", "Android"] },
  ]

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <ScrollAnimation animation="fadeInLeft">
            <div className={styles.profileSection}>
              <div className={styles.profileImageContainer}>
                <Image
                  src="/images/CV-foto.jpg"
                  alt="Pim Melchers"
                  fill
                  className={styles.profileImage}
                  priority
                />
                <div className={styles.imageOverlay} />
              </div>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation animation="fadeInRight" delay={200}>
            <div className={styles.introSection}>
              <h1 className={styles.title}>
                <span className={styles.greeting}>console.log("Hello World!");</span>
                <span className={styles.name}>I'm Pim Melchers</span>
              </h1>
              <p className={styles.subtitle}>
                Full-Stack Developer & Digital Craftsman
              </p>
              <div className={styles.quickInfo}>
                <div className={styles.infoItem}>
                  <MapPin className={styles.infoIcon} />
                  <span>Netherlands</span>
                </div>
                <div className={styles.infoItem}>
                  <Calendar className={styles.infoIcon} />
                  <span>Available for Projects</span>
                </div>
                <div className={styles.infoItem}>
                  <Mail className={styles.infoIcon} />
                  <span>pim.melchers@example.com</span>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* About Content */}
      <section className={styles.aboutContent}>
        <div className={styles.sectionContainer}>
          <ScrollAnimation animation="fadeInUp">
            <div className={styles.storySection}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.prompt}>$</span> cat about-me.txt
              </h2>
              <div className={styles.storyContent}>
                <p className={styles.storyText}>
                  Passionate developer with a love for creating innovative solutions that bridge the gap between 
                  design and functionality. I specialize in building scalable web applications and mobile solutions 
                  that deliver exceptional user experiences.
                </p>
                <p className={styles.storyText}>
                  My journey in tech started with curiosity about how things work, which led me to explore 
                  various programming languages and frameworks. I'm constantly learning and adapting to new 
                  technologies to stay at the forefront of development.
                </p>
                <p className={styles.storyText}>
                  When I'm not coding, you can find me exploring new tech trends, contributing to open-source 
                  projects, or sharing knowledge with the developer community.
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Skills Section */}
      <section className={styles.skillsSection}>
        <div className={styles.sectionContainer}>
          <ScrollAnimation animation="fadeInUp">
            <h2 className={styles.sectionTitle}>
              <span className={styles.prompt}>$</span> ls -la /skills/
            </h2>
          </ScrollAnimation>
          
          <div className={styles.skillsGrid}>
            {skills.map((skill, index) => (
              <ScrollAnimation key={skill.name} animation="fadeInUp" delay={index * 100}>
                <div className={styles.skillCard}>
                  <div className={styles.skillHeader}>
                    {skill.icon}
                    <h3 className={styles.skillTitle}>{skill.name}</h3>
                  </div>
                  <div className={styles.skillTechnologies}>
                    {skill.technologies.map((tech) => (
                      <span key={tech} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.sectionContainer}>
          <ScrollAnimation animation="fadeInUp">
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>
                <span className={styles.prompt}>$</span> let's collaborate();
              </h2>
              <p className={styles.ctaSubtitle}>
                Ready to bring your ideas to life? Let's build something amazing together.
              </p>
              <div className={styles.ctaButtons}>
                <Button asChild size="lg" className={styles.primaryButton}>
                  <a href="mailto:pim.melchers@example.com">
                    Get In Touch
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="/projects">
                    View My Work
                  </a>
                </Button>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  )
}