import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      parsedData: {},
    };
    document.title = `${this.props.category.toUpperCase()}-NewsMonkey`;
  }

  async update() {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cd93ca7ac8d84bebbf0e5c2b91fafc7a&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsed = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsed.articles),
      parsedData: parsed,
      loading: false,
    });
  }

  async componentDidMount() {
    this.update();
  }
  async fetchMoreData() {
    this.update()
  }

  render() {
    return (
      <div>
        <h2 className="mt-4 text-center">
          Top headlines on {this.props.category.toUpperCase()}
        </h2>
        <div className="row">
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData()}
            hasMore={this.state.articles.length <= this.props.totalResult}
            loader={<Spinner />}
          >
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
          </InfiniteScroll>
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
