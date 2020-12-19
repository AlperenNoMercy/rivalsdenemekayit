const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(
    `Bot Aktif`
  );
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const Discord = require("discord.js");
const db = require('quick.db')
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json')
const fs = require("fs");
const moment = require("moment");
moment.locale("tr")
const chalk = require("chalk");
require("./util/eventLoader")(client);



const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

//--------------------------------KOMUTLAR-------------------------------\\


// GİRİŞ 
client.on("guildMemberAdd", member => { 
  const moment = require('moment');
  const kanal = ayarlar.giriskanal;
  let user = client.users.get(member.id);
  require("moment-duration-format");
  const tarih = new Date().getTime() - user.createdAt.getTime();  
  const embed = new Discord.RichEmbed()
  let rol = ayarlar.kayıtsızROL
  member.addRole(rol)

  var kontrol;
  if (tarih < 1296000000) kontrol = ':x: ・ __**Bu Kullanıcı Şüpheli**__'
  if (tarih > 1296000000) kontrol = ':white_check_mark:・ __**Bu Kullanıcı Güvenli**__'
  moment.locale("tr");
  let kanal1 = client.channels.get(kanal);
  let giris = new Discord.RichEmbed()
  .setTitle(`Ailemize yeni birisi katıldı !`)
  .setDescription(`
  Ⴤ・** __Hoşgeldin! ${member}__ **

  Ⴤ・**__Seninle Birlikte ${member.guild.memberCount} Kişiyiz.__ **

  Ⴤ・\`{ ${ayarlar.tag} }\`** __Tagımızı alarak ekibimize katılabilirsin.__ **

  Ⴤ・**<@&${ayarlar.yetkiliROL}> __seninle ilgilenicektir.__ **

  Ⴤ・** __Hesabın Oluşturulma Tarihi :__** \` ${moment(member.user.createdAt).format("YYYY DD MMMM dddd")} \`
 
  Ⴤ・${kontrol} 

  Ⴤ・** __ Ses teyit odasında kaydınızı yaptırabilirsiniz. __ ** 

  `)
  .setImage('https://cdn.discordapp.com/attachments/787371652081647636/789558842525876224/32f9123f024b50d90ca42db40ff288d2.gif')
  .setTimestamp()
  kanal1.send(giris)
  });
  // GİRİŞ SON

  client.elevation = message => {
    if (!message.guild) {
      return;
    }
    let permlvl = 0;ß
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    return permlvl;
  };
  
  client.login(process.env.token);
  
 ////////////////////////////////////// BOT  DURUM  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  client.on("ready", () => {                                                    
    client.user.setPresence({                                                              
      game: { name: `No Mercy ♥ Aspera`, type: "WATCHING" },
      status: "online"
    });
  });                                                                                      
 ////////////////////////////////////// BOT  DURUM  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\  