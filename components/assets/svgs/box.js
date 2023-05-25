

export const Box = ({props}) => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={247}
    height={194}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      fillOpacity={0.16}
      d="M80 102.75 0 145l80 48.5h83.5V153L80 102.75Z"
      style={{
        mixBlendMode: "darken",
      }}
    />
    <mask
      id="a"
      width={78}
      height={91}
      x={86}
      y={3}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <path fill="#EE4FA7" d="m86 48.75 77.75 44.5V3.5L86 48.75Z" />
    </mask>
    <g mask="url(#a)">
      <path fill="#F4BF48" d="m86 48.75 77.75 44.5V3.5L86 48.75Z" />
      <path
        fill="#C3993A"
        d="m124.875 71 38.875 22.25 27.75-44.875L163.75 3.5 124.875 71Z"
        opacity={0.5}
      />
    </g>
    <path
      fill="#FBE9BF"
      fillRule="evenodd"
      d="M163.5 96.75 80 49l83.5-49L247 49l-83.5 47.75Zm-.082-3.69L86 48.75l77.426-45.061.074-.189.125.073.125-.073v.146l77.5 45.104-77.5 44.357v.143l-.125-.072-.125.072-.082-.19Z"
      clipRule="evenodd"
    />
    <path fill="#C3993A" d="m80 49 83.5 47.75v96.75L80 145V49Z" />
    <path fill="#F4BF48" d="m247 49-83.5 47.75v96.75L247 145V49Z" />
    <path fill="#92732B" d="m241.25 48.75-77.75 44.5V3.5l77.75 45.25Z" />
  </svg>

  )
}
