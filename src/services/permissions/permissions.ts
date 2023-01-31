// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  permissionsDataValidator,
  permissionsPatchValidator,
  permissionsQueryValidator,
  permissionsResolver,
  permissionsExternalResolver,
  permissionsDataResolver,
  permissionsPatchResolver,
  permissionsQueryResolver
} from './permissions.schema'

import type { Application } from '../../declarations'
import { PermissionsService, getOptions } from './permissions.class'

export * from './permissions.class'
export * from './permissions.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const permissions = (app: Application) => {
  // Register our service on the Feathers application
  app.use('permissions', new PermissionsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service('permissions').hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(permissionsExternalResolver),
        schemaHooks.resolveResult(permissionsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(permissionsQueryValidator),
        schemaHooks.resolveQuery(permissionsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(permissionsDataValidator),
        schemaHooks.resolveData(permissionsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(permissionsPatchValidator),
        schemaHooks.resolveData(permissionsPatchResolver)
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
    permissions: PermissionsService
  }
}
