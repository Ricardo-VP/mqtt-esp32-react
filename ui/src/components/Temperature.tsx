export const Temperature = ({ value = 0 }: { value: number }) => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-bold text-secondary-content">Temperature</h2>
      <div>
        <input
          disabled
          readOnly
          type="range"
          min="0"
          max="40"
          value={value}
          className="range range-lg"
        />
        <div className="w-full flex justify-between text-xs px-2 pb-2">
          <span>0</span>
          <span>10</span>
          <span>20</span>
          <span>30</span>
          <span>40</span>
        </div>
        <h4 className="text-2xl font-semibold text-primary">
          {value.toFixed(2)} °C
        </h4>
      </div>
    </div>
  )
}

export default Temperature
