// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../../declarations'
import { app } from '../../app'
import { BadRequest } from '@feathersjs/errors/lib'

export const approvedBy = async (context: HookContext) => {
  console.log(context)
}

export const getApprovalsbyLevel = async (context: HookContext) => {
  const { user, query } = context.params
  if (!context.arguments[1]) {
    return
  }
  const approval = await app
    .service('approvals')
    .find({ query: { level: user.role - 1, document_id: context.arguments[1].document_id } })
  if (approval.data[0].status == 0 && user.role - 1 != 1 && user.role != 0) {
    throw new BadRequest(`Approvals level ${user.role - 1} not accepted`)
  }
  // const userPermissions = await app
  //   .get('postgresqlClient')
  //   .select('roles_docs_permissions.permission_id')
  //   .from('roles_docs_permissions')
  //   .where('roles_docs_permissions.role_id', '=', '0')
  //   .andWhereNot('roles_docs_permissions.permission_id', '=', '1')
  // let approvals = app.get('postgresqlClient').select('approvals.*').from('approvals')
  // for (let index = 0; index < userPermissions.length; index++) {
  //   approvals.orWhere('level', '=', userPermissions[index].permission_id)
  // }
  // console.log(approvals.toSQL().toNative())
  // console.log(await approvals.andWhereNot('level', '=', 1))
}
