// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Permissions, PermissionsData, PermissionsPatch, PermissionsQuery } from './permissions.schema'

export interface PermissionsParams extends KnexAdapterParams<PermissionsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class PermissionsService<ServiceParams extends Params = PermissionsParams> extends KnexService<
  Permissions,
  PermissionsData,
  ServiceParams,
  PermissionsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'permissions'
  }
}
