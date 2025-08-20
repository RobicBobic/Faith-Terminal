import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, BookOpen, Heart, Users, Star, Zap, Globe, MessageSquare, Twitter } from 'lucide-react';
import './FaithTerminal.css';

const FaithTerminal = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const bibleVerses = [
    { verse: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future.", reference: "Jeremiah 29:11" },
    { verse: "Trust in the Lord with all your heart and lean not on your own understanding.", reference: "Proverbs 3:5" },
    { verse: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", reference: "Joshua 1:9" },
    { verse: "The Lord is my shepherd, I lack nothing.", reference: "Psalm 23:1" },
    { verse: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.", reference: "Romans 8:28" },
    { verse: "I can do all this through him who gives me strength.", reference: "Philippians 4:13" },
    { verse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", reference: "John 3:16" },
    { verse: "Cast all your anxiety on him because he cares for you.", reference: "1 Peter 5:7" }
  ];

  const commands = {
    help: 'Available commands: scripture, prayer, community, devotion, prophecy, wisdom, clear, about',
    scripture: 'Loading sacred texts and daily verses...',
    prayer: 'Opening prayer request portal...',
    community: 'Connecting to faith community network...',
    devotion: 'Accessing daily devotional content...',
    prophecy: 'Revealing divine insights and prophecies...',
    wisdom: 'Sharing ancient wisdom and teachings...',
    clear: 'Terminal cleared.',
    about: 'Faith Terminal v2.0 - Connecting souls to the divine through technology.'
  };

  const typewriterText = "Welcome to Faith Terminal - Where Technology Meets Spirituality";
  const [displayedText, setDisplayedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    if (textIndex < typewriterText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + typewriterText[textIndex]);
        setTextIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [textIndex, typewriterText]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVerseIndex(prev => (prev + 1) % bibleVerses.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [bibleVerses.length]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const handleCommand = (command) => {
    const cmd = command.toLowerCase().trim();
    setTerminalHistory(prev => [...prev, { type: 'input', content: `> ${command}` }]);

    if (cmd === 'clear') {
      setTerminalHistory([]);
      return;
    }

    if (commands[cmd]) {
      setIsTyping(true);
      setTimeout(() => {
        setTerminalHistory(prev => [...prev, { type: 'output', content: commands[cmd] }]);
        setIsTyping(false);
      }, 1000);
    } else {
      setTerminalHistory(prev => [...prev, { type: 'error', content: `Command "${command}" not found. Type "help" for available commands.` }]);
    }
  };

  const handleInputSubmit = (e) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      handleCommand(currentInput);
      setCurrentInput('');
    }
  };

  const menuItems = [
    { id: 'home', label: 'HOME', icon: ChevronRight },
    { id: 'scripture', label: 'SCRIPTURE', icon: BookOpen },
    { id: 'prayer', label: 'PRAYER', icon: Heart },
    { id: 'community', label: 'COMMUNITY', icon: Users },
    { id: 'devotion', label: 'DEVOTION', icon: Star },
    { id: 'prophecy', label: 'PROPHECY', icon: Zap },
    { id: 'wisdom', label: 'WISDOM', icon: Globe },
    { id: 'contact', label: 'CONTACT', icon: MessageSquare }
  ];

  const renderContent = () => {
    switch(currentSection) {
      case 'home':
        return (
          <div className="content-section">
            <div className="system-init">
              <h3>SYSTEM INITIALIZATION</h3>
              <div>
                <p>► Faith Terminal v2.0 loaded successfully</p>
                <p>► Divine connection established</p>
                <p>► Scripture database: ONLINE</p>
                <p>► Prayer network: ACTIVE</p>
                <p>► Community servers: CONNECTED</p>
              </div>
            </div>
            
            <div className="cards-grid">
              <div className="card">
                <h4>DAILY VERSE</h4>
                <div className="verse-text">
                  <p>"{bibleVerses[currentVerseIndex].verse}"</p>
                  <p className="verse-reference">- {bibleVerses[currentVerseIndex].reference}</p>
                </div>
              </div>
              
              <div className="card">
                <h4>PRAYER REQUESTS</h4>
                <p>Join our community in prayer. Submit your requests and find strength in unity.</p>
              </div>
            </div>
          </div>
        );
      
      case 'scripture':
        return (
          <div className="content-section">
            <h3 className="section-title">SCRIPTURE DATABASE</h3>
            <div className="card">
              <p>Search the scriptures and find verses for guidance:</p>
              <div style={{fontFamily: 'Courier New, monospace', fontSize: '0.875rem', marginTop: '0.5rem'}}>
                <p>► Genesis 1:1 - "In the beginning God created the heavens and the earth."</p>
                <p>► John 3:16 - "For God so loved the world that he gave his one and only Son..."</p>
                <p>► Psalms 23:1 - "The Lord is my shepherd, I lack nothing."</p>
              </div>
            </div>
          </div>
        );
      
      case 'prayer':
        return (
          <div className="content-section">
            <h3 className="section-title">PRAYER PORTAL</h3>
            <div className="card prayer-form">
              <p style={{marginBottom: '1rem'}}>Submit your prayer requests and intercede for others:</p>
              <textarea 
                placeholder="Enter your prayer request..."
                rows="4"
              />
              <button>
                SUBMIT PRAYER
              </button>
            </div>
          </div>
        );
      
      case 'community':
        return (
          <div className="content-section">
            <h3 className="section-title">COMMUNITY NETWORK</h3>
            <div className="cards-grid">
              <div className="card">
                <h4>ONLINE MEMBERS: 1,247</h4>
                <p>Brothers and sisters connected in faith</p>
              </div>
              <div className="card">
                <h4>PRAYER CIRCLE</h4>
                <p>Join live prayer sessions daily at 7 AM & 7 PM</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div style={{textAlign: 'center', color: '#b45309'}}>
            <p>Module loading... Please wait for divine inspiration.</p>
          </div>
        );
    }
  };

  return (
    <div className="faith-terminal">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">
              <span>F</span>
            </div>
            <h1 className="title">FAITH TERMINAL</h1>
          </div>
          
          <div className="status-section">
            <div className="status-badges">
              <span className="badge badge-online">ONLINE</span>
              <span className="badge badge-version">v2.0</span>
            </div>
            
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="twitter-link"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="grid">
          {/* Sidebar Navigation */}
          <div>
            <div className="navigation">
              <h3 className="nav-title">NAVIGATION</h3>
              <nav className="nav-menu">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentSection(item.id)}
                      className={`nav-button ${currentSection === item.id ? 'active' : ''}`}
                    >
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div>
            <div className="main-content">
              <div className="terminal-output">
                <h2 className="terminal-title">TERMINAL OUTPUT:</h2>
                <div className="typewriter">
                  {displayedText}<span className="cursor">█</span>
                </div>
              </div>
              
              {renderContent()}
            </div>

            {/* Interactive Terminal */}
            <div className="terminal">
              <div className="terminal-header">
                <span>FAITH TERMINAL - COMMAND INTERFACE</span>
                <div className="terminal-dots">
                  <div className="dot dot-red"></div>
                  <div className="dot dot-yellow"></div>
                  <div className="dot dot-green"></div>
                </div>
              </div>
              
              <div 
                ref={terminalRef}
                className="terminal-content"
              >
                {terminalHistory.map((line, index) => (
                  <div key={index} className={`terminal-line terminal-${line.type}`}>
                    {line.content}
                  </div>
                ))}
                {isTyping && <div className="terminal-line terminal-output">Processing...</div>}
              </div>
              
              <div className="terminal-prompt">
                <span>root@faith:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleInputSubmit}
                  placeholder="Type 'help' for commands..."
                />
              </div>
            </div>
          </div>

          {/* Status Panel */}
          <div>
            <div className="status-panel">
              <h3 className="status-title">SYSTEM STATUS</h3>
              
              <div className="status-list">
                <div className="status-item">
                  <span>Divine Connection:</span>
                  <span className="status-active">ACTIVE</span>
                </div>
                <div className="status-item">
                  <span>Prayer Queue:</span>
                  <span className="status-pending">247 PENDING</span>
                </div>
                <div className="status-item">
                  <span>Scripture Database:</span>
                  <span className="status-active">ONLINE</span>
                </div>
                <div className="status-item">
                  <span>Community Network:</span>
                  <span className="status-active">1,247 SOULS</span>
                </div>
              </div>
              
              <div className="verse-card">
                <h4>VERSE OF THE DAY</h4>
                <div className="verse-text">
                  <p>"{bibleVerses[currentVerseIndex].verse}"</p>
                  <p className="verse-reference">- {bibleVerses[currentVerseIndex].reference}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>
            © 2025 Faith Terminal - Bridging Heaven and Technology | All Glory to God
          </p>
          <p className="footer-verse">
            "For where two or three gather in my name, there am I with them." - Matthew 18:20
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FaithTerminal;