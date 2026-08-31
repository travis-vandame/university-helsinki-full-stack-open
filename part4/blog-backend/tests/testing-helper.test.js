const { test, describe } = require('node:test')
const assert = require('node:assert')
const testHelpers = require('../utils/testing-helper')

describe('Testing Helper Utility Tests', async () => {
  describe('test helper reverse', () => {
    test('of a', () => {
      const result = testHelpers.reverse('a')

      assert.strictEqual(result, 'a')
    })

    test('of react', () => {
      const result = testHelpers.reverse('react')

      assert.strictEqual(result, 'tcaer')
    })

    test('of saippuakauppias', () => {
      const result = testHelpers.reverse('saippuakauppias')

      assert.strictEqual(result, 'saippuakauppias')
    })
  })

  describe('test helper average', () => {
    test('of one value is the value itself', () => {
      assert.strictEqual(testHelpers.average([1]), 1)
    })

    test('of many is calculated right', () => {
      assert.strictEqual(testHelpers.average([1, 2, 3, 4, 5, 6]), 3.5)
    })

    test('of empty array is zero', () => {
      assert.strictEqual(testHelpers.average([]), 0)
    })
  })
})

