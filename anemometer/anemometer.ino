//  Anemometer demo
//  The example demonstrates the use of anemometer.
//  When the wind speed transmitter makes one round in one second,
//  the transmitter outputs 20 pulses, which means that the wind speed
//  is 1.75m/S.
//

//// the following variables are unsigned longs because the time, measured in
//// milliseconds, will quickly become a bigger number than can be stored in an int.
unsigned long lastDebounceTime = 0;  // the last time the output pin was toggled
unsigned long debounceDelay = 1000;    // the debounce time; increase if the output flickers

int pinInterrupt = 13;  // esp8266 D7 pin
float speed_value = 0;

int Count=0;

ICACHE_RAM_ATTR void onChange() {
  if ( digitalRead(pinInterrupt) == LOW )
    Count++;
}

void setup() {

  Serial.begin(115200); //Initialize serial port
  pinMode( pinInterrupt, INPUT_PULLUP);// set the interrupt pin


  //Enable
  attachInterrupt( digitalPinToInterrupt(pinInterrupt), onChange, CHANGE);

}

void loop() {

//  lastDebounceTime = millis();
//        //0.1m/s
//        s_v.speed = (int)(Count * 8.75 * 0.01 * 10);
//        // SerialUSB.print(s_v.speed);
//        Count = 0;
//        // SerialUSB.println("m/s");

  if ((millis() - lastDebounceTime) > debounceDelay) {
    lastDebounceTime = millis();
    speed_value = Count * 8.75 * 0.01 * 10;
    Serial.print(speed_value);
    Count = 0;
    Serial.println(" m/s");
  }
  delay(1);


}
