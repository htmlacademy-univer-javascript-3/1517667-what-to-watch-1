import React from 'react';
import { NotFoundError } from '../../pages/not-found-error/not-found-error';

export interface ITabs {
  filmId: string;
}

interface IContent {
  filmId: string;
  activeTab: number;
}

interface ITabItem {
  onItemClicked: () => void;
  tabName: string;
  isActive: boolean;
}

const tabs = [
  {
    id: 0,
    tabName: "Overview"
  },
  {
    id: 1,
    tabName: "Details"
  },
  {
    id: 2,
    tabName: "Reviews"
  }
]

function TabItem({ onItemClicked, tabName, isActive }: ITabItem) {
  return (
    <li className={`film-nav__item ${isActive && "film-nav__item--active"}`} onClick={onItemClicked}>
      <a href='#' className='film-nav__link'>{tabName}</a>
    </li>
  );
}

function Content({ filmId, activeTab }: IContent) {
  switch (activeTab) {
    case 0:
      return (
        <React.Fragment></React.Fragment>
      );
    case 1:
      return (
        <React.Fragment></React.Fragment>
      );
    case 2:
      return (
        <React.Fragment></React.Fragment>
      );
    default:
      return <NotFoundError />;
  }
}

export function Tabs({ filmId }: ITabs) {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <div className='film-card__desc'>
      <nav className='film-nav film-card__nav'>
        <ul className='film-nav__list'>
          {
            tabs.map((x, index) => <TabItem
              onItemClicked={() => setActiveTab(index)}
              tabName={x.tabName}
              isActive={index === activeTab} />)
          }
        </ul>
      </nav>

      {tabs.map((x) => { activeTab === x.id && <Content filmId={filmId} activeTab={x.id}/>})}
    </div>
  );
}