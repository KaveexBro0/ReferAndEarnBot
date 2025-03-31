/*CMD
  command: /setWallet2
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let walletName = Bot.getProperty("walletName", "Not Set!");
var txt = "*✅ Your "+ walletName +" Wallet Address Has Been Set:* "+ message +"";
User.setProperty("wallet", message);

var inl = [[{ text: "🔙 Back", callback_data: "/balance" }]];

Api.sendMessage({
  message_id: user.telegramid,
  text: txt,
  parse_mode: "Markdown",
  disable_web_page_preview: true,
  reply_markup: { inline_keyboard: inl }
});
