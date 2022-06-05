import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spiner from './Spiner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const captitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        document.title = `${captitalizeFirstLetter(props.category)} - FreeNews`
        getDataFromAPI();
    }, [])


    const getDataFromAPI = async () => {
       
        props.setProgress(10);

        console.log('API get called')

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading( true )
        const data = await fetch(url);
        props.setProgress(30)
        const parseData = await data.json();
        props.setProgress(50)
        setArticles(parseData.articles);
        setTotalResults(parseData.totalResults);
        setLoading(false);
        props.setProgress(100)

    }

    const fetchMoreData = async () => {



        console.log('api from infinite scroll');

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setLoading(true )
        const data = await fetch(url);
        const parseData = await data.json();
        setArticles(articles.concat(parseData.articles))
        setPage(page + 1)
        setLoading(false);

       

    };




    return (
        <div className='container my-3'>
            <h2 className='text-center' style={{ margin: "40px 0" }}>FreeNews - Top {captitalizeFirstLetter(props.category)} headlines</h2>

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spiner />}
            >

                <div className='row'>
                    {articles.map((element) => {
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

News.defultProps = {
    country: 'in',
    pageSize: 15,
    category: 'general',
    apiKey: ''
}
News.propTypes = {
    country: PropTypes.string.isRequired,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string
}


export default News