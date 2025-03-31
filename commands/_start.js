/*CMD
  command: /start
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

let ownerId = Bot.getProperty("ownerId");

if (!ownerId) {
  Bot.sendMessage("*⚠️ Please /setup the bot first.*");
  return;
}
let bannedUsers = Bot.getProperty("bannedList", []);
if (bannedUsers.includes(user.telegramid.toString())) {
  Bot.sendMessage("*🚫 You are banned from using this bot.*");
  return;
}

let hasStarted = User.getProperty("hasStarted");
let status;

if (!hasStarted) {
  status = Libs.ResourcesLib.anotherChatRes("status", "global");
  status.add(1);
  User.setProperty("hasStarted", true, "boolean");
  User.setProperty("balance", 0, "integer");
  User.setProperty("transactions", [], "json");
}

let activeUsers = Bot.getProperty("activeUsers", {});
activeUsers[user.telegramid] = Date.now();
Bot.setProperty("activeUsers", activeUsers, "json");

let currency = Bot.getProperty("currency", "Not Set!"); // Default to Not Set!
let mainChannel = Bot.getProperty("mainChannel", "Not Set!");
let paymentChannel = Bot.getProperty("paymentChannel", "Not Set!");
let referralReward = parseFloat(Bot.getProperty("referralReward", 0));

Api.sendMessage({
  text:
    "*⛔ Mandatory Channel Subscription*\n\n" +
    "➡️ " + mainChannel + "\n" +
    "➡️ " + paymentChannel + "\n\n" +
    "✅ *After joining, click ✅ Joined to start earning*",
  parse_mode: "Markdown",
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [[{ text: "✅ Joined", callback_data: "/joined" }]]
  }
});

let usernameTag = user.username ? "[@" + user.username + "]" : "";

function doTouchOwnLink() {
  Bot.sendMessage("❌ Self-Referral Not Allowed!\nPlease avoid clicking your own link.");
}

function doAttracted(refUser) {
  Bot.sendMessage(
    "🎉 Welcome!\n\nYou were invited by: " + Libs.commonLib.getLinkFor(refUser)
  );

  Bot.sendMessageToChatWithId(
    refUser.telegramid,
    "🎉 You just referred a new user: " + Libs.commonLib.getLinkFor(user) +
    "\n💰 You will receive " + referralReward.toFixed(2) + " " + currency + " once they join the required channels!"
  );

  User.setProperty("referredBy", refUser.telegramid, "string");
}

function doAlreadyAttracted() {
  Bot.sendMessage("🚫 You have already been referred by someone.");
}

let trackOptions = {
  onTouchOwnLink: doTouchOwnLink,
  onAttracted: doAttracted,
  onAlreadyAttracted: doAlreadyAttracted,
  debug: true
};

RefLib.track(trackOptions);

if (!hasStarted) {
  const ownerId = Bot.getProperty("ownerId");
  let adminList = Bot.getProperty("adminList", [ownerId]);
  let notificationText =
    "➕ <b>New User Notification</b>\n\n" +
    "👤 <b>User:</b> <a href='tg://user?id=" + user.telegramid + "'>" + user.first_name + "</a> " + usernameTag + "\n" +
    "🆔 <b>User ID:</b> <code>" + user.telegramid + "</code>\n" +
    "🌟 <b>Total Users:</b> " + status.value();
  adminList.forEach(adminId => {
    Bot.sendMessageToChatWithId(adminId, notificationText, {
      parse_mode: "HTML",
      disable_web_page_preview: true
    });
  });
}
