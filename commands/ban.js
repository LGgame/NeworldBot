const discord = require("discord.js");

module.exports.run = async(prefix, message) => {

    const args = message.content.slice(prefix.length).split(/ +/);
 
    if (!args[1]) return message.reply("Please enter a username");
 
    if (!args[2]) return message.reply("Give a reason");
 
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You don't have permissions to do this!");
 
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("You don't have permissions to do this!");
 
    var banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
 
    var reason = args.slice(2).join(" ");
 
    if (!banUser) return message.reply("I can't find that user");
 
    var embed = new discord.MessageEmbed()
        .setColor("#38ffa5")
        .setThumbnail(banUser.user.displayAvatarURL)
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`**Banded user:** ${banUser} (${banUser.id})
        **Baned by:** ${message.author}
        **Reason: ** ${reason}`);
 
    var embedPrompt = new discord.MessageEmbed()
        .setColor("GREEN")
        .setAuthor("Please react in 30sec")
        .setDescription(`You want to ban ${banUser}?`);
 
 
    message.channel.send(embedPrompt).then(async msg => {
 
        var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);
 
        if (emoji === "✅") {
 
            msg.delete();
                
            banUser.ban(reason).catch(err => {
                if (err) return message.channel.send(`Oops something went wrong`);
            });

            let logChannel = message.member.guild.channels.cache.find(channel => channel.name === "discord-logs");

            if (!logChannel) return message.reply("This channel does not exist");
        
            logChannel.send(embed);
 
            message.reply(embed);
 
        } else if (emoji === "❌") {
 
            msg.delete();
 
            message.reply("Ban canceled").then(m => m.delete(5000));
 
        }
 
    })
}    

async function promptMessage(message, author, time, reactions) {

    time *= 1000;
     
    for (const reaction of reactions) {
        await message.react(reaction);
    }
    
    const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;
     
    return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);
}
    
module.exports.help = {
    name: "ban"
}