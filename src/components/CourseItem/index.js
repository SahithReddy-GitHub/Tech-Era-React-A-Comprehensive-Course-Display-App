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

class CourseItem extends Component {
  state = {apiStatus: apiStatusConstants.initial, courseDetails: []}

  componentDidMount = () => {
    this.getCourseDetailsApi()
  }

  getCourseDetailsApi = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()
      this.setState({
        apiStatus: apiStatusConstants.success,
        courseDetails: data.course_details,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetryItem = () => {
    this.getCourseDetailsApi()
  }

  renderSuccessItem = () => {
    const {courseDetails} = this.state

    return (
      <div className="courseItemCon">
        <div className="card">
          <img
            src={courseDetails.image_url}
            alt={courseDetails.name}
            className="img"
          />
          <div className="detailsCard">
            <h1 className="head">{courseDetails.name}</h1>
            <p className="para">{courseDetails.description}</p>
          </div>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loaderCon" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height="50" width="50" />
    </div>
  )

  renderCourseItem = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return <FailureView onRetry={this.onRetryItem} />
      case apiStatusConstants.success:
        return this.renderSuccessItem()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg">
        <Navbar />
        {this.renderCourseItem()}
      </div>
    )
  }
}

export default CourseItem
