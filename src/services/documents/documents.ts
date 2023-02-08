// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  documentsDataValidator,
  documentsPatchValidator,
  documentsQueryValidator,
  documentsResolver,
  documentsExternalResolver,
  documentsDataResolver,
  documentsPatchResolver,
  documentsQueryResolver
} from './documents.schema'

import type { Application } from '../../declarations'
import { DocumentsService, getOptions } from './documents.class'
import { getApprovalList, insertApprovalList } from './documents.hooks'
import { createSwaggerServiceOptions } from 'feathers-swagger'
import { documentsDataSchema, documentsQuerySchema, documentsSchema } from './documents.schema'

export * from './documents.class'
export * from './documents.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const documents = (app: Application) => {
  // Register our service on the Feathers application
  app.use('documents', new DocumentsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: [],
    docs: createSwaggerServiceOptions({
      schemas: { documentsDataSchema, documentsQuerySchema, documentsSchema },
      docs: { description: 'My custom service description',
      securities: ['find', 'get', 'create', 'patch', 'remove'],
    }
    })
  })
  // Initialize hooks
  app.service('documents').hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(documentsExternalResolver),
        schemaHooks.resolveResult(documentsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(documentsQueryValidator),
        schemaHooks.resolveQuery(documentsQueryResolver),
      ],
      find: [schemaHooks.validateData(documentsDataValidator),
        schemaHooks.resolveData(documentsDataResolver),
        //getApprovalList,
      ],
      get: [
        schemaHooks.validateData(documentsDataValidator),
        schemaHooks.resolveData(documentsDataResolver)
      ],
      create: [
        schemaHooks.validateData(documentsDataValidator),
        schemaHooks.resolveData(documentsDataResolver),
      ],
      patch: [
        schemaHooks.validateData(documentsPatchValidator),
        schemaHooks.resolveData(documentsPatchResolver)
      ],
      remove: []
    },
    after: {
      all: [],
      create:[insertApprovalList]
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    documents: DocumentsService
  }
}
