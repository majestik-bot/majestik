const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {
    if (!message.member.roles.find("name", "℣alerium")) {
        return message.channel.send(' **Bu Komutu Kullanmak için** \*`℣alerium*\` **Rolüne Sahip Olman Lazım** ')
            .then(m => m.delete(5000));
    }  
  let u = args[0];
  if (!u) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription("Lütfen Silinecek Mesaj Sayısını Giriniz.!")
        .setColor("BLACK")
      .setFooter(bot.user.username, bot.user.avatarURL)
    );
  }

  const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(
      `${u} Mesajın Silinmesini Onaylıyormusunuz?`
    )
  .setFooter(bot.user.username, bot.user.avatarURL)
  message.channel.send(embed).then(async function(sentEmbed) {
    const emojiArray = ["✅"];
    const filter = (reaction, user) =>
      emojiArray.includes(reaction.emoji.name) && user.id === message.author.id;
    await sentEmbed.react(emojiArray[0]).catch(function() {});
    var reactions = sentEmbed.createReactionCollector(filter, {
      time: 30000
    });
    reactions.on("end", () => sentEmbed.edit("İşlem iptal oldu!"));
    reactions.on("collect", async function(reaction) {
      if (reaction.emoji.name === "✅") {
        message.channel.send(
          `İşlem onaylandı! ${u} adlı şahsın davetleri sıfırlandı!`
        );

        message.channel.bulkDelete(u)

      }
    });
  });
};

module.exports.conf = {
  aliases: ["sil", "temizle"],
  permLevel: 0,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "sil",
  description: "davet-sıfırla",
  usage: "sil"
};