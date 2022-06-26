import { genPromiseChain, LOADING_SOURCE_CODE, NOT_BOOTSTRAPPED } from '../shard'

/**
 * @author lihh
 * @description 加载promise 应用
 * @param app 加载的应用
 * @returns {Promise<void>}
 */
export async function toLoadPromise(app) {
  app.status = LOADING_SOURCE_CODE

  const {mount, unmount, bootstrap} = await app.loadApp(app.customProps)
  // 将生命周期挂载app上
  app.mount = genPromiseChain(mount)
  app.unmount = genPromiseChain(unmount)
  app.bootstrap = genPromiseChain(bootstrap)

  app.status = NOT_BOOTSTRAPPED

  return app
}
