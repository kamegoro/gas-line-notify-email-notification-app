const lineToken = PropertiesService.getScriptProperties().getProperties('LINE_TOKEN');
const mail = PropertiesService.getScriptProperties().getProperties('DRIVING_SCHOOL_MAIL');

function myFunction() {
  
}


function sendMessage() {
  const lineNotifyApi = "https://notify-api.line.me/api/notify";

  const options = {
    "methods": "post",
    "playload": "message",
    "headers": {
      "Authorization": "Bearer "+ lineToken
    }
  }

  UrlFetchApp.fetch(lineNotifyApi, options);
}