// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext, NextFunction } from '../declarations'

export const userPermissions = async (context: HookContext, next: NextFunction) => {
  console.log(`Running hook user-permissions on ${context.path}.${context.method}`)
  await next()
}
