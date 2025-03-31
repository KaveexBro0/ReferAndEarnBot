/*CMD
  command: /statistics
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 📊 statistics
  group: 
CMD*/

let bannedUsers = Bot.getProperty("bannedList", []);
if (bannedUsers.includes(user.telegramid.toString())) {
  Bot.sendMessage("🚫 You are banned from using this bot.");
  return;
}
let currency = Bot.getProperty("currency", "Not Set!");
let totalWithdrawals = Bot.getProperty("totalWithdraw", 0).toFixed(2);
var status = Libs.ResourcesLib.anotherChatRes("status", "global")
  
let activeUsersData = Bot.getProperty("activeUsers", {});
let activeUsers = 0;
let now = Date.now();
let oneDayAgo = now - (24 * 60 * 60 * 1000); // 24 hours in milliseconds

for (let userId in activeUsersData) {
  if (activeUsersData[userId] > oneDayAgo) {
    activeUsers++;
  }
}

let statsText = 
  `*📊 Bot Statistics*\n\n` +
  `*👥 Total Users:* ${status.value().toFixed(0)}\n` +
  `*💸 Total Withdrawals:* ${totalWithdrawals} ${currency}\n` +
  `*🟢 Active Users (Last 24h):* ${activeUsers}`;

Api.sendMessage({
  text: statsText,
  parse_mode: "Markdown"
});

