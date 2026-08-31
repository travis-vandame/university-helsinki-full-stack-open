const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const mostLikes = (blogs) => {
  const grouped = _.groupBy(blogs, 'author')
  const withLikes = Object.entries(grouped).map(([author, articles]) => ({
    author,
    likes: _.sumBy(articles, 'likes')
  }))
  const topAuthor = _.maxBy(withLikes, 'likes')
  return topAuthor
}

const sortByLikes = (blogs) => {
  return _.sortBy(blogs, 'likes').reverse()
}

const averageLikes = (blogs) => {
  if (blogs.length === 0) return 0
  return _.meanBy(blogs, 'likes')
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((fav, blog) => blog.likes > fav.likes
    ? blog
    : fav, blogs[0])
}

const mostBlogs = (blogs) => {
  const grouped = _.groupBy(blogs, 'author')
  const maxAuthor = _.maxBy(Object.entries(grouped), ([,value]) => value.length)
  return { author: maxAuthor[0], blogs: maxAuthor[1].length }
}

const uniqueAuthors = (blogs) => {
  return _.uniq(blogs.map(blog => blog.author))
}

const blogByAuthor = (blogs, author) => {
  return _.filter(blogs, { author })
}

const blogSummaries = (blogs) => {
  return _.map(blogs, blog => ({
    title: blog.title,
    author: blog.author
  }))
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  sortByLikes,
  averageLikes,
  favoriteBlog,
  mostBlogs,
  uniqueAuthors,
  blogByAuthor,
  blogSummaries
}
