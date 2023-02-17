// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  rolesDataValidator,
  rolesPatchValidator,
  rolesQueryValidator,
  rolesResolver,
  rolesExternalResolver,
  rolesDataResolver,
  rolesPatchResolver,
  rolesQueryResolver,
  rolesDataSchema,
  rolesQuerySchema,
  rolesSchema
} from './roles.schema'

import type { Application } from '../../declarations'
import { RolesService, getOptions } from './roles.class'
import { createSwaggerServiceOptions } from 'feathers-swagger'

export * from './roles.class'
export * from './roles.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const roles = (app: Application) => {
  // Register our service on the Feathers application
  app.use('roles', new RolesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: [],
    docs: createSwaggerServiceOptions({
      schemas: { rolesDataSchema, rolesQuerySchema, rolesSchema },
      docs: {
        description: 'My custom service description',
        securities: ['find', 'get', 'create', 'patch', 'remove']
      }
    })
  })
  // Initialize hooks
  app.service('roles').hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(rolesExternalResolver),
        schemaHooks.resolveResult(rolesResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(rolesQueryValidator), schemaHooks.resolveQuery(rolesQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(rolesDataValidator), schemaHooks.resolveData(rolesDataResolver)],
      patch: [schemaHooks.validateData(rolesPatchValidator), schemaHooks.resolveData(rolesPatchResolver)],
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
    roles: RolesService
  }
}
