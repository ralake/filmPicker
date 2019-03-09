import { Component, h } from 'preact'
/** @jsx h */

class AtomProvider extends Component {
  getChildContext () {
    return {
      atom: this.props.atom,
      split: this.props.split
    }
  }

  render ({ children }) {
    return children[0]
  }
}

export default AtomProvider
