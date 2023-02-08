// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
import { AuthenticationResult, AuthenticationService, JWTStrategy } from '@feathersjs/authentication'
import { LocalStrategy } from '@feathersjs/authentication-local'

import type { Application } from './declarations'
import { Params } from '@feathersjs/feathers'
import { ServiceSwaggerOptions } from 'feathers-swagger'

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService
  }
}

class JWTWithRole extends JWTStrategy {
  async getEntity(id: string, params: Params) {
    const entity = await super.getEntity(id, params)
    entity.roles = []
    const roles = await this.app?.get('postgresqlClient').select('users_roles.role_id').from('users_roles').where('user_id','=', entity.id)
    for (let index = 0; index < roles.length; index++) {
      entity.roles.push(roles[index].role_id)
    }
    return entity
  }
}

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService;
  }
}

declare module '@feathersjs/authentication' {
  class AuthenticationService {
    docs: ServiceSwaggerOptions;
  }
}

export const authentication = (app: Application) => {
  const authentication = new AuthenticationService(app)
  authentication.docs = {
    idNames: {
      remove: 'accessToken',
    },
    idType: 'string',
    securities: ['remove', 'removeMulti'],
    multi: ['remove'],
    schemas: {
      authRequest: {
        type: 'object',
        properties: {
          strategy: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
        },
      },
      authResult: {
        type: 'object',
        properties: {
          accessToken: { type: 'string' },
          authentication: {
            type: 'object',
            properties: {
              strategy: { type: 'string' },
            },
          },
          payload: {
            type: 'object',
            properties: {}, // TODO
          },
          user: { $ref: '#/components/schemas/User' },
        },
      },
    },
    refs: {
      createRequest: 'authRequest',
      createResponse: 'authResult',
      removeResponse: 'authResult',
      removeMultiResponse: 'authResult',
    },
    operations: {
      remove: {
        description: 'Logout the currently logged in user',
        'parameters[0].description': 'accessToken of the currently logged in user',
      },
      removeMulti: {
        description: 'Logout the currently logged in user',
        parameters: [],
      },
    },
  };

  authentication.register('jwt', new JWTWithRole())
  authentication.register('local', new LocalStrategy())
  app.use('authentication', authentication)
}
