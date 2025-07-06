import Image from "next/image"
import Link from "next/link"
import { Mail, MapPin, Calendar } from "lucide-react"
import { Button } from "../components/ui/button"
import ScrollAnimation from "../components/scroll-animation"
import styles from "./about.module.css"

export default function About() {
  const skills = [
    // Frontend Technologies
    { name: "React", rating: 5, category: "Frontend" },
    { name: "Next.js", rating: 3, category: "Frontend" },
    { name: "TypeScript", rating: 4, category: "Frontend" },
    { name: "JavaScript", rating: 4, category: "Frontend" },
    { name: "Tailwind CSS", rating: 3, category: "Frontend" },
    { name: "CSS", rating: 4, category: "Frontend" },

    
    // Backend Technologies
    { name: "Node.js", rating: 3, category: "Backend" },
    { name: "Python", rating: 3, category: "Backend" },
    { name: "Java", rating: 4, category: "Backend" },
    { name: "REST API", rating: 4, category: "Backend" },
    
    // Database Technologies
    { name: "MongoDB", rating: 3, category: "Database" },
    { name: "Firebase", rating: 4, category: "Database" },
    
    // Game Development
    { name: "Spigot API", rating: 4, category: "Game Development" },
    { name: "Bukkit API", rating: 4, category: "Game Development" },
    { name: "Minecraft Plugin Development", rating: 4, category: "Game Development" },
    { name: "Godot", rating: 4, category: "Game Development" },
    
    // Tools & Platforms
    { name: "Git", rating: 4, category: "Tools" },
    { name: "GitHub", rating: 4, category: "Tools" },
    { name: "Figma", rating: 3, category: "Tools" },
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
                  <span>pimmelchers1@gmail.com</span>
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
                <span className={styles.prompt}>$</span> cat about.txt
              </h2>
              <div className={styles.storyContent}>
                <p className={styles.storyText}>
                  Passionate and motivated developer with a love for bringing my ideas into a reality. I value not only functionality but design is just as important for me.
                </p>
                <p className={styles.storyText}>
                  My journey in tech started with curiosity about how things work, which led me to explore 
                  various programming languages and frameworks. I'm constantly learning new concepts and tricks by taking all projects head on.
                </p>
                <p className={styles.storyText}>
                  When I'm not coding, you can find me playing volleyball and of course helping others with their tech problems.
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
          
          <div className={styles.skillCategories}>
            {['Frontend', 'Backend', 'Database', 'Game Development', 'Tools'].map((category) => (
              <ScrollAnimation key={category} animation="fadeInUp" delay={100}>
                <div className={styles.categorySection}>
                  <h3 className={styles.categoryTitle}>{category}</h3>
                  <div className={styles.skillsList}>
                    {skills
                      .filter(skill => skill.category === category)
                      .map((skill, index) => (
                        <div key={skill.name} className={styles.skillItem}>
                          <div className={styles.skillInfo}>
                            <span className={styles.skillName}>{skill.name}</span>
                            <div className={styles.skillRating}>
                              {[...Array(5)].map((_, starIndex) => (
                                <span
                                  key={starIndex}
                                  className={`${styles.star} ${
                                    starIndex < skill.rating ? styles.starFilled : styles.starEmpty
                                  }`}
                                  style={{ animationDelay: `${index * 100 + starIndex * 50}ms` }}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
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
                Ready to bring your ideas to reality? Let me know!.
              </p>
              <div className={styles.ctaButtons}>
                <Button asChild size="lg" className={styles.primaryButton}>
                  <Link href="/contact">
                    Get In Touch
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/projects">
                    View My Work
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  )
}