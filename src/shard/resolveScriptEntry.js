import { importEntry } from 'import-html-entry'

/**
 * @author lihh
 * @description 解析script文件
 * @param name app 名称
 * @param url 解析rul 必须是字符串
 */
const resolveScriptEntry = (name, url) => {
  if (typeof url !== 'string') {
    throw new Error(`input entry(${url}) need is string`)
  }

  return new Promise((resolve) => {
    importEntry(url).then((res) => {
      res.execScripts().then((exports) => {
        resolve(exports)
      })
    })
  })
}

export default resolveScriptEntry
