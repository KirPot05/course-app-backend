async function healthCheck() {
  try {
    const response = await fetch("https://cashify-node-server.onrender.com");
    const res = await response.text();
    console.log(res);
  } catch (e) {
    console.error(e);
  }
}

setInterval(healthCheck, 10000);
