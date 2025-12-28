// TODO: replace with backend-provided data
export const heroContent = {
  title: 'MY BUILDING-U',
  subtitle: 'RENEW is the NEW NEW',
  headerLeft: 'Building-U Logo',
  headerRight: ''
};

const profileIcon = new URL(
  '../../assets/Plede-a-thon campaign page/profile.png.jpg',
  import.meta.url
).href;

export const headerProfileIcon = new URL(
  '../../assets/Plede-a-thon campaign page/profile-header.png',
  import.meta.url
).href;

const sustainabilityIcon = new URL(
  '../../assets/Plede-a-thon campaign page/sustainability-log.png.jpg',
  import.meta.url
).href;

// TODO: replace with backend-provided data
export const sectionItems = [
  {
    id: 'profile',
    label: 'My building-U Profile',
    icon: profileIcon,
    iconAlt: 'Profile'
  },
  {
    id: 'sustainability',
    label: 'My Sustainability Log',
    icon: sustainabilityIcon,
    iconAlt: 'Sustainability'
  }
];

// TODO: replace with backend-provided data
const adsenseLogo = new URL('../../assets/Plede-a-thon campaign page/logo/adsense-logo.png', import.meta.url).href;

export const footerContent = {
  poweredBy: 'Powered by:',
  // only 3 markers; the middle one shows the AdSense logo
  markers: [null, adsenseLogo, null]
};

