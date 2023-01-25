// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Documents, DocumentsData, DocumentsPatch, DocumentsQuery } from './documents.schema'

export interface DocumentsParams extends KnexAdapterParams<DocumentsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class DocumentsService<ServiceParams extends Params = DocumentsParams> extends KnexService<
  Documents,
  DocumentsData,
  ServiceParams,
  DocumentsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'documents'
  }
}
