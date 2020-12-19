module.exports = client => {
  client.user.setStatus("online");

  console.log(`${client.user.id}                                                                                                                                                                     `)
  //client.user.setActivity(`${prefix}yardım | ${client.guilds.size} sunucu | ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Kullanıcıyı`, { type: "LISTENING"});
client.user.setActivity(`Rivals V12 Kayıt Sistemi`, { type: "WATCHING"});  

 console.log(`Bot Akitf Komutlar Yüklendi !`);
};