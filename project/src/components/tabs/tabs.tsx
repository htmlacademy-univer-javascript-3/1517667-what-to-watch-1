import React from 'react';
import { TabOverview } from '../tab-overview/tab-overview';
import { TabDetails } from '../tab-details/tab-details';
import { TabReviews } from '../tab-reviews/tab-reviews';
import { ITab } from '../../types/ITabs';

const tabs = [
  {
    id: 0,
    title: 'Overview',
    child: TabOverview
  },
  {
    id: 1,
    title: 'Details',
    child: TabDetails
  },
  {
    id: 2,
    title: 'Reviews',
    child: TabReviews
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
            tabs.map((tab, index) => (
              <li key={tab.id} className={`film-nav__item ${activeTab === index && 'film-nav__item--active'}`}>
                <TabHeader
                  title={tab.title}
                  onItemClicked={() => setActiveTab(index)}
                />
              </li>
            ))
          }
        </ul>
      </nav>

      {tabs.map((tab) => (tab.child()))[activeTab]}
    </div>
  );
}
