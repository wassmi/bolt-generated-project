export interface Review {
  author: string;
  date: string;
  rating: number;
  content: string;
}

export interface Badge {
  type: 'New' | 'Top rated' | 'Ad' | 'Featured';
  text: string;
}

export interface Agency {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  services: string[];
  email: string;
  website: string;
  image: string;
  rating: number;
  reviewCount: number;
  phone: string;
  location: string;
  reviews: Review[];
  badges: Badge[];
  featured: boolean;
}

let dummyAgencies: Agency[] = [
  {
    id: '1',
    name: 'AI Solutions Pro',
    shortDescription: 'Cutting-edge AI solutions for businesses',
    fullDescription: 'AI Solutions Pro is a leading agency specializing in developing and implementing cutting-edge AI solutions for businesses across various industries. Our team of experts combines deep technical knowledge with industry insights to deliver transformative AI projects.',
    services: ['Machine Learning', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics'],
    email: 'info@aisolutionspro.com',
    website: 'https://www.aisolutionspro.com',
    image: '/placeholder.svg?height=400&width=800',
    rating: 4.8,
    reviewCount: 127,
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    reviews: [
      {
        author: 'John Doe',
        date: '2023-05-15',
        rating: 5,
        content: 'AI Solutions Pro delivered an outstanding machine learning model that significantly improved our business processes. Highly recommended!'
      },
      {
        author: 'Jane Smith',
        date: '2023-05-10',
        rating: 4,
        content: 'Great team to work with. They have deep expertise in AI and were able to tackle our complex NLP project with ease.'
      }
    ],
    badges: [{ type: 'Top rated', text: 'Top rated' }],
    featured: true
  },
  {
    id: '2',
    name: 'Cognitive Creations',
    shortDescription: 'Creative AI applications for marketing and design',
    fullDescription: 'Cognitive Creations is an innovative agency that harnesses the power of AI to revolutionize marketing and design. We create AI-driven tools and applications that enhance creativity, streamline workflows, and deliver stunning results for our clients.',
    services: ['AI-powered Design Tools', 'Generative AI for Marketing', 'Personalization Engines', 'AI Content Creation'],
    email: 'hello@cognitivecreations.com',
    website: 'https://www.cognitivecreations.com',
    image: '/placeholder.svg?height=400&width=800',
    rating: 4.6,
    reviewCount: 98,
    phone: '+1 (555) 987-6543',
    location: 'New York, NY',
    reviews: [
      {
        author: 'Alice Johnson',
        date: '2023-05-20',
        rating: 5,
        content: 'Cognitive Creations transformed our marketing strategy with their AI-powered personalization engine. Our engagement rates have skyrocketed!'
      },
      {
        author: 'Bob Williams',
        date: '2023-05-18',
        rating: 4,
        content: 'The AI content creation tool they developed for us has saved countless hours and improved the quality of our output. Great job!'
      }
    ],
    badges: [{ type: 'New', text: 'New' }],
    featured: false
  },
];

export async function getAgencies(): Promise<Agency[]> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  return dummyAgencies;
}

export async function getAgency(id: string): Promise<Agency | undefined> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  return dummyAgencies.find(agency => agency.id === id);
}

export async function createAgency(agency: Omit<Agency, 'id'>): Promise<Agency> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  const newAgency = { ...agency, id: String(dummyAgencies.length + 1) };
  dummyAgencies.push(newAgency);
  return newAgency;
}

export async function updateAgency(id: string, agency: Partial<Agency>): Promise<Agency | undefined> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  const index = dummyAgencies.findIndex(a => a.id === id);
  if (index !== -1) {
    dummyAgencies[index] = { ...dummyAgencies[index], ...agency };
    return dummyAgencies[index];
  }
  return undefined;
}

export async function deleteAgency(id: string): Promise<boolean> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  const index = dummyAgencies.findIndex(a => a.id === id);
  if (index !== -1) {
    dummyAgencies.splice(index, 1);
    return true;
  }
  return false;
}

export async function batchImportAgencies(agencies: Omit<Agency, 'id'>[]): Promise<Agency[]> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  const newAgencies = agencies.map((agency, index) => ({
    ...agency,
    id: String(dummyAgencies.length + index + 1)
  }));
  dummyAgencies.push(...newAgencies);
  return newAgencies;
}
