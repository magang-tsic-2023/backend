// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../src/app'

export const rolesList = [
  'User',
  'Approver 1',
  'Approver 2',
  'Approver 3',
  'Approver 4',
  'Approver 5',
  'Approver 6',
  'Approver 7',
  'Approver 8',
  'Approver 9',
  'Approver 10'
]

describe('roles service', () => {
  it('registered the service', () => {
    const service = app.service('roles')

    assert.ok(service, 'Registered the service')
  })

  rolesList.forEach(async (item, index) => {
    it(`create roles ${item}`, () => {
      const roles = app.service('roles').create({ name: item })
      assert.ok(roles, `create roles ${item}`)
    })
  })
})
