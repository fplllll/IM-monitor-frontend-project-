import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Electric Motor Platform'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
