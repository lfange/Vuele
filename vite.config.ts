import { defineConfig, loadEnv } from 'vite'
import type { CommonServerOptions } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// import { viteLogo } from './src/core/config.ts'
// viteLogo(process.env)

console.log(JSON.stringify(import.meta)) // undefined
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log('command', process.env.VITE_HHHH)
  const env = loadEnv(mode, process.cwd())
  console.log('command', env)
  return {
    base: './', // index.html文件所在位置
    root: './', // js导入的资源路径，src
    resolve: {
      extensions: ['.ts', '.vue', '.tsx'],
      alias:  {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server:  <CommonServerOptions>{
      // 如果使用docker-compose开发模式，设置为false
      open: false,
      port: 8180,
      // host: '0.0.0.0', // expose local iP address
      proxy: {
        '/db': { // 需要代理的路径   例如 '/api'
          target: `http://www.cwl.gov.cn`, // 代理到 目标路径
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/db/, '')
        },
        '/lo': { // 需要代理的路径   例如 '/api'
          target: `https://webapi.sporttery.cn/`, // 代理到 目标路径
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/lo/, '')
        },
        '/v1': {
          target: 'http://localhost:8000',
          // rewrite: path => path.replace(//, '')
        }
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript
          javascriptEnabled: true
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    plugins: [
      vue(), 
      vueJsx({})
    ]
  }
})
