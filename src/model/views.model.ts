export type View = '/' | 'home' | 'measurements' | 'legal-notice'

export const viewList: Record<View, View> = {
  '/': '/',
  home: 'home',
  measurements: 'measurements',
  'legal-notice': 'legal-notice',
}
