// @ts-nocheck
import { useEffect, useState } from 'react'
import * as mqtt from 'mqtt/dist/mqtt.min'

const url = 'ws://127.0.0.1:8083/mqtt'

const options = {
  clean: true,
  connectTimeout: 4000,
  clientId: 'webclient',
}

// -- Payload Interface -- //
interface IPayload {
  topic: string
  message: string
}

export const useMqtt = () => {
  const [client, setClient] = useState(null)
  const [connectStatus, setConnectStatus] = useState('Disconnected')
  const [payload, setPayload] = useState<IPayload>({})

  const [temperature, setTemperature] = useState(0)
  const [led, setLed] = useState(false)
  const [pushButtonCounter, setPushButtonCounter] = useState(0)

  const mqttConnect = () => {
    setConnectStatus('Connecting')
    setClient(mqtt.connect(url, options))
  }

  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        console.log('Connected')
        setConnectStatus('Connected')
        client.subscribe('esp32/temperature')
        client.subscribe('esp32/led')
        client.subscribe('esp32/pushButton')
      })

      client.on('error', (err) => {
        console.error('Connection error: ', err)
        setConnectStatus('Disconnected')
        client.end()
      })

      client.on('reconnect', () => {
        setConnectStatus('Reconnecting')
      })

      client.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() }
        setPayload(payload)

        switch (topic) {
          case 'esp32/temperature':
            setTemperature(message.toString())
            break
          case 'esp32/led':
            setLed(message.toString() === 'true' ? true : false)
            break
          case 'esp32/pushButton':
            console.log(topic)
            console.log(message.toString());
            if (message.toString() == 'pressed')
              console.log('hola');
              setPushButtonCounter((prev) => prev + 1)
            break
        }
      })
    }
  }, [client])

  return {
    client,
    connectStatus,
    payload,
    mqttConnect,
    temperature,
    led,
    pushButtonCounter,
  }
}

export default useMqtt
