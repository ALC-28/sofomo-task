import React from 'react';

const GeolocationSearch: React.FC<any> = (props) => {
  const fields = ['f1'];

  return (
    <div>
      <h1>GeolocationSearch</h1>
      <button type="button" onClick={() => props.perform(fields)}>Perform</button>
    </div>
  );
}

export default GeolocationSearch;
