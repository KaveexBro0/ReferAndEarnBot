/*CMD
  command: /setWallet
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (request.data) {
  Api.deleteMessage({ message_id: request.message.message_id });
}

let walletName = Bot.getProperty("walletName", "Not Set!");
var txt = `*💳 Please Provide Your ${walletName} Wallet Address*`;
Api.sendMessage({
    message_id: user.telegramid,
    text: txt,
    parse_mode: "markdown",
    disable_web_page_preview: true
});
Bot.runCommand("/setWallet2");
