export const Header = ({ children }: { children: any }) => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-primary normal-case text-xl">
          MQTT Broker - Ricardo VP
        </a>
      </div>
      <div className="flex-none">{children}</div>
    </div>
  )
}

export default Header
