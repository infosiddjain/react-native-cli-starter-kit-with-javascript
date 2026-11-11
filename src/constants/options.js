// Option lists for dropdowns and pickers: [{ label, value }]
export const LANGUAGES = [
  { label: 'English', value: 'en', description: 'English' },
  { label: 'हिन्दी', value: 'hi', description: 'Hindi' },
  { label: 'Español', value: 'es', description: 'Spanish' },
  { label: 'Français', value: 'fr', description: 'French' },
  { label: 'Deutsch', value: 'de', description: 'German' },
  { label: '日本語', value: 'ja', description: 'Japanese' },
];

export const COUNTRIES = [
  'India',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'Brazil',
  'Singapore',
  'United Arab Emirates',
  'South Africa',
].map(name => ({
  label: name,
  value: name.toLowerCase().replace(/\s+/g, '-'),
}));

export const TOPICS = [
  { label: 'React Native', value: 'react-native', icon: 'layers' },
  { label: 'JavaScript', value: 'javascript', icon: 'grid' },
  { label: 'Design', value: 'design', icon: 'moon' },
  { label: 'Backend', value: 'backend', icon: 'database' },
  { label: 'Travel', value: 'travel', icon: 'globe' },
  {
    label: 'Archived',
    value: 'archived',
    disabled: true,
    description: 'Not available',
  },
];
