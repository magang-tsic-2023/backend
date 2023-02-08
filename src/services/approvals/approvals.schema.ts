// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

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
    updated_at: Type.String(),
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
export const approvalsDataSchema = Type.Pick(approvalsSchema, ['document_id', 'status', 'level'], {
  $id: 'ApprovalsData'
})
export type ApprovalsData = Static<typeof approvalsDataSchema>
export const approvalsDataValidator = getDataValidator(approvalsDataSchema, dataValidator)
const dateNow = new Date().toISOString()
export const approvalsDataResolver = resolve<Approvals, HookContext>({
  created_at: async () => dateNow,
  updated_at: async () => dateNow
})

// Schema for updating existing entries
export const approvalsPatchSchema = Type.Pick(approvalsDataSchema, ['status'], {
  $id: 'ApprovalsPatch'
})
export type ApprovalsPatch = Static<typeof approvalsPatchSchema>
export const approvalsPatchValidator = getDataValidator(approvalsPatchSchema, dataValidator)
export const approvalsPatchResolver = resolve<Approvals, HookContext>({
  approver_id: async (_value, _document, context:HookContext) => context.params.user.id,
  updated_at: async () => dateNow
})

// Schema for allowed query properties
export const approvalsQueryProperties = Type.Pick(approvalsSchema, [
  'id',
  'document_id',
  'approver_id',
  'status'
])
export const approvalsQuerySchema = Type.Intersect(
  [querySyntax(approvalsQueryProperties), Type.Object({}, { additionalProperties: false })],
  { additionalProperties: false }
)
export type ApprovalsQuery = Static<typeof approvalsQuerySchema>
export const approvalsQueryValidator = getValidator(approvalsQuerySchema, queryValidator)
export const approvalsQueryResolver = resolve<ApprovalsQuery, HookContext>({
})
