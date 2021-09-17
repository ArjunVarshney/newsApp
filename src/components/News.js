import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      parsedData: {},
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cd93ca7ac8d84bebbf0e5c2b91fafc7a&page=1&pagesize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsed = await data.json();
    this.setState({
      articles: parsed.articles,
      parsedData: parsed,
      loading: false,
    });
  }

  nextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=cd93ca7ac8d84bebbf0e5c2b91fafc7a&page=${
      this.state.page + 1
    }&pagesize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsed = await data.json();
    this.setState({
      articles: parsed.articles,
      parsedData: parsed,
      page: this.state.page + 1,
      loading: false,
    });
  };
  previousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=cd93ca7ac8d84bebbf0e5c2b91fafc7a&page=${
      this.state.page - 1
    }&pagesize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsed = await data.json();
    this.setState({
      articles: parsed.articles,
      parsedData: parsed,
      page: this.state.page - 1,
      loading: false,
    });
  };

  render() {
    return (
      <div>
        <h2 className="mt-4 text-center">Top headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {console.log(this.state.articles)}
          {!this.state.loading &&
            this.state.articles.map((element) => {
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
        <div className="container d-flex justify-content-around my-4">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-primary"
            onClick={this.previousClick}
          >
            &#x2190; Previous
          </button>
          <button
            disabled={
              this.state.parsedData.totalResults <= 100
                ? this.state.page * this.props.pageSize >=
                  this.state.parsedData.totalResults
                : this.state.page * this.props.pageSize >= 100
            }
            type="button"
            className="btn btn-primary"
            onClick={this.nextClick}
          >
            Next &#x2192;
          </button>
        </div>
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
