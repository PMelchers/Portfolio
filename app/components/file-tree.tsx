'use client';

import React, { useState, useEffect } from 'react';
import styles from './file-tree.module.css';

interface FileTreeProps {
  className?: string;
}

const FileTree: React.FC<FileTreeProps> = ({ className }) => {
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['src', 'components']);
  const [activeFile, setActiveFile] = useState('App.tsx');
  const [currentLine, setCurrentLine] = useState(0);

  const fileStructure = [
    {
      name: 'portfolio-v2',
      type: 'folder',
      children: [
        {
          name: 'src',
          type: 'folder',
          children: [
            {
              name: 'components',
              type: 'folder',
              children: [
                { name: 'Header.tsx', type: 'file' },
                { name: 'Footer.tsx', type: 'file' },
                { name: 'ProjectCard.tsx', type: 'file' },
                { name: 'AnimatedBackground.tsx', type: 'file' }
              ]
            },
            {
              name: 'pages',
              type: 'folder',
              children: [
                { name: 'Home.tsx', type: 'file' },
                { name: 'About.tsx', type: 'file' },
                { name: 'Projects.tsx', type: 'file' },
                { name: 'Contact.tsx', type: 'file' }
              ]
            },
            { name: 'App.tsx', type: 'file' },
            { name: 'main.tsx', type: 'file' },
            { name: 'index.css', type: 'file' }
          ]
        },
        { name: 'package.json', type: 'file' },
        { name: 'vite.config.ts', type: 'file' },
        { name: 'tailwind.config.js', type: 'file' },
        { name: 'README.md', type: 'file' }
      ]
    }
  ];

  const codeContent = [
    "import React from 'react';",
    "import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';",
    "import Header from './components/Header';",
    "import Footer from './components/Footer';",
    "import Home from './pages/Home';",
    "import About from './pages/About';",
    "import Projects from './pages/Projects';",
    "import Contact from './pages/Contact';",
    "import AnimatedBackground from './components/AnimatedBackground';",
    "",
    "function App() {",
    "  return (",
    "    <Router>",
    "      <div className='App'>",
    "        <AnimatedBackground />",
    "        <Header />",
    "        <main>",
    "          <Routes>",
    "            <Route path='/' element={<Home />} />",
    "            <Route path='/about' element={<About />} />",
    "            <Route path='/projects' element={<Projects />} />",
    "            <Route path='/contact' element={<Contact />} />",
    "          </Routes>",
    "        </main>",
    "        <Footer />",
    "      </div>",
    "    </Router>",
    "  );",
    "}",
    "",
    "export default App;"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLine(prev => {
        if (prev < codeContent.length - 1) {
          return prev + 1;
        } else {
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderName) 
        ? prev.filter(f => f !== folderName)
        : [...prev, folderName]
    );
  };

  const renderFileTree = (items: any[], level = 0) => {
    return items.map((item, index) => (
      <div key={index} className={styles.treeItem} style={{ paddingLeft: `${level * 20}px` }}>
        {item.type === 'folder' ? (
          <>
            <div 
              className={styles.folderItem}
              onClick={() => toggleFolder(item.name)}
            >
              <span className={styles.folderIcon}>
                {expandedFolders.includes(item.name) ? '📂' : '📁'}
              </span>
              <span className={styles.folderName}>{item.name}</span>
            </div>
            {expandedFolders.includes(item.name) && item.children && (
              <div className={styles.folderContent}>
                {renderFileTree(item.children, level + 1)}
              </div>
            )}
          </>
        ) : (
          <div 
            className={`${styles.fileItem} ${activeFile === item.name ? styles.active : ''}`}
            onClick={() => setActiveFile(item.name)}
          >
            <span className={styles.fileIcon}>
              {item.name.endsWith('.tsx') ? '⚛️' : 
               item.name.endsWith('.ts') ? '🟦' :
               item.name.endsWith('.css') ? '🎨' :
               item.name.endsWith('.json') ? '📄' : '📄'}
            </span>
            <span className={styles.fileName}>{item.name}</span>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className={`${styles.fileTree} ${className || ''}`}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <span className={styles.icon}>📁</span>
          <span>File Explorer</span>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.statusIndicator}>
            <div className={styles.statusDot}></div>
            <span>Live</span>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.treeContainer}>
          <div className={styles.treeHeader}>
            <span className={styles.treeTitle}>PROJECT STRUCTURE</span>
          </div>
          <div className={styles.treeContent}>
            {renderFileTree(fileStructure)}
          </div>
        </div>

        <div className={styles.codePreview}>
          <div className={styles.codeHeader}>
            <span className={styles.codeTitle}>{activeFile}</span>
          </div>
          <div className={styles.codeContent}>
            {codeContent.slice(0, currentLine + 1).map((line, index) => (
              <div key={index} className={styles.codeLine}>
                <span className={styles.lineNumber}>{index + 1}</span>
                <span className={styles.lineContent}>{line}</span>
                {index === currentLine && (
                  <span className={styles.cursor}>|</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileTree;