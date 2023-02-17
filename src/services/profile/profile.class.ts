// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Profile, ProfileData, ProfilePatch, ProfileQuery } from './profile.schema'

export interface ProfileParams extends KnexAdapterParams<ProfileQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ProfileService<ServiceParams extends Params = ProfileParams> extends KnexService<
  Profile,
  ProfileData,
  ServiceParams,
  ProfilePatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'users_profile'
  }
}
