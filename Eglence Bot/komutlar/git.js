const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const filter = m => m.content.includes('discord');
module.exports.run = async (client, message, args) => {

const msg = message;
const reactionFilter = (reaction, user) => {
    return ['✅'].includes(reaction.emoji.name) && user.id === msg.mentions.users.first().id;
}
const onlyembed = new Discord.RichEmbed()
.setColor('#0009ft')
.setDescription('**Birini etiketlemelisin.**')
 if (message.mentions.users.first() === message.author) return message.channel.send('**Kendini seçemezsin.**')
message.channel.send(onlyembed);

msg.mentions.users.first().send(`**Merhaba ${msg.mentions.users.first().username}, ${msg.author} bulunduğun sesli kanala gelmek istiyor, kabul ediyor musun?\n*Unutma, 30 saniye içerisinde onaylamazsan istek iptal edilecek.**`).then(async (asd) => {
    await asd.react("✅");
    asd.awaitReactions(reactionFilter, {
        max: 1,
        time: 30000,
        errors: ['time']
    }).then(async(c) => {
        if (!msg.guild.member(msg.mentions.users.first()).voiceChannel){
            msg.author.send(`**Kişi isteğini onayladı fakat herhangi bir odada yok, bir odaya girip tekrar istek gönder.**`);
            msg.mentions.users.first().send(`**Herhangi bir odada olmadığın için onay başarısız.**`);
            return;
        }
        await msg.member.setVoiceChannel(msg.guild.member(msg.mentions.users.first()).voiceChannelID);
        asd.delete();
    }).catch(async(e) =>{
        await asd.delete();
        msg.author.send(`${msg.mentions.users.first().username} isteğini onaylamadı.`).then(hehe=>{hehe.delete(120000)});
    })
})
  msg.channel.send(`**Merhaba ${msg.mentions.users.first().username}, ${msg.author} bulunduğun sesli kanala gelmek istiyor, kabul ediyor musun?\n*Unutma, 30 saniye içerisinde onaylamazsan istek iptal edilecek.**`).then(async (asd) => {
    await asd.react("✅");
    asd.awaitReactions(reactionFilter, {
        max: 1,
        time: 30000,
        errors: ['time']
    }).then(async(c) => {
        if (!msg.guild.member(msg.mentions.users.first()).voiceChannel){
            msg.channel.send(` **Kişi isteğini onayladı fakat herhangi bir odada yok, bir odaya girip tekrar istek gönder.** `);
            msg.mentions.users.first().send(`**Herhangi bir odada olmadığın için onay başarısız.**`);
            return;
        }
        await msg.member.setVoiceChannel(msg.guild.member(msg.mentions.users.first()).voiceChannelID);
        asd.delete();
    }).catch(async(e) =>{
        await asd.delete();
        msg.author.send(`${msg.mentions.users.first().username} **isteğini onaylamadı.** `).then(hehe=>{hehe.delete(120000)});
    })
})

}
 module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  category: "admin",
  permLevel: 0
};

module.exports.help = {
  name: 'git',
  description: '',
  usage: ''
}