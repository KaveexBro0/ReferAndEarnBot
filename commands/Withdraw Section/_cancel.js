/*CMD
  command: /cancel
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Withdraw Section

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

Api.deleteMessage({
message_id : request.message.message_id
})
if (!params) {
  Bot.sendMessage("⚠️ Please provide a withdrawal ID or user ID.\nExample: /cancel 1 or /cancel 1494040377");
  return;
}

let input = String(params).trim();
let pending = Bot.getProperty("pendingWithdrawals", {});
let withdrawalId = null;

if (pending[input]) {
  withdrawalId = input;
} else {
  for (let id in pending) {
    let storedUserId = String(pending[id].userId);
    if (storedUserId === input) {
      withdrawalId = id;
      break;
    }
  }
}

if (!withdrawalId) {
  let debugMsg = "⚠️ No withdrawal request found with ID: " + input + "\n\nPending Withdrawals:\n";
  let hasPending = false;
  for (let id in pending) {
    hasPending = true;
    debugMsg += `ID: ${id}, User ID: ${pending[id].userId}, Amount: ${pending[id].amount} ${Bot.getProperty("currency", "USD")}\n`;
  }
  debugMsg += hasPending ? "" : "No pending withdrawals exist.";
  Bot.sendMessage(debugMsg);
  return;
}

let currency = Bot.getProperty("currency", "Not Set!");
let adminChatId = Bot.getProperty("ownerId", "0");

if (String(user.telegramid) !== adminChatId) {
  Bot.sendMessage("⚠️ Only the bot admin can cancel withdrawals.");
  return;
}

let withdrawal = pending[withdrawalId];
let userId = withdrawal.userId;
let amount = withdrawal.amount;

try {
  let userBalance = Libs.ResourcesLib.anotherUserRes("balance", userId);
  
  let beforeBalance = userBalance.value();
  Bot.sendMessage("Debug: Balance before = " + beforeBalance);

  let success = userBalance.add(amount);
  if (!success) {
    Bot.sendMessage("⚠️ Failed to restore " + amount + " " + currency + " to user " + userId + "'s balance. Resource may not exist.");
  } else {
    let afterBalance = userBalance.value();
    Bot.sendMessage("Debug: Balance after = " + afterBalance);

    Api.sendMessage({
      chat_id: userId,
      text: `❌ Your withdrawal request for ${amount.toFixed(2)} ${currency} has been canceled.\n\n💰 Amount restored to your balance.`,
      parse_mode: "HTML"
    });
  }

  delete pending[withdrawalId];
  Bot.setProperty("pendingWithdrawals", pending, "json");
  Bot.setProperty("withdrawInProgress_" + userId, false, "boolean");

  Bot.sendMessage("✅ Withdrawal ID " + withdrawalId + " canceled for user " + userId);
} catch (e) {
  Bot.sendMessage("⚠️ Error in /cancel: " + e.message);
}
