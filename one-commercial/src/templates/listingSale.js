import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ButtonRound from '../components/buttonRound/buttonRound'
import Hero from "../components/listingpage/heroImg"
import PropertyData from "../components/listingpage/PropertyData"
import PhotoArray from "../components/listingpage/photoArray"
import GoogleMap from "../components/listingpage/googleMap/googleMap"
import ShareLinkButtons from "../components/listingpage/shareLinkButtons/shareLinkButtons"
import Content from "../components/content"



// import ButtonRound from '../components/buttonRound'

import style from "./listing.module.sass"

class listing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listingInfo: [],
        }
        this.availableCheck = this.availableCheck.bind(this)
    }
    availableCheck(ifTrue, ifFalse) {
        if (this.props.data.contentfulPropertyForSale.available) {
            return ifTrue
        } else {
            return ifFalse
        }
    }
    listingData(data) {
        const listingArr = [
            {
                title: "Property Type",
                value: data.propertyType
            },
            {
                title: "Building / Lot Size",
                value: `${data.buildinglotSize} ${data.measurementUnit}`
            },
            {
                title: "Category",
                value: data.category
            }, {
                title: "Under Pending Contract ",
                value: data.underContractpending.toString()
            },
        ]
        let price = []
        if (data.displaySalePrice) {
            price.push({
                title: "Price",
                value: `$${data.salePrice.toLocaleString()}`
            })
        } else {
            price.push({
                title: "Contact Us For Price",
                value: `${window.location.hostname}/contact/`
            })
        }
        return this.setState({ listingInfo: listingArr.concat(price) })


    }

    // life cycle hooks 
    componentWillMount() {
    }
    componentDidMount() {
        this.listingData(this.props.data.contentfulPropertyForSale)

    }
    render() {
        const listing = this.props.data.contentfulPropertyForSale
        return (
            <Layout>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{listing.name}</title>
                    <meta name="description" content={listing.propertyDescription.childContentfulRichText.html.replace(/<p[^>]*>/g, "").replace(/<\/?p[^>]*>/g, "").substring(0, 100)} />
                </Helmet>
                <Hero
                    heroBackgroundImage={listing.mainImage.file.url}
                    flag={this.availableCheck("Sold!", "For Sale!")}
                ></Hero>
                <Content>
                    <div className={style.wraper}>
                        <div className={style.body}>

                            <div className=
                                {style.body__left}>
                                <div className={style.body__left__title}>
                                    <h2>{listing.name}</h2>
                                    <div className={style.body__left__title__adddress}>
                                        <p dangerouslySetInnerHTML={{ __html: listing.address.childContentfulRichText.html }}></p>
                                        <p>&nbsp;{listing.city} {listing.state}</p>
                                    </div>

                                </div>
                                <PropertyData ListingData={this.state.listingInfo}></PropertyData>
                                <p className={style.body__left__description}
                                    dangerouslySetInnerHTML={{ __html: listing.propertyDescription.childContentfulRichText.html }}></p>
                                <h3>More Information</h3>
                                <h4>Map</h4>
                                <GoogleMap
                                    address={`${listing.address.childContentfulRichText.html} ${listing.city} ${listing.state}`}
                                ></GoogleMap>
                                <h3 className={style.body__left__share}>Share {listing.name}</h3>
                                <ShareLinkButtons
                                    url={this.props.location.href}
                                    icons={[{

                                        site: "facebook"
                                    }, {

                                        site: "twitter"
                                    },
                                    {

                                        site: "linkedin"
                                    }
                                    ]} ></ShareLinkButtons>
                                <h3 className={style.body__left__view}>{this.availableCheck("View Other Listings For Sale", "View Listing")}</h3>
                                <ButtonRound
                                    type="link"
                                    pos="start"
                                    action={this.availableCheck("/saleindex", listing.officialListingLink)}
                                    innerText={this.availableCheck("All For Sale Listings", `see ${listing.name} on LoopNet`)}
                                ></ButtonRound>
                            </div>
                            <div className={style.body__right}>
                                <h4>Additional Photos</h4>
                                <PhotoArray
                                    imageArray={listing.propertyPhotos}
                                    altImage={listing.mainImage}
                                ></PhotoArray>
                            </div>
                        </div>
                        <div className={style.contact}>
                            <h4>{this.availableCheck(`Intersted In Details on ${listing.name}`, `Intersted In Purchasing ${listing.name}`)}</h4>
                            <ButtonRound
                                innerText={`Contact Us About ${listing.name}`}
                                action={`contact`}
                                type="gatsbylink"
                                passedState={listing.name}
                            ></ButtonRound>

                        </div>
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default listing;
export const query = graphql`

  query($id: String!) {
    contentfulPropertyForSale(id: { eq: $id }) {
        available
        name
        id
    
    		address{
                childContentfulRichText {
                    html
                  }
        }
        city
        state
      propertyDescription{
        childContentfulRichText {
            html
          }
        
      }
      salePrice
      displaySalePrice
        category
        buildinglotSize
        measurementUnit
        propertyType
        underContractpending
        officialListingLink
        displayProperty
        mainImage {
          file {
            url
          }
        }
        propertyPhotos {
          file {
            url
          }
        }
      

    }
  }
`

