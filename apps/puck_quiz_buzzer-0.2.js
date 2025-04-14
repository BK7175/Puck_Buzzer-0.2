                                // Replace with the unique name for each puck
const PUCK_NAME = "Puck A";

function sendBuzz() {
  let msg = JSON.stringify({ buzz: true, name: PUCK_NAME });   // Replace with the unique name for each puck
  Bluetooth.println(msg);
  LED.set(); // Flash LED
  setTimeout(() => LED.reset(), 200);
}

setWatch(sendBuzz, BTN, { edge: "rising", repeat: true, debounce: 50 });

NRF.setAdvertising({}, { name: PUCK_NAME, connectable: true });      // Replace with the unique name for each puck
console.log(PUCK_NAME + " ready to buzz!");    // Replace with the unique name for each puck

