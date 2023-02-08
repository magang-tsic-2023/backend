// For more information about this file see https://dove.feathersjs.com/guides/cli/channels.html
import type { RealTimeConnection, Params } from '@feathersjs/feathers'
import type { AuthenticationResult } from '@feathersjs/authentication'
import '@feathersjs/transport-commons'
import type { Application, HookContext } from './declarations'
import { logger } from './logger'
import { dataValidator } from './validators'

export const channels = (app: Application) => {
  if (typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return
  }

  logger.warn(
    'Publishing all events to all authenticated users. See `channels.ts` and https://dove.feathersjs.com/api/channels.html for more information.'
  )

  app.on('connection', (connection: RealTimeConnection) => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection)
  })

  app.on('login', (authResult: AuthenticationResult, { connection }: Params, context: Params) => {
    app
      .get('postgresqlClient')
      .select('users_roles.role_id')
      .from('users_roles')
      .where('users_roles.user_id', '=', authResult.user.id)
      .then(function (results) {
        context.roles = results
        // for (const index in results) {
        //   authResult.user['roles'].push(results[index].role_id)
        // }
      }).catch((err)=>console.log(err))

    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection)
      console.log('An user leave anonymous channel')

      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection)
      app.channel('authenticated')
      console.log('An user authenticated and join authenticated channel')
    }
    
  })

  // eslint-disable-next-line no-unused-vars
  app.publish((data: any, context: HookContext) => {
    // Here you can add event publishers to channels set up in `channels.js`
    // To publish only for a specific event use `app.publish(eventname, () => {})`

    // e.g. to publish all service events to all authenticated users use
    return app.channel('authenticated')
  })
}
