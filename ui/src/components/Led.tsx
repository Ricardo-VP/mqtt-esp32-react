export const Led = ({ status = false }: { status: boolean }) => {

  // console.log(status)
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-bold text-secondary-content">Led</h2>
      <div>
        <input
          type="checkbox"
          className="toggle toggle-lg"
          checked={status}
          readOnly
        />
        <h4 className="text-2xl font-semibold text-primary">
          {status ? 'ON' : 'OFF'}
        </h4>
      </div>
    </div>
  )
}

export default Led
