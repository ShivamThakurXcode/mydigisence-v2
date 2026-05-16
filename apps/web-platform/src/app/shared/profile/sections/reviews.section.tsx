interface Review {
  rating: number
  comment: string
  authorName?: string
  createdAt?: string
}

interface ReviewsSectionProps {
  config?: { items?: Review[] }
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'text-amber-400' : 'text-muted'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export function ReviewsSection({ config }: ReviewsSectionProps) {
  const items = config?.items ?? []
  if (items.length === 0) return null

  return (
    <section className="py-6">
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>
      <div className="space-y-4">
        {items.map((review, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-2">
              <Stars rating={review.rating} />
              {review.authorName && (
                <span className="text-sm font-medium">{review.authorName}</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{review.comment}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
