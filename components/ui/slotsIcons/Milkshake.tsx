import * as React from "react"

export const Milkshake = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 29" {...props}>
      <path d="M6 6V5H4v1h1v1H4V6H3v2h1v1h2V8h1V6z" fill="#f20030" />
      <path
        d="M4 6h1v1H4zm4 2v2H7V8H6v1H4V8H3v1H1v2h1v1h1v1h5v-1h1v-2h1V8H8zm-3 4v-1H4v-1h1v1h2v1H5z"
        fill="#fafffe"
      />
      <g fill="#ff9ec8">
        <path d="M9 7h1v1H9zM3 9V8H1v1zM10 8v2h1V8zM1 9H0v2h1zM4 10h1v1H4zm5 0h1v1H9zM1 11h1v1H1zm6 1v-1H5v1zM2 12h1v1H2zm6 0h1v1H8zM3 13v1h1v9h1v-9h2v9h1V13z" />
      </g>
      <g fill="#ff6daa">
        <path d="M8 13v7h1v-7zm-3 1v9H4v2h1v2H4v1h3v-1H6v-2h1v-3H6v-7h1v-1zM3 15h1v-1H3v-1H2v7h1zm0 7h1v1H3z" />
      </g>
      <g fill="#ff2b87">
        <path d="M10 0v1h2V0zM9 4h1V1H9zM8 8h1V4H8zM7 10h1V8H7zm2 10h1v-9H9zM2 12H1v8h1zm6 11h1v-3H8zM4 22v-7H3v5H2v3h1v-1zm3-7H6v7h1zM4 23H3v2h1zm3 2h1v-2H7zM6 27h1v1H4v-1h1v-2H4v1H3v1H2v1h1v1h5v-1h1v-1H8v-1H7v-1H6z" />
      </g>
    </svg>
  )
}