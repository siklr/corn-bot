require('./server');

const { Client, GatewayIntentBits, EmbedBuilder, Partials } = require('discord.js');

// Configuration
const token = process.env.TOKEN;
const outputChannel = process.env.CHANNEL;
const outputChannels = new Map();

// Message Colors
const infoColor = '0377fc';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ],
    partials: [
        Partials.Message,
    ],
});


// Bootstrap
client.once('ready', () => {
    console.log('Online and present in the following guilds:');
    client.guilds.cache.forEach(guild => {
          console.log('\t' + guild.name + ' => ' + guild.id);
    });

    // Get all text channels matching outputChannel
    client.channels.cache.forEach(channel => {
        if (channel.type === 0 && channel.name === outputChannel) {
            // If multiple channels with the same name exist, grab the first
            if (!outputChannels.get(channel.guild.id)) {
                outputChannels.set(channel.guild.id, channel.id);
            }
        }
    });
});


client.on('guildMemberRemove', member => {
    const channel = client.channels.cache.get(outputChannels.get(member.guild.id));
    const embed = new EmbedBuilder()
        .setColor(infoColor)
        .setTitle(`${member.displayName} (${member.user.tag}) has left the server.`)
        .setThumbnail(member.displayAvatarURL())
        .setTimestamp();

    return channel.send({ embeds: [embed] });
});

client.login(token);