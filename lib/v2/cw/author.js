const { baseUrl, parsePage } = require('./utils');
import puppeteer from '@/utils/puppeteer';

module.exports = async (ctx) => {
    const browser = puppeteer();

    const { $, items } = await parsePage('author', browser, ctx);

    await browser.close();

    ctx.set('data', {
        title: $('head title').text(),
        description: $('.authorTxt').text(),
        link: `${baseUrl}/author/${ctx.req.param('channel')}`,
        image: $('.authorPhoto img').attr('src') || `${baseUrl}/assets_new/img/fbshare.jpg'`,
        language: $('meta[property="og:locale"]').attr('content'),
        item: items,
    });
};