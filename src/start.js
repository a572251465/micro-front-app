import { reroute } from './navigation/reroute'

// 表示是否已经启动应用
export let started = false

/**
 * @author lihh
 * @description 启动app
 */
function start() {
  started = true
  reroute()
}

export { start }
