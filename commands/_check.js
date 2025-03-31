/*CMD
  command: /check
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

let bannedUsers = Bot.getProperty("bannedList", []);
if (bannedUsers.includes(user.telegramid.toString())) {
  Bot.sendMessage("🚫 You are banned from using this bot.");
  return;
}

if (content) {
  const { status, is_joined } = JSON.parse(content);

  if (status === "false") {
    Bot.sendMessage("*⚠️ Bot Configuration Error*\n\nPlease make the bot an admin in all channels.");
    return;
  }

  if (is_joined) {
    User.setProperty("userStatus", "member", "string");
    let refUser = RefLib.getAttractedBy();
    
    if (refUser) {
      let alreadyRewarded = User.getProperty("referralRewardGiven");

      if (!alreadyRewarded) {
        let referralBonus = Bot.getProperty("referralReward");
        let currency = Bot.getProperty("currency", "USD");

        if (referralBonus && currency) {
          let refbal = Libs.ResourcesLib.anotherUserRes("balance", refUser.telegramid);
          let bonusAmount = parseFloat(referralBonus);

          if (!isNaN(bonusAmount) && bonusAmount > 0) {
            refbal.add(bonusAmount);
            
            // Notify referrer of reward
            Api.sendMessage({
              chat_id: refUser.telegramid,
              text:
                "*🎉 Referral Bonus!*\n\n" +
                "You’ve earned *" + bonusAmount.toFixed(2) + " " + currency + "* from " + user.first_name + "! 💰",
              parse_mode: "Markdown"
            });

            Bot.sendMessage(
              "*🎉 Referral Confirmed!*\n\n" +
              "Your referrer " + Libs.commonLib.getLinkFor(refUser) + " has been rewarded " + bonusAmount.toFixed(2) + " " + currency + "!"
            );
            User.setProperty("referralRewardGiven", true, "boolean");
            User.setProperty("referredBy", refUser.telegramid, "string");
          } else {
            Bot.sendMessage("⚠️ Invalid referral bonus amount set in bot properties.");
          }
        } else {
          Bot.sendMessage("⚠️ Referral reward or currency is not set in bot properties.");
        }
      } else {
        console.log(`❌ User ${user.telegramid} already received referral reward.`);
      }
    }

    Bot.sendKeyboard(
      "💰 Account Balance\n🤝 Referral,🎁 Bonus\n📤 Withdraw, 📊 Statistics\n 📞 Contact Us",
      "*✅ Welcome Aboard!*\n\nStart inviting to earn more! 🎁"
    );
  } else {
    Bot.sendMessage("*⚠️ Action Required*\n\nJoin all channels to proceed!");
    Bot.runCommand("/start");
  }
} else {
  Bot.sendMessage("*❌ Error*\n\nFailed to verify channel membership. Try again later.");
}
