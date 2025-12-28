export const heroContent = {
  title: 'MY Building-U',
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

export const sectionItems = [
  {
    id: 'profile',
    label: 'About sustainability',
    icon: profileIcon,
    iconAlt: 'About'
  },
  {
    id: 'how',
    label: 'How does it work?',
    icon: profileIcon,
    iconAlt: 'How'
  },
  {
    id: 'sustainability',
    label: 'My Sustainability Log',
    icon: sustainabilityIcon,
    iconAlt: 'Sustainability'
  }
];

// Footer markers were consolidated into the Footer component to use local assets directly.
// Keeping this file focused on page-level content (hero and section definitions).

