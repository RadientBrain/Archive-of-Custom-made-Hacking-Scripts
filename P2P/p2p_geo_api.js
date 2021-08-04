// ------------------------------------------------------
// --------Show some support by staring this repo--------
// ---You can also follow me on Github: @RadientBrain----
// ------------------------------------------------------

window.oRTCPeerConnection = window.oRTCPeerConnection || window.RTCPeerConnection;

window.RTCPeerConnection = function (...args) {
  const pc = new window.oRTCPeerConnection(...args);

  pc.oaddIceCandidate = pc.addIceCandidate;

  pc.addIceCandidate = function (iceCandidate, ...rest) {
    const fields = iceCandidate.candidate.split(" ");

    console.log(iceCandidate.candidate);
    const ip = fields[4];
    if (fields[7] === "srflx") {
      getLocation(ip);
    }
    return pc.oaddIceCandidate(iceCandidate, ...rest);
  };
  return pc;
};

// --------------------------------------------------------------------------------------------------------------
// ------------------DUMMY JSON FORMAT THAT WILL BE PARSED--------------------
// {"ip_address": "null",
// "hostname": "null", 
// "city": {"name": null, "id": null, "region": null, "region_code": null},
// "country": {"name": "null", "iso_code": "null", "continent": "null", "continent_code": "null", "is_eu": null},
// "location": {"accuracy_radius": null, "zip": null, "latitude": null, "longitude": null, "timezone": "null"},
// "asn": {"name": "null", "id": null}}
// --------------------------------------------------------------------------------------------------------------

let getLocation = async (ip) => {
  let url = `https://geoip.razex.de/api/${ip}`;

  await fetch(url).then((response) =>
    response.json().then((json) => {
      const output = `
          ---------------------
          IP: ${json.ip_address}
          Country: ${json.country.name}
          Continent: ${json.country.continent}
          City: ${json.city.name}
          Region: ${json.city.region}
          Lat / Long: (${json.location.latitude}, ${json.location.longitude})
          ---------------------
          `;
      console.log(output);
    })
  );
};

// More on WebRTC: https://webrtc.org/
// RTCPeerLocation: https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection
// STUN: https://en.wikipedia.org/wiki/STUN
// Peer-to-peer (P2P): https://en.wikipedia.org/wiki/Peer-to-peer
// JavaScript ES6: https://www.w3schools.com/js/js_es6.asp
