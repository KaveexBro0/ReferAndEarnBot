/*CMD
  command: /contactUs
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: *❗ Please enter your message to contact the administration;*

  <<KEYBOARD

  KEYBOARD
  aliases: 📞 contact us
  group: 
CMD*/

// Automatic fix
var msg;

// Automatic fix
var msg;

let ownerId = Bot.getProperty("ownerId");

if (!ownerId) {
  Bot.sendMessage("🚫 *Error:* No admin has been set for support.");
  return; // exit
}

var user_link = Libs.commonLib.getLinkFor(user);

var txt = `📣 *New Support Message from User:* ${user_link}\n\n📩 *Message:* ${message}`;
Bot.sendInlineKeyboardToChatWithId(
  ownerId,
  [{ title: "↩️ Reply to " + user.first_name, command: "/reply " + user.telegramid }],
  txt
);

Api.forwardMessage({
  chat_id: ownerId,
  from_chat_id: user.telegramid,
  message_id: request.message_id
});

Bot.sendMessage("✅ *Your message has been sent successfully!* An admin will respond soon.");
