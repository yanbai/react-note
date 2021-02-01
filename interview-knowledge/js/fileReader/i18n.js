https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651233673&idx=2&sn=8e21e85af4966959d015fa5778be5ce8&chksm=bd49440d8a3ecd1bc0747279e9cb9d7a152ca6e7a6b3f861ce44b82492cb446f41a57b862716&mpshare=1&scene=23&srcid=0801NLmEMpHVXDXNxOHo8RrF&sharer_sharetime=1596284490257&sharer_shareid=5851c30e2bb7ac6913d8cf3c39f050cc#rd
export const t = function(path, options) {
  let value = i18nHandler.apply(this, arguments)
  if(value !== null && value !== undefined)
    return value
  const array = path.split('.')
  let current = lang

  for(let i=0, j=array.length; i<j; i++) {
    const property = array[i]
    value = current[property]
    if(i === j-1)
      return format(value, options)
    if(!value)
      return ''
    current = value
  }
  return ''
}
