import IconBase from './IconBase';

function InfantIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="6" r="2.5"/>
      <path d="M8 9.5h8v7.5a4 4 0 0 1-8 0z"/>
      <path d="M8 12.5c2.2.8 5.3 2.4 8 5"/>
    </IconBase>
  );
}

export default InfantIcon;  
