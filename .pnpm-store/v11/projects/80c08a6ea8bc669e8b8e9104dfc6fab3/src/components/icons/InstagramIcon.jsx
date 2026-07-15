import IconBase from './IconBase';

function InstagramIcon(props) {
  return (
    <IconBase {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </IconBase>
  );
}

export default InstagramIcon;
