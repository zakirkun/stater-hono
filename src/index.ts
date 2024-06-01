import { Hono } from 'hono'
import * as db from './connection/database'
import { users as userSchema } from './db/schema'

const app = new Hono({
  strict: false
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.onError((err, c) => {
  console.log(`${err}`);
  return c.text('Custom Error Message', 500)
})

app.use(async (c, next) => {
  c.set('message', 'Hono is awesome!')
  await next()
})

app.get('/awesome', (c) => {
  const message = c.get('message')
  return c.json({
    message: message
  }, 200)
})

app.get('/users', async (c) => {
	const getUsers = await db.default.select().from(userSchema)

	return c.json({
		data: getUsers
	}, 200)
})

Bun.serve({
	port: 5000,
	fetch: app.fetch
})