/*CMD
  command: /setMainChannel
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
  Bot.sendMessage("*⚠️ Invalid input! Use format: /setMainChannel [ChannelUsername]*\nExample: `/setMainChannel @MainChannel`", { parse_mode: "Markdown" });
  return;
}

Bot.setProperty("mainChannel", params, "string");
Bot.sendMessage("*✅ Main channel has been updated to: " + params + "*", { parse_mode: "Markdown" });
