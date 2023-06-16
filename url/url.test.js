import { urlParser } from './url'
import { test, expect } from 'vitest'

test('url parser case 1 - normal case', () => {
  const formatStr = '/:version/api/:collection/:id'
  const urlInstance = '/6/api/listings/3?sort=desc&limit=10'

  const hash = urlParser(formatStr, urlInstance)
  expect(hash).toStrictEqual({
    version: 6,
    collection: 'listings',
    id: 3,
    sort: 'desc',
    limit: 10
  })
})

test('url parser case 2 - no params', () => {
  const formatStr = '/:version/api/:collection/:id'
  const urlInstance = '/6/api/listings/3'

  const hash = urlParser(formatStr, urlInstance)
  expect(hash).toStrictEqual({
    version: 6,
    collection: 'listings',
    id: 3
  })
})

test('url parser case 3 - no vars', () => {
  const formatStr = '/api'
  const urlInstance = '/api'

  const hash = urlParser(formatStr, urlInstance)
  expect(hash).toStrictEqual({})
})
