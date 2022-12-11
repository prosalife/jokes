//
// https://api-ninjas.com/
//


// <i>Курсив</i>
// <code>код</code>
// <s>перечеркнутый</s>
// <u>подчеркнутый</u>
// <pre language="c++">код</pre>
// <a href="smth.ru">Сайт</a>

const axios = require("axios");
const { Telegraf, Markup, Stage, session, Scenes, Extra } = require('telegraf')
// const WizardScene = require('telegraf')
const TOKEN = "5747242462:AAGNcu7rDBmQfZJA7duunUPkgyG-AQC5XyM";
const NINJA_API = 'Su4JLIQNivO/wvaBohLd8A==yhZbmG6XnYrncjfl'
const bot = new Telegraf(TOKEN);
bot.context.db = { answer: "", msg_id: 1 };
// bot.context.db = { msg_id: 0 }


bot.hears('👴 Dad Jokes', async ctx => {
    ctx.replyWithHTML('<b>Dad Jokes</b>')
    try {
        const request = await require('request');

        var limit = 1
        request.get({
            url: 'https://api.api-ninjas.com/v1/dadjokes?limit=' + limit,
            headers: {
                'X-Api-Key': NINJA_API
            },
        }, async function (error, response, body) {
            if (error) return console.error('Request failed:', error);
            else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
            else {

                const obj = await JSON.parse(body);

                ctx.replyWithHTML(obj[0].joke)
            }
        });
    }
    catch (e) {
        console.log(e)
    }
})

bot.hears('😉 Facts', async ctx => {
    ctx.replyWithHTML('<b>Facts</b>')
    try {
        //=========
        const request = await require('request');

        var limit = 3
        request.get({
            url: 'https://api.api-ninjas.com/v1/facts?limit=' + limit,
            headers: {
                'X-Api-Key': NINJA_API
            },
        }, async function (error, response, body) {
            if (error) return console.error('Request failed:', error);
            else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
            else {
                const obj = await JSON.parse(body);

                ctx.replyWithHTML(obj[0].fact)
            }
        });
        //=========
    }
    catch (e) {
        console.log(e)
    }
})

bot.hears("🥋 Chuck's Jokes", async ctx => {
    try {
        await ctx.replyWithHTML("<b>Chuck's Jokes</b>")
        const request = await require('request');
        request.get({
            url: 'https://api.api-ninjas.com/v1/chucknorris',
            headers: {
                'X-Api-Key': NINJA_API
            },
        }, async function (error, response, body) {
            if (error) return console.error('Request failed:', error);
            else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
            else {

                const obj = await JSON.parse(body);

                await ctx.replyWithHTML(obj.joke)
            }
        });
    }
    catch (e) {
        console.log(e)
    }
})

bot.hears('😂 Just Jokes', async ctx => {
    ctx.replyWithHTML('<b>Just Jokes</b>')
    try {
        const request = await require('request');

        var limit = 1
        request.get({
            url: 'https://api.api-ninjas.com/v1/jokes?limit=' + limit,
            headers: {
                'X-Api-Key': NINJA_API
            },
        }, async function (error, response, body) {
            if (error) return console.error('Request failed:', error);
            else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
            else {

                const obj = await JSON.parse(body);

                await ctx.replyWithHTML(obj[0].joke)
            }
        });
    }
    catch (e) {
        console.log(e)
    }
})

bot.hears('✨Quotes', async ctx => {
    ctx.replyWithHTML('<b>Quotes</b>')
    try {
        const request = await require('request');
        var category = 'happiness';

        request.get({
            url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
            headers: {
                'X-Api-Key': NINJA_API
            },
        }, async function (error, response, body) {
            if (error) return console.error('Request failed:', error);
            else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
            else {

                const obj = await JSON.parse(body);

                await ctx.replyWithHTML(obj[0].quote)
                await ctx.replyWithHTML(`<i>${obj[0].author}</i>`)
                // await ctx.replyWithHTML(obj[0].category)
            }
        });
    }
    catch (e) {
        console.log(e)
    }
})

bot.use(session())

bot.hears('⏳ Riddles', async ctx => {
    ctx.replyWithHTML('<b>Riddles</b>')
    try {
        const request = await require('request');

        await request.get({
            url: 'https://api.api-ninjas.com/v1/riddles',
            headers: {
                'X-Api-Key': NINJA_API
            },
        }, async function (error, response, body) {
            if (error) return console.error('Request failed:', error);
            else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
            else {

                const obj = await JSON.parse(body);

                await ctx.replyWithHTML('<i>Name of the riddle:</i> ' + obj[0].title)
                await ctx.replyWithHTML(obj[0].question)

                ctx.db.answer = obj[0].answer

                await ctx.replyWithHTML('The answer:', Markup.inlineKeyboard(
                    [
                        [Markup.button.callback(" See the answer ", "answer")]
                    ]
                ))
                ctx.db.msg_id = await ctx.message.message_id
            }
        });
    }
    catch (e) {
        console.log(e)
    }
})
bot.action(['answer'],
    async (ctx) => {
        await ctx.replyWithHTML(ctx.db.answer)
        // console.log("ctx.db.msg_id  = " + ctx.db.msg_id)
        // console.log("ctx.db.msg_id  = " + ctx.db.answer)

        // ctx.editMessageText(ctx.chat.id, ctx.db.msg_id, "The answer is: ")
        await ctx.editMessageReplyMarkup({
            reply_markup: {
                inline_keyboard: [
                    [
                    ],
                ]
            }
        }, {
            chat_id: ctx.chat.id,
            message_id: ctx.db.msg_id
        });

        // await ctx.tg.deleteMessage(ctx.chat.id, ctx.db.msg_id);

    })

bot.command(['start', 'run'], async ctx => {
    try {
        console.log("Bot Entertain yourself has started! ")
        await ctx.replyWithHTML("<b>Entertain yourself</b> - <i>read the Jokes and Quotes</i>", Markup.keyboard([
            ['👨 Dad Jokes', '😉 Facts', "🥋 Chuck's Jokes"],
            ['😂 Just Jokes', '✨Quotes', '⏳ Riddles',],
            //  ['Тест'],
        ]).oneTime(false).resize())

    }
    catch (e) {
        console.log(e)
    }
})


bot.launch();
