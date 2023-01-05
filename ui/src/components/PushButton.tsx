export const PushButton = ({ counter = 0 }: { counter: number }) => {
  console.log(counter)
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-bold text-secondary-content">Push Button</h2>
      <span className="flex flex-col font-mono text-5xl">
        <p className="text-center">{counter}</p>
        <div>
          <p className="text-2xl">counter</p>
        </div>
      </span>
    </div>
  )
}

export default PushButton
