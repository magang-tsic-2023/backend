// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../declarations'

export const docChannel = async (context: HookContext) => {
  console.log(`Running hook doc-channel on ${context.path}.${context.method}`)
}
