const { test, describe } = require('node:test')
const assert = require('assert')
const listHelper = require('../utils/list-helper')
const testHelper = require('./tests-helper')

describe('List Helper Tests', async () => {
  test('dummy list returns one', () => {
    const result = listHelper.dummy()
    assert.strictEqual(result, 1)
  })

  describe('totalLikes', () => {
    test('when list has one blog equals its likes', () => {
      const result = listHelper.totalLikes(testHelper.listWithOneBlog)
      assert.strictEqual(result, 7)
    })

    test('when list has many blogs calculates total correctly', () => {
      const result = listHelper.totalLikes(testHelper.listWithManyBlogs)
      assert.strictEqual(result, 36)
    })

    test('of empty list returns zero', () => {
      const result = listHelper.totalLikes([])
      assert.strictEqual(result, 0)
    })
  })

  describe('mostLikes', () => {
    test('returns the author with the most total likes', () => {
      const result = listHelper.mostLikes(testHelper.listWithManyBlogs)
      assert.deepStrictEqual(result, {
        author: 'Edsger W. Dijkstra',
        likes: 17
      })
    })
  })

  describe('sortByLikes', () => {
    test('returns blogs sorted by likes descending', () => {
      const result = listHelper.sortByLikes(testHelper.listWithOneBlog)
      assert.strictEqual(result[0].likes, 7)
    })

    test('of many blogs returns correct order', () => {
      const result = listHelper.sortByLikes(testHelper.listWithManyBlogs)
      assert.strictEqual(result[0].likes, 12)
      assert.strictEqual(result[result.length - 1].likes, 0)
    })
  })

  describe('averageLikes', () => {
    test('of single blog returns its likes', () => {
      const result = listHelper.averageLikes(testHelper.listWithOneBlog)
      assert.strictEqual(result, 7)
    })

    test('of many blogs calculates mean correctly', () => {
      const result = listHelper.averageLikes(testHelper.listWithManyBlogs)
      assert.strictEqual(result, 36 / 6)
    })

    test('of empty list returns zero', () => {
      const result = listHelper.averageLikes([])
      assert.strictEqual(result, 0)
    })
  })

  describe('mostBlogs', () => {
    test('returns the author with the most blogs', () => {
      const result = listHelper.mostBlogs(testHelper.listWithManyBlogs)
      assert.deepStrictEqual(result, {
        author: 'Robert C. Martin',
        blogs: 3
      })
    })
  })

  describe('favoriteBlog', () => {
    test('returns the blog with the most likes', () => {
      const result = listHelper.favoriteBlog(testHelper.listWithManyBlogs)
      assert.deepStrictEqual(result, {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
      })
    })
  })

  describe('uniqueAuthors', () => {
    test('returns array of unique author names', () => {
      const result = listHelper.uniqueAuthors(testHelper.listWithManyBlogs)
      assert.deepStrictEqual(result, ['Michael Chan', 'Edsger W. Dijkstra', 'Robert C. Martin'])
    })

    test('of empty list returns empty array', () => {
      const result = listHelper.uniqueAuthors(testHelper.listEmpty)
      assert.deepStrictEqual(result, [])
    })
  })

  describe('blogByAuthor', () => {
    test('returns blogs by a specific author', () => {
      const result = listHelper.blogByAuthor(testHelper.listWithManyBlogs, 'Edsger W. Dijkstra')
      assert.strictEqual(result.length, 2)
      assert.deepStrictEqual(result[0], {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      })
    })

    test('returns empty array when author not found', () => {
      const result = listHelper.blogByAuthor(testHelper.listWithManyBlogs, 'Nobody')
      assert.deepStrictEqual(result, [])
    })

    test('of empty list returns empty array', () => {
      const result = listHelper.blogByAuthor(testHelper.listEmpty, 'Nobody')
      assert.deepStrictEqual(result, [])
    })
  })

  describe('blogSummaries', () => {
    test('returns array of title-author objects', () => {
      const result = listHelper.blogSummaries(testHelper.listWithOneBlog)
      assert.deepStrictEqual(result, [{
        title: 'React patterns',
        author: 'Michael Chan'
      }])
    })
  })
})
