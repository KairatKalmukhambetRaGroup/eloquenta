import Landing from '@/components/pages/Landing'
export default function Home({params: {locale}}: any) {
  return <Landing locale={locale} />
}