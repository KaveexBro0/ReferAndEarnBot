/*CMD
  command: /bonus
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 🎁 bonus
  group: 
CMD*/

let bannedUsers = Bot.getProperty("bannedList", []);
if (bannedUsers.includes(user.telegramid.toString())) {
  Bot.sendMessage("🚫 You are banned from using this bot.");
  return;
}
function canRun() {
  var lastRunAt = User.getProperty("last_run_at");
  if (!lastRunAt) return true;

  var elapsedMinutes = (Date.now() - lastRunAt) / 1000 / 60;
  var minutesInDay = 24 * 60;
  var remainingMinutes = minutesInDay - elapsedMinutes;

  if (elapsedMinutes < minutesInDay) {
    let waitHours = Math.floor(remainingMinutes / 60);
    let waitMinutes = Math.floor(remainingMinutes % 60);
    let waitSeconds = Math.floor((remainingMinutes * 60) % 60);

    Bot.sendMessage(
      "*🙁 Sorry, you already claimed your bonus today!*\n\n" +
      "⏳ *Please come back in:* " +
      `\n➡️ *${waitHours} Hours*` +
      `\n➡️ *${waitMinutes} Minutes*` +
      `\n➡️ *${waitSeconds} Seconds*\n\n` +
      "_🕒 You can claim your bonus every 24 hours._"
    );
    return false;
  }
  return true;
}

if (!canRun()) return;

User.setProperty("last_run_at", Date.now(), "integer");

let bonusAmount = Bot.getProperty("bonusAmount");
let currency = Bot.getProperty("currency", "Not Set!");

if (!bonusAmount || isNaN(bonusAmount)) {
  Bot.sendMessage("*⚠️ Error:* Bonus amount is not set.");
  return;
}

let balance = Libs.ResourcesLib.userRes("balance");
balance.add(parseFloat(bonusAmount));

let transactions = User.getProperty("transactions") || [];
let timestamp = new Date().toLocaleString();
let newTransaction = { type: "➕ Bonus", amount: bonusAmount, date: timestamp };

transactions.unshift(newTransaction);
User.setProperty("transactions", transactions, "json");

let allTransactions = Bot.getProperty("userTransactions", {});
let userId = user.telegramid.toString();

if (!allTransactions[userId]) {
  allTransactions[userId] = [];
}
allTransactions[userId].unshift(newTransaction);
Bot.setProperty("userTransactions", allTransactions, "json");

Bot.sendMessage(
  `🎉 *Congratulations!*\n\n✨ You have successfully claimed *${bonusAmount} ${currency}* 🎁\n\n` +
  "🕒 _Come back again in 24 hours for your next bonus!_"
);
