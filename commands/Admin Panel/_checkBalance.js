/*CMD
  command: /checkBalance
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin Panel

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let ownerId = Bot.getProperty("ownerId");
let adminList = Bot.getProperty("adminList", []);

if (user.telegramid.toString() !== ownerId && !adminList.includes(user.telegramid.toString())) {
  Bot.sendMessage("*🔒 This command is restricted to the owner and admins only!*", { parse_mode: "Markdown" });
  return;
}

if (!params) {
  Bot.sendMessage("*⚠️ Please enter a User ID to check the balance!*\n\nExample: `/checkBalance 123456789`", { parse_mode: "Markdown" });
  return;
}

let targetId = params.trim();

if (!targetId || isNaN(targetId)) {
  Bot.sendMessage("*⚠️ Invalid User ID!*\n\nExample: `/checkBalance 123456789`", { parse_mode: "Markdown" });
  return;
}

let balance = Libs.ResourcesLib.anotherUserRes("balance", targetId).value(); // Get balance value

Bot.sendMessage("*💰 Balance of User " + targetId + ": " + balance + "*", { parse_mode: "Markdown" });
