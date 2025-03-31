/*CMD
  command: /approve
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Withdraw Section

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
if (!params) {
  Bot.sendMessage("⚠️ Please provide a withdrawal ID or user ID.\nExample: /approve 1 or /approve 1494040377");
  return;
}

let input = String(params).trim();
let pending = Bot.getProperty("pendingWithdrawals", {});
let withdrawalId = null;

if (pending[input]) {
  withdrawalId = input;
} else {
  for (let id in pending) {
    if (String(pending[id].userId) === input) {
      withdrawalId = id;
      break;
    }
  }
}

if (!withdrawalId) {
  let debugMsg = "⚠️ No withdrawal request found with ID: " + input + "\n\nPending Withdrawals:\n";
  let hasPending = false;
  for (let id in pending) {
    hasPending = true;
    debugMsg += `ID: ${id}, User ID: ${pending[id].userId}, Amount: ${pending[id].amount} ${Bot.getProperty("currency", "USD")}\n`;
  }
  debugMsg += hasPending ? "" : "No pending withdrawals exist.";
  Bot.sendMessage(debugMsg);
  return;
}

let currency = Bot.getProperty("currency", "Not Set!");
let paymentChannel = Bot.getProperty("paymentChannel", null);
let adminChatId = Bot.getProperty("ownerId", "0");

if (String(user.telegramid) !== adminChatId) {
  Bot.sendMessage("⚠️ Only the bot admin can approve withdrawals.");
  return;
}

let withdrawal = pending[withdrawalId];
let userId = withdrawal.userId;
let amount = withdrawal.amount;
let wallet = withdrawal.wallet;

Api.sendMessage({
  chat_id: userId,
  text: `✅ Your withdrawal of ${amount.toFixed(2)} ${currency} has been approved!\n\n💳 Wallet Address: ${wallet}`,
  parse_mode: "HTML"
});

if (paymentChannel) {
  Api.sendMessage({
    chat_id: paymentChannel,
    text: "*✅ Withdrawal Approved 💰*\n\n▪️ User ID: "+ userId +"\n▪️ Amount: "+ amount.toFixed(2) +" "+ currency +"\n\n*💳 Wallet Address:*\n `"+ wallet +"`\n\n*👮🏻‍♂️ Bot: @"+ bot.name +"*",
    parse_mode: "Markdown",
    disable_web_page_preview: true
  });
}

let totalWithdraw = Bot.getProperty("totalWithdraw", 0);
totalWithdraw += amount;
Bot.setProperty("totalWithdraw", totalWithdraw, "float");

let transactions = Bot.getProperty("userTransactions", {});
if (!transactions[userId]) {
  transactions[userId] = [];
}
let timestamp = new Date().toLocaleString();
let newTransaction = { type: "➖ Withdrawal", amount: amount, date: timestamp };
transactions[userId].unshift(newTransaction);
Bot.setProperty("userTransactions", transactions, "json");

delete pending[withdrawalId];
Bot.setProperty("pendingWithdrawals", pending, "json");
Bot.setProperty("withdrawInProgress_" + userId, false, "boolean");

Bot.sendMessage("✅ Withdrawal ID " + withdrawalId + " approved for user " + userId);
