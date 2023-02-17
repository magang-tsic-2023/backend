// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const rolesSchema = Type.Object(
  {
    id: Type.Integer(),
    name: Type.String()
  },
  { $id: 'Roles', additionalProperties: false }
)
export type Roles = Static<typeof rolesSchema>
export const rolesResolver = resolve<Roles, HookContext>({})

export const rolesExternalResolver = resolve<Roles, HookContext>({})

// Schema for creating new entries
export const rolesDataSchema = Type.Pick(rolesSchema, ['name'], {
  $id: 'RolesData'
})
export type RolesData = Static<typeof rolesDataSchema>
export const rolesDataValidator = getDataValidator(rolesDataSchema, dataValidator)
export const rolesDataResolver = resolve<Roles, HookContext>({})

// Schema for updating existing entries
export const rolesPatchSchema = Type.Partial(rolesDataSchema, {
  $id: 'RolesPatch'
})
export type RolesPatch = Static<typeof rolesPatchSchema>
export const rolesPatchValidator = getDataValidator(rolesPatchSchema, dataValidator)
export const rolesPatchResolver = resolve<Roles, HookContext>({})

// Schema for allowed query properties
export const rolesQueryProperties = Type.Pick(rolesSchema, ['id', 'name'])
export const rolesQuerySchema = Type.Intersect(
  [
    querySyntax(rolesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type RolesQuery = Static<typeof rolesQuerySchema>
export const rolesQueryValidator = getValidator(rolesQuerySchema, queryValidator)
export const rolesQueryResolver = resolve<RolesQuery, HookContext>({})
