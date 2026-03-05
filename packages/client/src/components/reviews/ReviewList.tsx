import { HiSparkles } from 'react-icons/hi2';
import { MdDeleteOutline } from 'react-icons/md';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '../ui/button';
import ReviewSkeleton from './ReviewSkeleton';
import {
  reviewsApi,
  type DeleteSummaryResponse,
  type GetReviewsResponse,
  type SummarizeResponse,
} from './reviewsApi';
import AddReviewDialog from './AddReviewDialog';
import ReviewItem from './ReviewItem';

type ReviewListProps = {
  productId: number;
};

const ReviewList = ({ productId }: ReviewListProps) => {
  const queryClient = useQueryClient();

  const summaryMutation = useMutation<SummarizeResponse>({
    mutationFn: () => reviewsApi.summarizeReviews(productId),
  });

  const reviewsQuery = useQuery<GetReviewsResponse>({
    queryKey: ['reviews', productId],
    queryFn: () => reviewsApi.fetchReviews(productId),
  });

  const deleteSummaryMutation = useMutation<DeleteSummaryResponse>({
    mutationFn: () => reviewsApi.deleteSummary(productId),
    onSuccess: () => {
      summaryMutation.reset();
      queryClient.setQueryData<GetReviewsResponse>(
        ['reviews', productId],
        (old) => {
          if (!old) return old;
          return { ...old, summary: null };
        }
      );
    },
  });

  if (reviewsQuery.isLoading) {
    return (
      <div className="flex flex-col gap-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col">
            <ReviewSkeleton key={i} />
          </div>
        ))}
      </div>
    );
  }

  if (reviewsQuery.error) {
    return <p className="text-red-500">Could not fetch reviews. Try again!</p>;
  }

  const currentSummary =
    reviewsQuery.data?.summary || summaryMutation.data?.summary;

  return (
    <div>
      <div className="mb-5 mt-5">
        {currentSummary ? (
          <div className="flex flex-row gap-5">
            <p className="grow">{currentSummary}</p>
            <Button
              onClick={() => deleteSummaryMutation.mutate()}
              className="cursor-pointer"
              disabled={summaryMutation.isPending}
            >
              <MdDeleteOutline />
            </Button>
          </div>
        ) : (
          <div>
            <Button
              onClick={() => summaryMutation.mutate()}
              className="cursor-pointer"
              disabled={summaryMutation.isPending}
            >
              <HiSparkles />
              Summarize
            </Button>
            {summaryMutation.isPending && (
              <div className="py-3">
                <ReviewSkeleton />
              </div>
            )}
            {summaryMutation.isError && (
              <p className="text-red-500">
                Could not summarize review. Try again!
              </p>
            )}
          </div>
        )}
      </div>
      <hr className="mb-5"></hr>
      <div>
        <AddReviewDialog productId={productId} />
      </div>
      <div className="flex flex-col gap-5">
        {reviewsQuery.data?.reviews.map((review) => (
          <ReviewItem productId={productId} review={review} key={review.id} />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
