// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../declarations'

const dateNow = new Date().toISOString();
export const createNow = async (context: HookContext) =>{
  return context.data.created_at = dateNow;
}

export const docDate = async (context: HookContext) =>{
  return context.data.date = dateNow;
}

export const updateNow = async (context: HookContext)=>{
  return context.data.updated_at = dateNow;
}
