// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { userSchema } from '../users/users.schema'

// Main data model schema
export const documentsSchema = Type.Object(
  {
    id: Type.String(),
    no: Type.String(),
    date: Type.Date(),
    name: Type.String(),
    url: Type.String(),
    status: Type.Integer(),
    created_by: Type.String(),
    updated_by: Type.String(),
    created_at: Type.Date(),
    updated_at: Type.Date()
  },
  { $id: 'Documents', additionalProperties: false }
)
export type Documents = Static<typeof documentsSchema>
export const documentsResolver = resolve<Documents, HookContext>({})

export const documentsExternalResolver = resolve<Documents, HookContext>({})

// Schema for creating new entries
export const documentsDataSchema = Type.Pick(documentsSchema, ['name', 'url'], {
  $id: 'DocumentsData'
})

export type DocumentsData = Static<typeof documentsDataSchema>
export const documentsDataValidator = getDataValidator(documentsDataSchema, dataValidator)
export const documentsDataResolver = resolve<Documents, HookContext>({
  status: async () => 0,
})

// Schema for updating existing entries
export const documentsPatchSchema = Type.Partial(documentsDataSchema, {
  $id: 'DocumentsPatch'
})
export type DocumentsPatch = Static<typeof documentsPatchSchema>
export const documentsPatchValidator = getDataValidator(documentsPatchSchema, dataValidator)
export const documentsPatchResolver = resolve<Documents, HookContext>({})

// Schema for allowed query properties
export const documentsQueryProperties = Type.Pick(documentsSchema, ['id', 'name', 'created_by', 'status'])
export const documentsQuerySchema = Type.Intersect(
  [
    querySyntax(documentsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type DocumentsQuery = Static<typeof documentsQuerySchema>
export const documentsQueryValidator = getValidator(documentsQuerySchema, queryValidator)
export const documentsQueryResolver = resolve<DocumentsQuery, HookContext>({
  // If there is a user (e.g. with authentication), they are only allowed to see their own data
  created_by: async (value, user, context) => {
    if(context.params.user.role==0){
      if (context.params.user) {
        return context.params.user.id
      }
      return value
    }
  },
  status: async (value, user, context) => {
    switch (context.params.user.role) {
      case 1:
        return 0;
      case 2:
        return 1;
      case 3:
        return 2;
      default:
        break;
    }
  }
})
