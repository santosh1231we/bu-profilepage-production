import styles from '@styles/profile.module.css';

export default function SectionBar({ label, icon, onClick, expanded, iconAlt }) {
  return (
    <button
      type="button"
      className={styles.sectionBar}
      onClick={onClick}
      aria-expanded={expanded ?? false}
    >
      <div className={styles.sectionLeft}>
        <span className={styles.plusCircle}>{expanded ? '－' : '＋'}</span>
        <span className={styles.sectionLabel}>{label}</span>
      </div>
      {icon ? (
        <img src={icon} alt={iconAlt ?? label} className={styles.sectionIconImage} />
      ) : null}
    </button>
  );
}

