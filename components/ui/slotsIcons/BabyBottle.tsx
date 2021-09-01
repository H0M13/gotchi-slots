import * as React from "react"

export const BabyBottle = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 17" {...props}>
      <g fill="#faa">
        <path d="M1 16h5v1H1zM6 10h1v6H6zm-6 0h1v6H0zM1 8h1v2H1zM0 5h1v3H0zM1 4h1v1H1zM2 3h3v1H2zM5 4h1v1H5zm0 4h1v2H5zM6 5h1v3H6z" />
      </g>
      <path d="M3 0h1v2H3z" fill="#fc0" />
      <path d="M2 2h3v1H2z" fill="#f0f" fillOpacity={0.6} />
      <path d="M6 8V5H5V4H2v1H1v3h1v2H1v6h5v-6H5V8z" fill="#fff" />
      <path
        d="M1 6h3v1H1zm1 2h1v1H2zm-1 2h3v1H1zm0 2h2v1H1zm0 2h3v1H1z"
        fillOpacity={0.5}
      />
    </svg>
  )
}