import React from 'react';
import ItemList from './components/ItemList';

const App = () => {
  return (
    <div className="Container">
      <div className="Card Card--elevated Margin-large">
        <div className="Card-title TextAlign-center">
          <h5 className="Typography-heading20">Band Practice Schedule</h5>
          <p className="Typography-regular14 Color-neutral-80">
            See your band name below
          </p>
        </div>
        <div className="Card-body">
          <ItemList />
        </div>
      </div>
    </div>
  );
};

export default App;
