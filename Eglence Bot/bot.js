const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
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
    } catch (e){
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
    } catch (e){
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
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
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

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

// KOMUTLAR \\

const iltifatlar = [
  "Mucizelerden bahsediyordum. Tam o sırda gözlerin geldi aklıma.",
  "Geceye Ay, Banada Sen Yakışırsın. Y...",
  "Oo Yeğnim Nerelerdeydin Uzun Zamandır Yoktun Özlettin Kendini.",
  "Naber Güzellik Görüşemedik.",
  "Seni her yerde görebileceğim arzusu, belki de bu hayattaki tek yaşama sebebim.",
  "Ben seni seçtim bu hayatta mutlu olabilmek için.",
  "Biraz kilo mu verdin sen? Zayıflamış görünüyorsun. ;)",
  "Sen benim mucizemsin, mucizelere inanma sebebimsin.",
  "Favori rengimin ten rengin olduğunu söylemiş miydim?",
  "Kimselere söyleme. Ben ‘seni’ yazarım, onlar şiir zanneder.",
  "Senden ne köy olur ne de kasaba. Sen gel kalbimin başkenti ol!",
  "Gamzen varsa, aksesuarların en güzeli sende demektir.",
  "Güneşe gerek yok, gözlerindeki sıcaklık içimi ısıtıyor.",
  "Anladım Hepiniz Yağıza Hastasınız Ama O Benim <3",
  "Sen Güneşe Tutul Ben Sana.",
  "Benim için mutluluğun tanımı, seninle birlikteyken geçirdiğim vakittir.", // bu şekilde arttırabilirsiniz
];

client.on("ready", async () => {
  let sunucuID = "720067900974563328"; // Sunucu ID
  let kanalID = "721195198465441913"; // Kanal ID
  let birinciRol = "720395267387424778"; // İlk rol ID (Erkek rolü)
  let ikinciRol = "720395265986658485"; // Diğer rol ID (Kız rolü)
  setInterval(() => {
    let sunucu = client.guilds.get(sunucuID);
    client.channels.get(kanalID).send(`${sunucu.members.filter(uye => (uye.roles.has(birinciRol) || uye.roles.has(ikinciRol)) && uye.presence.status !== "offline").random()} ${iltifatlar[Math.floor(Math.random() * iltifatlar.length)]}`);
  }, 10*60*1000);
});