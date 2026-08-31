const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const testHelper = require('./tests-helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(testHelper.listWithManyBlogs)
})

after(async () => {
  await mongoose.connection.close()
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, testHelper.listWithManyBlogs.length)
})

test('blog object has id field instead of _id', async () => {
  const blogsAtStart = await testHelper.blogsInDb()
  const blog = blogsAtStart[0]

  assert.ok(blog.id)
  assert.ok(!blog._id)
  assert.ok(!blog.__v)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Test New Blog Entry',
    author: 'Travis VanDame',
    url: 'http://www.github.com/travis-vandame'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await testHelper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, testHelper.listWithManyBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  assert(titles.includes('Test New Blog Entry'))
})

test('blog added with likes missing should default to zero', async () => {
  const newBlog = {
    title: 'Test New Blog Entry Missing Likes',
    author: 'Travis VanDame',
    url: 'http://www.github.com/travis-vandame'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})
