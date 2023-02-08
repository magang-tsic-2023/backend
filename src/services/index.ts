import { applications } from './applications/applications'
import { docsTypes } from './docs-types/docs-types'
import { roles } from './roles/roles'
import { permissions } from './permissions/permissions'
import { groups } from './groups/groups'
import { profile } from './profile/profile'
import { approvals } from './approvals/approvals'
import { documents } from './documents/documents'
import { user } from './users/users'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(applications)
  app.configure(docsTypes)
  app.configure(roles)
  app.configure(permissions)
  app.configure(groups)
  app.configure(profile)
  app.configure(approvals)
  app.configure(documents)
  app.configure(user)
  // All services will be registered here
}
