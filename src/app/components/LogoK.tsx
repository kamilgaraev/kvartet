export default function LogoK({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 32" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Вертикальная стойка К с закругленными концами */}
      <path 
        d="M 5 3 C 5 3 5 29 5 29" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
      
      {/* Верхняя часть К - плавная кривая */}
      <path 
        d="M 7 16 Q 10 12, 14 8 T 20 3" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Нижняя часть К - плавная кривая */}
      <path 
        d="M 7 16 Q 10 20, 14 24 T 20 29" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

