import document from "document";

export function CarparkUI() {
  this.carparkList = document.getElementById("carparkList");
  this.statusText = document.getElementById("status");
  this.tiles = [];
  
  for (let i = 0; i < 3; i++) {
    let tile = document.getElementById(`carpark-${i}`);
    console.log(`carpark-${i}`);
    this.tiles.push(tile);
  }
}

CarparkUI.prototype.updateUI = function(state, carparks) {
  if (state === "loaded") {
    this.carparkList.style.display = "inline";
    this.statusText.text = "";

    this.updateCarparkList(carparks);
  }
  else {
    this.carparkList.style.display = "none";

    if (state === "loading") {
      this.statusText.text = "Loading carparks ...";
    }
    else if (state === "disconnected") {
      this.statusText.text = "Disconnected"
    }
    else if (state === "error") {
      this.statusText.text = "Something terrible happened.";
    }
  }
}

CarparkUI.prototype.updateCarparkList = function(carparks) {
  for (let i = 0; i < 3; i++) {
    let tile = this.tiles[i];
    console.log(carparks[i].carpark_number);
    tile.getElementById("carpark-number").text = carparks[i].carpark_number;
    tile.getElementById("lots").text = `${carparks[i].lots_available} / ${carparks[i].total_lots}`;
  }
}