/*CMD
  command: /panel
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

let adminList = Bot.getProperty("adminList", []);
let ownerId = Bot.getProperty("ownerId");

let isOwner = user.telegramid.toString() === ownerId;
let isAdmin = adminList.includes(String(user.telegramid));

if (!isOwner && !isAdmin) {  
  Bot.sendMessage("*🔒 Admin access only!*", { parse_mode: "Markdown" });  
  return;
}

let currency = Bot.getProperty("currency", "Not Set");
let minWithdrawal = Bot.getProperty("minWithdrawal", "Not Set");
let referralReward = Bot.getProperty("referralReward", "Not Set");
let bonusAmount = Bot.getProperty("bonusAmount", "Not Set");
let mainChannel = Bot.getProperty("mainChannel", "Not Set");
let paymentChannel = Bot.getProperty("paymentChannel", "Not Set");

let settingsInfo = "*🛠 Admin Panel\n\n📌 Current Settings:*\n  - 💱 Currency: `"+ currency +"`\n  - 📤 Min Withdrawal: `"+ minWithdrawal +"`\n  - 🤝 Referral Reward: `"+ referralReward +"`\n  - 🎁 Bonus Amount: `"+ bonusAmount +"`\n  - 📺 Main Channel: `"+ mainChannel +"`\n  - 💳 Payment Channel: `"+ paymentChannel +"`\n\nChoose an option below:";

Api.sendMessage({
  text: settingsInfo,
  parse_mode: "Markdown",
  reply_markup: {
    inline_keyboard: [
      ...(isOwner ? [[
        { text: "➕ Add Admin", callback_data: "/addAdmin" },
        { text: "➖ Remove Admin", callback_data: "/removeAdmin" }
      ]] : []),
      [
        { text: "💰 Add Balance", callback_data: "/addBalance" },
        { text: "💸 Remove Balance", callback_data: "/removeBalance" }
      ],
      [
        { text: "🚫 Ban User", callback_data: "/ban" },
        { text: "✅ Unban User", callback_data: "/unban" }
      ],
      [
        { text: "🔍 Check Balance", callback_data: "/checkBalance" },
        { text: "📢 Broadcast", callback_data: "/broadcastPanel" }
      ],
      [
        { text: "💱 Set Currency", callback_data: "/setCurrency" },
        { text: "🎁 Set Bonus Amount", callback_data: "/setBonusAmount" }
      ],
      [
        { text: "📤 Set Min Withdrawal", callback_data: "/setMinWithdrawal" },
        { text: "💼 Set Wallet Name", callback_data: "/setWalletName" }
      ],
      [
        { text: "📺 Set Main Channel", callback_data: "/setMainChannel" },
        { text: "💳 Set Payment Channel", callback_data: "/setPaymentChannel" }
      ],
      [
        { text: "🤝 Set Referral Reward", callback_data: "/setReferralReward" }
      ],
      [
        { text: "❌ Close", callback_data: "/closePanel" }
      ]
    ]
  }
});
