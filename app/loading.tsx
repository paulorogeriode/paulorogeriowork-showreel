export default function Loading() {
  return (
    <div className="grid grid-cols-12 gap-3 px-3 pt-20">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={`${
            i % 3 === 0 ? "col-span-12 md:col-span-7 aspect-video" : "col-span-12 md:col-span-5 aspect-[2/3]"
          } bg-border animate-pulse rounded`}
        />
      ))}
    </div>
    
  )
}
