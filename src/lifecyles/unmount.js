import { MOUNTED, NOT_MOUNTED, UNMOUNTING } from '../shard'

/**
 * @author lihh
 * @description app mount handle
 * @param app
 * @returns {Promise<*>}
 */
export const toUnmountPromise = async (app) => {
  if (app.status !== MOUNTED) return app

  app.status = UNMOUNTING

  await app.unmount(app.customProps)

  app.status = NOT_MOUNTED
  return app
}
