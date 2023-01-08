type ReviewProps = {
  review: string;
  disabled: boolean;
  onChange: (reviewContent: string) => void;
}

export function ReviewTypingComponent(props: ReviewProps) {
  const { review, disabled, onChange } = props;

  return (
    <textarea
      className='add-review__textarea'
      name='review'
      id='review'
      data-testid='textarea'
      value={review}
      placeholder='Review text'
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      required
    >
    </textarea>
  );
}
