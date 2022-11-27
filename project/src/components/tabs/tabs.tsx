import React from 'react';
import { OverviewTab } from './overview-tab';
import { DetailsTab } from './details-tab';
import { ReviewsTab } from './reviews-tab';
import { ITab } from './ITabs';

const tabs = [
  {
    id: 0,
    title: 'Overview',
    child: OverviewTab
  },
  {
    id: 1,
    title: 'Details',
    child: DetailsTab
  },
  {
    id: 2,
    title: 'Reviews',
    child: ReviewsTab
  }
] as ITab[];

interface ITabHeader {
  title: string;
  onItemClicked: () => void;
}

function TabHeader({ title, onItemClicked }: ITabHeader) {
  return <a className='film-nav__link' onClick={() => onItemClicked()}>{title}</a>;
}

export function Tabs() {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <div className='film-card__desc'>
      <nav className='film-nav film-card__nav'>
        <ul className='film-nav__list'>
          {
            tabs.map((x, index) => (
              <li key={x.id} className={`film-nav__item ${activeTab === index && 'film-nav__item--active'}`}>
                <TabHeader
                  title={x.title}
                  onItemClicked={() => setActiveTab(index)}
                />
              </li>
            ))
          }
        </ul>
      </nav>

      {tabs.map((x) => (x.child()))[activeTab]}
    </div>
  );
}
