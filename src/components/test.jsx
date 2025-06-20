import React from 'react';

class Contador extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 }; // Estado inicial
  }

  render() {
    return (
      <div>
        <p>Contador: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Incrementar
        </button>
      </div>
    );
  }
}

export default Contador;