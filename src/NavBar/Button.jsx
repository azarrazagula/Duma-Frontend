const Button = ({ children, onClick, className }) => {
  return (
    <button 
      onClick={onClick} 
      className={`rounded-full cursor-pointer transition-all active:scale-95 flex items-center justify-center ${className}`}
    >
      {children}
    </button>
  )
}

export default Button 