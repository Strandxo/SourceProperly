const { prefix, token } = require("./config.json");
const { Client, RichEmbed } = require("discord.js");

const bot = new Client({
    disableEveryone: true
});

bot.on("ready", () => {
    console.log(`${bot.user.username} is now online!`);
    bot.user.setActivity("proper code", {
        type: "WATCHING"
    });
});

bot.on("message", async message => {
    if (message.author.bot || message.channel.type != "text") return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(!message.member) message.member = await message.guild.fetchMember(message);

    if (cmd === "serverinfo") {
        const embed = new RichEmbed()
            .setDescription("Server information")
            .setColor("#15f153")
            .setThumbnail(message.guild.iconURL)
            .addField("Server name", message.guild.name)
            .addField("Created on", message.guild.createdAt.toLocaleString())
            .addField("You joined", message.member.joinedAt.toLocaleString())
            .addField("Total members", message.guild.memberCount);

        return message.channel.send(embed);
    }

    if (cmd === "botinfo") { 
        const embed = new RichEmbed()
            .setDescription("Bot information")
            .setColor("#15f153")
            .setThumbnail(bot.user.displayAvatarURL)
            .addField("Bot name", bot.user.username)
            .addField("Created on", bot.user.createdAt.toLocaleString());

        return message.channel.send(embed);
    }
});

bot.login(token);