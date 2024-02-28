const utils = require('./utils');
import got from '@/utils/got';
import { load } from 'cheerio';

module.exports = async (ctx) => {
    const base = utils.urlBase(ctx.req.param('caty'), ctx.req.param('id'));
    const res = await got(base);
    const info = utils.fetchAllArticles(res.data);
    const $ = load(res.data);

    const details = await Promise.all(info.map((e) => utils.detailPage(e, ctx.cache)));

    ctx.set('json', {
        info,
    });

    ctx.set('data', {
        title: '大数据专家委员会 - ' + $('.position a:last-child').text(),
        link: base,
        item: details,
    });
};