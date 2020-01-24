import React, { Component } from 'react'
import Filter from './Filter.js'
import Listings from './Listings.js'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      propertyType:'',
      floor:0,
      deposit:0,
      listings,
      city: 'All',
      homeType: 'All',
      bathroom: 0,
      min_price: 0,
      max_price: 10000000,
      min_floor_space: 0,
      max_floor_space: 500000,
      creationDate,
      typeDesc,
      elevator: false,
      swimming_pool: false,
      finished: false,
      gym: false,
      filteredData: listings,
      formDate: '',
      sortby: 'rent-asc',
      view: 'long',
      search: ''
    }
    this.change = this.change.bind(this)
    this.filter = this.filter.bind(this)
    this.populate = this.populate.bind(this)
    this.changeView = this.changeView.bind(this)
  }

  componentWillMount() {
    let listingsData = this.state.listings.sort((a, b) => {
      return a.price - b.price
    })
    this.setState({
      listingsData
    })
  }

  componentDidMount() {
    fetch('https://demo8808386.mockable.io/fetchProperties')
      .then(res => res.json())
      .then(res => {
        this.setState({ listings: res })
      })
  }

  // sortRent = (list) => {
  //   let rentArray = [];
  //   let flag = this;
  //   this.setState({
  //     asc: !this.state.asc,
  //   })
  //   if (list) {
  //     list.data.map(item => {
  //       rentArray.push(item.rent);
  //     })
  //     rentArray.sort(function (a, b) {
  //       if (flag.state.asc && a > b) {
  //         return a - b;
  //       } else {
  //         return b - a;
  //       }
  //     })
  //     this.setState({
  //       rent: rentArray
  //     })
  //   }
  // }

  change (event) {
    let name = event.target.name
    let value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value

    this.setState({
        [name]: value
      },
      () => {

        this.filter()
      }
    )
  }

  changeView(viewName){
    this.setState({
      view: viewName
    })
  }

  filter () {
    let newData = this.state.listings.filter((item) => {
      return (item.rent >= this.state.min_price &&
        item.rent <= this.state.max_price  &&
        item.propertySize >= this.state.min_floor_space &&
        item.propertySize <= this.state.max_floor_space &&
        item.creationDate >= this.state.creationDate)
    }
    )

    // more filters
    if (this.state.city !== 'All') {
      newData = newData.filter((item) => {
        return item.city === this.state.city
      })
    }
    if (this.state.homeType !== 'All') {
      newData = newData.filter((item) => {
        return item.homeType === this.state.homeType
      })
    }

    if(this.state.sortby === 'rent-dsc'){
      newData = newData.sort((a,b) => {
        return a.price - b.price
      })
    }

    if(this.state.sortby === 'rent-asc'){
      newData = newData.sort((a,b) => {
        return b.price - a.price
      })
    }
    if(this.state.search !== ''){
      newData = newData.filter((item) => {
        let city = item.city.toLowerCase()
        let searchText = this.state.search.toLocaleLowerCase()
        let n = city.match(searchText)
        if (n != null) {
          return true
        }
      })
    }

    this.setState({
      filteredData: newData
    }
    )
  }

  populate () {
    // city

    let cities = this.state.listings.map((item) => {
      return item.city
    })

    cities = new Set(cities)
    cities = [...cities]
    cities.sort()

    // home type
    let homeTypes = this.state.listings.map((item) => {
      return item.type
    })


    homeTypes = new Set(homeTypes)
    homeTypes = [...homeTypes]
    homeTypes.sort()

    // bath room
    let bathroom = this.state.listings.map((item) => {
      return item.bathroom
    })

    bathroom = new Set(bathroom)
    bathroom = [...bathroom]
    bathroom.sort()

    this.setState({
      formDate: {
        cities,
        homeTypes,
        bathroom
      }
    }
    )
  }


  render () {
    return (<div>
      <section id='content-area'>
        <Filter globalState={this.state} change={this.change} populateAction={this.populate}/>
        <Listings listings={this.state.filteredData} change={this.change} globalState={this.state} changeView={this.changeView} />
      </section>
    </div>)
  }
}

export default App;
