import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        ///let title, description] = this.props;
        let title = this.props.title;
        let description = this.props.description;
        const imgUrl = this.props.imgUrl
        const newsUrl = this.props.newsUrl
        const author = this.props.author
        const date = this.props.date
        const source = this.props.source
        return (
            <div className='my-3'>
                <div className="card">
                    <span className="position-absolute top-0 translate-right badge  bg-danger" style={{right:0}}>
                        {source}
                        <span className="visually-hidden">Source</span>
                    </span>
                    <img src={imgUrl ? imgUrl : 'https://via.placeholder.com/300/09f/fff.png'} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : 'Unknown'} on {new Date(date).toUTCString()}</small></p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark" rel="noreferrer">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem