import React from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import { DETAIL_PAGE } from "./queries";

import Movie from "./Movie";
import MovieDetail from "./MovieDetail";

const Detail = ({
  match: {
    params: { movieId }
  }
}) => (
  <Query query={DETAIL_PAGE} variables={{ movieId: parseInt(movieId) }}>
    {({ loading, data, error }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Something happens... {error}</div>;

      return (
        <React.Fragment>
          <MovieDetail
            id={data.ytsMovie.id}
            title={data.ytsMovie.title_long}
            rating={data.ytsMovie.rating}
            poster={data.ytsMovie.medium_cover_image}
            desc={data.ytsMovie.description_intro}
            genres={data.ytsMovie.genres}
            imdb={data.ytsMovie.imdb_code}
          />
          <div className="detail">
            <h2>Sugesstions</h2>
          </div>
          <div id="columns">
            {data.ytsMovieSuggestions.map(movie => (
              <Movie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                rating={movie.rating}
                poster={movie.medium_cover_image}
              />
            ))}
          </div>
        </React.Fragment>
      );
    }}
  </Query>
);

export default withRouter(Detail);
