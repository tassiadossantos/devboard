interface LogoProps {
  size?: number
  className?: string
}

export function Logo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      width={size}
      height={size}
      className={className}
    >
      <rect width="32" height="32" rx="8" fill="#0d1117" />
      <path
        d="M8 8C8 8 8 16 8 20C8 24 12 26 16 26C20 26 24 24 24 20C24 16 24 8 24 8"
        stroke="#238636"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M12 12L16 16L12 20"
        stroke="#39d353"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="16" r="2" fill="#39d353" />
    </svg>
  )
}
