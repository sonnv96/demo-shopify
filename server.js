require('isomorphic-fetch');
const dotenv = require('dotenv');
const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const shopifyAuth, { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const Router = require('koa-router');

dotenv.config();
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');

const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
// const app = next({  dev});
// const handle = app.getRequestHandler();

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;

// app.prepare().then(() => {
  debugger

  const server = new Koa();
  server.keys = [SHOPIFY_API_SECRET_KEY];
  console.log("Tes1t");

  //Auth for app
  server
  .use(session({secure: true, sameSite: 'none'}, server))

  .use(
    shopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['read_themes', 'write_themes'],
      afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        console.log('We did it!', accessToken);
 
        ctx.redirect('/');
      },
    }),
  );

  use(verifyRequest())
 
  // application code
  .use(ctx => {
    ctx.body = '🎉';
  });


  // router.get('*', verifyRequest(), async (ctx) => {
  //   await handle(ctx.req, ctx.res);
  //   ctx.respond = false;
  //   ctx.res.statusCode = 200;
  //  });
  //  server.use(router.allowedMethods());
  //  server.use(router.routes());

  // server.listen(port, () => {
  //   console.log(`> Ready on http://localhost:${port}`);
  

// });