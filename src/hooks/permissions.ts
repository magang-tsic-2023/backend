// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../declarations'

export const permissions = async (context: HookContext) => {
  console.log(`Running hook permissions on ${context.path}.${context.method}`)
}
