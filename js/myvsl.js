
function checkOrCreateUniqueId(vt) {
  var uniqueId = localStorage.getItem(vt);

  if (!uniqueId) {
    uniqueId = generateUniqueId();
    localStorage.setItem(vt, uniqueId);
  }

  return uniqueId;
}

function generateUniqueId() {
  var timestamp = Date.now().toString();
  var randomNumber = Math.floor(Math.random() * 1000000).toString();
  var uniqueId = timestamp + randomNumber;

  return uniqueId;
}
async function loadPlayer(vt,ut)
{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const jsonData = {};
    params.forEach((value, key) => {
      // Exclude keys "hash" and "lang"
      if (key !== "hash" && key !== "lang") {
        jsonData[key] = value;
      }
    });
    const jsonString = JSON.stringify(jsonData);
    
    fingerprint= checkOrCreateUniqueId(vt);
    console.log(fingerprint);

    var urlencoded = new URLSearchParams();
    urlencoded.append("method", "getIframe");
    urlencoded.append("videoToken", vt);
    urlencoded.append("userToken", ut);
    urlencoded.append("fingerPrint", fingerprint);
    urlencoded.append("jsonparams", jsonString);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
      credentials: 'include'
    };
    
    fetch("https://api.myvsl.com.br/videoPlayer", requestOptions)
      .then(response => response.text())
      .then(result =>{
          json=  JSON.parse(result)
          if(json.status=="OK")
          {
              
              document.getElementById("vid_"+vt).innerHTML= json.Iframe;
          }else
          {
              alert(json.message);
          }})
      .catch(error => console.log('error', error));

}


// Example usage
