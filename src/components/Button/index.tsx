import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
