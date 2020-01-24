import React, { Component } from 'react'

export default class Listings extends Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
    this.loopListings = this.loopListings.bind(this)
  }

  // function written to show images of home
  showGallery(listing) {
    if (listing) {
      listing.photos.forEach(element => {
        return element.imagesMap.original;
      });
    }
  }

  loopListings() {
    let { listings } = this.props

    if (listings === undefined || listings.length === 0) {
      return 'Sorry there were no matches for your selected filters'
    }

    return listings.map((listing, index) => {
      // this is the box view
      if (this.props.globalState.view === 'box') {
        return (<div className='col-md-3 listings-results' key={index}>
          <div className='listing'>
            <div className='listing-img' style={{ background: `url("${this.showGallery(listing)}") no-repeat center center` }}>
              <span className='address'>{listing.locality}</span>
              <div className='details'>
                <div className='col-md-3'>
                  <div className='user-img'></div>
                </div>


                <div className='col-md-9'>
                  <div className='user-details'>
                    <span className='user-name'>ved prakash</span>
                    <span className='post-date'>Posted on 24/01/2020</span>
                  </div>
                  <div className='listing-details'>
                    <div className='floor-space'>
                      <i className='fa fa-square-o'></i>
                      <span>{listing.propertySize}ft &sup2;</span>

                    </div>
                    <div className='bathroom'>
                      <i className='fa fa-bed'></i>
                      <span>{listing.bathroom} bathroom</span>
                    </div>

                  </div>
                  <div className='view-btn'>
                    View Listing
                  </div>

                </div>

              </div>
            </div>

            <div className='bottom-info'>
              <span className='listing-price'>${listing.rent} per month</span>
              <span className='listing-location'>
                <i className='fa fa-map-marker'></i>
                {listing.city}, {listing.state}
              </span>

            </div>

          </div>
        </div>)
      } else {
        // this is the long view
        return (<div className='col-md-12 col-lg-6 listings-results' key={index}>
          <div className='listing'>
            <div className='listing-img' style={{ background: `url("${listing.photos}") no-repeat center center` }}>
              <span className='address'>{listing.address}</span>
              <div className='details'>
                <div className='col-md-3'>
                  <div className='user-img'></div>
                </div>


                <div className='col-md-9'>
                  <div className='user-details'>
                    <span className='user-name'>john</span>
                    <span className='post-date'>Posted on 20/01/2020</span>
                  </div>
                  <div className='listing-details'>
                    <div className='floor-space'>
                      <i className='fa fa-square-o'></i>
                      <span>{listing.propertySize}ft &sup2;</span>

                    </div>
                    <div className='bathroom'>
                      <i className='fa fa-bed'></i>
                      <span>{listing.bathroom} bathroom</span>
                    </div>

                  </div>
                  <div className='view-btn'>
                    View Listing
                  </div>

                </div>

              </div>
            </div>

            <div className='bottom-info'>
              <span className='listing-price'>${listing.price} per month</span>
              <span className='listing-location'>
                <i className='fa fa-map-marker'></i>
                {listing.city}, {listing.state}
              </span>

            </div>

          </div>
        </div>)
      }
    }
    )
  }

  render() {
    return (
      <section id='listings'>
        <section className='search-area'>
          <input type='text' name='search' onChange={this.props.change} placeholder='Search...' />

        </section>
        <section className='sortby-area'>
          <div className='results'>
            {this.props.listings.length} results found
          </div>
          <div className='sort-options'>
            <select name='sortby' className='sortby' onChange={this.props.change}>
              <option value='price-dsc'>Lowest Price</option>
              <option value='price-asc'>Higest Price</option>


            </select>
            <div className='view'>
              <i className='fa fa-th-list' onClick={this.props.changeView.bind(null, 'long')}></i>
              <i className='fa fa-th' onClick={this.props.changeView.bind(null, 'box')}></i>
            </div>
          </div>
        </section>
        <section className='listings-results'>
          <div className='row'>
            {this.loopListings()}
          </div>
        </section>
        <section id='pagination'>
          <div className='row'>

            <ul className='pages'>
              <li>Prev</li>
              <li className='active'>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>Next</li>
            </ul>
          </div>
        </section>
      </section>

    )
  }
}
