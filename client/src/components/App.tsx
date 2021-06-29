import React from 'react';
import NavigationBar from './NavigationBar';

const App = (): React.ReactElement => (
  <>
    <div className="container">
      <div className="row">
        <div className="col">
          <NavigationBar />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h1>Hello world</h1>
        </div>
      </div>
    </div>
  </>
);

export default App;
