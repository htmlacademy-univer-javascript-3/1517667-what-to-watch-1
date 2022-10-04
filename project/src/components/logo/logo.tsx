interface ILogo {
  isLight: boolean
}

export function Logo({ isLight }: ILogo) {
  const classes = `logo__link ${isLight ? '' : 'logo__link--light'}`;
  return (
    <div className='logo'>
      <a href='main.html' className={classes}>
        {
          [
            'W', 'T', 'W'
          ].map((letter, index) => <span key={letter} className={`logo__letter logo__letter--${index}`}>{letter}</span>)
        }
      </a>
    </div>
  );
}
