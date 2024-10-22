﻿const {
  MessageEmbed,
  MessageAttachment
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");




module.exports = {
  name: "tweet",
  aliases: [""],
  category: "🕹️ Fun",
  description: "IMAGE CMD",
  usage: "tweet @User <TEXT>",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
        if(!client.settings.get(message.guild.id, "FUN")){
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> THIS COMMAND IS CURRENTLY DISABLED`)
            .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
          );
        }
      //send loading message
      var tempmsg = await message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setAuthor("Getting Image Data..", "https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif")
      );
      //get pinged user, if not then use cmd user
      var user = message.mentions.users.first();
      //if user pinged, shift the args, 
      if(user) args.shift();
      //else not and define the user to be message.author
      else user = message.author;
      //get avatar of the user
      var avatar = user.displayAvatarURL({ format: "png" });
      //get the additional text
      var text = args.join(" ");
      //If no text added, return error
      if(!text) return tempmsg.edit(tempmsg.embeds[0]
        .setTitle("<:no:833101993668771842> You did not enter a Valid Text!")
        .setColor("RED")
        .setDescription(`Useage: \`${prefix}tweet @User <TEXT>\``)
      ).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray))

      //get the memer image
      client.memer.tweet(avatar, user.username, text).then(image => {
        //make an attachment
        var attachment = new MessageAttachment(image, "tweet.png");
        //delete old message
        tempmsg.delete();
        //send new Message
        message.channel.send(tempmsg.embeds[0]
          .setAuthor(`Meme for: ${user.tag}`, avatar)
          .setImage("attachment://tweet.png")
          .attachFiles(attachment)
        ).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray))
      })
      
  }
}
