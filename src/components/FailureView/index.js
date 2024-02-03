import './index.css'

const FailureView = props => {
  const {onRetry} = props

  const onBtnClick = () => {
    onRetry()
  }

  return (
    <div className="failCon">
      <div className="failCard">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
          className="failImg"
        />
        <h1 className="failHead">Oops! Something Went Wrong</h1>
        <p className="failPara">
          We cannot seem to find the page you are looking for.
        </p>
        <button type="button" className="failBtn" onClick={onBtnClick}>
          Retry
        </button>
      </div>
    </div>
  )
}

export default FailureView
