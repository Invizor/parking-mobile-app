import LocalStorage from '../storage/local-storage'

export default function requestToServer(method, URL, callback, sendToken=true, params='') {
  let client = new XMLHttpRequest();
  client.open(method, URL);
  if (sendToken) {
      client.setRequestHeader("Authorization", 'Bearer ' + String(LocalStorage.get_obj("token")));
  }
  if(method == "POST"){
      client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  }
  if(params.length > 0) {
    client.send(params);
  } else {
    client.send();
  }
  client.onload = () => {
    const responseText = JSON.parse(client.responseText);
    callback(responseText);
  }
};