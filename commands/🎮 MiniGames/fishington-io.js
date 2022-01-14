const { Client, Message, MessageEmbed, Invite } = require('discord.js');
  const config = require("../../botconfig/config.json");
  var ee = require("../../botconfig/embed.json");
  const emoji = require(`../../botconfig/emojis.json`);
  const fetch = require("node-fetch");
  module.exports = {
    name: "fishington-io",
    aliases: ["fishingtonio", "fishington"],
    category: "🎮 MiniGames",
    description: "Generate a fishington.io Link to play a fishing game with your friends (through Discord).",
    usage: "fishington-io --> Click on the Link | YOU HAVE TO BE IN A VOICE CHANNEL!",
    /*
755827207812677713 Poker Night
773336526917861400 Betrayal.io
832012586023256104 Chess
773336526917861400 End-Game
755600276941176913 YouTube Together
814288819477020702 Fishington.io
    */
    run: async (client, message, args, cmduser, text, prefix) => {
        const channel = message.member.voice.channel

        if (!channel) return message.channel.send(
            new MessageEmbed()
                .setDescription("You must be connected to a voice channel to use this command.")
                .setColor("#ff0000")
        )

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "814288819477020702",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(invite => {
            if (!invite.code) return message.channel.send(
                new MessageEmbed()
                    .setDescription("I was unable to start a fishing together session.")
                    .setColor("#ff0000")
            )
            message.channel.send(`Click on the Link to start the GAME:\n> https://discord.com/invite/${invite.code}`)
        })
    }
}