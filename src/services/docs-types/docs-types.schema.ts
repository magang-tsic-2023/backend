// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const docsTypesSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String()
  },
  { $id: 'DocsTypes', additionalProperties: false }
)
export type DocsTypes = Static<typeof docsTypesSchema>
export const docsTypesResolver = resolve<DocsTypes, HookContext>({})

export const docsTypesExternalResolver = resolve<DocsTypes, HookContext>({})

// Schema for creating new entries
export const docsTypesDataSchema = Type.Pick(docsTypesSchema, ['name'], {
  $id: 'DocsTypesData'
})
export type DocsTypesData = Static<typeof docsTypesDataSchema>
export const docsTypesDataValidator = getDataValidator(docsTypesDataSchema, dataValidator)
export const docsTypesDataResolver = resolve<DocsTypes, HookContext>({})

// Schema for updating existing entries
export const docsTypesPatchSchema = Type.Partial(docsTypesDataSchema, {
  $id: 'DocsTypesPatch'
})
export type DocsTypesPatch = Static<typeof docsTypesPatchSchema>
export const docsTypesPatchValidator = getDataValidator(docsTypesPatchSchema, dataValidator)
export const docsTypesPatchResolver = resolve<DocsTypes, HookContext>({})

// Schema for allowed query properties
export const docsTypesQueryProperties = Type.Pick(docsTypesSchema, ['id', 'name'])
export const docsTypesQuerySchema = Type.Intersect(
  [
    querySyntax(docsTypesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type DocsTypesQuery = Static<typeof docsTypesQuerySchema>
export const docsTypesQueryValidator = getValidator(docsTypesQuerySchema, queryValidator)
export const docsTypesQueryResolver = resolve<DocsTypesQuery, HookContext>({})
