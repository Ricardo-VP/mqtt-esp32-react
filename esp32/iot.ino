#include <WiFi.h>
#include <PubSubClient.h>

// Pin del LED
const byte led_gpio = 33;

// Pin del botón y variables para este
#define BUTTON_PIN 26
int lastState = HIGH;
int currentState;

// Pin del módulo ESP32 donde está conectado el sensor LM35
const int sensorPin = 13;

// Nombre del cliente y tópico MQTT donde se publicarán los mensajes
const char* clientName = "ESP32";
const char* topicTemperatura = "esp32/temperature";
const char* topicLed = "esp32/led";
const char* topicButton = "esp32/pushButton";

// Credenciales de la red WiFi a la que se conectará el módulo
const char* ssid = "Redes";
const char* password = "R3d352@22";

// Dirección IP del broker MQTT
const char* mqttServer = "10.10.20.18";

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  // Inicializa la conexión serial y espera a que se establezca la conexión
  Serial.begin(115200);

  // Configurar pin LED
  pinMode(led_gpio, OUTPUT);
  // Configurar pin PUSH BUTTON
  pinMode(BUTTON_PIN, INPUT_PULLUP);

  // Conecta el módulo ESP32 a la red WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Conectando a WiFi..");
  }
  Serial.println("Conectado a WiFi");

  // Configura el cliente MQTT y conéctelo al broker
  client.setServer(mqttServer, 1883);
  client.setCallback(callback);

  connectMqtt();

  client.subscribe(topicTemperatura);
  client.subscribe(topicLed);
}

void loop() {
  connectMqtt();

  Serial.print("Estado del cliente MQTT: ");
  Serial.println(client.state());

  // -- Boton -- //
  bool executeButtonCode = false;

  while (!executeButtonCode) {
    connectMqtt();
    
    currentState = digitalRead(BUTTON_PIN);

    if (lastState == LOW && currentState == HIGH) {
      executeButtonCode = true;  // cambia el valor de la variable a true
    }
    lastState = currentState;

    if (executeButtonCode) {  // verifica si la variable es true
      Serial.println("Boton: Pressed");
      client.publish(topicButton, "pressed");
      executeButtonCode = false;  // cambia el valor de la variable a false

      // -- Temperatura -- //
      int adcVal = analogRead(34);
      float milliVolt = adcVal * (3300.0 / 4096.0);
      float tempC = milliVolt / 10;
      Serial.print("Temperatura: ");
      Serial.println(tempC);
      char message[50];
      sprintf(message, "%f", tempC);
      client.publish(topicTemperatura, message);
      // -- //

      // -- Led -- //
      delay(2000);
      Serial.println("LED: ON");
      digitalWrite(led_gpio, HIGH);  // turn the LED on (HIGH is the voltage level)
      client.publish(topicLed, "true");
      delay(2000);  // wait for a second
      Serial.println("LED: OFF");
      digitalWrite(led_gpio, LOW);  // turn the LED off by making the voltage LOW
      client.publish(topicLed, "false");
      // -- //

      delay(1000);
    }
  }
  // -- //
}

void connectMqtt() {
  while (!client.connected()) {
    if (client.connect(clientName)) {
      Serial.println("Conectado al broker MQTT");
    } else {
      Serial.print("Error al conectar al broker MQTT, rc=");
      Serial.print(client.state());
      Serial.println(" Reintentando en 5 segundos");
      delay(5000);
    }
  }
}

// Función de callback para manejar mensajes recibidos del broker MQTT
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Mensaje recibido del tópico [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}
