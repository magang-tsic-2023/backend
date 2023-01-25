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
    status: Type.Integer(),
    note: Type.String(),
  },
  { $id: 'Approvals', additionalProperties: false }
)
export type Approvals = Static<typeof approvalsSchema>
export const approvalsResolver = resolve<Approvals, HookContext>({})

export const approvalsExternalResolver = resolve<Approvals, HookContext>({})

// Schema for creating new entries
export const approvalsDataSchema = Type.Pick(approvalsSchema, ['document_id', 'status'], {
  $id: 'ApprovalsData'
})
export type ApprovalsData = Static<typeof approvalsDataSchema>
export const approvalsDataValidator = getDataValidator(approvalsDataSchema, dataValidator)
export const approvalsDataResolver = resolve<Approvals, HookContext>({})

// Schema for updating existing entries
export const approvalsPatchSchema = Type.Partial(approvalsDataSchema, {
  $id: 'ApprovalsPatch'
})
export type ApprovalsPatch = Static<typeof approvalsPatchSchema>
export const approvalsPatchValidator = getDataValidator(approvalsPatchSchema, dataValidator)
export const approvalsPatchResolver = resolve<Approvals, HookContext>({})

// Schema for allowed query properties
export const approvalsQueryProperties = Type.Pick(approvalsSchema, ['document_id', 'approver_id'])
export const approvalsQuerySchema = Type.Intersect(
  [
    querySyntax(approvalsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ApprovalsQuery = Static<typeof approvalsQuerySchema>
export const approvalsQueryValidator = getValidator(approvalsQuerySchema, queryValidator)
export const approvalsQueryResolver = resolve<ApprovalsQuery, HookContext>({})
