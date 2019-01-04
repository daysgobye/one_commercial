import React, { Component } from 'react'

//styles
import style from '../../components/styles/listingPage/data.module.sass'

class propertyData extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}
  validUrl(str) {
    const pattern = new RegExp(
      '(?:(?:https?|ftp|file)://|www.|ftp.)(?:([-A-Z0-9+&@#/%=~_|$?!:,.]*)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:([-A-Z0-9+&@#/%=~_|$?!:,.]*)|[A-Z0-9+&@#/%=~_|$])'
    ) // fragment locater
    if (pattern.test(str)) {
      return true
    } else {
      return false
    }
  }
  render() {
    return (
      <section className={style.data}>
        {this.props.ListingData.map((specs, index) => {
          if (this.validUrl(specs.value)) {
            return (
              <p key={index} className={style.data__line}>
                <a href={specs.value}>{specs.title}</a>
              </p>
            )
          } else if (specs.value === 'true') {
            return (
              <p key={index} className={style.data__line}>
                <span className={style.data__line__title}>{specs.title}:</span>
                <span className={style.data__line__value}>Yes</span>
              </p>
            )
          } else if (specs.value === 'false') {
            return (
              <p key={index} className={style.data__line}>
                <span className={style.data__line__title}>{specs.title}:</span>
                <span className={style.data__line__value}>No</span>
              </p>
            )
          } else {
            return (
              <p key={index} className={style.data__line}>
                <span className={style.data__line__title}>{specs.title}:</span>
                <span className={style.data__line__value}>{specs.value}</span>
              </p>
            )
          }
        })}
      </section>
    )
  }
}

export default propertyData
