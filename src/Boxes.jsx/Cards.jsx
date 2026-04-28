const Cards = ({ children }) => {
  return (
    <div className="border border-gray-200 w-full rounded-2xl backdrop-blur-md bg-white/70 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
      {children}
    </div>

  )
}

export default Cards