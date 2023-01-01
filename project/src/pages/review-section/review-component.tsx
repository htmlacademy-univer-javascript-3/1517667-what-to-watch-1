type ReviewProps = {
  review: string;
  onChange: (reviewContent: string) => void;
}

export function ReviewComponent(props: ReviewProps) {
  const { review, onChange } = props;

  return (
    <textarea
      className='add-review__textarea'
      name='review'
      id='review'
      value={review}
      placeholder='Review text'
      onChange={(e) => onChange(e.target.value)}
      maxLength={400}
      minLength={50}
      required
    >
    </textarea>
  );
}
