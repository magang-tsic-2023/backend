// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../declarations'

export const createdBy = async (context: HookContext) =>{
  return context.data.created_by = context.params.user.id
}

export const updatedBy = async (context: HookContext) =>{
  return context.data.updated_by = context.params.user.id
}

export const approvedBy = async (context: HookContext) =>{
  return context.data.approver_id = context.params.user.id
}