import * as messaging from "messaging";
import { geolocation } from "geolocation";
import { CarparkAPI } from "./carpark.js";

function locationSuccess(position) {
    console.log("Latitude: " + position.coords.latitude,
                "Longitude: " + position.coords.longitude);
}

function locationError(error) {
  console.log("Error: " + error.code,
              "Message: " + error.message);
}

messaging.peerSocket.onopen = function() {
  let carparkApi = new CarparkAPI();

  geolocation.getCurrentPosition(locationSuccess, locationError);

  carparkApi.getAvailability().then(function (availability) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      messaging.peerSocket.send(availability);
    }
  });
}

messaging.peerSocket.onmessage = function(evt) {
  console.log(JSON.stringify(evt.data));
}
