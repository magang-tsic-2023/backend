// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const permissionsSchema = Type.Object(
  {
    id: Type.Number(),
    permission_name: Type.String()
  },
  { $id: 'Permissions', additionalProperties: false }
)
export type Permissions = Static<typeof permissionsSchema>
export const permissionsResolver = resolve<Permissions, HookContext>({})

export const permissionsExternalResolver = resolve<Permissions, HookContext>({})

// Schema for creating new entries
export const permissionsDataSchema = Type.Pick(permissionsSchema, ['permission_name'], {
  $id: 'PermissionsData'
})
export type PermissionsData = Static<typeof permissionsDataSchema>
export const permissionsDataValidator = getDataValidator(permissionsDataSchema, dataValidator)
export const permissionsDataResolver = resolve<Permissions, HookContext>({})

// Schema for updating existing entries
export const permissionsPatchSchema = Type.Partial(permissionsDataSchema, {
  $id: 'PermissionsPatch'
})
export type PermissionsPatch = Static<typeof permissionsPatchSchema>
export const permissionsPatchValidator = getDataValidator(permissionsPatchSchema, dataValidator)
export const permissionsPatchResolver = resolve<Permissions, HookContext>({})

// Schema for allowed query properties
export const permissionsQueryProperties = Type.Pick(permissionsSchema, ['id', 'permission_name'])
export const permissionsQuerySchema = Type.Intersect(
  [
    querySyntax(permissionsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type PermissionsQuery = Static<typeof permissionsQuerySchema>
export const permissionsQueryValidator = getValidator(permissionsQuerySchema, queryValidator)
export const permissionsQueryResolver = resolve<PermissionsQuery, HookContext>({})
