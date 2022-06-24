import { started } from '../start'
import { getAppChanges } from '../applications/apps'

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
}

async function loadApps() {}

async function performAppChanges() {}
