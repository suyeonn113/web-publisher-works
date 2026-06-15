import IconBase from './IconBase'

function TrendArrowIcon(props) {
  return (
    <IconBase viewBox="9 15 54 36" stroke="none" {...props}>
      <defs>
        <clipPath id="trend-arrow-clip">
          <path d="M10 44 25 29l9 9 14-14h-9v-8h23v23h-8v-9L34 50l-9-9-9 9z" />
        </clipPath>
      </defs>
      <path d="M10 44 25 29l9 9 14-14h-9v-8h23v23h-8v-9L34 50l-9-9-9 9z" />
      <g clipPath="url(#trend-arrow-clip)">
        <path d="M10 44v6l15-15v-6zM34 38v6l14-14v-6z" opacity="0.7" />
      </g>
    </IconBase>
  )
}

export default TrendArrowIcon
