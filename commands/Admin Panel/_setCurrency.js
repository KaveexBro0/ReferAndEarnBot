/*CMD
  command: /setCurrency
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

let adminList = Bot.getProperty("adminList", []);
let ownerId = Bot.getProperty("ownerId");

let isOwner = user.telegramid.toString() === ownerId;
let isAdmin = adminList.includes(String(user.telegramid));

if (!isOwner && !isAdmin) {  
  Bot.sendMessage("*🔒 Admin access only!*", { parse_mode: "Markdown" });  
  return;
}

let currency = message.split(" ")[1];

if (!currency) {
  Bot.sendMessage("*⚠️ Invalid input! Use format: /setCurrency [Currency]*\nExample: `/setCurrency USDT`", { parse_mode: "Markdown" });
  return;
}

Bot.setProperty("currency", currency);

Bot.sendMessage(`*✅ Currency successfully set to: ${currency}*`, { parse_mode: "Markdown" });
