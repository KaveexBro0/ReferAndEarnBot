/*CMD
  command: /fullHistory
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

Api.deleteMessage({
message_id : request.message.message_id
})
let transactions = Bot.getProperty("userTransactions", {});
let userId = user.telegramid.toString();
let currency = Bot.getProperty("currency", "USD");

let history = transactions[userId] || [];

if (history.length === 0) {
  Api.sendMessage({
    text: "📜 *Transaction History*\n\n_No transactions yet._",
    parse_mode: "Markdown"
  });
  return;
}

let historyText = history.reverse().map((t, i) => 
  `${i + 1}. ${t.type} ${t.amount.toFixed(2)} ${currency} (${t.date})`
).join("\n");

Api.sendMessage({
  text: `*📜 Full Transaction History for User ${userId}*\n\n${historyText}`,
  parse_mode: "Markdown",
  reply_markup: {
    inline_keyboard: [
      [{ text: "🔙 Back to Balance", callback_data: "/balance" }]
    ]
  }
});
