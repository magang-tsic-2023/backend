// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  applicationsDataValidator,
  applicationsPatchValidator,
  applicationsQueryValidator,
  applicationsResolver,
  applicationsExternalResolver,
  applicationsDataResolver,
  applicationsPatchResolver,
  applicationsQueryResolver
} from './applications.schema'

import type { Application } from '../../declarations'
import { ApplicationsService, getOptions } from './applications.class'

export * from './applications.class'
export * from './applications.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const applications = (app: Application) => {
  // Register our service on the Feathers application
  app.use('applications', new ApplicationsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service('applications').hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(applicationsExternalResolver),
        schemaHooks.resolveResult(applicationsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(applicationsQueryValidator),
        schemaHooks.resolveQuery(applicationsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(applicationsDataValidator),
        schemaHooks.resolveData(applicationsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(applicationsPatchValidator),
        schemaHooks.resolveData(applicationsPatchResolver)
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
    applications: ApplicationsService
  }
}
