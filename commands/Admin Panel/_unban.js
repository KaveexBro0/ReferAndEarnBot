/*CMD
  command: /unban
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
  Bot.sendMessage(
    "*✅ Unban User*\n\n" +
    "Enter the Telegram ID of the user to unban.\n" +
    "Example: `/unban 123456789`",
    { parse_mode: "Markdown" }
  );
  return;
}

let targetId = params.trim();
let bannedList = Bot.getProperty("bannedList", []);

if (!targetId || isNaN(targetId)) {
  Bot.sendMessage("*⚠️ Invalid Telegram ID! Please provide a numeric ID.*\nExample: /unban 123456789", { parse_mode: "Markdown" });
  return;
}

if (!bannedList.includes(targetId)) {
  Bot.sendMessage("*⚠️ User " + targetId + " is not banned!*", { parse_mode: "Markdown" });
} else {
  bannedList.splice(bannedList.indexOf(targetId), 1);
  Bot.setProperty("bannedList", bannedList, "json");
  Bot.sendMessage("*✅ User " + targetId + " has been unbanned!*", { parse_mode: "Markdown" });

  Bot.sendMessageToChatWithId(targetId, "*✅ You have been unbanned and can now use the bot again!*", { parse_mode: "Markdown" });
}
