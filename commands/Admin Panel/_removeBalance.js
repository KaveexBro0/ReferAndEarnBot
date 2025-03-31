/*CMD
  command: /removeBalance
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
  Bot.sendMessage(
    "*💸 Remove Balance*\n\n" +
    "Enter the Telegram ID and amount to remove.\n" +
    "Example: `/removeBalance 123456789 50`",
    { parse_mode: "Markdown" }
  );
  return;
}

let [targetId, amount] = params.split(" ").map(item => item.trim());
let balances = Bot.getProperty("userBalances", {});

if (!targetId || !amount || isNaN(targetId) || isNaN(amount)) {
  Bot.sendMessage("*⚠️ Invalid input! Use format: /removeBalance [TelegramID] [Amount]*\nExample: /removeBalance 123456789 50", { parse_mode: "Markdown" });
  return;
}

targetId = parseInt(targetId);
amount = parseFloat(amount);

if (amount <= 0) {
  Bot.sendMessage("*⚠️ The amount must be a positive number!*", { parse_mode: "Markdown" });
  return;
}

let bal = Libs.ResourcesLib.anotherUserRes("balance", targetId);
bal.remove(amount);

Bot.sendMessage("*✅ Removed " + amount + " to user " + targetId + "!*", { parse_mode: "Markdown" });

Bot.sendMessageToChatWithId(targetId, "*💰 Your balance has been updated! -" + amount + "*", { parse_mode: "Markdown" });
