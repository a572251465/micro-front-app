/**
 * @author lihh
 * @description 注册应用
 * @param params {name, entry, container, activeRule, lifeCycle}
 */
import {
  isInvalidParams,
  requiredField,
  requiredlifeCycle,
  shouldBeActive
} from '../shard/utils'
import resolveScriptEntry from '../shard/resolveScriptEntry'
import {
  BOOTSTRAPPING,
  LOADING_SOURCE_CODE,
  MOUNTED,
  NOT_BOOTSTRAPPED,
  NOT_LOADED,
  NOT_MOUNTED,
  SKIP_BECAUSE_BROKEN
} from '../shard/index'
import { reroute } from '../navigation/reroute'

export const apps = []
function registerApplication(params = []) {
  const options = Array.isArray(params) ? params : [params]
  const transformParams = resolveEveryParams(options)

  apps.push(...transformParams)
  reroute()
}

/**
 * @author lihh
 * @description 解析每个参数
 * @param params 传递的参数数组
 */
function resolveEveryParams(params = []) {
  isInvalidParams(params, requiredField)

  return params.map((item) => {
    const { name, entry, activeRoute, container, customProps = {} } = item
    return {
      appName: name,
      container,
      loadApp: async () => {
        const lifeCycle = (async () => {
          return await resolveScriptEntry(entry)
        })()
        isInvalidParams(lifeCycle, requiredlifeCycle)
        return {
          ...lifeCycle
        }
      },
      status: NOT_LOADED,
      activeWhen:
        typeof activeRoute === 'function'
          ? activeRoute
          : (location) => location.hash.startsWith(activeRoute),
      customProps
    }
  })
}

/**
 * @author lihh
 * @description 启动单个应用
 * @param name 应用名称
 */
function setupSingleApp(name) {}

export function getAppChanges() {
  const appsToUnmount = []
  const appsToLoad = []
  const appsToMount = []

  apps.forEach((item) => {
    const appShouldBeActive =
      item.status !== SKIP_BECAUSE_BROKEN && shouldBeActive(item)

    switch (item.status) {
      case NOT_LOADED:
      case LOADING_SOURCE_CODE:
        if (appShouldBeActive) appsToLoad.push(item)
        break
      case NOT_BOOTSTRAPPED:
      case BOOTSTRAPPING:
      case NOT_MOUNTED:
        if (appShouldBeActive) appsToMount.push(item)
        break
      case MOUNTED:
        if (!appShouldBeActive) appsToUnmount.push(item)
    }
  })

  return {
    appsToUnmount,
    appsToMount,
    appsToLoad
  }
}

export { registerApplication, setupSingleApp }
