const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    const categoryID = "750721240989434008";

    let userName = message.author.username;
    let userDiscriminator = message.author.discriminator;

    let ticketBestaat = false;

    // let channels = message.guild.channels.cache;

    message.guild.channels.cache.forEach(channel => {

        if(channel.name == userName.toLowerCase() + "-" + userDiscriminator) {

            message.reply("You have already created a ticket!");

            return;

        }
    });

    if (!args[0]) return message.reply("Give a reason, for the ticket");

    let reason = args.slice(0).join(" ");

    if (ticketBestaat) return;

    let embed = new discord.MessageEmbed()
        .setTitle("Hello, " + message.author.username)
        .setFooter("A ticket channel is made!");
    
    message.channel.send(embed)



    message.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, {type: `text`}).then(
        (createdChannel) => {
            createdChannel.setParent(categoryID).then(
                (settedParent) => {

                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === `@everyone`), {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                    });

                    settedParent.updateOverwrite(message.author.id, {
                        CREATE_INSTANT_INVITE: false,
                        VIEW_CHANNEL: true,
                        READ_MESSAGES: true,
                        SEND_MESSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true
                    });


                    let embedParent = new discord.MessageEmbed()
                        .setTitle(`New ticket from: ${message.author.username}`)
                        .setDescription("Our team will come and help you as soon as possible!")
                        .addField(`Reason of the ticket:`, reason)
                        .addField("To make this go faster:", "Please explain the problem below as best of you can")
                        .setTimestamp()

                    settedParent.send(embedParent);

                }
            ).catch(err => {
                message.channel.send("Oops something went wrong");
            });
        }
    ).catch(err => {
        message.channel.send("Oops something went wrong");
    });

}

module.exports.help = {
    name: "ticket"
}