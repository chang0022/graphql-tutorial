const Koa = require('koa')
const Router = require('koa-router')
const KoaBody = require('koa-bodyparser')
const cors = require('@koa/cors')
const mongoose = require('mongoose')
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa')

const schema = require('./schema/schema')
const app = new Koa()

const router = new Router()

app.use(KoaBody())
app.use(cors())

const user = 'chang0022';
const pw = 'chang48956';
mongoose.connect(`mongodb://${user}:${pw}@ds125381.mlab.com:25381/neo-blog`);
mongoose.connection.once('open', () => {
  console.log('connected to mLab');
});

router.get('/', (ctx, next) => {
  ctx.body = 'Hello Koa!'
})
router.post('/graphql', graphqlKoa({ schema }))
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(5000, () => {
  console.log('Now listening for requests on port 5000, http://127.0.0.1:5000/')
})
