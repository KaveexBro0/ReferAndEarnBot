/*CMD
  command: /myrefers
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

let refList = Libs.ReferralLib.getRefList();

if (!refList || !refList.exist) {
  Bot.sendMessage("*🚫 No affiliated users found! Start inviting friends to earn rewards!*");
  return;
}

if (!refList.last_calc_time) {
  refList.recount({
    onComplete: "/reflist"
  });
  return;
}

let msg = "*👨‍👨‍👦 Your Referrals 📊*\n\n";
let users = refList.getUsers();

for (let ind in users) {
  let user = users[ind];
  msg += "\n👤 " + Libs.commonLib.getLinkFor(user);
}

let last_updated_time = (new Date() - new Date(refList.updated_at)) / 1000;
last_updated_time = last_updated_time.toFixed(2);

msg +=
  "\n\n*Total Users:* " + refList.count +
  "\n_The first user was tracked:_\n_" + refList.created_at + "_" +
  "\n----" +
  "\n*Last recount:*" +
  "\n  Ago: " + last_updated_time + " sec" +
  "\n  Time: " + refList.last_calc_time.toFixed(2) + " sec";

if (needRecount(refList)) {
  msg += "\n  Recount started...";
  refList.recount();
} else {
  msg += "\n  Next recount after: " + needToWaitForNextRecount(refList).toFixed(2) + " sec";
}

let inl = [[{ text: "🔙 Back", callback_data: "/referral" }]];

Api.sendMessage({
  text: msg,
  parse_mode: "Markdown",
  reply_markup: { inline_keyboard: inl }
});

function delayForNextRecount(list) {
  return (100 * list.last_calc_time) / 0.1;
}

function needToWaitForNextRecount(list) {
  return delayForNextRecount(list) - lastUpdatedSecAgo(list);
}

function needRecount(list) {
  return needToWaitForNextRecount(list) < 0;
}

function lastUpdatedSecAgo(list) {
  return (new Date() - new Date(list.updated_at)) / 1000;
}
