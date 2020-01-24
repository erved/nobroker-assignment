import React, { Component } from 'react'

export default class Filter extends Component {
  constructor () {
    super()
    this.state = {
      name: ''
    }
    this.cities = this.cities.bind(this)
    this.homeType = this.homeType.bind(this)
    this.bathroom = this.bathroom.bind(this)
  }

  componentWillMount () {
    this.props.populateAction()
  }

  cities () {

    if (this.props.globalState.formDate.cities !== undefined){
      let {cities} = this.props.globalState.formDate
      return cities.map((item, index) => {
        return (
          <option key={index} value={item}>{item}</option>
        )
    }
      )
    }

}

  homeType(){
    if (this.props.globalState.formDate.homeTypes !== undefined){

      let {homeTypes} = this.props.globalState.formDate
      return homeTypes.map((item, index) => {
          return (
            <option key={index} value={item}>{item}</option>
          )
        }
      )
    }
  }

  bathroom(){
    if (this.props.globalState.formDate.homeTypes !== undefined){

      let {bathroom} = this.props.globalState.formDate

      return bathroom.map((item, index) => {
          return (
            <option key={index} value={item}>{item}+ Br</option>
          )
        }
      )
    }
  }

  render () {
    return (
      <section id="filter">
        <div className="filter-inner-contents">
        <h4>
          Filter
        </h4>
          <label htmlFor="city">Location</label>
        <select name="city" className="filters neighborhood" onChange={this.props.change}>
          <option value='All'>All Locations</option>
          {this.cities()}

          <option value='Bangalore'>Bangalore</option>

        </select>
          <label htmlFor="homeType">Type of House</label>
        <select name="homeType" className="filters housetype" onChange={this.props.change}>
          <option value='All'>All Home Types</option>
          {this.homeType()}

        </select>
          <label htmlFor="bathroom">Number of Bathroom</label>
        <select name="bathroom" className="filters bathroom" onChange={this.props.change}>

          {this.bathroom()}

        </select>

        <div className="filters price">
          <span className="title">Price</span>
          <input type="text" name="min_price" className="min-price" onChange={this.props.change} value={this.props.globalState.min_price} />
          <input type="text" name="max_price" className="max-price" onChange={this.props.change} value={this.props.globalState.max_price} />

        </div>
        <div className="filters floor-space">
          <span className="title">Property Size</span>
          <input type="text" name="min_floor_space" className="min-floor-space" onChange={this.props.change} value={this.props.globalState.min_floor_space} />
          <input type="text" name="max_floor_space" className="max-floor-space" onChange={this.props.change} value={this.props.globalState.max_floor_space} />

        </div>
        <div className="filters extras">
          <span className="title">Amenities</span>
          <label htmlFor="extras">
      <span>
        Elevators
      </span>
            <input type="checkbox" name="elevator" value="elevator" onChange={this.props.change}/>

          </label>

          <label htmlFor="extras">
      <span>
        Swimmming Pool
      </span>
            <input type="checkbox" value="swimming_pool" name="swimming_pool" onChange={this.props.change}/>

          </label>

          <label htmlFor="extras">
      <span>
        Finished Basement
      </span>
            <input type="checkbox" value="finished-basement" name="basement" onChange={this.props.change}/>

          </label>

          <label htmlFor="extras">
      <span>
        Gym
      </span>
            <input type="checkbox" value="gym" name="gym" onChange={this.props.change}/>

          </label>

        </div>
        </div>

      </section>
    )
  }
}


