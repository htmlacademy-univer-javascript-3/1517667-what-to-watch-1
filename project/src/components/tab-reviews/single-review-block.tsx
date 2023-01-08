import { IComment } from '../../types/IComment';

interface ICommentWrap {
  comment: IComment
}

export function SingleReviewBlock({ comment }: ICommentWrap) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${months[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`;
  };

  return (
    <div className='review'>
      <blockquote className='review__quote'>
        <p className='review__text'>{comment.comment}</p>

        <footer className='review__details'>
          <cite className='review__author'>{comment.user.name}</cite>
          <time className='review__date' dateTime={comment.date}>{formatTime(comment.date)}</time>
        </footer>
      </blockquote>

      <div className='review__rating'>{comment.rating}</div>
    </div>
  );
}
