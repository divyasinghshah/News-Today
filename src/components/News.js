import React from 'react'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from './Spinner';
import Newsitem from './Newsitem';
const News = (props) => {
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(false);
  const [page, setpage] = useState(1);
  const [totalResult, settotalResult] = useState(0);

  const updateNews = async () => {
    console.log(props.apiKey);

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}`;
    setloading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData.articles);
    setarticles(parsedData.articles);
    setloading(false);
    settotalResult(parsedData.totalResult);


  }
  const fetchMoreData = async () => {
    await setpage(page + 1);

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
   
    setloading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData.articles);
    setarticles(articles.concat(parsedData.articles));
    setloading(false);
    settotalResult(parsedData.totalResult);


  }

  useEffect(() => {
    updateNews();

  }, [])


  return (
    <>
    <div className='heading my-5'>
        <h2 className='  display-6 '>News Today - Top Headlines</h2>
    </div>
   
   {loading && <Spinner/>}

  <InfiniteScroll
    pageStart={0}
    dataLength={articles.length}
    hasMore={articles.length !== totalResult}
    loader={<Spinner />}
    next={fetchMoreData}
  >
    <div className="container">


      <div className="row">

        {articles.map((element) => {
          return <div className="col-md-3" key={element.url}>
            <Newsitem title={element.title} description={element.description}
              imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
          </div>

        })}



      </div>
    </div>

  </InfiniteScroll>
  </>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
  apiKey: '9c81dad13a8646e4bd4c34757b61e70b'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string
}

export default News