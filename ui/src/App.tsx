import { useMqtt } from './hooks/useMqtt'

import {
  Connect,
  Footer,
  Header,
  Led,
  PushButton,
  Temperature,
} from './components'

function App() {
  const { mqttConnect, connectStatus, temperature, led, pushButtonCounter } = useMqtt()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <Header>
        <Connect connectStatus={connectStatus} handleConnect={mqttConnect} />
      </Header>
      <div className="flex flex-col gap-6 max-w-xl mx-auto my-auto">
        <Temperature value={Number(temperature) || 0} />
        <Led status={led} />
        <PushButton counter={pushButtonCounter} />
      </div>
      <Footer />
    </div>
  )
}

export default App
