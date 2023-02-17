// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import { app } from '../app'
import type { HookContext } from '../declarations'

export const docChannel = async (context: HookContext) => {
  console.log(context)
  app.channel(context.params.id).send({
    name: context.params.name
  })
}
