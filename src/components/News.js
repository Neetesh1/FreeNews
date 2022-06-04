import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spiner from './Spiner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    //key1 = ee599410e2384d5cb5d23ca817fd5728 work.neetesh1@gmail.com
    //key2 = 7f370dc49d934d4887b072099f9a928f work.neetesh@gmail.com

    static defultProps = {
        country: 'in',
        pageSize: 15,
        category: 'general',
        apiKey:''
    }
    static propTypes = {
        country: PropTypes.string.isRequired,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        apiKey: PropTypes.string
    }

    captitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        console.log('NEWS Constructor')
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.captitalizeFirstLetter(this.props.category)} - FreeNews`
    }

    componentDidMount() {
        this.getDataFromAPI()
    }

    getDataFromAPI = async () => {
        debugger
        this.props.setProgress(10)

        console.log('API get called')

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        const data = await fetch(url);
        this.props.setProgress(30)
        const parseData = await data.json();
        this.props.setProgress(50)

        this.setState({
            'articles': parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        })
        this.props.setProgress(100)

    }

    fetchMoreData = async () => {   

       

        console.log('api from infinite scroll');

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        const data = await fetch(url);
        const parseData = await data.json();

        this.setState({
            'articles': this.state.articles.concat(parseData.articles),
            page: this.state.page + 1,
            loading: false
        })
        
    };


    render() {
        
        return (
            <div className='container my-3'>
                <h2 className='text-center' style={{ margin: "40px 0" }}>FreeNews - Top {this.captitalizeFirstLetter(this.props.category)} headlines</h2>
                
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spiner />}
                >

                    <div className='row'>
                        {this.state.articles.map((element) => {
                            return <div className="col-md-3" key={element.url}>
                                <NewsItem title={element.title} description={element.description} newsUrl={element.url} imgUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })
                        }
                    </div>
                </InfiniteScroll>
            </div>

        )
    }
}

export default News