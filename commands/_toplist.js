/*CMD
  command: /toplist
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
  var message_id = request.message.message_id;
  var chat_id = request.message.chat.id;

  Api.deleteMessage({
    chat_id: chat_id,
    message_id: message_id
  });
}
let bannedUsers = Bot.getProperty("bannedList", []);
if (bannedUsers.includes(user.telegramid.toString())) {
  Bot.sendMessage("🚫 You are banned from using this bot.");
  return;
}
let list = Libs.ReferralLib.getTopList();

list.order_by = "integer_value";
list.order_ascending = false;
list.page = 1;
list.per_page = 10;

var items = list.get();

var msg = "*🏆 Top Referring Users 📊*\n\n"
var prop;
for (var ind in items) {
  prop = items[ind];
  msg +=
    "\n*" + String(parseInt(ind) + 1) + ".* " + 
    Libs.commonLib.getLinkFor(prop.user) + 
    " - " + "👨‍👨‍👦 *Referrals*: " + String(prop.value);
}

var inl = [[{ text: "🔙 Back", callback_data: "/referral" }]];

Api.sendMessage({
  text: msg,
  parse_mode: "markdown",
  reply_markup: { inline_keyboard: inl }
});
