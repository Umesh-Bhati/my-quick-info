import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const uniqueObjects = (arrayOfObjects: any[]) => arrayOfObjects.filter(
  (object: any, index: number, array: any[]) =>
    index ===
    array.findIndex((obj) => obj.age === object.age)
);






export function calTotalOfGlTable(data: any[], keyToTotal: string, totalKeySuffix: string, keyToAmt: string,) {
  let specificItem: any
  let total = 0
  let desc = ''
  const finalResponse: any[] = []
  data.sort((firstItem, secItem) => +firstItem[keyToTotal] - secItem[keyToTotal]).forEach((item, index) => {
    if (typeof specificItem === 'undefined') {
      total = +item[keyToAmt]
      specificItem = item[keyToTotal]
      desc = item[totalKeySuffix]
      finalResponse.push(item)
      index === data.length - 1 && finalResponse.push({
        total: Number.isInteger(+total) ? +total : +Number(total).toFixed(2),
        desc
      })
    } else if (specificItem === item[keyToTotal]) {
      total += +item[keyToAmt]
      finalResponse.push(item)
      index === data.length - 1 && finalResponse.push({
        total: Number.isInteger(+total) ? +total : +Number(total).toFixed(2),
        desc
      })
    } else {
      if (index === data.length - 1) {
        finalResponse.push({ total: Number.isInteger(+total) ? +total : +Number(total).toFixed(2), desc },
          item,
          {
            total: Number.isInteger(+item[keyToAmt]) ? +item[keyToAmt] : +Number(item[keyToAmt]).toFixed(2),
            desc: item[totalKeySuffix]
          })
      } else {
        finalResponse.push({ total: Number.isInteger(+total) ? +total : +Number(total).toFixed(2), desc }, item)
        specificItem = item[keyToTotal]
        total = +item[keyToAmt]
        desc = item[totalKeySuffix]
      }
    }
  })

  return finalResponse
}