// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../src/app'
import { rolesList } from '../roles/roles.test'
import { docsTypeList } from '../docs-types/docs-types.test'

export const admin = {
  email: 'admin@local.local',
  password: '123123123'
}
export const user = {
  email: 'user@local.local',
  password: '123123123'
}

describe('users service', () => {
  it('registered the service', () => {
    const service = app.service('users')

    assert.ok(service, 'Registered the service')
  })

  it('create super admin', () => {
    const superadmin = app
      .service('users')
      .create({ email: admin.email, password: admin.password })
      .then(async (results) => {
        app.service('profile').patch(results.id, { full_name: 'Admin' })
        const roles = (await app.service('roles').find({ query: { name: 'Super Admin' } })).data[0]
        console.log(roles)
        app.service('users').patch(results.id, { role: roles.id })
      })
    assert.ok(superadmin, 'Success Created Super Admin')
  })

  it('create user with the documents', () => {
    const userResult = app
      .service('users')
      .create({ email: user.email, password: user.password })
      .then((results) => {
        app.service('profile').patch(results.id, { full_name: 'Users' })
        app
          .service('roles')
          .find({ query: { name: 'User' } })
          .then((roles) => {
            app.service('users').patch(results.id, { role: roles.data[0].id })
            // docsTypeList.forEach((item, index) => {
            //   app
            //     .service('docs-types')
            //     .find({ query: { name: item } })
            //     .then((types) => {
            //       app
            //         .service('documents')
            //         .create({ name: `Contoh ${docsTypeList[index]}`, url: 'http://example', type: types.data[0].id})
            //     })
            // })
          })
      })
    assert.ok(userResult, 'Success Created Super Admin')
  })

  rolesList.shift()
  rolesList.forEach((item, index) => {
    it(`create ${item}`, async () => {
      console.log(index)
      const approvers = app
        .service('users')
        .create({ email: `${index + 1}@approver.local`, password: `123123123` })
        .then((results) => {
          app.service('profile').patch(results.id, { full_name: item })
          app
            .service('roles')
            .find({ query: { name: item } })
            .then((roles) => {
              app.service('users').patch(results.id, { role: roles.data[0].id })
            })
        })
      assert.ok(approvers, `Success Created ${item}`)
    })
  })
})
