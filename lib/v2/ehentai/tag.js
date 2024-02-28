const EhAPI = require('./ehapi');

module.exports = async (ctx) => {
    const page = ctx.req.param('page');
    const tag = ctx.req.param('tag');
    const routeParams = new URLSearchParams(ctx.req.param('routeParams'));
    const bittorrent = routeParams.get('bittorrent') || false;
    const embed_thumb = routeParams.get('embed_thumb') || false;
    const items = await EhAPI.getTagItems(ctx.cache, tag, page, bittorrent, embed_thumb);

    ctx.state.data = EhAPI.from_ex
        ? {
              title: tag + ' - ExHentai Tag',
              link: `https://exhentai.org/tag/${tag}`,
              item: items,
          }
        : {
              title: tag + ' - E-Hentai Tag',
              link: `https://e-hentai.org/tag/${tag}`,
              item: items,
          };
};