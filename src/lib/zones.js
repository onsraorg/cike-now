const zoneMeta = {
  UTC: ['UTC 协调世界时', '协调世界时', '全球', 'utc'],
  'Asia/Shanghai': ['北京', '中国标准时间', '亚洲', 'beijing shanghai china 北京 上海 中国'],
  'Asia/Dubai': ['迪拜', '阿拉伯联合酋长国', '亚洲', 'dubai uae 迪拜 阿联酋'],
  'Europe/London': ['伦敦', '英国', '欧洲', 'london uk 伦敦 英国'],
  'America/New_York': ['纽约', '美国东部时间', '美洲', 'new york 纽约 美国'],
  'America/Los_Angeles': ['洛杉矶', '美国太平洋时间', '美洲', 'los angeles 洛杉矶 美国'],
  'Australia/Sydney': ['悉尼', '澳大利亚东部时间', '大洋洲', 'sydney 悉尼 澳大利亚'],
  'Asia/Tokyo': ['东京', '日本', '亚洲', 'tokyo 东京 日本'],
  'Asia/Singapore': ['新加坡', '新加坡', '亚洲', 'singapore 新加坡'],
  'Asia/Hong_Kong': ['香港', '中国香港', '亚洲', 'hong kong 香港'],
  'Asia/Kolkata': ['新德里', '印度标准时间', '亚洲', 'delhi kolkata india 新德里 印度'],
  'Asia/Seoul': ['首尔', '韩国', '亚洲', 'seoul 首尔 韩国'],
  'Europe/Paris': ['巴黎', '法国', '欧洲', 'paris 巴黎 法国'],
  'Europe/Berlin': ['柏林', '德国', '欧洲', 'berlin 柏林 德国'],
  'Europe/Moscow': ['莫斯科', '俄罗斯', '欧洲', 'moscow 莫斯科 俄罗斯'],
  'America/Chicago': ['芝加哥', '美国中部时间', '美洲', 'chicago 芝加哥 美国'],
  'America/Toronto': ['多伦多', '加拿大东部时间', '美洲', 'toronto 多伦多 加拿大'],
  'America/Sao_Paulo': ['圣保罗', '巴西', '美洲', 'sao paulo 圣保罗 巴西'],
  'America/Mexico_City': ['墨西哥城', '墨西哥', '美洲', 'mexico city 墨西哥城'],
  'Pacific/Auckland': ['奥克兰', '新西兰', '大洋洲', 'auckland 奥克兰 新西兰'],
  'Pacific/Honolulu': ['檀香山', '夏威夷', '大洋洲', 'honolulu hawaii 檀香山 夏威夷'],
  'Africa/Cairo': ['开罗', '埃及', '非洲', 'cairo 开罗 埃及'],
  'Africa/Johannesburg': ['约翰内斯堡', '南非', '非洲', 'johannesburg 约翰内斯堡 南非'],
  'Africa/Nairobi': ['内罗毕', '肯尼亚', '非洲', 'nairobi 内罗毕 肯尼亚'],
}

const regionNames = {
  Africa: '非洲',
  America: '美洲',
  Antarctica: '南极洲',
  Asia: '亚洲',
  Atlantic: '欧洲',
  Australia: '大洋洲',
  Europe: '欧洲',
  Indian: '亚洲',
  Pacific: '大洋洲',
  UTC: '全球',
}

export const colorByRegion = {
  全球: '#54dfd1',
  亚洲: '#a8e85f',
  欧洲: '#9b79ed',
  美洲: '#39c6f4',
  大洋洲: '#ffa843',
  非洲: '#f27b74',
  南极洲: '#e5edf9',
}

export function getSupportedZones() {
  let zones = []
  try {
    zones = Intl.supportedValuesOf('timeZone')
  } catch {
    zones = Object.keys(zoneMeta).filter((zone) => zone !== 'UTC')
  }
  return ['UTC', ...new Set(zones)]
}

function fallbackName(zone) {
  const part = zone.split('/').at(-1) || zone
  return part.replaceAll('_', ' ')
}

export function getZoneInfo(zone) {
  const meta = zoneMeta[zone]
  const region = meta?.[2] || regionNames[zone.split('/')[0]] || '全球'
  const name = meta?.[0] || fallbackName(zone)
  const detail = meta?.[1] || zone.replaceAll('_', ' ')
  const search = `${zone} ${name} ${detail} ${meta?.[3] || ''}`.toLowerCase()
  return { zone, name, detail, region, search, color: colorByRegion[region] || colorByRegion.全球 }
}

export const zones = getSupportedZones().map(getZoneInfo)

export const featuredZoneIds = [
  'UTC',
  'Asia/Dubai',
  'Europe/London',
  'America/New_York',
  'America/Los_Angeles',
  'Australia/Sydney',
]

export const timelineZoneIds = [
  'America/New_York',
  'Europe/London',
  'Asia/Dubai',
  'Asia/Shanghai',
]
