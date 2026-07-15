import IconBase from './IconBase';

function ChildIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 3a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5m-1.5 17h3v-5h1.5V9.5c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1V15h1.5z" />
    </IconBase>
  );
}

export default ChildIcon;  
