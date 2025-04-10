export type Event = {
  id: string
  image: string
  title: string
  date: string
  location: string
  price: number
  description: string
}

export const events: Event[] = [
  {
    id: 'b12f7d90-5e3a-4b93-a8a3-1f90bba1c001',
    title: 'Frontend Meetup Stockholm',
    date: '2025-05-10',
    image: '/images/frontend.jpg',
    location: 'Epicenter, Stockholm',
    price: 200,
    description: 'Join the top frontend devs in Sweden for talks, snacks, and networking!',
  },
  {
    id: 'f3e23a88-56cd-4030-b089-7cc0b78a4292',
    title: 'AI in Web Development',
    date: '2025-06-01',
    image: '/images/ai.jpg',
    location: 'Online',
    price: 150,
    description: 'Explore how AI is changing frontend workflows and tooling.',
  },
  {
    id: 'a890cf15-59b2-4a7d-b7a2-2dd56f1c3bb3',
    title: 'UX for Developers',
    date: '2025-06-20',
    image: '/images/ux.jpg',
    location: 'Mindpark, Malmö',
    price: 180,
    description: 'Level up your design thinking with practical UX insights for developers.',
  },
  {
    id: '7d3ebd49-d310-42f1-8fa1-13b6012cf088',
    title: 'React and GraphQL Bootcamp',
    date: '2025-07-05',
    image: '/images/react.jpg',
    location: 'Lindholmen, Gothenburg',
    price: 250,
    description: 'Deep dive into full-stack dev with React, GraphQL, and modern APIs.',
  },
]
