/*CMD
  command: /ban
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
    "*🚫 Ban User*\n\n" +
    "Enter the Telegram ID of the user to ban.\n" +
    "Example: `/ban 123456789`",
    { parse_mode: "Markdown" }
  );
  return;
}

let targetId = params.trim();
let bannedList = Bot.getProperty("bannedList", []);

if (!targetId || isNaN(targetId)) {
  Bot.sendMessage("*⚠️ Invalid Telegram ID! Please provide a numeric ID.*\nExample: /ban 123456789", { parse_mode: "Markdown" });
  return;
}

if (bannedList.includes(targetId)) {
  Bot.sendMessage("*⚠️ User " + targetId + " is already banned!*", { parse_mode: "Markdown" });
} else if (targetId === ownerId) {
  Bot.sendMessage("*⚠️ You cannot ban the owner!*", { parse_mode: "Markdown" });
} else if (adminList.includes(targetId)) {
  Bot.sendMessage("*⚠️ You cannot ban an admin!*", { parse_mode: "Markdown" });
} else {
  bannedList.push(targetId);
  Bot.setProperty("bannedList", bannedList, "json");
  Bot.sendMessage("*✅ User " + targetId + " has been banned!*", { parse_mode: "Markdown" });

  Bot.sendMessageToChatWithId(targetId, "*🚫 You have been banned from using this bot!*", { parse_mode: "Markdown" });
}
