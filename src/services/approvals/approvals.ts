// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  approvalsDataValidator,
  approvalsPatchValidator,
  approvalsQueryValidator,
  approvalsResolver,
  approvalsExternalResolver,
  approvalsDataResolver,
  approvalsPatchResolver,
  approvalsQueryResolver
} from './approvals.schema'

import type { Application } from '../../declarations'
import { ApprovalsService, getOptions } from './approvals.class'
import { createNow, updateNow } from '../../hooks/time-stamp'
import { approvedBy } from '../../hooks/user-stamp'
import { getUserIdentity } from '../../hooks/user'

export * from './approvals.class'
export * from './approvals.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const approvals = (app: Application) => {
  // Register our service on the Feathers application
  app.use('approvals', new ApprovalsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service('approvals').hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(approvalsExternalResolver),
        schemaHooks.resolveResult(approvalsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(approvalsQueryValidator),
        schemaHooks.resolveQuery(approvalsQueryResolver),
        getUserIdentity
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(approvalsDataValidator),
        schemaHooks.resolveData(approvalsDataResolver),
        approvedBy,
        createNow,
        updateNow
      ],
      patch: [
        schemaHooks.validateData(approvalsPatchValidator),
        schemaHooks.resolveData(approvalsPatchResolver),
        updateNow
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    approvals: ApprovalsService
  }
}
