import Discord from 'discord.js';

export async function run(client, message, args) {
  const sayMessage = args.join(' ');
  message.delete().catch(O_o => {});
  message.channel.send(sayMessage);
}