/*CMD
  command: /reply2
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: *Enter message to user:*

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let ownerId = Bot.getProperty("ownerId");
if (user.telegramid == ownerId) {
  var id = User.getProperty("reply?id");
  Bot.sendInlineKeyboardToChatWithId(
    id,
    [{ title: "↩️ Reply to Admin", command: "/contactUs" }],
    "*🔍 Message from Admin:*\n\n" + message
  );
  Bot.sendMessage("*✅ Your message has been sent to the user successfully!*");
} else {
  return;
}
