import { useMutation, useQueryClient } from '@tanstack/react-query';
import StarRating from './StarRating';
import { reviewsApi, type GetReviewsResponse, type Review } from './reviewsApi';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';

type ReviewItemProps = {
  productId: number;
  review: Review;
};

const ReviewItem = ({ productId, review }: ReviewItemProps) => {
  const queryClient = useQueryClient();

  const deleteReviewMutation = useMutation({
    mutationFn: () => reviewsApi.deleteReview(productId, review.id),
    onSuccess: () => {
      queryClient.setQueryData<GetReviewsResponse>(
        ['reviews', productId],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            reviews: old.reviews.filter((r) => r.id !== review.id),
          };
        }
      );
    },
  });

  return (
    <div key={review.id} className="flex flex-row gap-5">
      <div className="grow">
        <div className="font-semibold">{review.author}</div>
        <div>
          <StarRating value={review.rating} />
        </div>
        <p className="py-2">{review.content}</p>
      </div>
      <DeleteConfirmationDialog onClick={() => deleteReviewMutation.mutate()} />
    </div>
  );
};

export default ReviewItem;
