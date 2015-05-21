chrome.alarms.onAlarm.addListener(function () {
  var request = new XMLHttpRequest();
  request.onload = function () {
    var match = request.responseText.match(/new Date\((\d+),(\d+),(\d+)\)/);
    var date = new Date(match[1], match[2], match[3], 19);
    var diff = date - Date.now();
    var days = Math.floor(diff / (24 * 60 * 60 * 1000));
    chrome.browserAction.setBadgeText({ text: days.toString() });
    chrome.browserAction.setBadgeBackgroundColor({ color: days ? '#00ff00' : '#ff0000' });
  };
  request.open('get', 'http://brooklynjs.com/');
  request.send();
});

chrome.alarms.create('request', { when: Date.now(), periodInMinutes: 60 });
