// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  docsTypesDataValidator,
  docsTypesPatchValidator,
  docsTypesQueryValidator,
  docsTypesResolver,
  docsTypesExternalResolver,
  docsTypesDataResolver,
  docsTypesPatchResolver,
  docsTypesQueryResolver
} from './docs-types.schema'

import type { Application } from '../../declarations'
import { DocsTypesService, getOptions } from './docs-types.class'

export * from './docs-types.class'
export * from './docs-types.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const docsTypes = (app: Application) => {
  // Register our service on the Feathers application
  app.use('docs-types', new DocsTypesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service('docs-types').hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(docsTypesExternalResolver),
        schemaHooks.resolveResult(docsTypesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(docsTypesQueryValidator),
        schemaHooks.resolveQuery(docsTypesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(docsTypesDataValidator),
        schemaHooks.resolveData(docsTypesDataResolver)
      ],
      patch: [
        schemaHooks.validateData(docsTypesPatchValidator),
        schemaHooks.resolveData(docsTypesPatchResolver)
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
    'docs-types': DocsTypesService
  }
}
