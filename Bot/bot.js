import { Telegraf, Markup } from "telegraf";

// const TOKEN = "5392304585:AAHLbeU2V-ZP4CRu2US1aeEDZ_CpFXlPDx4"; ///@SaidqodirxonUzBot
const TOKEN = "5918611696:AAFxqlcvrKJJWA1G5VsBYf_PQ0edM8uGK6Y"; ///@SertifikatProBot

const bot = new Telegraf(TOKEN);

// const web_link = "https://verdant-dango-505183.netlify.app/";
const web_link = "https://693d-84-54-73-69.ngrok-free.app";

const menu = Markup.keyboard([["Interaktiv Menyu"]])
  .oneTime()
  .resize();

bot.start((ctx) => {
  ctx.reply("Hush kelibsiz :)\n\n\n /web - Interaktiv Menyu", menu);
});

bot.command("web", (ctx) => {
  const webAppButton = Markup.button.webApp("Interaktiv Menyu", web_link);
  ctx.reply("Interaktiv Menyu", Markup.inlineKeyboard([[webAppButton]]));
});

bot.hears("Interaktiv Menyu", (ctx) => {
  ctx.reply(
    "Interaktiv Menyu",
    Markup.inlineKeyboard([
      [Markup.button.webApp("Interaktiv Menyu", web_link)],
    ])
  );
});

bot.launch();

console.log("Bot ishladi");
