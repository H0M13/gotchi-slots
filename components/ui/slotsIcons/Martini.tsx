import * as React from "react"

export const Martini = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 19" {...props}>
      <path d="M4 6v1h1v1h1v1h1v1h1v1h1v-1h1V9h1V8h1V7h1V6z" fill="#fff" />
      <g fill="#502d16">
        <path d="M9 9h1v1H9zM8 8h1v1H8zM7 7h1v1H7zM6 6h1v1H6zM0 0h1v1H0z" />
      </g>
      <path d="M1 1h1v1H1z" fill="#a0af5f" />
      <path d="M2 1v1H1v1h2V1z" fill="#668000" />
      <path d="M3 3h1v1H3z" fill="#a0af5f" />
      <path d="M4 3v1H3v1h2V3z" fill="#668000" />
      <path
        d="M5 7v1h1v1h1v1h1v1h1v-1h1V9h1V8h1V7z"
        opacity={0.6}
        fill="#afe"
      />
      <path d="M4 6h9v1H4z" opacity={0.6} fill="#e6e6e6" />
      <g fill="#ccc">
        <path d="M8 18H5v1h7v-1H9v-7H8zM7 10h1v1H7zm2 0h1v1H9zM10 9h1v1h-1zM11 8h1v1h-1zM12 7h1v1h-1zM6 9h1v1H6zM5 8h1v1H5zM4 7h1v1H4zM3 5v2h1V6h9v1h1V5z" />
      </g>
    </svg>
  )
}