import { Telegraf, Markup } from "telegraf";

const TOKEN = "5392304585:AAHLbeU2V-ZP4CRu2US1aeEDZ_CpFXlPDx4";
const bot = new Telegraf(TOKEN);

const web_link = "http://127.0.0.1:5173/";

const webAppButton = Markup.button.url("Open Web App", web_link);

bot.start((ctx) => {
  ctx.reply("Welcome :))))");
});

bot.command("web", (ctx) => {
  ctx.reply("web", Markup.inlineKeyboard([[webAppButton]]));
});

bot.launch();
