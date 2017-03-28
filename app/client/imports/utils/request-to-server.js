export default function requestToServer(method, URL, callback) {
  let client = new XMLHttpRequest();
  client.open(method, URL);
  client.send();
  client.onload = () => {
    const responseText = JSON.parse(client.responseText);
    callback(responseText);
  }
};