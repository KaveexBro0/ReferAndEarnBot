/*CMD
  command: /joined
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (request.data) {
  Api.deleteMessage({ message_id: request.message.message_id });
}
let bannedUsers = Bot.getProperty("bannedList", []);
if (bannedUsers.includes(user.telegramid.toString())) {
  Bot.sendMessage("🚫 You are banned from using this bot.");
  return;
}
let mainChannel = Bot.getProperty("mainChannel", "Not Set!");
let paymentChannel = Bot.getProperty("paymentChannel", "Not Set!");

var channels = [mainChannel, paymentChannel];

HTTP.get({
  url: "https://membership.bjcoderx.workers.dev/?bot_token=" + bot.token + "&user_id=" + user.telegramid + "&chat_id=" + encodeURIComponent(JSON.stringify(channels)),
  success: "/check"
});

