import styles from '@styles/profile.module.css';

// Import available footer logos from assets and use them as defaults
import adsenseLogo from '../../assets/Plede-a-thon campaign page/logo/adsense-logo.png';
import flockLogo from '../../assets/Plede-a-thon campaign page/logo/flock-logo.jpg';
import knowledgeLogo from '../../assets/Plede-a-thon campaign page/logo/knowledgeflow-logo.jpg';

export default function Footer({ poweredBy = 'Powered by:', markers = [knowledgeLogo, adsenseLogo, flockLogo] }) {
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

