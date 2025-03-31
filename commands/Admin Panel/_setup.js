/*CMD
  command: /setup
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

const BOT_OWNER_ID = "1494040377"; // Replace with the actual Telegram ID of the bot owner

const ownerId = Bot.getProperty("ownerId");

if (ownerId) {
  Bot.sendMessage("*✅ Bot is already set up!*", { parse_mode: "Markdown" });
  return;
}

const newOwnerId = user.telegramid;

if (newOwnerId.toString() === BOT_OWNER_ID) {
  Bot.setProperty("ownerId", newOwnerId, "string");
  Bot.setProperty("adminList", [newOwnerId], "json");
  Bot.sendMessage(`*✅ Bot setup complete!*\n\nBot owner has been set to: *${newOwnerId}*\n\nYou can now use the /panel command.`, { parse_mode: "Markdown" });
} else {
  Bot.sendMessage("*🔒 This command can only be executed by the bot owner.*", { parse_mode: "Markdown" });
}

