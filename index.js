const discord = require("discord.js");
const botConfig = require ("./botconfig.json");
const package = require ("./package.json");

const fs = require("fs");

const active = new Map();

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands", (err, files) => {

    if(err) console.log(err);

    let jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Can't find files!");
        return;
    }

     jsFiles.forEach((f, i) => {

         let fileGet = require(`./commands/${f}`);
         console.log(`De file ${f} is geladen`);

         bot.commands.set(fileGet.help.name, fileGet);

    });

});


bot.on("ready", async () => {

    console.log(`${bot.user.username} bot is online!`);
    console.log(botConfig.prefix);

    bot.user.setActivity("🌎Neworld | ,", { type: "PLAYING" });

});


bot.on("guildMemberAdd", member =>{

    // let testRole = member.guild.roles.cache.get(`669663062524952657`);
    let survivor = member.guild.roles.cache.get(`750729675562680410`);

    //if(!testRole) return;

    // member.roles.add(testRole);
    member.roles.add(survivor);

    let channel = member.guild.channels.cache.get(`750718413877280918`);

    if(!channel) return;

    let botIcon = "https://i.imgur.com/JMjjJmw.png";

    let joinEmbed = new discord.MessageEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        .setTitle(`Welcome, ${member.user.username}`)
        .setDescription("Welcome Neworld to Semi-RP! \n Make sure to read the rules. \n **Enjoy your stay!**")
        .setColor("#38ffa5")
        .setFooter("Neworld Helper ©", botIcon)
        .setTimestamp();

    channel.send(joinEmbed);

})


bot.on("message", async message => {

    let prefix = botConfig.prefix;

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    if (!message.content.startsWith(prefix)) return;
    console.log(message.content);

    let messageArray = message.content.split(" ");

    let command = messageArray[0];

    let arguments = messageArray.slice(1);

    let commands = bot.commands.get(command.slice(prefix.length));

    let options = {
        active: active
    };

    if (commands) commands.run(bot, message, arguments, options);

 
});

bot.login(process.env.token);