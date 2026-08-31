const assert = require('node:assert')
const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const testHelper = require('./tests-helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  mongoose.set('debug', false)

  await Blog.deleteMany({})
  await Blog.insertMany(testHelper.listWithManyBlogs)
})

describe('API Tests', async () => {
  describe('retrieving blogs', () => {
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
  })

  describe('creating new blogs', () => {
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
  })

  describe('updating a blog', () => {
    test('a blog can be updated', async () => {
      const blogsAtStart = await testHelper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = {
        title: blogToUpdate.title + ' updated',
        author: blogToUpdate.author,
        url: blogToUpdate.url
      }

      await api
        .patch(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const updatedBlogResponse = await api
        .get(`/api/blogs/${blogToUpdate.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(updatedBlogResponse.body.title, updatedBlog.title)
      assert.strictEqual(updatedBlogResponse.body.author, updatedBlog.author)
      assert.strictEqual(updatedBlogResponse.body.url, updatedBlog.url)
    })
  })

  describe('deleting new blogs', () => {
    test('a blog can be deleted', async () => {
      const blogsAtStart = await testHelper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await testHelper.blogsInDb()
      const ids = blogsAtEnd.map(b => b.id)

      assert(!ids.includes(blogToDelete.id))
      assert.strictEqual(blogsAtEnd.length, testHelper.listWithManyBlogs.length - 1)
    })
  })

  describe('validation of new blogs', () => {
    test('blog with missing title returns 400', async () => {
      const newBlog = {
        author: 'Travis VanDame',
        url: 'http://www.google.com'
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      assert.ok(response.body.error)
    })

    test('blog with missing url returns 400', async () => {
      const newBlog = {
        title: 'Blog With Missing URL',
        author: 'Travis VanDame'
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      assert.ok(response.body.error)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
