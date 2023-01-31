// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Groups, GroupsData, GroupsPatch, GroupsQuery } from './groups.schema'

export interface GroupsParams extends KnexAdapterParams<GroupsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class GroupsService<ServiceParams extends Params = GroupsParams> extends KnexService<
  Groups,
  GroupsData,
  ServiceParams,
  GroupsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'groups'
  }
}
