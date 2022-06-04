import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spiner from './Spiner';
import PropTypes from 'prop-types';

export class News extends Component {

    static defultProps = {
        country:'in',
        pageSize:15,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string.isRequired,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    captitalizeFirstLetter = (string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    }

    constructor(props){
        super(props);
        console.log('NEWS Constructor')
        this.state =  {
            articles:[],
            loading:false,
            page:1,
            pageSize:0
        }
        document.title = `${this.captitalizeFirstLetter(this.props.category)} - FreeNews`
    }

    componentDidMount(){
         console.log('cdm')
         this.getDataFromAPI()
    }

    handlePrevClick = ()=> {
        console.log('Previous call')
        this.setState({page:this.state.page -1})
        this.getDataFromAPI()

    }
    handleNextClick = ()=>{
        console.log('Next call')
        this.setState({page:this.state.page +1})
        this.getDataFromAPI()

    }

    getDataFromAPI = async ()=> {

        console.log('API get called')

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7f370dc49d934d4887b072099f9a928f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        const data = await fetch(url);
        const parseData = await data.json();

        this.setState({ 'articles' : parseData.articles,
            totalResults: parseData.totalResults,
            loading:false
        })

    }


    render() {
        console.log('News Render')
        return (
            <div className='container my-3'>
                <h2 className='text-center' style={{margin:"40px 0"}}>FreeNews - Top {this.captitalizeFirstLetter(this.props.category)} headlines</h2>
                { this.state.loading && <Spiner />}
                <div className="container d-flex justify-content-between my-4">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-sm btn-dark" onClick={this.handlePrevClick} >&larr; Previous</button>
                    <button disabled={this.state.totalResults && this.state.page > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-sm btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
                </div>
                <div className='row'>
                {
                    !this.state.loading && this.state.articles.map(  (element) => {
                        return <div className="col-md-3" key={element.url}> 
                            <NewsItem title={ element.title} description={element.description} newsUrl={element.url} imgUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                        
                    })
                }
                </div>
                <div className="container d-flex justify-content-between my-4">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-sm btn-dark" onClick={this.handlePrevClick} >&larr; Previous</button>
                    <button disabled={this.state.totalResults && this.state.page > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-sm btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
                </div>
            </div>
            
        )
    }
}

export default News