/*CMD
  command: /broadcast
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin Panel
  answer: Send The Message For Broadcast

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let ownerId = Bot.getProperty("ownerId");
if (user.telegramid == ownerId){
Bot.setProperty("adminBroadcast", message)
Bot.runAll({
    command: "/broadcast2"
})
Bot.sendMessage("✅Message sent to all active members")
}else{
Bot.sendMessage("you are not allowed to use this")
}
