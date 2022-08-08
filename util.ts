export function getPageTitle(title?: string) {
  const mainTitle = 'Arc Diagram'

  return title ? `${title} - ${mainTitle}` : mainTitle
}
