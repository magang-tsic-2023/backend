// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { userSchema } from '../users/users.schema'
import { approvalsSchema } from '../approvals/approvals.schema'
import { docsTypesSchema } from '../docs-types/docs-types.schema'
import { app } from '../../app'

// Main data model schema
export const documentsSchema = Type.Object(
  {
    id: Type.String(),
    no: Type.String(),
    date: Type.String(),
    name: Type.String(),
    url: Type.String(),
    type: Type.Integer(),
    approvalsList: Type.Array(approvalsSchema),
    status: Type.Integer(),
    created_by: Type.String(),
    updated_by: Type.String(),
    created_at: Type.String(),
    updated_at: Type.String()
  },
  { $id: 'Documents', additionalProperties: false }
)

// const approvalsListsQuery = app.service('approvals').find({query:{document_id:context.documents.id},paginate: false}).then((approvalsLists)=>{
// })
export type Documents = Static<typeof documentsSchema>
export const documentsResolver = resolve<Documents, HookContext>({})

export const documentsExternalResolver = resolve<Documents, HookContext>({
  approvalsList: async(value, document, context:HookContext) => {
    console.log(context.params)
    return (await app.service('approvals').find({query:{document_id: document.id},paginate: false}))
  } 
})

// Schema for creating new entries
export const documentsDataSchema = Type.Pick(documentsSchema, ['name', 'url', 'type'], {
  $id: 'DocumentsData'
})

export type DocumentsData = Static<typeof documentsDataSchema>
export const documentsDataValidator = getDataValidator(documentsDataSchema, dataValidator)
const dateNow = new Date().toISOString()
export const documentsDataResolver = resolve<Documents, HookContext>({
  date: async () => dateNow,
  status: async () => 0,
  created_at: async () => dateNow,
  updated_at: async () => dateNow,
  created_by: async (_value, _documents, context: HookContext) => context.params.user.id,
  updated_by: async (_value, _documents, context: HookContext) => context.params.user.id,
})

// Schema for updating existing entries
export const documentsPatchSchema = Type.Partial(documentsDataSchema, {
  $id: 'DocumentsPatch'
})
export type DocumentsPatch = Static<typeof documentsPatchSchema>
export const documentsPatchValidator = getDataValidator(documentsPatchSchema, dataValidator)
export const documentsPatchResolver = resolve<Documents, HookContext>({
  updated_by: async (_value, _document, context:HookContext) => context.params.user.id,
  updated_at: async () => dateNow
})

// Schema for allowed query properties
export const documentsQueryProperties = Type.Pick(documentsSchema, ['id', 'name', 'created_by', 'status'])
export const documentsQuerySchema = Type.Intersect(
  [
    querySyntax(documentsQueryProperties),
    // Add additional query properties here
    Type.Object({
      // 'doc_types_name': Type.Integer(),
    }, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type DocumentsQuery = Static<typeof documentsQuerySchema>
export const documentsQueryValidator = getValidator(documentsQuerySchema, queryValidator)
export const documentsQueryResolver = resolve<DocumentsQuery, HookContext>({

  // Created by = User ID, user hanya bisa melihat dokumen yang diuploadnya sendiri
  // Role = 0, user biasa
  // created_by: async (value, role, context) => {
  //   if (context.params.roles.role == 0) {
  //     if (context.params.user) {
  //       return context.params.user.id
  //     }
  //     return value
  //   }
  // },

  // status: async (value, user, context) => {
  //   switch (context.params.user.role) {
  //     case 1:
  //       return 0
  //     case 2:
  //       return 1
  //     case 3:
  //       return 2
  //     default:
  //       break
  //   }
  // }
})
