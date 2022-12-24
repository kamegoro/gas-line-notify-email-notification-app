const lineToken = PropertiesService.getScriptProperties().getProperties('LINE_TOKEN');
const drivingSchoolMail = PropertiesService.getScriptProperties().getProperties('DRIVING_SCHOOL_MAIL');

function getMails() {
  const threadMessage = '技能予約可能時限（明日）のご案内';
  const threads = GmailApp.search(threadMessage, 0, 10);
  const mails = GmailApp.getMessagesForThread(threads);

  mails.forEach((mail) => {
    if(!mail.isStarred()) {
      const date = mail.getDate().toDateString();
      const subject = mail.getSubject();
      const content = mail.getBody();
      if(content.includes('1時限(08:05〜)')) {
        sendMessage(date, subject, content);
      }

      mail.star();
    }
  })
}

function sendMessage(strDate, strSubject, strContent) {
  const lineNotifyApi = "https://notify-api.line.me/api/notify";

  const options = {
    "methods": "post",
    "playload": "message=" + strDate + strSubject + strContent,
    "headers": {
      "Authorization": "Bearer "+ lineToken
    }
  }

  UrlFetchApp.fetch(lineNotifyApi, options);
}