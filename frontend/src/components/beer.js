import React from "react"

export default class Beer extends React.Component {
  render() {
    const { name, style, rating } = this.props.beer
    return (
      <div>
        {name} - {style} - {rating}
      </div>
    )
  }
}
