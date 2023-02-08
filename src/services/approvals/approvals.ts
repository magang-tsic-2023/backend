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
import { getApprovalsbyLevel } from './approvals.hooks'
import { approvalsDataSchema, approvalsQuerySchema, approvalsSchema } from './approvals.schema'
import { createSwaggerServiceOptions } from 'feathers-swagger'

export * from './approvals.class'
export * from './approvals.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const approvals = (app: Application) => {
  // Register our service on the Feathers application
  app.use('approvals', new ApprovalsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'patch'],
    // You can add additional custom events to be sent to clients here
    events: [],
    docs: createSwaggerServiceOptions({
      schemas: { approvalsDataSchema, approvalsQuerySchema, approvalsSchema },
      docs: { description: 'My custom service description',
      securities: ['find', 'get', 'update', 'patch', 'remove'],
    }
    })
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
        //getUserIdentity
      ],
      find: [],
      get: [
        getApprovalsbyLevel
      ],
      create: [
        schemaHooks.validateData(approvalsDataValidator),
        schemaHooks.resolveData(approvalsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(approvalsPatchValidator),
        schemaHooks.resolveData(approvalsPatchResolver),
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
