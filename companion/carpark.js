export function CarparkAPI() {};

CarparkAPI.prototype.getAvailability = function () {
  return new Promise(function(resolve, reject) {
    let url = "https://api.data.gov.sg/v1/transport/carpark-availability";
    fetch(url).then(function(response) {
      return response.json()
    }).then(function (json) {
      let data = json.items[0].carpark_data;
      let carparks = [];
      data.forEach(function(info) {
        let c = {
          carpark_number: info.carpark_number,
          lot_type: info.carpark_info[0].lot_type,
          lots_available: info.carpark_info[0].lots_available,
          total_lots: info.carpark_info[0].total_lots
        };
        carparks.push(c);
      });
      resolve(carparks);
    });
  });
}
