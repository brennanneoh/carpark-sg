import * as messaging from "messaging";
import { CarparkUI } from "./ui.js"

let ui = new CarparkUI();
ui.updateUI("disconnected");

messaging.peerSocket.onmessage = function(evt) {
  ui.updateUI("loaded", evt.data);
}
