/*CMD
  command: /addAdmin
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
    "*➕ Add New Admin*\n\n" +
    "Enter the Telegram ID of the user to add as an admin.\n" +
    "Example: `/addAdmin 123456789`",
    { parse_mode: "Markdown" }
  );
  return;
}

let newAdminId = params.trim();
let adminList = Bot.getProperty("adminList", []);

if (!newAdminId || isNaN(newAdminId)) {
  Bot.sendMessage("*⚠️ Invalid Telegram ID! Please provide a numeric ID.*\nExample: /addAdmin 123456789", { parse_mode: "Markdown" });
  return;
}

if (adminList.includes(newAdminId)) {
  Bot.sendMessage("*⚠️ User " + newAdminId + " is already an admin!*", { parse_mode: "Markdown" });
} else if (newAdminId === Bot.getProperty("ownerId")) {
  Bot.sendMessage("*⚠️ You are already the owner!*", { parse_mode: "Markdown" });
} else {
  adminList.push(newAdminId);
  Bot.setProperty("adminList", adminList, "json");
  Bot.sendMessage("*✅ Admin " + newAdminId + " added successfully!*", { parse_mode: "Markdown" });
  Bot.sendMessageToChatWithId(newAdminId, "*🎉 You’ve been added as an admin! Use /panel to access controls.*", { parse_mode: "Markdown" });
}
