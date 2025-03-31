/*CMD
  command: /setPaymentChannel
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
  Bot.sendMessage("*⚠️ Invalid input! Use format: /setPaymentChannel [ChannelUsername]*\nExample: `/setPaymentChannel @PaymentChannel`", { parse_mode: "Markdown" });
  return;
}

Bot.setProperty("paymentChannel", params, "string");
Bot.sendMessage("*✅ Payment proof channel has been updated to: " + params + "*", { parse_mode: "Markdown" });
