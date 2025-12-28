import styles from '@styles/profile.module.css';

export default function Hero({ title, headerLeft, headerRight, profileIcon, logoIcon, onProfileToggle, onSignupClick, isSignedUp }) {
  return (
    <header className={styles.hero}>
      <div className={styles.topBar}>
        <span className={styles.topBarLeft}>
          {logoIcon ? (
            <img src={logoIcon} alt="Building-U Logo" className={styles.headerLogo} />
          ) : (
            headerLeft
          )}
        </span>
        <span className={styles.topBarRight}>
          {profileIcon ? (
            <button
              type="button"
              className={styles.headerProfileBtn}
              onClick={() => {
                if (isSignedUp) {
                  onProfileToggle && onProfileToggle('profile');
                } else {
                  onSignupClick && onSignupClick();
                }
              }}
              aria-label={isSignedUp ? "Open My building-U Profile" : "Sign Up"}
              title={isSignedUp ? "Open My building-U Profile" : "Sign Up"}
            >
              <img src={profileIcon} alt={isSignedUp ? "Profile" : "Sign Up"} className={styles.headerProfileImg} />
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

