"use strict";

let qrcode;

function makeQRCode(text){
  qrcode.makeCode(text);
  $("#inp").val(text);
}

function update(){
  makeQRCode($("#inp").val());
}


function onLoad() {

  let size = $("#qrcode").width();

  qrcode = new QRCode(document.getElementById("qrcode"), {
  	width : size,
  	height : size,
  	colorDark : "#000",
      colorLight : "#fff",
      // mode: QRCode.QRMode.MODE_ALPHA_NUM,
      correctLevel : QRCode.CorrectLevel.L,
  });

  makeQRCode("Paste text to encode as QR code here");

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(registration => {
      console.log('ServiceWorker registration successful with scope:',
                  registration.scope);
    }).catch(err => {
      console.error('ServiceWorker registration failed:', err);
    });
  }

  function logText(message, isError) {
    if (isError)
      console.error(message);
    else
      console.log(message);
  }

  var parsedUrl = new URL(window.location.toString());
  $("#inp").val(parsedUrl.searchParams.get("text"));
  update();
  logText("Title shared: " + parsedUrl.searchParams.get("title"));
  logText("Text shared: " + parsedUrl.searchParams.get("text"));
  logText("URL shared: " + parsedUrl.searchParams.get("url"));
  // We still have the old "url_template" member in the manifest, which is
  // how WST was previously specced and implemented in Chrome. If the user
  // agent uses that method, the "oldapi" parameter will be set.
  if (parsedUrl.searchParams.get("oldapi")) {
    logText("Your browser is using the deprecated 'url_template' Web Share "
            + "Target API.", true);
  }
}

window.addEventListener('load', onLoad);