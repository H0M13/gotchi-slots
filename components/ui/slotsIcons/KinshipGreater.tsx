import * as React from "react"

export const KinshipGreater = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 14" {...props}>
      <path d="M5 4V3H3v3h2V5H4V4h1z" fill="#b1d0ea" />
      <path d="M6 3v1H5v1h1v1h1V3H6z" fill="#6ea8d8" />
      <g fill="#ff4a4a">
        <path d="M4 1h1v1H4V1zm0 3h1v1H4V4zM5 3h1v1H5V3zm1-3h1v1H6V0zm0 5H5v1H3v2H2v3h1v1h3v-1h1V8H6V5z" />
      </g>
      <g fill="red">
        <path d="M8 8V7H7V6H6v2h1v3H6v1H3v-1H2V8H1v4h1v1h6v-1h1V8H8z" />
        <path d="M2 7h1v1H2V7z" />
      </g>
      <path d="M1 7h1v1H1V7zm0 5h1v1H1v-1zM3 3h4v4h1V3h1V2H1v1h1v4h1V3zM0 8h1v4H0V8zm9 0h1v4H9V8zM8 12h1v1H8v-1zm0-5h1v1H8V7zM2 13h6v1H2v-1z" />
    </svg>
  )
}