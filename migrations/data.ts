import type { Knex } from 'knex'

const dateNow = new Date().toISOString()

export const admin = {
  uuid: '843438ee-69cb-493f-8812-71f0c7462f2f',
  email: 'admin@local.local',
  password: '$2a$10$mTqwtSwMjBimY8zdU6sloeJ7A7RGTRCnVxUCxTmyb68L3jUpG5Mdi',
  full_name: 'Super Admin'
}
export const user = {
  uuid: '09caabcf-a4a4-483e-9d60-9912c49a7d76',
  email: 'user@local.local',
  password: '$2a$10$mTqwtSwMjBimY8zdU6sloeJ7A7RGTRCnVxUCxTmyb68L3jUpG5Mdi',
  full_name: 'Users'
}

export const roleAdmin = {
  user_id: '843438ee-69cb-493f-8812-71f0c7462f2f',
  role: 0
}

export const roleUser = {
  user_id: '09caabcf-a4a4-483e-9d60-9912c49a7d76',
  role: 1
}

export const rolesList = ['Super Admin', 'Users', 'Approver 1', 'Approver 2']
export const docsTypeList = ['Dokumen 1', 'Dokumen 2']
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
  await knex('users').insert({ id: admin.uuid, email: admin.email, password:admin.password, full_name:admin.full_name, created_at: dateNow, updated_at: dateNow })
  await knex('users').insert({ id: user.uuid, email: user.email, password:user.password, full_name:user.full_name, created_at: dateNow, updated_at: dateNow })

  permissionDataDocs.forEach(async (item, index) => {
    await knex('docs_permissions').insert({ id: index, permission_name: item })
  })
  rolesList.forEach(async (item, index) => {
    await knex('roles').insert({ id: index, role_name: item })
  })
  docsTypeList.forEach(async (item, index) => {
    await knex('docs_types').insert({ id: index + 1, docs_type_name: item })
  })
  permissionDataRoles.forEach(async (item, index) => {
    await knex('permissions').insert({ id: index + 1, permission_name: item })
  })

  // Add role Super Admin
  for (let index = 1; index <= permissionDataRoles.length; index++) {
    await knex('roles_permissions').insert({ role_id: 0, permission_id: index })
  }
  // Add role User Biasa
  for (let index = 1; index <= 3; index++) {
    await knex('roles_permissions').insert({ role_id: 1, permission_id: index })
  }

  for (let index = 1; index < permissionDataDocs.length; index++) {
    await knex('roles_docs_permissions').insert({ role_id: 0, permission_id: index })
  }
  // Add type Docs Dokumen 4 Approval
  for (let i = 1; i < docsTypeList.length; i++) {
    for (let index = 1; index <= permissionDataDocs.length - 3; index++) {
      await knex('docs_types_permissions').insert({ doc_type_id: i, permission_id: index })
    }
  }
  await knex('users_roles').insert({ user_id: admin.uuid, role_id: 0})
  await knex('users_roles').insert({ user_id: user.uuid, role_id: 1})
}
export async function down(knex: Knex): Promise<void> {}
