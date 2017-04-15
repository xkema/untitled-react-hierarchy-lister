import React from 'react';

export default class App extends React.Component {

  render() {
    console.log(this.props.dataset);
    return (
      <div>
        <p>hola lola react!</p>
      </div>
    );
  }

}