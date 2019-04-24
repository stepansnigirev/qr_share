"use strict";

var parsedUrl = new URL(window.location.toString());
console.log(parsedUrl);
// console.log('Title shared: ' + parsedUrl.searchParams.get('name'));
// console.log('Text shared: ' + parsedUrl.searchParams.get('description'));
// console.log('URL shared: ' + parsedUrl.searchParams.get('link'));

let qrcode = new QRCode(document.getElementById("qrcode"), {
	width : 600,
	height : 600,
	colorDark : "#000",
    colorLight : "#fff",
    // mode: QRCode.QRMode.MODE_ALPHA_NUM,
    correctLevel : QRCode.CorrectLevel.L,
});

function makeQRCode(text){
	qrcode.makeCode(text);
	// $("#text").html(text);
	$("#inp").val(text);
}

function update(){
	makeQRCode($("#inp").val());
}

makeQRCode("Paste text to encode as QR code here");

// registering serviceworker for no reason
// I just follow the manual: 
// https://chodounsky.net/2019/03/24/progressive-web-application-as-a-share-option-in-android/
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(reg){
        console.log("Service worker registered.");
     }).catch(function(err) {
        console.log("Service worker not registered. This happened:", err)
    });
}