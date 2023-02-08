// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import { app } from '../../app'
import type { HookContext } from '../../declarations'

const dateNow = new Date().toISOString()

export const insertApprovalList = async (context: HookContext) => {
  return await app.get('postgresqlClient').select('docs_types_permissions.permission_id').from('docs_types_permissions').where('doc_type_id','=',context.result.type).then(function(results){
    for (let index = 0; index < results.length; index++) {
      app.service('approvals').create({document_id: context.result.id, status:1, level:results[index].permission_id})
    }
  })
}

export const getApprovalList = async (context: HookContext) => {
  console.log(context.params.query.id)
  console.log(context.data)
  return (context.data.approvalsList = await app.service('approvals').find({query:{document_id: context.params.query.id},paginate: false}))
}

