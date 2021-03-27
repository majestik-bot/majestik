const Discord = require("discord.js")

exports.run = async (client, message, args) => {
      if (!message.member.voiceChannel) { return message.channel.send("**Ses kanalında olman lazım!**"); }
 let kullanıcı = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!kullanıcı) return message.channel.send('**Kullanıcıyı etiketlemelisin.**')
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
  if(!member.voiceChannel) return message.channel.send("**Etiketlenen kullanıcı bir ses kanalında değil**").then(m =>m.delete(5000))
  const voiceChannel = message.member.voiceChannel.id;
    if (message.member.voiceChannel.id === kullanıcı.voiceChannel.id) return message.channel.send("Zaten aynı kanaldasınız")
    const filter = (reaction, user) => {
        return ['✅', '❌'].includes(reaction.emoji.name) && user.id === kullanıcı.id;
    };
    let casper = new Discord.RichEmbed()
        .setColor("BLUE")
        .setDescription(`${kullanıcı}, ${message.author} seni ${kullanıcı.voiceChannel.name} odasına çekmek istiyor. Kabul ediyormusun?`)
            .setFooter('Code Academy') 

    let mesaj = await message.channel.send(casper)
    await mesaj.react("✅")
    await mesaj.react("❌")
    mesaj.awaitReactions(filter, {
        max: 1,
        time: 60000,
        errors: ['time']
    }).then(collected => {
        const reaction = collected.first();
        const voiceChannel = message.member.voiceChannel.id;
        if (reaction.emoji.name === '✅') {
            let kabul = new Discord.RichEmbed()
                .setColor("GREEN")
                .setDescription(`${kullanıcı} odaya çekildi`)
            message.channel.send(kabul)
            member.setVoiceChannel(voiceChannel);
   const voiceChannel1 = message.member.voiceChannel.name;
        } else {
            let sama = new Discord.RichEmbed()
                .setColor("RED")
                .setDescription(`${kullanıcı} odaya çekilme teklifini reddetti`)
            message.channel.send(sama)
        }
    })
}

exports.conf = {
    enabled: true,
    aliases: ['çek'],
    permLevel: 0
};

exports.help = {
    name: "çek",
    description: "Etiketlediğiniz kullanıcıyı odaya çeker",
    usage: "çek @kullanıcı"

};