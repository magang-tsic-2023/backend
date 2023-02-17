// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'
import { passwordHash } from '@feathersjs/authentication-local'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { app } from '../../app'
import { rolesSchema } from '../roles/roles.schema'
import { randomUUID } from 'crypto'
import { profileSchema } from '../profile/profile.schema'
import { profile } from 'console'

// Main data model schema
export const userSchema = Type.Object(
  {
    id: Type.String(),
    email: Type.String(),
    password: Type.Optional(Type.String()),
    role: Type.Integer(),
    profile: profileSchema,
    created_at: Type.String(),
    updated_at: Type.String()
  },
  { $id: 'User', additionalProperties: true }
)
export type User = Static<typeof userSchema>
export const userResolver = resolve<User, HookContext>({})

export const userExternalResolver = resolve<User, HookContext>({
  password: async () => undefined,
  profile: async (_value, user, _context) => {
    return await app.service('profile').get(user.id)
  }
  // roles: async (_value, user, _context: HookContext) => {
  //   return (await app.service('roles').get(user.roles).id
  // }
  // roles: async (_value, user, _context) => {
  //   const roles: any[] = []
  //   await app
  //     .get('postgresqlClient')
  //     .select('role_id')
  //     .from('users_roles')
  //     .where('user_id', '=', user.id)
  //     .then((results) => {
  //       for (let index = 0; index < results.length; index++) {
  //         roles.push(results[index].role_id)
  //       }
  //     })
  //   return roles
  // }
})

// Schema for creating new users
export const userDataSchema = Type.Pick(userSchema, ['email', 'password'], {
  $id: 'UserData',
  additionalProperties: false
})
export type UserData = Static<typeof userDataSchema>

export const userDataValidator = getDataValidator(userDataSchema, dataValidator)
const dateNow = new Date().toISOString()
export const userDataResolver = resolve<User, HookContext>({
  id: async () => randomUUID(),
  password: passwordHash({ strategy: 'local' }),
  role: async () => 1,
  created_at: async () => dateNow,
  updated_at: async () => dateNow
})

// Schema for updating existing users
export const userDataPatchSchema = Type.Pick(userSchema, ['email', 'role'], {
  $id: 'UserData',
  additionalProperties: false
})

export const userPatchSchema = Type.Partial(userDataPatchSchema, {
  $id: 'UserPatch'
})

export type UserPatch = Static<typeof userPatchSchema>
export const userPatchValidator = getDataValidator(userPatchSchema, dataValidator)
export const userPatchResolver = resolve<User, HookContext>({
  password: passwordHash({ strategy: 'local' })
})

// Schema for allowed query properties
export const userQueryProperties = Type.Pick(userSchema, ['id', 'email'])
export const userQuerySchema = Type.Intersect(
  [querySyntax(userQueryProperties), Type.Object({}, { additionalProperties: false })],
  { additionalProperties: false }
)
export type UserQuery = Static<typeof userQuerySchema>
export const userQueryValidator = getValidator(userQuerySchema, queryValidator)
export const userQueryResolver = resolve<UserQuery, HookContext>({
  // If there is a user (e.g. with authentication), they are only allowed to see their own data
  id: async (value, _user, context) => {
    if (context.params.user) {
      if (context.params.user.role == 0) {
        return value
      }
      return context.params.user.id
    }
    return value
  }
})
