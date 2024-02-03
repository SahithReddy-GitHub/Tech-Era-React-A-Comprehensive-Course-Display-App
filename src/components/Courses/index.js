import {Link} from 'react-router-dom'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'
import Navbar from '../Navbar'
import FailureView from '../FailureView'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Courses extends Component {
  state = {coursesList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount = () => {
    this.getCoursesApi()
  }

  getCoursesApi = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const response = await fetch('https://apis.ccbp.in/te/courses')
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      this.setState({
        apiStatus: apiStatusConstants.success,
        coursesList: data.courses,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onHomeRetry = () => {
    this.getCoursesApi()
  }

  renderLoader = () => (
    <div className="loaderCon" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height="50" width="50" />
    </div>
  )

  renderHomeSuccess = () => {
    const {coursesList} = this.state

    return (
      <div className="coursesCon">
        <h1 className="mainHead">Courses</h1>
        <ul className="coursesList">
          {coursesList.map(each => (
            <li className="listItem" key={each.id}>
              <Link to={`/courses/${each.id}`} className="linkCard">
                <img src={each.logo_url} alt={each.name} className="logo" />
                <p className="logoName">{each.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderExplorePage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return <FailureView onRetry={this.onHomeRetry} />
      case apiStatusConstants.success:
        return this.renderHomeSuccess()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bgCon">
        <Navbar />
        {this.renderExplorePage()}
      </div>
    )
  }
}

export default Courses
