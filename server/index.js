const Koa = require('koa')
const Router = require('koa-router')
const KoaBody = require('koa-bodyparser')
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa')

const schema = require('./schema/schema')
const app = new Koa()

const router = new Router()

app.use(KoaBody())

router.get('/graphql', graphqlKoa({ schema }))

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(5000, () => {
  console.log('Now listening for requests on port 5000, http://127.0.0.1:5000/')
})
