import * as React from "react"

export const Kinship = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 18" {...props}>
      <path d="M4 0v2h2V0zm0 3v1h2V3z" fill="#b37740" />
      <path d="M7 10V9H6V4H4v5H3v1H2v1h6v-1z" fill="#bcf5e9" />
      <g fill="#ff8585">
        <path d="M7 12v3h1v-3zM6 15h1v1H6z" />
      </g>
      <g fill="#ff4a4a">
        <path d="M8 12v3h1v-3zm-1 0H3v2h1v1h1v1h1v-1h1zM7 15h1v1H7z" />
      </g>
      <path d="M1 11v4h1v1h1v1h4v-1H5v-1H4v-1H3v-2h6v-1z" fill="red" />
      <path d="M4 3h2v6h1V3h1V2H2v1h1v6h1zM2 9h1v1H2zm5 0h1v1H7zM1 10h1v1H1zm7 0h1v1H8zM9 11v4h1v-4zm-8 0H0v4h1zM1 15h1v1H1zm7 0h1v1H8zM2 16h1v1H2zm5 0h1v1H7zM3 17v1h4v-1z" />
    </svg>
  )
}