import { profile } from './profile/profile'
import { approvals } from './approvals/approvals'
import { documents } from './documents/documents'
import { user } from './users/users'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(profile)
  app.configure(approvals)
  app.configure(documents)
  app.configure(user)
  // All services will be registered here
}
