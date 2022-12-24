const lineToken = PropertiesService.getScriptProperties().getProperty('LINE_TOKEN');
const drivingSchoolMail = PropertiesService.getScriptProperties().getProperty('DRIVING_SCHOOL_MAIL');

function getMails() {
  const threadMessage = '技能予約可能時限（明日）のご案内';
  const threads = GmailApp.search(threadMessage, 0, 10);
  const mails = GmailApp.getMessagesForThreads(threads);

  for (var i in mails) {
    for (var j in mails[i]) {
      if (!mails[i][j].isStarred()) {
        const strDate = mails[i][j].getDate().toDateString();
        const strSubject = mails[i][j].getSubject();
        const strContent = mails[i][j].getBody();
        if(strContent.includes('1時限(08:05～)')) {
          sendMessage(strDate, strSubject, strContent);
        }
        
        mails[i][j].star();
      }
    }
  }
}

function sendMessage(strDate, strSubject, strContent) {
  const lineNotifyApi = "https://notify-api.line.me/api/notify";

  const options = {
    "methods": "post",
    "payload": {
      "message": strDate + strSubject + strContent,
    },
    "headers": {
      "Authorization": "Bearer "+ lineToken
    }
  }

  UrlFetchApp.fetch(lineNotifyApi, options);
}