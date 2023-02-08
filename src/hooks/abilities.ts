// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext, NextFunction } from '../declarations'

export const abilities = async (context: HookContext, next: NextFunction) => {
  console.log(`Running hook abilities on ${context.path}.${context.method}`)
  await next()
}
