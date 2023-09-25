import { Client, GatewayIntentBits, Collection } from "discord.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();


// Loading All Commands
const foldersPath = "./commands";
const commandFolders = fs.readdirSync(foldersPath);
console.log("Loading Commands")
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs
		.readdirSync(commandsPath)
		.filter((file) => file.endsWith(".js"));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = await import(`${foldersPath}/${folder}/${file}`);
		if ("data" in command && "execute" in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(
				`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
			);
		}
	}
}

// Loading All Events
const eventsPath = "./events"
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
console.log("Loading Events")
for (const file of eventFiles) {
	const event = await import(`${eventsPath}/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


client.login(process.env.BOT_TOKEN);
