import { Telegraf, Markup } from "telegraf";

const TOKEN = "5392304585:AAHLbeU2V-ZP4CRu2US1aeEDZ_CpFXlPDx4";
const bot = new Telegraf(TOKEN);

const web_link = "https://verdant-dango-505183.netlify.app/";

const webAppButton = Markup.button.url("Open Web App", web_link);

bot.start((ctx) => {
  ctx.reply("Welcome :) \n\n /web - web-link");
});

bot.command("web", (ctx) => {
  ctx.reply("web", Markup.inlineKeyboard([[webAppButton]]));
});

bot.launch();
