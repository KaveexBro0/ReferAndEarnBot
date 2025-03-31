/*CMD
  command: /balance
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 💰 account balance
  group: 
CMD*/

let bannedUsers = Bot.getProperty("bannedList", []);
if (bannedUsers.includes(user.telegramid.toString())) {
  Bot.sendMessage("🚫 You are banned from using this bot.");
  return;
}
if (request.data) {
  Api.deleteMessage({ message_id: request.message.message_id });
}

let balance = Libs.ResourcesLib.userRes("balance");
let transactions = Bot.getProperty("userTransactions", {});
var currency = Bot.getProperty("currency", "Not Set!");
var wallet = User.getProperty("wallet", "Wallet Not Set!");

let userId = user.telegramid.toString();
let history = transactions[userId] || [];

let historyText = history.slice(-5).reverse().map((t, i) =>
  `${i + 1}. ${t.type} ${t.amount} (${t.date})`
).join("\n");

Api.sendMessage({
  text:
    "*🆔 User:* `"+ userId +"`\n" +
    "*💰 Your Balance:* "+ balance.value().toFixed(2) +" "+ currency +"\n" +
    "*💼 Wallet Address:* `"+ wallet +"`\n\n" +
    "*📜 Recent Transactions:*\n" +
    (historyText ? historyText : "_No transactions yet._"),
  parse_mode: "Markdown",
  reply_markup: {
    inline_keyboard: [
      [{ text: "💼 Set Wallet", callback_data: "/wallet" }],
      [{ text: "📜 Full Transaction History", callback_data: "/fullHistory" }]
    ]
  }
});

