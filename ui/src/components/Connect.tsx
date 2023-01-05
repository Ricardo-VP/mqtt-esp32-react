export const Connect = ({
  connectStatus,
  handleConnect,
}: {
  connectStatus: String
  handleConnect: Function
}) => {
  return (
    <button
      className="btn btn-sm btn-primary"
      disabled={
        connectStatus === 'Connected' ||
        connectStatus === 'Connecting' ||
        connectStatus === 'Reconnecting'
      }
      onClick={() => handleConnect()}
    >
      {connectStatus === 'Disconnected' && 'Connect'}
      {connectStatus === 'Connected' && 'Connected'}
      {connectStatus === 'Connecting' && 'Connecting'}
      {connectStatus === 'Reconnecting' && 'Reconnecting'}
    </button>
  )
}

export default Connect
