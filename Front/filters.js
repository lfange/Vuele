import {formatDate} from '@/util/date'
let date = (value)=>{
    return  formatDate(value,"yyyy-MM-dd hh:mm:ss")
}
export { date }
export function dates(value){return  formatDate(value,"yyyy-MM-dd")}
