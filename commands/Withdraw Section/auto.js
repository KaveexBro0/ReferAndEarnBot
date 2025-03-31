/*CMD
  command: auto
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Withdraw Section

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let minWithdraw = Bot.getProperty("minWithdrawal", null);
let currency = Bot.getProperty("currency", "Not Set!");
let paymentChannel = Bot.getProperty("paymentChannel", null);
let adminChatId = parseInt(Bot.getProperty("ownerId", 0));

let bannedUsers = Bot.getProperty("bannedList", []);
if (bannedUsers.includes(user.telegramid.toString())) {
  Bot.sendMessage("🚫 You are banned from using this bot.");
  return;
}
let balance = Libs.ResourcesLib.userRes("balance");
let wallet = User.getProperty("wallet") || "Not Set!";

let withdrawalAmount = parseFloat(message);
if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
  Bot.sendMessage("📛 Invalid value. Please enter a numeric amount.");
  return;
}

if (withdrawalAmount < minWithdraw) {
  Bot.sendMessage(`❌ Minimum withdrawal amount is ${minWithdraw} ${currency}.`);
  return;
}

if (withdrawalAmount > balance.value()) {
  Bot.sendMessage(`❌ Insufficient Balance!\n\n💰 Your current balance: ${balance.value().toFixed(2)} ${currency}`);
  return;
}
balance.remove(withdrawalAmount);
let nextId = Bot.getProperty("nextWithdrawalId", 1);
let withdrawalId = nextId;
Bot.setProperty("nextWithdrawalId", nextId + 1, "integer");

let pending = Bot.getProperty("pendingWithdrawals", {});
pending[withdrawalId] = {
  userId: user.telegramid,
  amount: withdrawalAmount,
  wallet: wallet
};
Bot.setProperty("pendingWithdrawals", pending, "json");

Bot.setProperty("withdrawInProgress_" + user.telegramid, true, "boolean");

let serverTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
let withdrawalHistory = Bot.getProperty("history_" + user.telegramid, "");
let newHistory = `➖ Withdrawal Requested:\n📅 Time: ${serverTime}\n💰 Amount: ${withdrawalAmount} ${currency}\n\n`;
Bot.setProperty("history_" + user.telegramid, newHistory + withdrawalHistory);

if (adminChatId > 0) {
  let userInfo = "👤 *User Info:*\n🔹 *Telegram ID:* `"+ user.telegramid +"`\n🔹 *Username:* @"+ user.username +"\n🔹 *Current Balance:* "+ balance.value().toFixed(2) +" "+ currency +"\n\n";
  let withdrawInfo = "💸 *New Withdrawal Request*\n\n💰 *Amount:* "+ withdrawalAmount.toFixed(2) +" "+ currency +"\n💼 *Wallet:* `"+ wallet +"`\n\n*Please approve or cancel the request below:*";

  let inline = [
    [{ text: "✅ Approve", callback_data: "/approve " + withdrawalId }],
    [{ text: "❌ Cancel", callback_data: "/cancel " + withdrawalId }]
  ];

  Api.sendMessage({
    chat_id: adminChatId,
    text: userInfo + withdrawInfo,
    parse_mode: "Markdown",
    disable_web_page_preview: true,
    reply_markup: { inline_keyboard: inline }
  });
} else {
  Bot.sendMessage("⚠️ Bot hasn't admin!");
}

Bot.sendMessage("✅ *Withdrawal Request Submitted Successfully*", { parse_mode: "Markdown" });
