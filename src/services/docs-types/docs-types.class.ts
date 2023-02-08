// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { DocsTypes, DocsTypesData, DocsTypesPatch, DocsTypesQuery } from './docs-types.schema'

export interface DocsTypesParams extends KnexAdapterParams<DocsTypesQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class DocsTypesService<ServiceParams extends Params = DocsTypesParams> extends KnexService<
  DocsTypes,
  DocsTypesData,
  ServiceParams,
  DocsTypesPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'docs_types'
  }
}
