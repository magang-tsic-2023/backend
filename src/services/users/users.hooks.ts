// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import { app } from '../../app'
import type { HookContext } from '../../declarations'

export const createUserProfile = async (context: HookContext) => {
  await app.service('profile').create({ id: context.result.id })
}
