import { Metadata } from 'next'
import NewsClientContent from './client-content'

export const metadata: Metadata = {
  title: 'Darbhanga Taekwondo Association Historic Meeting & Kaimur Tournament Preparations',
  description: 'Detailed news report on the special meeting held by Darbhanga Taekwondo Association on April 5, 2026. Discussions on club modernization, state-level games in Kaimur, and massive expansion plans.',
  keywords: 'Darbhanga Taekwondo Association, Taekwondo news, Bihar Taekwondo, Kaimur State Level Tournament, Sameer Abhishek, Dr. Prem Kumar Nishad, Rajeev Kumar, Suraj Kumar, Naveen Coach, Martial Arts Bihar, Sports Infrastructure, Darbhanga Martial Arts, Taekwondo Championship 2026, TKD Bihar, Kanhaiya, Rahul, Arjun, Taekwondo Training Kaimur',
  openGraph: {
    title: 'DTA Historic Meeting & Kaimur Preparations',
    description: 'Detailed news report on the special meeting held by Darbhanga Taekwondo Association. Discussions on club modernization and state-level games.',
    images: ['https://enhanceaiart.s3.us-west-2.amazonaws.com/uploads/6f305b94-9d5f-4145-afee-18e37a5e1d7e.jpeg'],
    url: 'https://darbhangataekwondo.fit/news/darbhanga-taekwondo-association-special-meeting',
    type: 'article',
    publishedTime: '2026-04-05T11:00:00+05:30',
  },
}

export default function NewsArticlePage() {
  return <NewsClientContent />
}
