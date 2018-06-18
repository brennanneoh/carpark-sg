import * as messaging from "messaging";
import { settingsStorage } from "settings";
import { CarparkAPI } from "./carpark.js";

messaging.peerSocket.onmessage = function(evt) {
  console.log(JSON.stringify(evt.data));
}

messaging.peerSocket.onopen = function() {
  sendCarparks();
}

settingsStorage.onchange = function(evt) {
  sendCarparks();
}

function sendCarparks() {
  let carparkApi = new CarparkAPI();
  let selectedCarparks = settingsStorage.getItem("selected_carparks");
  let selectedNumbers = [];
  selectedCarparks = JSON.parse(selectedCarparks);
  if (selectedCarparks == null || selectedCarparks.length === 0) {
    selectedNumbers = ["HLM", "KAM", "SPM"];
  }
  else {
    selectedNumbers = selectedCarparks.map(cp => cp.number);
  }

  carparkApi.getAvailability().then(function (carparks) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      messaging.peerSocket.send(carparks.filter(cp => {
        return selectedNumbers.indexOf(cp.carpark_number) > -1;
      }));
    }
  });
}
