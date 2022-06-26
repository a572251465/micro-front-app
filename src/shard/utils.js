import { MOUNTED } from './constants'

export const requiredField = ['name', 'entry', 'container']
export const requiredlifeCycle = ['bootstrap', 'mount', 'unmount']

/**
 * @author lihh
 * @description 判断是否是无效的字段
 * @param params 传递对象或是数组
 * @param existKeys
 */
export const isInvalidParams = (params = [], existKeys = []) => {
  params = Array.isArray(params) ? params : [params]

  params.forEach((obj) => {
    existKeys.forEach((keyName) => {
      if (obj[keyName] === null || obj[keyName] === undefined) {
        throw new Error(`Field【${keyName}】is must exist `)
      }
    })
  })
}

/**
 * @author lihh
 * @description 判断app 状态是否激活
 * @param app 加载的子应用
 * @returns {boolean}  返回状态
 */
export const isActive = (app) => {
  return app.status === MOUNTED
}

/**
 * @author lihh
 * @description 是否应该激活
 * @param app 子应用
 * @returns {*}
 */
export const shouldBeActive = (app) => {
  return app.activeWhen(window.location)
}

/**
 * @author lihh
 * @description 生成promise 链
 */
export const genPromiseChain = (promises = []) => {
  promises = Array.isArray(promises) ? promises : [promises]
  return (props) =>
    promises.reduce((memo, fn) => {
      return memo.then(() => fn(props))
    }, Promise.resolve())
}
