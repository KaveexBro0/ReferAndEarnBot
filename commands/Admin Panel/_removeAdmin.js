/*CMD
  command: /removeAdmin
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

if (user.telegramid.toString() !== Bot.getProperty("ownerId")) {
  Bot.sendMessage("*🔒 This command is restricted to the bot owner only!*", { parse_mode: "Markdown" });
  return;
}

if (!params) {
  Bot.sendMessage(
    "*➖ Remove Admin*\n\n" +
    "Enter the Telegram ID of the admin to remove.\n" +
    "Example: `/removeAdmin 123456789`",
    { parse_mode: "Markdown" }
  );
  return;
}

let adminId = params.trim();
let adminList = Bot.getProperty("adminList", []);

if (!adminId || isNaN(adminId)) {
  Bot.sendMessage("*⚠️ Invalid Telegram ID! Please provide a numeric ID.*\nExample: /removeAdmin 123456789", { parse_mode: "Markdown" });
  return;
}

if (adminId === Bot.getProperty("ownerId")) {
  Bot.sendMessage("*⚠️ You cannot remove yourself as the owner!*", { parse_mode: "Markdown" });
} else if (!adminList.includes(adminId)) {
  Bot.sendMessage("*⚠️ User " + adminId + " is not an admin!*", { parse_mode: "Markdown" });
} else {
  adminList = adminList.filter(id => id !== adminId);
  Bot.setProperty("adminList", adminList, "json");
  Bot.sendMessage("*✅ Admin " + adminId + " removed successfully!*", { parse_mode: "Markdown" });
  Bot.sendMessageToChatWithId(adminId, "*❌ You’ve been removed as an admin.*", { parse_mode: "Markdown" });
}
