const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async(bot, message, args) => {

    if (!message.member.hasPermission("KICK_MEMBERS")) {
        return message.reply("You don't have permissions to do this!");
    }

    if (!args[0]) return message.reply("Please enter a username");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("You don't have permissions to do this!");

    let mutePerson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!mutePerson) return message.reply("I can't find that user");

    if (mutePerson.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, but you can't mute this user");

    let muteRole = message.guild.roles.cache.get(`750728222651711518`);
    if (!muteRole) return message.channel.send("That role does not exist ");

    let muteTime = args[1];

    if (!muteTime) return message.reply("You have to specify a time");

    let channel = message.member.guild.channels.cache.get("750720301582647386");

    await(mutePerson.roles.add(muteRole.id));
    // message.channel.send(`${mutePerson} Je bent gemute voor ${muteTime}`);
    channel.send(`${mutePerson} You are muted for ${muteTime}`);

    setTimeout(() => {

        mutePerson.roles.remove(muteRole.id);

            // message.channel.send(`${mutePerson} Je bent weer geunmute`);

        channel.send(`${mutePerson} You are unmuted!`);

    }, timeStamp(muteTime));

}

module.exports.help = {
    name: "tempmute"
}