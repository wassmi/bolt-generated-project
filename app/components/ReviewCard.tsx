import { Star } from 'lucide-react'

interface ReviewCardProps {
  author: string
  date: string
  rating: number
  content: string
}

export default function ReviewCard({ author, date, rating, content }: ReviewCardProps) {
  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex items-center mb-2">
        <div className="font-semibold mr-2">{author}</div>
        <div className="text-gray-500 text-sm">{date}</div>
      </div>
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill={i < rating ? 'currentColor' : 'none'}
          />
        ))}
      </div>
      <p className="text-gray-700">{content}</p>
    </div>
  )
}
