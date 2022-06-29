import { Component } from 'react'
import { NotFound } from 'pages'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }
  componentDidCatch(error, errorInfo) {
    // Send error information to the server for devs to fix bug
    console.log(error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
      return <NotFound />
    }
    return this.props.children
  }
}

export default ErrorBoundary
