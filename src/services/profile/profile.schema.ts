// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const profileSchema = Type.Object(
  {
    id: Type.String(),
    full_name: Type.String(),
    department: Type.String(),
    position: Type.String(),
    updated_at: Type.String()
  },
  { $id: 'Profile', additionalProperties: false }
)
export type Profile = Static<typeof profileSchema>
export const profileResolver = resolve<Profile, HookContext>({})

export const profileExternalResolver = resolve<Profile, HookContext>({})

// Schema for creating new entries
export const profileDataSchema = Type.Pick(profileSchema, ['id'], {
  $id: 'ProfileData',
  additionalProperties: false
})
export type ProfileData = Static<typeof profileDataSchema>
export const profileDataValidator = getDataValidator(profileDataSchema, dataValidator)
const dateNow = new Date().toISOString()
export const profileDataResolver = resolve<Profile, HookContext>({
  full_name: async () => 'User',
  department: async () => '-',
  position: async () => '-',
  updated_at: async () => dateNow
})

// Schema for updating existing entries
export const profileDataPatchSchema = Type.Pick(profileSchema, ['full_name', 'department', 'position'], {
  $id: 'ProfileData'
})
export const profilePatchSchema = Type.Partial(profileDataPatchSchema, {
  $id: 'ProfilePatch'
})
export type ProfilePatch = Static<typeof profilePatchSchema>
export const profilePatchValidator = getDataValidator(profilePatchSchema, dataValidator)
export const profilePatchResolver = resolve<Profile, HookContext>({})

// Schema for allowed query properties
export const profileQueryProperties = Type.Pick(profileSchema, ['id', 'department', 'position'])
export const profileQuerySchema = Type.Intersect(
  [
    querySyntax(profileQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ProfileQuery = Static<typeof profileQuerySchema>
export const profileQueryValidator = getValidator(profileQuerySchema, queryValidator)
export const profileQueryResolver = resolve<ProfileQuery, HookContext>({
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
