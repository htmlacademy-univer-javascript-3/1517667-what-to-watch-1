import {useAppSelector} from '../../hooks';

export function ErrorMessage(): JSX.Element | null {
  const {error} = useAppSelector((state) => state);

  return (error) ? <div>{error}</div> : null;
}
