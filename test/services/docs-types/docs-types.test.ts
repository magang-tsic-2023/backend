// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../src/app'

export const docsTypeList = [
  'Dokumen 1',
  'Dokumen 2',
  'Dokumen 3',
  'Dokumen 4',
  'Dokumen 5',
  'Dokumen 6',
  'Dokumen 7',
  'Dokumen 8',
  'Dokumen 9',
  'Dokumen 10'
]

describe('docs-types service', () => {
  it('registered the service', () => {
    const service = app.service('docs-types')

    assert.ok(service, 'Registered the service')
  })
  docsTypeList.forEach(async (item, index) => {
    it(`create roles ${docsTypeList[index]}`, () => {
      const roles = app.service('docs-types').create({ name: item })
      assert.ok(roles, `create roles ${item}`)
    })
  })
})
