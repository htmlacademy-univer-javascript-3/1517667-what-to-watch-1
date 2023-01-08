type RatingProps = {
  rating: number;
  disabled: boolean;
  onChange: (ratingValue: number) => void;
}

export function RatingComponent(props: RatingProps) {
  const { rating, disabled, onChange } = props;

  return (
    <div className='rating'>
      <div className='rating__stars'>
        {[...Array(10).keys()].map((x) => (
          <>
            <input
              className='rating__input'
              id={`star-${10 - x}`}
              data-testid={`${10 - x}`}
              type='radio'
              name='rating'
              value={10 - x}
              checked={rating === 10 - x}
              onChange={() => onChange(10 - x)}
              disabled={disabled}
            />
            <label className='rating__label' htmlFor={`star-${10 - x}`}>Rating {10 - x}</label>
          </>))}
      </div>
    </div>
  );
}
