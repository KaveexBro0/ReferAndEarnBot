/*CMD
  command: /broadcast2
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

var msg = Bot.getProperty("adminBroadcast", "No Broadcast Message!")
Bot.sendMessage("*Admin Msg\n============*\n"+ msg)
