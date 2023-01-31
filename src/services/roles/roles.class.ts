// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Roles, RolesData, RolesPatch, RolesQuery } from './roles.schema'

export interface RolesParams extends KnexAdapterParams<RolesQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class RolesService<ServiceParams extends Params = RolesParams> extends KnexService<
  Roles,
  RolesData,
  ServiceParams,
  RolesPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'roles'
  }
}
