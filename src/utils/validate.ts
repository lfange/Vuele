import { type } from "os"

interface isExternal {
  
}

/**
 * 是否是外部链接
 * @param path
 */
 export function isExternal(path: string): boolean {
  return /^(http|ftp|mailto|tel):/.test(path)
}
