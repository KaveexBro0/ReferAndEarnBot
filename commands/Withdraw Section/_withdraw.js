/*CMD
  command: /withdraw
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Withdraw Section

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 📤 withdraw
  group: 
CMD*/

let minWithdraw = Bot.getProperty("minWithdrawal", "Not Set!");
let currency = Bot.getProperty("currency", "Not Set!"); 

let bannedUsers = Bot.getProperty("bannedList", []);
if (bannedUsers.includes(user.telegramid.toString())) {
  Bot.sendMessage("🚫 You are banned from using this bot.");
  return;
}

let balance = Libs.ResourcesLib.userRes("balance");
let wallet = User.getProperty("wallet");

if (!wallet) {
  Bot.sendMessage("💼 You haven't set up a wallet yet!\n\n🔹 Please set your wallet using: /setWallet");
  return;
}

if (balance.value() < minWithdraw) {
  Bot.sendMessage(
    `*⚠️ Insufficient Balance!*\n\n💰 Your current balance: ${balance.value().toFixed(2)} ${currency}\n🔹 Minimum withdrawal: ${minWithdraw} ${currency}\n\n👉 Earn more before requesting a withdrawal!`
  );
  return;
}

if (Bot.getProperty("withdrawInProgress_" + user.telegramid)) {
  Bot.sendMessage("*⏳ You already have a pending withdrawal request!*\n\nPlease wait for the current transaction to be processed.");
  return;
}

Bot.sendMessage(`*💸 Enter the amount of ${currency} you want to withdraw:*`);
Bot.runCommand("auto");
