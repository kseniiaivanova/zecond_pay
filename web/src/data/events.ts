export type EventType = {
  id: string
  image: string
  title: string
  date: string
  location: string
  price: number
  description: string
}

export const events: EventType[] = [
  {
    id: 'b12f7d90-5e3a-4b93-a8a3-1f90bba1c001',
    title: 'Frontend Meetup Stockholm',
    date: '2025-05-10',
    image: '/images/frontend.webp',
    location: 'Epicenter, Stockholm',
    price: 200,
    description: 'Gå med bland Sveriges främsta frontendutvecklare för föreläsningar, snacks och nätverkande!',
  },
  {
    id: 'f3e23a88-56cd-4030-b089-7cc0b78a4292',
    title: 'AI in Web Development',
    date: '2025-06-01',
    image: '/images/ai.webp',
    location: 'Online',
    price: 150,
    description: 'Utforska hur AI förändrar arbetsflöden och verktyg för frontendutveckling.',
  },
  {
    id: 'a890cf15-59b2-4a7d-b7a2-2dd56f1c3bb3',
    title: 'UX for Developers',
    date: '2025-06-20',
    image: '/images/ux.webp',
    location: 'Mindpark, Malmö',
    price: 180,
    description: 'Höj din designförmåga med praktiska UX-insikter för utvecklare.',
  },
  {
    id: '7d3ebd49-d310-42f1-8fa1-13b6012cf088',
    title: 'React and GraphQL Bootcamp',
    date: '2025-07-05',
    image: '/images/react.webp',
    location: 'Lindholmen, Gothenburg',
    price: 250,
    description: 'Fördjupa dig i fullstack-utveckling med React, GraphQL och moderna API:er.',
  },
]
