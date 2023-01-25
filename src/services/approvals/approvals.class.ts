// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Approvals, ApprovalsData, ApprovalsPatch, ApprovalsQuery } from './approvals.schema'

export interface ApprovalsParams extends KnexAdapterParams<ApprovalsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ApprovalsService<ServiceParams extends Params = ApprovalsParams> extends KnexService<
  Approvals,
  ApprovalsData,
  ServiceParams,
  ApprovalsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'approvals'
  }
}
