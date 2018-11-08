import React from "react"
import Beer from "./beer"

class App extends React.Component {
  state = {
    beers: [],
    filter: ""
  }

  componentDidMount() {
    fetch("http://localhost:8080/beers")
      .then(response => response.json())
      .then(json => {
        this.setState({ beers: json })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filter !== this.state.filter) {
      fetch(`http://localhost:8080/beers?style=${this.state.filter}`)
        .then(response => response.json())
        .then(json => {
          this.setState({ beers: json })
        })
    }
  }

  handleFilterChange = event => {
    this.setState({
      filter: event.target.value
    })
  }

  render() {
    return (
      <div>
        <select onChange={this.handleFilterChange}>
          <option value="">All</option>
          <option value="Lager">Lager</option>
          <option value="IPA">IPA</option>
          <option value="Pilsner">Pilsner</option>
          <option value="wheat">Wheat</option>
        </select>
        {this.state.beers.map(beer => (
          <Beer beer={beer} />
        ))}
      </div>
    )
  }
}

export default App
