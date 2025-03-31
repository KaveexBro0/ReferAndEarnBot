/*CMD
  command: /setBonusAmount
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

if (!params || isNaN(params)) {
  Bot.sendMessage("*⚠️ Invalid input! Use format: /setBonusAmount [Amount]*\nExample: `/setBonusAmount 20`", { parse_mode: "Markdown" });
  return;
}

Bot.setProperty("bonusAmount", parseFloat(params), "float");
Bot.sendMessage("*✅ Bonus amount has been updated to: " + params + "*", { parse_mode: "Markdown" });
