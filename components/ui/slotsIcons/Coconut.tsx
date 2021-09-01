import * as React from "react"

export const Coconut = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 18" {...props}>
      <g fill="#ff89ff">
        <path d="M2 0h1v1H2zM1 1h1v1H1zm3 0H3v2h1zM0 2h1v1H0zm5 1H4v2h1zM6 5H5v2h1zM6 7h1v1H6z" />
      </g>
      <path d="M3 7v1h3V7zm4 0v1h3V7z" fill="#fff" />
      <g fill="#955c4b">
        <path d="M5 7V6H3v1zm1-1v1h4V6zM2 7h1v1H2zm8 0h1v1h-1zM3 8v1h7V8z" />
      </g>
      <path
        d="M9 9h1v1H9zm-7 4h1v-3H2zm2-1h1v-2H4zm2 2h1v-3H6zm2-3h1v1H8zm2 0v2h1v-2zm-6 5h1v-3H4zm4-1h1v-2H8zm-2 2h1v-2H6z"
        fill="#7a500c"
      />
      <g fill="#511f17">
        <path d="M5 6V5H3v1zm1-1v1h4V5zM2 6h1v1H2zm8 0h1v1h-1zM11 7v1h-1v2H9V9H3V8H2V7H1v7h1v2h1v1h2v1h3v-1h2v-1h1v-2h1V7h-1zm-2 5H8v-1h1v1zm0 3H8v-2h1v2zm-3-4h1v3H6v-3zm-1-1v2H4v-2h1zm-3 0h1v3H2v-3zm2 6v-3h1v3H4zm2 1v-2h1v2H6zm5-4h-1v-2h1v2z" />
      </g>
    </svg>
  )
}