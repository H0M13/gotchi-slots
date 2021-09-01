import * as React from "react"

export const Fireball = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 12" {...props}>
      <path
        d="M9 5V3H8V2H7V1H6V0H4v1H3v1H2v1H1v2H0v4h1v1h1v1h1v1h4v-1h1v-1h1V9h1V5z"
        fill="red"
      />
      <path
        d="M8 6V4H7V3H6V2H5V1H4v2H3v1H2v2H1v3h1v1h1v1h4v-1h1V9h1V6z"
        fill="#ff6f00"
      />
      <path d="M7 6V4H6V3H5v1H4v1H3V4H2v6h1v1h4V9h1V6z" fill="#fa0" />
      <g fill="#ff0">
        <path d="M6 6V5H4v1H3v2H2v2h1v1h3V9h1V7H6zM7 6h1v1H7zM6 4h1v1H6zM2 5h1v1H2z" />
      </g>
    </svg>
  )
}