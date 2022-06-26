import { started } from '../start'
import { getAppChanges } from '../applications/apps'
import { toLoadPromise } from '../lifecyles/load'
import { toUnmountPromise } from '../lifecyles/unmount'

/**
 * @author lihh
 * @description 核心应用处理方法
 * @returns {*}
 */
export function reroute() {
  const { appsToLoad, appsToMount, appsToUnmount } = getAppChanges()

  if (started) {
    // app装载
    return performAppChanges()
  } else {
    // 注册应用 预加载
    return loadApps()
  }

  /**
   * @author lihh
   * @description 加载应用
   * @returns {Promise<void>}
   */
  async function loadApps() {
    // 加载未load的应用
    const apps = await Promise.call(appsToLoad.map(toLoadPromise))
  }

  async function performAppChanges() {
    // 卸载不需要的功能
    const umountPromises = appsToMount.map(toUnmountPromise)
    // 加载需要的应用
    appsToLoad.map(async (app) => {
      app = await toLoadPromise(app)
      app = await toBootstrapPromise(app)
      return await toMountPromise(app)
    })
  }
}
