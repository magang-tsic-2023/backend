// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import checkPermissions from 'feathers-permissions/types'
import type { HookContext } from '../../declarations'
import { app } from '../../app'


export const approvedBy = async (context: HookContext) => {
  console.log(context.params.user)
  return (context.data.approver_id = context.params.user.id)
}

export const getApprovalsbyLevel = async (context: HookContext) => {
  const userPermissions = await app.get('postgresqlClient')
  .select('roles_docs_permissions.permission_id')
  .from('roles_docs_permissions')
  .where('roles_docs_permissions.role_id', '=', '0')
  .andWhereNot('roles_docs_permissions.permission_id', '=', '1')

  console.log(userPermissions)
  let approvals = app.get('postgresqlClient')
  .select('approvals.*')
  .from('approvals')
  for (let index = 0; index < userPermissions.length; index++) {
    approvals.orWhere('level', '=', userPermissions[index].permission_id)
  }
  console.log(approvals.toSQL().toNative())
  console.log(await approvals.andWhereNot('level','=', 1))
}
