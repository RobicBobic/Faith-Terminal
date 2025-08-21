import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, BookOpen, Heart, Users, Star, Zap, Globe, MessageSquare, Twitter } from 'lucide-react';
import './FaithTerminal.css';

const ParadiseTerminal = () => {
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
    help: 'Available commands: scripture, prayer, community, devotion, prophecy, wisdom, confess, clear, about',
    scripture: 'Loading sacred texts and daily verses...',
    prayer: 'Opening prayer request portal...',
    community: 'Connecting to faith community network...',
    devotion: 'Accessing daily devotional content...',
    prophecy: 'Revealing divine insights and prophecies...',
    wisdom: 'Opening Book of Proverbs - Divine wisdom revealed...',
    confess: 'Opening angel confession portal...',
    clear: 'Terminal cleared.',
    about: 'Paradise Terminal v2.0 - Connecting souls to the divine through technology.'
  };

  const typewriterText = "Welcome to Paradise Terminal - Where Technology Meets Spirituality";
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
    { id: 'confess', label: 'CONFESS', icon: MessageSquare },
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
                <p>► Paradise Terminal v2.0 loaded successfully</p>
                <p>► Divine connection established</p>
                <p>► Scripture database: ONLINE</p>
                <p>► Prayer network: ACTIVE</p>
                <p>► Angel confession portal: READY</p>
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

      case 'wisdom':
        return (
          <div className="content-section">
            <h3 className="section-title">BOOK OF PROVERBS - CHAPTER 3</h3>
            <div className="card" style={{padding: '2rem', fontFamily: 'Georgia, serif', lineHeight: '1.8'}}>
              <div style={{textAlign: 'center', marginBottom: '1.5rem', borderBottom: '2px solid #fbbf24', paddingBottom: '1rem'}}>
                <h4 style={{fontSize: '1.5rem', color: '#92400e', margin: '0'}}>THE HOLY BIBLE</h4>
                <p style={{fontSize: '1.1rem', color: '#b45309', margin: '0.5rem 0 0 0'}}>Book of Proverbs - Chapter 3</p>
              </div>
              
              <div style={{columns: '1', fontSize: '1rem', color: '#92400e'}}>
                <p><strong>1</strong> My son, do not forget my teaching, but keep my commands in your heart,</p>
                <p><strong>2</strong> for they will prolong your life many years and bring you peace and prosperity.</p>
                <p><strong>3</strong> Let love and faithfulness never leave you; bind them around your neck, write them on the tablet of your heart.</p>
                <p><strong>4</strong> Then you will win favor and a good name in the sight of God and man.</p>
                <p><strong>5</strong> <em style={{color: '#d97706', fontWeight: 'bold'}}>Trust in the Lord with all your heart and lean not on your own understanding;</em></p>
                <p><strong>6</strong> <em style={{color: '#d97706', fontWeight: 'bold'}}>in all your ways submit to him, and he will make your paths straight.</em></p>
                <p><strong>7</strong> Do not be wise in your own eyes; fear the Lord and shun evil.</p>
                <p><strong>8</strong> This will bring health to your body and nourishment to your bones.</p>
                <p><strong>9</strong> Honor the Lord with your wealth, with the firstfruits of all your crops;</p>
                <p><strong>10</strong> then your barns will be filled to overflowing, and your vats will brim over with new wine.</p>
                <p><strong>11</strong> My son, do not despise the Lord's discipline, and do not resent his rebuke,</p>
                <p><strong>12</strong> because the Lord disciplines those he loves, as a father the son he delights in.</p>
                <p><strong>13</strong> Blessed are those who find wisdom, those who gain understanding,</p>
                <p><strong>14</strong> for she is more profitable than silver and yields better returns than gold.</p>
                <p><strong>15</strong> She is more precious than rubies; nothing you desire can compare with her.</p>
                <p><strong>16</strong> Long life is in her right hand; in her left hand are riches and honor.</p>
                <p><strong>17</strong> Her ways are pleasant ways, and all her paths are peace.</p>
                <p><strong>18</strong> She is a tree of life to those who take hold of her; those who hold her fast will be blessed.</p>
                <p><strong>19</strong> By wisdom the Lord laid the earth's foundations, by understanding he set the heavens in place;</p>
                <p><strong>20</strong> by his knowledge the watery depths were divided, and the clouds let drop the dew.</p>
              </div>
              
              <div style={{marginTop: '2rem', padding: '1rem', background: 'rgba(254, 243, 199, 0.5)', borderRadius: '8px', borderLeft: '4px solid #d97706'}}>
                <p style={{margin: '0', fontStyle: 'italic', color: '#b45309', fontSize: '1.1rem'}}>
                  <strong>Angel's Message:</strong> "These ancient words carry divine wisdom for your modern journey. Trust in the Lord's guidance, for His understanding surpasses all earthly knowledge. Let these verses illuminate your path."
                </p>
              </div>
            </div>
          </div>
        );

      case 'confess':
        return (
          <div className="content-section">
            <h3 className="section-title">ANGEL CONFESSION PORTAL</h3>
            <div className="card prayer-form">
              <p style={{marginBottom: '1rem'}}>Share your confessions with your guardian angel. Your words are heard with divine compassion and understanding:</p>
              <textarea 
                placeholder="Confess your thoughts, sins, or burdens to your angel..."
                rows="6"
              />
              <button>
                SEND TO ANGEL
              </button>
              <p style={{marginTop: '1rem', fontSize: '0.9rem', fontStyle: 'italic', color: '#d97706'}}>
                "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness." - 1 John 1:9
              </p>
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
    <div className="paradise-terminal">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">
              <span>P</span>
            </div>
            <h1 className="title">PARADISE TERMINAL</h1>
          </div>
          
          <div className="status-section">
            <a 
              href="https://x.com/ParadiseSolCoin" 
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
                <span>PARADISE TERMINAL - COMMAND INTERFACE</span>
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
                <span>root@paradise:~$</span>
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
            © 2025 Paradise Terminal - Bridging Heaven and Technology | All Glory to God
          </p>
          <p className="footer-verse">
            "For where two or three gather in my name, there am I with them." - Matthew 18:20
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ParadiseTerminal;