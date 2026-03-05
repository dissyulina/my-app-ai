import { FiPlus } from 'react-icons/fi';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Field, FieldGroup } from '../ui/field';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';
import { reviewsApi, type CreateReviewPayload } from './reviewsApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type AddReviewDialogProps = {
  productId: number;
};

const AddReviewDialog = ({ productId }: AddReviewDialogProps) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(3);
  const [content, setContent] = useState('');

  const createReviewMutation = useMutation({
    mutationFn: (payload: CreateReviewPayload) =>
      reviewsApi.createReview(productId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
      setAuthor('');
      setContent('');
      setRating(3);
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild className="mb-5">
          <Button variant="outline">
            <FiPlus />
            Add A Review
          </Button>
        </DialogTrigger>
        <DialogContent className="xl:max-w-xl">
          <DialogHeader>
            <DialogTitle>Add a review</DialogTitle>
            <DialogDescription>
              Add a review of product {productId} here. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </Field>
            <Field>
              <Label htmlFor="rating-1">Rating</Label>
              <Input
                id="rating-1"
                name="rating"
                type="number"
                value={rating}
                onChange={(e) => setRating(+e.target.value)}
                required
              />
            </Field>
            <Field>
              <Label htmlFor="review-1">Review</Label>
              <Textarea
                id="review-1"
                name="review"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={() => {
                createReviewMutation.mutate({ author, rating, content });
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddReviewDialog;
