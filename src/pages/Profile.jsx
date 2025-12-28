import React, { useEffect, useState, useRef } from 'react';
import { useWindowSize } from 'react-use';
import ConfettiPortal from '@components/ConfettiPortal.jsx';
import Hero from '@components/Hero.jsx';
import SectionBar from '@components/SectionBar.jsx';
import Footer from '@components/Footer.jsx';
import { heroContent, sectionItems, headerProfileIcon } from '@data/mockData.js';
import styles from '@styles/profile.module.css';

export default function Profile() {
  const [openSection, setOpenSection] = useState(null);
  const [rulebookOpen, setRulebookOpen] = useState(false);
  const [showSusDialog, setShowSusDialog] = useState(true);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [savedEntries, setSavedEntries] = useState({});
  const [categoryText, setCategoryText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [saveState, setSaveState] = useState('idle'); // idle | saving | saved
  const [showCongrats, setShowCongrats] = useState(false);
  const [congratsInfo, setCongratsInfo] = useState(null);
  const seedIcon = new URL('../../assets/Plede-a-thon campaign page/seed-level.jpeg', import.meta.url);
  const saplingIcon = new URL('../../assets/Plede-a-thon campaign page/sapling-level.jpeg', import.meta.url);
  const treeIcon = new URL('../../assets/Plede-a-thon campaign page/tree-level.jpeg', import.meta.url);
  // unlocked range state (10, 20, 30) - persist to localStorage
  const [maxUnlocked, setMaxUnlocked] = useState(10);

  // About panel: placeholder icon + 6 items (edit titles and content below in `aboutItems`)
  const aboutPlaceholder = new URL('../../assets/about-placeholder.svg', import.meta.url).href;
  const circleImages = [
    new URL('../../assets/Plede-a-thon campaign page/circle images/circle1.jpg', import.meta.url).href,
    new URL('../../assets/Plede-a-thon campaign page/circle images/circle2.jpeg', import.meta.url).href,
    new URL('../../assets/Plede-a-thon campaign page/circle images/circle3.jpg', import.meta.url).href
  ];
  const aboutItems = [
    {
      id: 0,
      title: 'So… what is sustainability?',
      shortLabel: 'What is sustainability?',
      /* Edit the popup content below if you want to change the first item's heading/content */
      content: `Sustainability isn’t about doing the most. It’s about doing what makes sense for you, and for what you share with the world. At its simplest, sustainability means not overusing what you don’t actually need. Time. Energy. Money. Resources. Space. And once you start seeing it that way, it stops feeling like awareness.`
    },
    {
      id: 1,
      title: "Sustainability isn’t big. It’s intentional.",
      shortLabel: 'Intentional',
      content: `We’ve been taught that sustainable actions have to be dramatic or inconvenient. But most of the time, they’re quiet. They show up when you choose something you’ll actually use. When you stop buying duplicates. When you slow down a habit that feels wasteful or unnecessary. Sustainability isn’t about giving things up. It’s about choosing things that stay.`
    },
    {
      id: 2,
      title: 'It starts with noticing',
      shortLabel: 'Noticing',
      content: `Almost every sustainable action begins with a moment like: “Why do I keep doing this?” Why do I throw this away so often? Why do I keep buying this but never finishing it? Why does this part of my routine feel messy or out of control? That moment of noticing is already enough. The action that follows doesn’t have to be perfect, it just has to be honest.`
    },
    {
      id: 3,
      title: 'The quiet win',
      shortLabel: 'Quiet win',
      content: `Sustainable choices often come with immediate wins. You stop losing things because your space makes sense. You save money because you’re buying less but better. You feel lighter because your routine isn’t working against you. Even something as small as keeping one reusable bottle you actually like using, that’s sustainability working with you, not against you.`
    },
    {
      id: 4,
      title: 'Questions instead of instructions',
      shortLabel: 'Questions',
      content: `Not everything needs a checklist. Sometimes the most useful thing is a question you keep coming back to: What do I waste without realizing it? What do I use once and forget about? What feels unnecessarily heavy in my routine? What do I keep buying but never finishing?`
    },
    {
      id: 5,
      title: 'One last thing',
      shortLabel: 'One last thing',
      content: `You don’t need to change everything. You just need to notice one thing and respond to it. That’s enough to begin. And that’s how sustainable actions actually last.`
    }
  ];

  const [aboutActive, setAboutActive] = useState(0);
  const [showAboutModal, setShowAboutModal] = useState(false);

  // Check animation badge id (short-lived) and confetti controls
  const [animatedCheck, setAnimatedCheck] = useState(null);
  const [confettiActive, setConfettiActive] = useState(false);
  const confettiTimerRef = useRef(null);
  const [confettiPieces, setConfettiPieces] = useState(60);
  const { width, height } = useWindowSize();
  const [pasteStatus, setPasteStatus] = useState('');

  const congratsRef = useRef(null);
  const [modalConfettiRect, setModalConfettiRect] = useState(null);
  const [showModalConfetti, setShowModalConfetti] = useState(false);
  const modalConfettiTimerRef = useRef(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const certificateImg = new URL('../../assets/Plede-a-thon campaign page/certificate.jpg', import.meta.url).href;
  const [certificateSubmitted, setCertificateSubmitted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('maxUnlocked');
      if (stored) setMaxUnlocked(Number(stored));
      const signedUp = localStorage.getItem('isSignedUp');
      if (signedUp === 'true') {
        setIsSignedUp(true);
        setShowSusDialog(false);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('maxUnlocked', String(maxUnlocked));
    } catch (e) {}
  }, [maxUnlocked]);



  const toggleSection = (id) => {
    setOpenSection((prev) => (prev === id ? null : id));
    setRulebookOpen(false);
  };

  const sustainabilityBadges = Array.from({ length: 30 }).map((_, idx) => ({
    id: idx,
    label: `Day ${idx + 1}`
  }));

  const progressPercent = Math.round(
    (Object.keys(savedEntries).length / sustainabilityBadges.length) * 100
  );

  useEffect(() => {
    if (openSection === 'sustainability' && !isSignedUp) {
      setShowSusDialog(true);
    }
  }, [openSection, isSignedUp]);

  useEffect(() => {
    if (selectedBadge) {
      const existing = savedEntries[selectedBadge.id];
      setCategoryText(existing?.category ?? '');
      setDescriptionText(existing?.description ?? '');
      setImagePreview(existing?.imageUrl ?? '');
      setSaveState('idle');

      // enable global paste support while modal is open
      const onPasteGlobal = (e) => {
        // prefer to paste into the modal's paste box, but as convenience accept global paste
        handlePaste(e);
      };
      window.addEventListener('paste', onPasteGlobal);
      return () => window.removeEventListener('paste', onPasteGlobal);
    }
  }, [selectedBadge, savedEntries]);

  // Load saved entries from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('savedEntries');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') setSavedEntries(parsed);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Expose dev utilities on window for quick testing
  useEffect(() => {
    // devSetEntries(n): creates n saved entries (n <= 30) and sets maxUnlocked accordingly
    window.devSetEntries = (n = 10) => {
      const count = Math.max(0, Math.min(Number(n) || 0, 30));
      const entries = {};
      for (let i = 0; i < count; i += 1) {
        entries[i] = {
          category: `Auto Day ${i + 1}`,
          description: 'Auto-filled by devSetEntries',
          imageUrl: ''
        };
      }
      setSavedEntries(entries);
      const unlocked = Math.min(30, Math.ceil(count / 10) * 10 || 10);
      setMaxUnlocked(unlocked);
      console.info(`[dev] set ${count} entries, maxUnlocked=${unlocked}`);

      // If a milestone was reached exactly, show the congrats modal for that milestone
      if (count === 10 || count === 20 || count === 30) {
        let level = 'Seed Level';
        let icon = seedIcon;
        let hours = 2;
        let message = `Good Job! You finished ${count} days and earned ${hours} hours. Would you like to do more?`;
        if (count === 20) {
          level = 'Sapling Level';
          icon = saplingIcon;
          hours = 6;
          message = `Nice! You finished 20 days and earned 6 hours. Would you like to do more?`;
        } else if (count === 30) {
          level = 'Tree Level';
          icon = treeIcon;
          hours = 15;
          message = `Whoo Hoo!! You finished 30 days and earned 15 hours + 5 more IF over half your logs were composting!`;
        }
        setCongratsInfo({ days: count, hours, level, icon, message });
        setShowCongrats(true);
      }
    };

    // devConfetti({pieces, duration}): override confetti behavior temporarily
    window.devConfetti = ({ pieces = 60, duration = 2500 } = {}) => {
      window.__devConfetti = { pieces: Number(pieces) || 60, duration: Number(duration) || 2500 };
      console.info(`[dev] confetti override set: pieces=${window.__devConfetti.pieces}, duration=${window.__devConfetti.duration}ms`);
    };

    console.info('[dev] Utilities: devSetEntries(n) to set saved entries; devConfetti({pieces,duration}) to override confetti');

    return () => {
      delete window.devSetEntries;
      delete window.devConfetti;
      delete window.__devConfetti;
    };
  }, []);

  // Show modal-confetti when a milestone congrats modal opens
  useEffect(() => {
    if (showCongrats && congratsInfo && (congratsInfo.days === 10 || congratsInfo.days === 20 || congratsInfo.days === 30)) {
      requestAnimationFrame(() => {
        const el = congratsRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        setModalConfettiRect(rect);
        setShowModalConfetti(true);
        const devOverride = window.__devConfetti;
        const duration = devOverride?.duration ?? 5500;
        const pieces = devOverride?.pieces ?? 300;
        setConfettiPieces(pieces);
        if (modalConfettiTimerRef.current) clearTimeout(modalConfettiTimerRef.current);
        modalConfettiTimerRef.current = setTimeout(() => {
          setShowModalConfetti(false);
          setModalConfettiRect(null);
          modalConfettiTimerRef.current = null;
        }, duration);
      });
    }
    return () => {
      if (modalConfettiTimerRef.current) {
        clearTimeout(modalConfettiTimerRef.current);
        modalConfettiTimerRef.current = null;
      }
    };
  }, [showCongrats, congratsInfo]);

  // Persist saved entries to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('savedEntries', JSON.stringify(savedEntries));
    } catch (e) {
      // ignore
    }
  }, [savedEntries]);

  const handleFileSelect = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  // handle paste events in the modal for images copied to clipboard (e.g., copy from WhatsApp/web)
  const handlePaste = async (e) => {
    try {
      const clipboard = e.clipboardData;
      if (!clipboard) return;

      // 1) Try to find image files in items
      const items = clipboard.items || [];
      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        if (item && item.type && item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          if (file) {
            handleFileSelect(file);
            try { if (e.target && 'value' in e.target) e.target.value = ''; } catch (err) {}
            e.preventDefault();
            setPasteStatus('Image pasted');
            setTimeout(() => setPasteStatus(''), 1600);
            return;
          }
        }
      }

      // 2) Try clipboard.files (some browsers expose files directly)
      const files = clipboard.files || [];
      if (files.length > 0 && files[0].type.indexOf('image') !== -1) {
        handleFileSelect(files[0]);
        try { if (e.target && 'value' in e.target) e.target.value = ''; } catch (err) {}
        e.preventDefault();
        setPasteStatus('Image pasted');
        setTimeout(() => setPasteStatus(''), 1600);
        return;
      }

      // 3) Try plain text (could be a URL or a base64 data URL)
      const text = clipboard.getData && (clipboard.getData('text/plain') || clipboard.getData('text'));
      if (text) {
        const trimmed = text.trim();
        // data URL (data:image/...)
        if (trimmed.startsWith('data:image/')) {
          try {
            // data url -> blob
            const res = await fetch(trimmed);
            const blob = await res.blob();
            handleFileSelect(new File([blob], 'pasted-image.png', { type: blob.type }));
            try { if (e.target && 'value' in e.target) e.target.value = ''; } catch (err) {}
            e.preventDefault();
            setPasteStatus('Image pasted');
            setTimeout(() => setPasteStatus(''), 1600);
            return;
          } catch (err) {
            // ignore
          }
        }

        // URL (http(s)) - try to fetch and create blob, otherwise set url directly
        if (/^https?:\/\//i.test(trimmed)) {
          try {
            // prefer to fetch and convert to a blob (CORS may block this)
            const res = await fetch(trimmed, { mode: 'cors' });
            if (res.ok) {
              const blob = await res.blob();
              if (blob.type.indexOf('image') !== -1) {
                handleFileSelect(new File([blob], 'pasted-remote-image', { type: blob.type }));
                try { if (e.target && 'value' in e.target) e.target.value = ''; } catch (err) {}
                e.preventDefault();
                setPasteStatus('Image pasted');
                setTimeout(() => setPasteStatus(''), 1600);
                return;
              }
            }
            // fallback - set preview to the URL directly
            setImagePreview(trimmed);
            try { if (e.target && 'value' in e.target) e.target.value = ''; } catch (err) {}
            e.preventDefault();
            setPasteStatus('Image URL set');
            setTimeout(() => setPasteStatus(''), 1600);
            return;
          } catch (err) {
            // fallback to setting URL directly
            setImagePreview(trimmed);
            try { if (e.target && 'value' in e.target) e.target.value = ''; } catch (err) {}
            e.preventDefault();
            setPasteStatus('Image URL set');
            setTimeout(() => setPasteStatus(''), 1600);
            return;
          }
        }
      }

      // 4) Try HTML clipboard (contains <img src="...">)
      const html = clipboard.getData && clipboard.getData('text/html');
      if (html) {
        const m = /<img[^>]+src=["']?([^"'>\s]+)["']?/i.exec(html);
        if (m && m[1]) {
          const src = m[1];
          try {
            if (src.startsWith('data:image/')) {
              const res = await fetch(src);
              const blob = await res.blob();
              handleFileSelect(new File([blob], 'pasted-image.png', { type: blob.type }));
            } else {
              // try fetch remote image blob
              const res = await fetch(src, { mode: 'cors' });
              if (res.ok) {
                const blob = await res.blob();
                handleFileSelect(new File([blob], 'pasted-remote-image', { type: blob.type }));
              } else {
                setImagePreview(src);
              }
            }
            try { if (e.target && 'value' in e.target) e.target.value = ''; } catch (err) {}
            e.preventDefault();
            setPasteStatus('Image pasted');
            setTimeout(() => setPasteStatus(''), 1600);
            return;
          } catch (err) {
            // ignore
          }
        }
      }

      // nothing found
      setPasteStatus('No image found in clipboard');
      setTimeout(() => setPasteStatus(''), 1600);
    } catch (err) {
      // swallow
      setPasteStatus('Paste failed');
      setTimeout(() => setPasteStatus(''), 1600);
    }
  };

  // Simple certificate download generator (creates a small SVG certificate for demo/download)
  const downloadCertificate = () => {
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200" viewBox="0 0 1600 1200">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <text x="50%" y="220" text-anchor="middle" font-family="Georgia, serif" font-size="72" fill="#1693d2">CERTIFICATE READY</text>
  <text x="50%" y="320" text-anchor="middle" font-family="Georgia, serif" font-size="36" fill="#c30673">This certifies that you completed 30 days of sustainability logs</text>
  <g transform="translate(620,380)">
    <circle cx="160" cy="160" r="120" fill="#f6b042" />
    <path d="M160 100 l40 90 h100 l-80 58 30 100 -90-62 -90 62 30-100 -80-58 h100z" fill="#e67e22" />
  </g>
  <text x="50%" y="1040" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="#000">Building-U • ReNew Challenge</text>
</svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'building-u-certificate.svg';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setShowCongrats(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.backgroundLayer} />
      <div className={styles.puzzleOverlay} />
      <div className={styles.pinkOverlay}>
        <img 
          src={new URL('../../assets/Plede-a-thon campaign page/simple-leaves.png', import.meta.url).href}
          alt=""
          className={styles.pinkOverlayLeaves}
        />
      </div>
      <div className={styles.content}>
        <Hero
          title={heroContent.title}
          headerLeft={heroContent.headerLeft}
          headerRight={heroContent.headerRight}
          logoIcon={new URL('../../assets/Plede-a-thon campaign page/logo.png', import.meta.url).href}
          profileIcon={isSignedUp ? headerProfileIcon : new URL('../../assets/Plede-a-thon campaign page/btn_06-signup.png', import.meta.url).href}
          onProfileToggle={toggleSection}
          onSignupClick={() => setShowSignupModal(true)}
          isSignedUp={isSignedUp}
        />
        <style>{`.topBar { padding: 16px 36px; } @media (max-width: 720px) { .headerProfileImg { width: 40px; height: 40px } .headerProfileBtn { width: 48px; height: 48px }`}</style>
        <div className={styles.sections}>
          {sectionItems.map((item) => {
            const isOpen = openSection === item.id;
            return (
              <div key={item.id} className={styles.sectionGroup}>
                <SectionBar
                  label={item.label}
                  icon={item.icon}
                  iconAlt={item.iconAlt}
                  expanded={isOpen}
                  onClick={() => toggleSection(item.id)}
                />
                {item.id === 'profile' ? (
                  <div
                    className={`${styles.susCard} ${isOpen ? styles.expandedCard : ''}`}
                    aria-hidden={!isOpen}
                  >
                    <div
                      className={`${styles.susBadgesWrapper} ${
                        isOpen ? styles.panelOpen : ''
                      }`}
                    >
                      <div className={styles.susBadgesScroll}>
                        <div className={styles.aboutBadges}>
                          {aboutItems.map((a) => {
                            const circleImageIndex = a.id % circleImages.length;
                            const circleImage = circleImages[circleImageIndex];
                            return (
                              <div key={a.id} className={styles.aboutBadgeWrapper}>
                                <button
                                  type="button"
                                  className={`${styles.susBadge} ${styles.aboutBadge}`}
                                  onClick={() => {
                                    setAboutActive(a.id);
                                    setShowAboutModal(true);
                                  }}
                                  aria-label={a.title}
                                >
                                  <span 
                                    className={styles.susBadgeThumb}
                                    style={{ backgroundImage: `url(${circleImage})` }}
                                    aria-hidden="true"
                                  />
                                </button>
                                <span className={styles.aboutBadgeLabel}>{a.shortLabel}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {item.id === 'how' ? (
                  <div
                    className={`${styles.profileFormCard} ${
                      isOpen ? styles.expandedCard : ''
                    }`}
                    aria-hidden={!isOpen}
                  >
                    <div className={styles.howItWorksContainer}>
                      <img 
                        src={new URL('../../assets/Plede-a-thon campaign page/How to register/top-part.jpg', import.meta.url).href}
                        alt=""
                        className={styles.howItWorksTopImage}
                      />
                      <img 
                        src={new URL('../../assets/Plede-a-thon campaign page/How to register/bottom-part.jpg', import.meta.url).href}
                        alt=""
                        className={styles.howItWorksBottomImage}
                      />
                      {/* Text content will be added here later on top of images */}
                    </div>
                  </div>
                ) : null}

                {item.id === 'sustainability' ? (
                  <div
                    className={`${styles.susCard} ${isOpen ? styles.expandedCard : ''} ${showSusDialog && !isSignedUp ? styles.susCardWithOverlay : ''}`}
                    aria-hidden={!isOpen}
                  >
                    {showSusDialog && !isSignedUp ? (
                      <div className={styles.susRedOverlayFull} />
                    ) : null}
                    <div className={styles.susProgress}>
                      <div className={styles.susProgressTrack}>
                        <div
                          className={styles.susProgressFill}
                          style={{ width: `${progressPercent}%` }}
                        />
                        <div className={styles.susProgressSeed}>🌱</div>
                        <div className={styles.susProgressLeaf}>🌿</div>
                        <div className={styles.susProgressTree}>🌳</div>
                      </div>
                      <div className={styles.susProgressText}>{progressPercent}%</div>
                    </div>

                    <div
                      className={styles.susHeaderRow}
                      onClick={() => setRulebookOpen((prev) => !prev)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setRulebookOpen((prev) => !prev);
                        }
                      }}
                    >
                      <span className={styles.susRuleIcon}>{rulebookOpen ? '－' : '＋'}</span>
                      <span className={styles.susRuleText}>Sustainability Log Rulebook</span>
                      <span className={styles.susRuleBook}>📘</span>
                    </div>

                    <div
                      className={`${styles.rulebookPanel} ${
                        rulebookOpen ? styles.panelOpen : ''
                      }`}
                    >
                      <div className={styles.rulebookContent}>
                        <div className={styles.rulebookHeading}>*Rules*</div>
                        <p className={styles.rulebookText}>
                          Placeholder rules content. Scroll to view more. This area is intentionally
                          scrollable with a white scrollbar to match the reference.
                        </p>
                        <p className={styles.rulebookText}>
                          Add additional rule text here to demonstrate scrolling. Keep this purely
                          frontend and mock data only.
                        </p>
                        <p className={styles.rulebookText}>
                          More rules... More rules... More rules... More rules... More rules...
                        </p>
                        <p className={styles.rulebookText}>
                          Even more rules to ensure overflow and scrollbar visibility. Repeat text to
                          force scrolling as needed.
                        </p>
                      </div>
                    </div>

                    <div
                      className={`${styles.susBadgesWrapper} ${
                        rulebookOpen ? styles.panelHidden : styles.panelOpen
                      }`}
                    >
                      {/* Red overlay when signup dialog is active */}
                      {showSusDialog && !isSignedUp ? (
                        <>
                          <div className={styles.susRedOverlay} />
                          <div className={styles.susRedPanel}>
                            <button
                              type="button"
                              className={styles.susRedPanelButton}
                              onClick={() => {
                                setShowSusDialog(false);
                                setShowSignupModal(true);
                              }}
                            >
                              Sign Up for the ReNew is the new NEW Challenge to Gain Access
                            </button>
                          </div>
                        </>
                      ) : null}
                      <div className={styles.susBadgesScroll}>
                        <div className={styles.susBadges}>
                          {sustainabilityBadges.map((badge) => {
                            const day = badge.id + 1;
                            const isLocked = day > maxUnlocked;
                            const isSaved = Boolean(savedEntries[badge.id]);
                            return (
                              <button
                                key={badge.id}
                                type="button"
                                className={`${styles.susBadge} ${isSaved ? styles.susBadgeHasImage : ''} ${isLocked ? styles.susBadgeLocked : ''}`}
                                onClick={() => !isLocked && setSelectedBadge(badge)}
                                disabled={isLocked}
                                title={
                                  isLocked
                                    ? `Finish first ${maxUnlocked} days to unlock the next ${maxUnlocked + 10} days`
                                    : (savedEntries[badge.id]?.category || badge.label)
                                }
                              >
                                {savedEntries[badge.id]?.imageUrl ? (
                                  <span
                                    className={styles.susBadgeThumb}
                                    style={{ backgroundImage: `url(${savedEntries[badge.id].imageUrl})` }}
                                    aria-label={badge.label}
                                  />
                                ) : (
                                  <span className={styles.susBadgeLabel}>{badge.label}</span>
                                )}

                                {/* Check overlay if saved */}
                                {isSaved ? (
                                  <span
                                    className={`${styles.susBadgeOverlay} ${animatedCheck === badge.id ? styles.susBadgeCheckAnim : ''}`}
                                    aria-hidden="true"
                                    data-type="check"
                                  />
                                ) : null}

                                {/* Lock overlay if locked */}
                                {isLocked ? (
                                  <span
                                    className={styles.susBadgeOverlay}
                                    role="img"
                                    aria-label={`Finish until ${maxUnlocked} days first`}
                                    data-type="lock"
                                  />
                                ) : null}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Submit for certificate button (shows when 30 or more saved entries and not already submitted) */}
                      {Object.keys(savedEntries).length >= 30 && !certificateSubmitted ? (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <button
                            type="button"
                            className={styles.certificateSubmitBtn}
                            onClick={() => {
                              setShowCertificate(true);
                              setCertificateSubmitted(true);
                            }}
                          >
                            Submit for Certificate
                          </button>
                        </div>
                      ) : null}

                      {/* Red overlay when signup dialog is active */}
                      {showSusDialog && !isSignedUp ? (
                        <>
                          <div className={styles.susRedOverlay} />
                          <div className={styles.susRedPanel}>
                            <button
                              type="button"
                              className={styles.susRedPanelButton}
                              onClick={() => {
                                setShowSusDialog(false);
                                setShowSignupModal(true);
                              }}
                            >
                              Sign Up for the ReNew is the new NEW Challenge to Gain Access
                            </button>
                          </div>
                        </>
                      ) : null}
                      <div className={styles.susFooterNote}>
                        Did you post yet? Make sure to tag building-u and post the link here!
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        {/* About sustainability popup modal */}
        {showAboutModal ? (
          <div
            className={styles.aboutPopupWrapper}
            role="dialog"
            aria-modal="true"
            onClick={() => setShowAboutModal(false)}
          >
            <div className={styles.aboutPopupCard} onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className={styles.aboutPopupClose}
                onClick={() => setShowAboutModal(false)}
                aria-label="Close"
              >
                ✕
              </button>

              <div className={styles.aboutPopupHeart}>❤</div>

              <div className={styles.aboutPopupInner}>
                <img 
                  src={new URL('../../assets/Plede-a-thon campaign page/logo.png', import.meta.url).href}
                  alt="Building-U Logo"
                  className={styles.aboutPopupLogo}
                />
                <h3 className={styles.aboutPopupTitle}>{aboutItems.find(it => it.id === aboutActive)?.title}</h3>
                <div className={styles.aboutPopupText}>
                  {aboutItems.find(it => it.id === aboutActive)?.content}
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {selectedBadge ? (
          <div
            className={styles.modalOverlay}
            role="dialog"
            aria-modal="true"
            onClick={() => setSelectedBadge(null)}
          >
            <div className={styles.modalWrapper}>
              <div className={styles.modalBubble}>Nice job!!</div>
              <div
                className={styles.modalCard}
                onClick={(e) => e.stopPropagation()}
              >
              <div className={styles.modalHeader}>
                <button
                  type="button"
                  className={styles.modalClose}
                  onClick={() => setSelectedBadge(null)}
                  aria-label="Close"
                >
                  ×
                </button>
                <span className={styles.modalTitle}>{selectedBadge.label} LOG</span>
                <button
                  type="button"
                  className={styles.modalSave}
                  disabled={saveState === 'saving'}
                  onClick={() => {
                    // save immediately
                    setSaveState('saving');
                    const willIncrement = !savedEntries[selectedBadge.id];
                    const nextCount = Object.keys(savedEntries).length + (willIncrement ? 1 : 0);

                    setSavedEntries((prev) => ({
                      ...prev,
                      [selectedBadge.id]: {
                        category: categoryText,
                        description: descriptionText,
                        imageUrl: imagePreview
                      }
                    }));

                    setSaveState('saved');

                    // animate check on this badge (longer)
                    setAnimatedCheck(selectedBadge.id);
                    setTimeout(() => setAnimatedCheck(null), 1200);

                    // confetti: small for ordinary saves, big for milestones
                    const isMilestone = willIncrement && (nextCount === 10 || nextCount === 20 || nextCount === 30);
                    if (isMilestone) {
                      let level = 'Seed Level';
                      let icon = seedIcon;
                      let hours = 2;
                      let message = `Good Job! You finished ${nextCount} days and earned ${hours} hours. Would you like to do more?`;

                      if (nextCount === 20) {
                        level = 'Sapling Level';
                        icon = saplingIcon;
                        hours = 6;
                        message = `Nice! You finished 20 days and earned 6 hours. Would you like to do more?`;
                      } else if (nextCount === 30) {
                        level = 'Tree Level';
                        icon = treeIcon;
                        hours = 15;
                        message = `Whoo Hoo!! You finished 30 days and earned 15 hours + 5 more IF over half your logs were composting!`;
                      }

                      setCongratsInfo({ days: nextCount, hours, level, icon, message });
                      setShowCongrats(true);
                    }
                    // allow dev override (window.__devConfetti) for pieces & duration
                    const devOverride = window.__devConfetti;
                    const duration = devOverride?.duration ?? (isMilestone ? 5500 : 2500);
                    const pieces = devOverride?.pieces ?? (isMilestone ? 300 : 60);
                    if (confettiTimerRef.current) {
                      clearTimeout(confettiTimerRef.current);
                      confettiTimerRef.current = null;
                    }
                    setConfettiPieces(pieces);
                    setConfettiActive(true);
                    confettiTimerRef.current = setTimeout(() => {
                      setConfettiActive(false);
                      confettiTimerRef.current = null;
                      // clear dev override after one use (optional)
                      // delete window.__devConfetti;
                    }, duration);

                    setTimeout(() => setSelectedBadge(null), 400);
                  }}
                >
                  {saveState === 'saving' ? 'Saving...' : savedEntries[selectedBadge.id] ? 'Update' : 'Save'}
                </button>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.modalImageSection}>
                  <label className={styles.modalImagePlaceholder}>
                    {imagePreview ? (
                      <img src={imagePreview} alt="Selected" className={styles.modalImagePreview} />
                    ) : (
                      <span className={styles.modalPlaceholderText}>Drag & Drop or Click to add</span>
                    )}
                    <input
                      className={styles.modalFileInput}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileSelect(e.target.files?.[0])}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files?.[0];
                        handleFileSelect(file);
                      }}
                    />
                  </label>

                  {/* Paste textbox: users can right-click-copy images (e.g., from WhatsApp web) then paste into this smaller textarea below the image */}
                  <div className={styles.modalPasteSection}>
                    <textarea
                      className={styles.modalPasteZone}
                      placeholder={imagePreview ? 'Paste another image to replace current' : 'Paste images here from clipboard'}
                      onPaste={(e) => handlePaste(e)}
                      rows={1}
                      aria-label="Paste images here from clipboard"
                    />
                    {pasteStatus ? (
                      <div className={styles.pasteStatus}>{pasteStatus}</div>
                    ) : null}
                  </div>
                </div>
                <div className={styles.modalFields}>
                  <div className={styles.modalFieldLabel}>Category</div>
                  <input
                    className={styles.modalInput}
                    type="text"
                    value={categoryText}
                    onChange={(e) => setCategoryText(e.target.value)}
                  />
                  <div className={styles.modalFieldLabel}>Description</div>
                  <textarea
                    className={styles.modalTextarea}
                    rows="3"
                    value={descriptionText}
                    onChange={(e) => setDescriptionText(e.target.value)}
                  />
                  <div className={styles.modalFieldNote}>
                    {saveState === 'idle' && (savedEntries[selectedBadge.id] ? 'Edit your entry and hit Update.' : 'Fill your entry and hit Save.')}
                    {saveState === 'saving' && 'Saving your log...'}
                    {saveState === 'saved' && 'Congratulations! Log saved!! 🎉'}
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        ) : null}
        {confettiActive && (
          <ConfettiPortal width={width} height={height} numberOfPieces={confettiPieces} style={{ zIndex: 9998 }} />
        )}
        {/* modal-confetti */}
        {(typeof showModalConfetti !== 'undefined' && showModalConfetti && modalConfettiRect) ? (
          <ConfettiPortal
            width={Math.max(100, Math.floor(modalConfettiRect.width))}
            height={Math.max(100, Math.floor(modalConfettiRect.height))}
            numberOfPieces={confettiPieces}
            style={{ left: Math.floor(modalConfettiRect.left), top: Math.floor(modalConfettiRect.top), width: Math.floor(modalConfettiRect.width), height: Math.floor(modalConfettiRect.height), zIndex: 99999 }}
          />
        ) : null}
        {showCongrats ? (
          <div
            className={styles.congratsOverlay}
            role="dialog"
            aria-modal="true"
            onClick={() => setShowCongrats(false)}
          >
            <div className={styles.congratsModal} ref={congratsRef} onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className={styles.congratsClose}
                onClick={() => setShowCongrats(false)}
                aria-label="Close"
              >
                ×
              </button>
              <div className={styles.congratsContent}>
                <div className={styles.congratsIcon}>
                  {congratsInfo?.days === 30 ? (
                    // inline certificate-style SVG for the 30-day milestone
                    <svg width="160" height="160" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <g fill="none" fillRule="evenodd">
                        <circle cx="100" cy="68" r="44" fill="#f6b042" />
                        <path d="M100 44l12 30h33l-27 18 10 30-27-19-27 19 10-30-27-18h33z" fill="#e67e22" />
                        <path d="M68 120l11 40 17-26 17 26 11-40 17 26 11-40z" fill="#e67e22" opacity="0.95" />
                      </g>
                    </svg>
                  ) : (
                    <img src={congratsInfo?.icon ?? seedIcon} alt={congratsInfo?.level ?? 'Seed Level'} />
                  )}
                </div>

                <div className={styles.congratsLevel}>{congratsInfo?.level ?? 'Seed Level'}</div>
                <div className={styles.congratsTitle}>{congratsInfo?.days === 30 ? 'CERTIFICATE READY' : 'CONGRATULATIONS!!'}</div>
                <div className={styles.congratsMessage}>
                  {congratsInfo?.message ?? `Good Job! You finished ${congratsInfo?.days ?? 10} days and earned ${congratsInfo?.hours ?? 2} hours. Would you like to do more?`}
                </div>
                <div className={styles.congratsButtons}>
                  <button
                    type="button"
                    className={styles.congratsBtnPrimary}
                    onClick={() => {
                      if (congratsInfo?.days === 30) {
                        // open the certificate-ready modal (submit flow)
                        setShowCongrats(false);
                        setShowCertificate(true);
                      } else {
                        alert('Certificate requested!');
                        setShowCongrats(false);
                      }
                    }}
                  >
                    {congratsInfo?.days === 30 ? 'Submit for Certificate' : 'Request Certificate'}
                  </button>
                  <button
                    type="button"
                    className={styles.congratsBtnSecondary}
                    onClick={() => {
                      // Unlock next range on 'Do more Days'
                      if (congratsInfo?.days === 10) setMaxUnlocked(20);
                      else if (congratsInfo?.days === 20) setMaxUnlocked(30);
                      setShowCongrats(false);
                    }}
                  >
                    Do more Days
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {showCertificate ? (
          <div
            className={styles.congratsOverlay}
            role="dialog"
            aria-modal="true"
            onClick={() => setShowCertificate(false)}
          >
            <div className={styles.congratsModal} onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className={styles.congratsClose}
                onClick={() => setShowCertificate(false)}
                aria-label="Close"
              >
                ×
              </button>
              <div className={styles.congratsContent}>
                <div className={styles.congratsIcon}>
                  <img src={certificateImg} alt="Certificate" className={styles.certificateImg} />
                </div>
                <div className={styles.congratsTitle}>CERTIFICATE READY</div>
                <div className={styles.congratsMessage}>Your certificate is ready. Preview or download it below.</div>
                <div className={styles.congratsButtons}>
                  <a href={certificateImg} download="building-u-certificate.jpg" className={styles.congratsBtnPrimary} onClick={() => setShowCertificate(false)}>Download Certificate</a>
                  <button type="button" className={styles.congratsBtnSecondary} onClick={() => { setShowCertificate(false); }}>Close</button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {/* Signup Modal */}
        {showSignupModal ? (
          <div
            className={styles.signupModalOverlay}
            role="dialog"
            aria-modal="true"
            onClick={() => setShowSignupModal(false)}
          >
            <div className={styles.signupModalCard} onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className={styles.signupModalClose}
                onClick={() => setShowSignupModal(false)}
                aria-label="Close"
              >
                ×
              </button>
              <div className={styles.signupModalContent}>
                <h2 className={styles.signupModalTitle}>Sign Up</h2>
                <div className={styles.signupForm}>
                  <div className={styles.signupFormRow}>
                    <label className={styles.signupFormLabel}>Name:</label>
                    <input
                      type="text"
                      className={styles.signupFormInput}
                      value={signupForm.name}
                      onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                    />
                  </div>
                  <div className={styles.signupFormRow}>
                    <label className={styles.signupFormLabel}>Email:</label>
                    <input
                      type="email"
                      className={styles.signupFormInput}
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                    />
                  </div>
                  <div className={styles.signupFormRow}>
                    <label className={styles.signupFormLabel}>Phone Number:</label>
                    <input
                      type="tel"
                      className={styles.signupFormInput}
                      value={signupForm.phone}
                      onChange={(e) => setSignupForm({...signupForm, phone: e.target.value})}
                    />
                  </div>
                  <button
                    type="button"
                    className={styles.signupFormSave}
                    onClick={() => {
                      localStorage.setItem('isSignedUp', 'true');
                      setIsSignedUp(true);
                      setShowSignupModal(false);
                      setShowSusDialog(false);
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <Footer />
      </div>
    </div>
  );
}

