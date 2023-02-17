// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import { app } from '../app'
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

// export const giveUserRole = async (context: HookContext) =>{
//   context.data.roles = []
//   await app
//       .get('postgresqlClient')
//       .select('users_roles.role_id')
//       .from('users_roles')
//       .where('users_roles.user_id', '=', authResult.user.id)
//       .then(function (results) {
//         for (const index in results) {
//           context.data.roles.push(results[index].role_id)
//         }
//       }).catch((err)=>console.log(err))
//   return context.data.roles
// }

export const getUserRole = async (context: HookContext) => {
  const roles = []
  const { user } = context.params
  for (const index in user.roles) {
    const role = await app.service('roles').find({
      query: {
        id: user.roles[index]
      }
    })
    roles.push(role)
  }
  return (context.data.roles = roles)
}
