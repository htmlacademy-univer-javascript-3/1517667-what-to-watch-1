export interface ITabs {
  filmId: string;
}

export interface ITab {
  id: number;
  title: string;
  child: () => JSX.Element;
}