import styles from '@styles/profile.module.css';

export default function Footer({ poweredBy, markers }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.poweredBy}>{poweredBy}</div>
      <div className={styles.markerRow}>
        {markers.map((m, index) => (
          <span key={index} className={styles.marker}>
            {m ? <img src={m} alt={`marker-${index}`} className={styles.markerImg} /> : null}
          </span>
        ))}
      </div>
    </footer>
  );
}

