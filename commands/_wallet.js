/*CMD
  command: /wallet
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

let walletName = Bot.setProperty("walletName", "Not Set!");
var wall = User.getProperty("wallet", `❗️ No wallet has been set.`);
var txt = "*💼 Your Wallet:* " + wall;

var inl = [
  [{ text: "💳 Set Wallet", callback_data: "/setWallet" }],
  [{ text: "🔙 Back", callback_data: "/balance" }]
];

Api.sendMessage({
  message_id: user.telegramid,
  text: txt,
  parse_mode: "markdown",
  disable_web_page_preview: true,
  reply_markup: { inline_keyboard: inl }
});
