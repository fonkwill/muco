

function playMusic() {
    get('music/play')
}

function pauseMusic() {
    get('music/stop')
}

function talkOver() {
    get('music/talkover')
}

function resetTalkOver() {
    get('music/resettalkover')
}

function playEinlaufmusik() {
    var einlaufmusik = fetchAsync('config/einlaufmusik');
    einlaufmusik.then((text) => get('scs/play/'+text), null);
}

function playTorhymne() {
    var torhymne = fetchAsync('config/torhymne');
    torhymne.then((text) => get('scs/play/'+text), null);
}

function stopScS(){
    get('scs/stop')
}


function get(url) {
    var data = fetchAsync(url)
    data.then((text) =>toast(text), null)
}


async function fetchAsync (url) {
    let response = await fetch(url);
    let data = await response.text();
    return data;
  }

  function toast(text) {
    var x = document.getElementById("toast");
  
    x.innerHTML = "";
    x.className = "show";
    x.innerHTML = text
  
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  } 