import type { Knex } from 'knex'
import { app } from '../src/app'

const dateNow = new Date().toISOString()

export const admin = {
  email: 'admin@local.local',
  password: '123123123'
}
export const user = {
  email: 'user@local.local',
  password: '123123123'
}

export const rolesList = [
  'Super Admin',
  'User',
  'Approver 1',
  'Approver 2',
  'Approver 3',
  'Approver 4',
  'Approver 5',
  'Approver 6',
  'Approver 7',
  'Approver 8',
  'Approver 9',
  'Approver 10'
]
export const docsTypeList = [
  'Dokumen 1',
  'Dokumen 2',
  'Dokumen 3',
  'Dokumen 4',
  'Dokumen 5',
  'Dokumen 6',
  'Dokumen 7',
  'Dokumen 8',
  'Dokumen 9',
  'Dokumen 10'
]
export const permissionDataDocs = [
  'Super Admin',
  'Uploader',
  'Approval Level 1',
  'Approval Level 2',
  'Approval Level 3'
]
export const permissionDataRoles = [
  'Edit Profile',
  'Delete Profile',
  'Upload Documents',
  'Edit Documents',
  'Delete Documents',
  'Add Role',
  'Edit Role',
  'Delete Role',
  'Add Permission',
  'Edit Permission',
  'Delete Permission'
]
export async function up(knex: Knex): Promise<void> {
  // // Add role Super Admin
  // for (let index = 1; index <= permissionDataRoles.length; index++) {
  //   await knex('roles_permissions').insert({ role_id: 0, permission_id: index })
  // }
  // // Add role User Biasa
  // for (let index = 1; index <= 3; index++) {
  //   await knex('roles_permissions').insert({ role_id: 1, permission_id: index })
  // }
  // for (let index = 1; index < permissionDataDocs.length; index++) {
  //   await knex('roles_docs_permissions').insert({ role_id: 0, permission_id: index })
  // }
  // // Add type Docs Dokumen 4 Approval
  // for (let i = 1; i < docsTypeList.length; i++) {
  //   for (let index = 1; index <= permissionDataDocs.length - 3; index++) {
  //     await knex('docs_types_permissions').insert({ doc_type_id: i, permission_id: index })
  //   }
  // }
  // await knex('users_roles').insert({ user_id: admin.uuid, role_id: 0 })
  // await knex('users_roles').insert({ user_id: user.uuid, role_id: 1 })
  //await knex('documents').insert({ id: "843438ee-69cb-493f-8812-71f0c7462f2f", no:2, date: dateNow, name:"Buku Java", type:2, url :"http://localhost", status:1, created_by: user.uuid, updated_by: user.uuid, created_at: dateNow, updated_at: dateNow })
}
export async function down(knex: Knex): Promise<void> {}
