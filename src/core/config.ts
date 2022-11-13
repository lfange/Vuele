import chalk from 'chalk'
const Log = console.log

/**
 * 网站配置文件
 */

 const config = {
  appName: 'vit-Min',
  showViteLogo: true
}

export const viteLogo = (env: any) => {
  console.log('env', env)
    Log(
      chalk.green(
        `hi there， I m fange My github: https://github.com/lfange`
      )
    )
    Log(
      chalk.green(
        `> 默认自动化文档地址:http://127.0.0.1:${env.VITE_SERVER_PORT}/swagger/index.html`
      )
    )
    console.log('\n')
}

export default config