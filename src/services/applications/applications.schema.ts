// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const applicationsSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Applications', additionalProperties: false }
)
export type Applications = Static<typeof applicationsSchema>
export const applicationsResolver = resolve<Applications, HookContext>({})

export const applicationsExternalResolver = resolve<Applications, HookContext>({})

// Schema for creating new entries
export const applicationsDataSchema = Type.Pick(applicationsSchema, ['text'], {
  $id: 'ApplicationsData'
})
export type ApplicationsData = Static<typeof applicationsDataSchema>
export const applicationsDataValidator = getDataValidator(applicationsDataSchema, dataValidator)
export const applicationsDataResolver = resolve<Applications, HookContext>({})

// Schema for updating existing entries
export const applicationsPatchSchema = Type.Partial(applicationsDataSchema, {
  $id: 'ApplicationsPatch'
})
export type ApplicationsPatch = Static<typeof applicationsPatchSchema>
export const applicationsPatchValidator = getDataValidator(applicationsPatchSchema, dataValidator)
export const applicationsPatchResolver = resolve<Applications, HookContext>({})

// Schema for allowed query properties
export const applicationsQueryProperties = Type.Pick(applicationsSchema, ['id', 'text'])
export const applicationsQuerySchema = Type.Intersect(
  [
    querySyntax(applicationsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ApplicationsQuery = Static<typeof applicationsQuerySchema>
export const applicationsQueryValidator = getValidator(applicationsQuerySchema, queryValidator)
export const applicationsQueryResolver = resolve<ApplicationsQuery, HookContext>({})
