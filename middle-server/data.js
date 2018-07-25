const request = require('request-promise-native')

async function getBooks() {
  const data = await request({
    method: 'POST',
    uri: 'http://localhost:5000/graphql',
    form: {
      query: `{
        books {
            id
            name
            genre
            author {
                id
            }
        }
        authors {
            id
            name
            age
        }
      }`
    }
  })
  return data
}

module.exports = function(fastify, opts, next) {
  fastify.get('/books', getBooks)
  next()
}
