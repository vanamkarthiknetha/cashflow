"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme === "dark" ? "dark" : "light"}
      position="top-center"
      richColors
      closeButton
      duration={5000} // Adjust the timeout
      {...props}
    />
  )
}

export { Toaster }
