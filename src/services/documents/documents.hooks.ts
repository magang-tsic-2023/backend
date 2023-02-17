// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import { app } from '../../app'
import type { HookContext } from '../../declarations'

export const insertApprovalList = async (context: HookContext) => {
  // return await app
  //   .get('postgresqlClient')
  //   .select('docs_types_permissions.permission_id')
  //   .from('docs_types_permissions')
  //   .where('doc_type_id', '=', context.result.type)
  //   .then(function (results) {
  //     for (let index = 0; index < results.length; index++) {
  //       app
  //         .service('approvals')
  //         .create({ document_id: context.result.id, status: 0, level: results[index].permission_id })
  //     }
  //   })
  for (let index = 1; index <= context.result.type; index++) {
    app.service('approvals').create({ document_id: context.result.id, level: index }, context.params)
  }
}
