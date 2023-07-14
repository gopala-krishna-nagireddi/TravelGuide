import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './App.css'

// Replace your code here
class App extends Component {
  state = {travelsList: [], isLoading: false}

  componentDidMount() {
    this.setState({isLoading: true})
    this.getTravelGuideList()
  }

  getTravelGuideList = async () => {
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      const {packages} = data

      const updatedData = packages.map(eachPackage => ({
        id: eachPackage.id,
        name: eachPackage.name,
        imageUrl: eachPackage.image_url,
        description: eachPackage.description,
      }))

      this.setState({travelsList: updatedData, isLoading: false})
    }
  }

  renderTravelsList = () => {
    const {travelsList} = this.state

    return (
      <ul className="travels-list">
        {travelsList.map(eachTravel => {
          const {id, name, imageUrl, description} = eachTravel

          return (
            <li className="travel-list-item" key={id}>
              <div className="travel-item">
                <img className="place-img" src={imageUrl} alt={name} />
                <div className="name-description-container">
                  <h1 className="name">{name}</h1>
                  <p className="description">{description}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="app-container">
        <h1 className="main-heading">Travel Guide</h1>
        {isLoading ? this.renderLoadingView() : this.renderTravelsList()}
      </div>
    )
  }
}

export default App
