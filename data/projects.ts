
export const projects = [
  {
    id: 1,
    title: "Crypto Currency Dashboard",
    description: "A dashboard for tracking cryptocurrency prices and market trends.",
    fullDescription: `
      This project is a cryptocurrency dashboard that provides real-time data on various cryptocurrencies.
      Users can view price trends, market capitalization, and other relevant statistics. The dashboard is built using React and Vite for fast performance and a smooth user experience.
    `,
    features: [
      "Real-time price updates",
      "Interactive charts and graphs using Chart.js",
      "User-friendly interface with responsive design",
      "Search functionality for specific cryptocurrencies",
      "Historical data analysis",
      "Integration with CoinGecko API for accurate data",
      "Favorites feature to track preferred cryptocurrencies"
    ],
    technologies: ["React", "Vite", "Tailwind CSS", "Chart.js"],
    image: "/images/Crypto-image-1.jpg",
    images: ["/images/Crypto-image-1.jpg", "/images/Crypto-image-2.jpg", "/images/Crypto-image-3.jpg"],
    videoUrl: "/videos/Crypto-video.mp4",
    liveUrl: "/videos/Coming-soon.mp4",
    github: "https://github.com/PMelchers/FrontEndCrypto",
    year: "2025",
    category: "Web Development"
  },
  {
    id: 2,
    title: "Wand Plugin Minecraft",
    description: "A Minecraft plugin for creating custom spells and abilities using a wand.",
    fullDescription: `
      This project is a Minecraft plugin that allows players to create custom spells and abilities using a wand.
      The plugin is built using Java and the Spigot API, providing a robust framework for Minecraft server development.
    `,
    features: [
      "Custom spell creation with a user-friendly interface",
      "Integration with Minecraft's existing mechanics",
      "Support for multiple spells and abilities",
      "Configuration options for server administrators",
      "Extensive documentation for developers"
    ],
    technologies: ["Java", "Maven", "Spigot API"],
    image: "/images/Wand-image-1.png",
    images: ["/images/Wand-image-1.png", "/images/Wand-image-2.png", "/images/Wand-image-3.jpg"],
    videoUrl: "/videos/Wand-video.mp4",
    liveUrl: "/videos/Coming-soon.mp4",
    github: "https://github.com/PMelchers/Wandplugin",
    year: "2025",
    category: "Game Development"
  },
  {
    id: 3,
    title: "Social Media Platform",
    description: "A social media platform for sharing skills and connecting with others.",
    fullDescription: `
      This project is a social media platform designed to connect users based on their skills and interests.
      Users can create profiles, share their skills, and connect with others in the community. The platform is built using React and Firebase for real-time data synchronization.
    `,
    features: [
      "User profiles with skill showcases",
      "Real-time chat functionality",
      "Post creation and sharing",
      "Commenting and liking system",
      "Search functionality for users and skills",
      "Responsive design for mobile and desktop",
      "Integration with Firebase for authentication and data storage"
    ],
    technologies: ["React", "JavaScript", "Vite", "Firebase"],
    image: "/images/Skillrr-image-1.jpg",
    images: ["/images/Skillrr-image-1.jpg", "/images/Skillrr-image-2.jpg", "/images/Skillrr-image-3.jpg"],
    videoUrl: "/videos/Coming-soon.mp4",
    liveUrl: "/videos/Coming-soon.mp4",
    github: "https://github.com/Roexoe/Frontedge2",
    year: "2025",
    category: "Web Development"
  },
  {
    id: 4,
    title: "Kingdom Dashboard & Minecraft Integration",
    description: "A full-stack web dashboard and Minecraft plugin system for managing kingdoms, players, stats, and ranks with real-time server integration.",
    fullDescription: `
      Kingdom Dashboard is a full-stack web application and Minecraft plugin system for managing Minecraft kingdoms, players, stats, and ranks, with real-time integration between your Minecraft server and a modern web dashboard.
    `,
    features: [
      "Frontend: React, Axios",
      "Backend: Node.js, Express, MongoDB, REST API",
      "Minecraft Plugin: Java (Bukkit/Spigot API), HTTP integration with backend API",
      "Hosting: Render.com (for backend and frontend), MongoDB Atlas (database)",
      "Manage kingdoms, players, ranks, and admin users via a secure admin panel",
      "View global leaderboards (K/D, kills, score)",
      "Assign players to kingdoms and ranks",
      "Real-time updates from Minecraft server actions",
      "Communicates with the backend API to keep data in sync",
      "Real-time updates to the web dashboard when players join or leave kingdoms",
      "Customizable ranks and permissions for players"
    ],
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
    image: "/images/Kingdomstats-image-1.jpg",
    images: [
      "/images/Kingdomstats-image-1.jpg",
      "/images/Kingdomstats-image-2.jpg",
      "/images/Kingdomstats-image-3.jpg"
    ],
    videoUrl: "/videos/Coming-soon.mp4",
    liveUrl: "",
    github: "https://github.com/PMelchers/KD-Panel",
    year: "2025",
    category: "Full Stack Development"
  },
  {
    id: 5,
    title: "HOI4 Discord Bot",
    description: "A Discord bot for managing Hearts of Iron IV multiplayer games and player assignments.",
    fullDescription: `
      This project is a feature-rich Discord bot designed to streamline the organization of Hearts of Iron IV (HOI4) multiplayer games.
      The bot allows admins to assign players to countries, manage player history and warnings, and announce new games with ease.
      Built using Python and the discord.py library, it provides a smooth experience for both admins and players.
    `,
    features: [
      "Country assignment and unassignment commands",
      "Player history and warning tracking",
      "Game announcement with ID, password, and start time",
      "Real-time status message updates in a dedicated channel",
      "Overview and missing player reports",
      "Admin-only command protection",
      "Persistent data storage using JSON files",
      "Easy-to-use slash commands for all major actions"
    ],
    technologies: ["Python", "discord.py", "JSON"],
    image: "/images/Discordbot-image-2.jpg",
    images: ["/images/Discordbot-image-1.jpg", "/images/Discordbot-image-2.jpg", "/images/Discordbot-image-3.jpg"],
    videoUrl: "/videos/Coming-soon.mp4",
    liveUrl: "",
    github: "",
    year: "2025",
    category: "Bot Development"
  },
  {
    id: 6,
    title: "Taskio - Family Quest Manager",
    description: "A gamified family chore management app that turns household tasks into epic quests and adventures for children.",
    fullDescription: `
      Taskio is a modern React-based family management application that transforms mundane household chores into exciting quests and adventures. 
      The app features separate dashboards for parents and children, creating an engaging experience that motivates kids to complete their tasks.
      Built with React, TypeScript, and Firebase, it provides real-time updates and a responsive design that works across all devices.
    `,
    features: [
      "Gamified quest system with difficulty levels (easy, medium, hard, epic, legendary)",
      "Parent dashboard for creating and managing quests/tasks",
      "Child dashboard with colorful animations and reward tracking",
      "Real-time progress tracking and completion status",
      "Coin and XP reward system to motivate participation",
      "Family management with role-based authentication",
      "Firebase integration for real-time data synchronization",
      "Responsive design with Tailwind CSS animations",
      "Task categories (daily, weekly, monthly, special events)",
      "Notification system for task updates and completions"
    ],
    technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS", "Vite"],
    image: "/images/taskio-image-1.png",
    images: ["/images/taskio-image-1.png", "/images/taskio-image-2.png", "/images/taskio-image-3.png"],
    videoUrl: "/videos/Coming-soon.mp4",
    liveUrl: "",
    github: "https://github.com/PMelchers/chores-app",
    year: "2024",
    category: "Mobile Development"
  }
];

export const getProjectData = (id: string) => {
  return projects.find(project => project.id === parseInt(id)) || null;
};