const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.reply("You don't have permissions to do this!");
    }

    if (!args[0]) return message.reply("Enter a number");

    if (Number.isInteger(parseInt(args[0]))) {

        let amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() =>{

            if (args[0] <= 0) {
                message.reply("I cannot delete 0 messages. Specify a number!").then(msg => msg.delete({timeout: 3000}));
            }else if (args[0] == 1) {
                message.reply("I deleted 1 post!").then(msg => msg.delete({timeout: 3000}));
            } else {
                message.channel.send(`I have ${args[0]} messages delete!`).then(msg => msg.delete({timeout: 3000}));
            }

        });

    } else {
        return message.reply("Enter a number");
    }

}

module.exports.help = {
    name: "clear"
}