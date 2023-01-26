// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../declarations'

export const user = async (context: HookContext) => {
  console.log(`Running hook user on ${context.path}.${context.method}`)
}
export const getUserIdentity = async (context: HookContext) => {
  const query = context.service.createQuery({ query: context.params.query })
  query
    .column('users.full_name as approver_name')
    .from('approvals')
    .leftJoin('users', 'users.id', '=', 'approvals.approver_id')

  context.params.knex = query
  console.log(query.toSQL().toNative())
  return context
}
