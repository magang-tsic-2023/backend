// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { randomUUID } from 'crypto'

// Main data model schema
export const approvalsSchema = Type.Object(
  {
    id: Type.String(),
    document_id: Type.String(),
    approver_id: Type.String(),
    level: Type.Integer(),
    status: Type.Integer(),
    note: Type.String(),
    created_at: Type.String(),
    updated_at: Type.String()
  },
  { $id: 'Approvals', additionalProperties: false }
)

export type Approvals = Static<typeof approvalsSchema>
export const approvalsResolver = resolve<Approvals, HookContext>({})

export const approvalsExternalResolver = resolve<Approvals, HookContext>({
  approver_id: async () => undefined,
  document_id: async () => undefined
})

// Schema for creating new entries
export const approvalsDataSchema = Type.Pick(approvalsSchema, ['document_id', 'level'], {
  $id: 'ApprovalsData',
  additionalProperties: false
})
export type ApprovalsData = Static<typeof approvalsDataSchema>
export const approvalsDataValidator = getDataValidator(approvalsDataSchema, dataValidator)
const dateNow = new Date().toISOString()
export const approvalsDataResolver = resolve<Approvals, HookContext>({
  id: async () => randomUUID(),
  status: async () => 0,
  created_at: async () => dateNow,
  updated_at: async () => dateNow
})

// Schema for updating existing entries
export const approvalsDataPatchSchema = Type.Pick(approvalsSchema, ['document_id', 'status'], {
  $id: 'ApprovalsPatch',
  additionalProperties: false
})

export const approvalsPatchSchema = Type.Partial(approvalsDataPatchSchema, {
  $id: 'ApprovalsPatch',
  additionalProperties: false
})

export type ApprovalsPatch = Static<typeof approvalsPatchSchema>
export const approvalsPatchValidator = getDataValidator(approvalsPatchSchema, dataValidator)

export const approvalsPatchResolver = resolve<Approvals, HookContext>({
  approver_id: async (_value, _approvals, context) => {
    if (context.params.user) {
      return context.params.user.id
    }
  },
  updated_at: async () => dateNow
})

// Schema for allowed query properties
export const approvalsQueryProperties = Type.Pick(approvalsSchema, [
  'id',
  'document_id',
  'approver_id',
  'level',
  'status'
])
export const approvalsQuerySchema = Type.Intersect(
  [querySyntax(approvalsQueryProperties), Type.Object({}, { additionalProperties: false })],
  { additionalProperties: false }
)
export type ApprovalsQuery = Static<typeof approvalsQuerySchema>
export const approvalsQueryValidator = getValidator(approvalsQuerySchema, queryValidator)
export const approvalsQueryResolver = resolve<ApprovalsQuery, HookContext>({
  $or: async (value, approvals, context) => {
    if (context.params.user) {
      if (context.params.user.role == 0) {
        return []
      }
      if (context.params.user.role != 1) {
        return [
          {
            approver_id: context.params.user.id
          },
          {
            level: {
              $lt: context.params.user.role
            }
          }
        ]
      }
    }
  },

  $and: async (value, approvals, context) => {
    if (context.params.user) {
      if (context.params.user.role == 1) {
        return [
          {
            approver_id: context.params.user.id
          },
          {
            level: {
              $lt: context.params.user.role
            }
          }
        ]
      }
      return []
    }
  }
  // // approver_id: async (value, _approvals, context) => {

  // //   console.log(context.params)
  // //   if (context.params.user.role = 1){
  // //     return context.params.user.id
  // //   }
  // //   return value
  // // },
  // // level: async(value, approvals, context: HookContext) => {
  // //   if(context.params.user.role < approvals.level!){
  // //     return 0
  // //   }
  // //   return value
  // // }
})
