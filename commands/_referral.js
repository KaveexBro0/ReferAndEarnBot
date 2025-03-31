/*CMD
  command: /referral
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 🤝 referral
  group: 
CMD*/

var perref = Bot.getProperty("referralReward", "Not Set!");
var currency = Bot.getProperty("currency", "Not Set!");
let stat = Bot.getProperty("" + user.telegramid + "?Ban");

let bannedUsers = Bot.getProperty("bannedList", []);
if (bannedUsers.includes(user.telegramid.toString())) {
  Bot.sendMessage("🚫 You are banned from using this bot.");
  return;
}

let invLink = RefLib.getRefLink();
let totalRefs = RefLib.getRefCount();

if (request.data) {
  Api.deleteMessage({ message_id: request.message.message_id });
}

Api.sendMessage({
  text:
    "*🙌🏻 Total Referrals: "+ totalRefs +" User(s)*\n\n" +
    "*🪢 Your Invite Link:* `" + invLink +"`\n\n" +
    "📢 *Earn "+ perref +" "+ currency +" Per Invite!*",
  parse_mode: "Markdown",
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [
      [{ text: "🧑‍🧒‍🧒 My Referrals", callback_data: "/myrefers" }, 
       { text: "🔥 Top List", callback_data: "/toplist" }]
    ]
  }
});
