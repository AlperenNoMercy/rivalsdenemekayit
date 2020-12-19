const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, message, args) => {

    let embed1 = new Discord.MessageEmbed()
    .setColor("RED")
    .setAuthor("Uyarı !")
    .setDescription("Bu Komutu Kullanmaya Yetkin Yok")
      if(!message.member.roles.cache.has("773855884438798382")) return message.channel.send(embed1);

   let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
 

let isim  =  args[1]
let yaş =  args[2]

if(!user) return message.channel.send(`Lütfen geçerli bir kullanıcı veya ID belirt.`)
  
 await user.setNickname(`Lütfen Bekleyiniz.`)
  user.roles.add("773855884438798377")
  user.roles.remove("773855884312444973")
  
  message.react('✅')
  
  setTimeout(() => {
    user.setNickname(`Ⴤ ${isim} ' ${yaş}`)
  },5000)
}
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['e'],
  permLevel: 0
};
 
exports.help = {
  name: "erkek",
  description: ""
};