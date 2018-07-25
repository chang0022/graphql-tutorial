const fastify = require('fastify')()
const cors = require('cors')
fastify.use(cors())

const Books = require('./data')

fastify.register(Books)

const start = async () => {
  try {
    await fastify.listen(10086)
    console.log(`🚀 server listening on ${fastify.server.address().port}`)
    fastify.log.info(`🚀 server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
