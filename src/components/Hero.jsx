import styles from '@styles/profile.module.css';

export default function Hero({ title, headerLeft, headerRight, profileIcon, onProfileToggle }) {
  return (
    <header className={styles.hero}>
      <div className={styles.topBar}>
        <span className={styles.topBarLeft}>{headerLeft}</span>
        <span className={styles.topBarRight}>
          {profileIcon ? (
            <button
              type="button"
              className={styles.headerProfileBtn}
              onClick={() => onProfileToggle && onProfileToggle('profile')}
              aria-label="Open My building-U Profile"
              title="Open My building-U Profile"
            >
              <img src={profileIcon} alt="Profile" className={styles.headerProfileImg} />
            </button>
          ) : null}
          {headerRight}
        </span>
      </div>
      <div className={styles.heroTitleWrapper}>
        <h1 className={styles.heroTitle}>{title}</h1>
      </div>
    </header>
  );
}

