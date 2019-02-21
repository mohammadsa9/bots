const Telegraf = require('telegraf')
const Composer = require('telegraf/composer')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')
const Extra = require('telegraf/extra')
const bot = new Telegraf(process.env.BOT_TOKEN)
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));


bot.token = "799866334:AAEV5DuvTwl59GP9Fvjg1IaOFyjiJBK8ayc"
bot.start((ctx) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.hears('test', (ctx) => bot.telegram.sendMessage(ctx.message.chat.id, "text", Extra.inReplyTo(ctx.message.message_id)))

bot.hears('how', (ctx) => bot.telegram.sendMessage(ctx.message.chat.id, "text",Extra.inReplyTo(ctx.message.message_id)),Extra.HTML(),Extra.webPreview(1))
bot.hears('here', (ctx) => Doit(ctx))

bot.context.db = {
  getScores: () => { return 42 }
}

bot.hears('what', (ctx) => {
  const scores = ctx.db.getScores(ctx.message.from.username)
  return ctx.reply(`${ctx.message.from.username}: ${scores}`)
})

bot.on('text', (ctx) => {
  const scores = ctx.db.getScores(ctx.message.from.username)
  return ctx.reply(`${ctx.message.from.username}: ${scores}`)
})

bot.on('channel_post', (ctx) => {
var a = ctx.channelPost.text;
if(a.indexOf("salam") > -1) {
ctx.reply('Hey there2')
}
})

function Doit(ctx){
ctx.reply('Hey there')
sleep(5000).then(() => {
ctx.reply('Hey there2')
});
}

bot.launch()