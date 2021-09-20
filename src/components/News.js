import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      loading: true,
      parsedData: {},
    };
  }

  async update() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cd93ca7ac8d84bebbf0e5c2b91fafc7a&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsed = await data.json();
    this.setState({
      loading: false,
    });
    this.setState({
      articles: this.state.articles.concat(parsed.articles),
      parsedData: parsed,
    });
    document.title = `NewsMonkey-${this.props.category.toUpperCase()}`;
  }

  async componentDidMount() {
    this.update();
  }
  fetchMoreData = () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.update();
  };

  render() {
    return (
      <div>
        <h2 className="mt-4 text-center">
          Top headlines - {this.props.category.toUpperCase()}
        </h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={
            this.state.articles.length < this.state.parsedData.totalResults
          }
          loader={<Spinner />}
        >
          <div className="row" style={{ width: "100%" }}>
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

News.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string,
  country: PropTypes.string,
};

News.defaultProps = {
  pageSize: 12,
  category: "general",
  country: "in",
};
