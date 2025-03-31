/*CMD
  command: /reply
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
if ((user.telegramid = ownerId)) {
  if (params) {
    var id = params
    User.setProperty("reply?id", id, "string")
    Bot.runCommand("/reply2")
    return
  } else {
    Bot.sendMessage("*♨️ User ID Not Found to Reply!*")
    return
  }
}else{
Bot.sendMessage("You aren't an Admin!")
}
return
