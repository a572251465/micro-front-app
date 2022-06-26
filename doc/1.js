const genPromiseChain = (promises = []) => {
  return (props) =>
    promises.reduce((memo, cur) => {
      return memo.then(() => {
        return new Promise((resolve) => {
          cur(props).then(() => {
            resolve(props)
          })
        })
      })
    }, Promise.resolve())
}

const bootstrap = [
  async (props) => {
    console.log('启动方法1', props)
  },
  async (props) => {
    console.log('启动方法2', props)
  },
  async (props) => {
    console.log('启动方法3', props)
  }
]

const fn = genPromiseChain(bootstrap)
fn(111)
