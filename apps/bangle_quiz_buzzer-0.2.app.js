Bluetooth.setConsole(false);
g.clear();
g.setFont("6x8", 2);

let buzzedList = [];
let isListening = false;

// Decode DataView to String

function decodeBLEString(dataView) {
  let s = "";
  for (let i = 0; i < dataView.byteLength; i++) {
    s += String.fromCharCode(dataView.getUint8(i));
  }
  return s;
}

function updateDisplay() {
  g.clear();
  g.setFont("6x8", 2);
  g.drawString("📋 Buzz Order:", 10, 10);
  buzzedList.forEach((name, i) => {
    g.drawString((i + 1) + ". " + name, 10, 30 + i * 20);
  });
  if (buzzedList.length === 0) {
    g.drawString("Waiting for buzzers...", 10, 50);
  }
}

// Sound and vibration pattern

function alertForRank(rank) {
  if (rank === 0) {
    Bangle.buzz(500);
    Bangle.beep();
    setTimeout(() => Bangle.beep(), 200);
  } else {
    Bangle.buzz(150);
  }
}

// Start BLE scan for all Puck.js devices

NRF.requestDevice({ filters: [{ namePrefix: "Puck" }], timeout: 20000 }).then(device => {
  return device.gatt.connect();
}).then(gatt => {
  return gatt.getPrimaryService("6e400001-b5a3-f393-e0a9-e50e24dcca9e");
}).then(service => {
  return service.getCharacteristic("6e400003-b5a3-f393-e0a9-e50e24dcca9e");
}).then(characteristic => {
  characteristic.on('characteristicvaluechanged', function(event) {
    let value = decodeBLEString(event.target.value);
    try {
      let msg = JSON.parse(value);
      if (msg.buzz && msg.name) {
        if (!buzzedList.includes(msg.name)) {
          buzzedList.push(msg.name);
          alertForRank(buzzedList.length - 1);
          updateDisplay();
        }
      }
    } catch (e) {
      print("JSON Error:", value);
    }
  });
  return characteristic.startNotifications();
}).catch(err => {
  g.clear();
  g.drawString("Connection error:", 10, 30);
  g.drawString(err.toString(), 10, 50);
});

// Reset leaderboard on button

setWatch(() => {
  buzzedList = [];
  updateDisplay();
}, BTN, { repeat: true, edge: "rising", debounce: 50 });

// Show initial screen

updateDisplay();
