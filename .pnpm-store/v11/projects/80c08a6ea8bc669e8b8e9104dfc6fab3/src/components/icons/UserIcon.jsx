import IconBase from './IconBase';

function UserIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="7" r="4"/>
      <path d="M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2z"/>
    </IconBase>
  );
}

export default UserIcon;
