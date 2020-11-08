import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 40%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
`;

const Data = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-left: 10px;
  margin-bottom: 30px;
`;

const Videos = styled.a`
  margin-top: 15px;
  text-decoration: underline;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: baseline;
  margin: 10px 0;
`;

const Item = styled.span`
  font-size: 14px;
  margin-top: 15px;
`;

const Info = styled.div`
  font-size: 14px;
  margin-top: 6px;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 14px;
  opacity: 0.8;
  line-height: 1.5;
  width: 50%;
`;

const Icon = styled.img`
  position: relative;
  top: 14px;
  height: 40px;
`;

const Seasons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Season = styled.div`
  margin-right: 30px;
`;

const Poster = styled.div`
  height: 200px;
  width: 140px;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
  margin-top: 15px;
`;

const DetailPresenter = ({ isMovie, result, loading, error }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require('../../assets/noPosterSmall.png')
          }
        />
        <Side>
          <Data>
            <Title>
              {result.original_title
                ? result.original_title
                : result.original_name}
            </Title>
            <ItemContainer>
              <Item>
                {result.release_date
                  ? result.release_date.substring(0, 4)
                  : result.first_air_date.substring(0, 4)}
              </Item>
              <Divider>•</Divider>
              <Item>
                {result.runtime
                  ? result.runtime
                  : result.runtime === 0
                  ? 0
                  : result.episode_run_time[0]}{' '}
                min
              </Item>
              <Divider>•</Divider>
              <Item>
                {result.genres &&
                  result.genres.map((genre, index) =>
                    index === result.genres.length - 1
                      ? genre.name
                      : `${genre.name} / `
                  )}
              </Item>
              <Divider>•</Divider>

              {result.imdb_id ? (
                <a href={`https://imdb.com/title/${result.imdb_id}`}>
                  <Icon src='https://img.icons8.com/color/452/imdb.png' />
                </a>
              ) : (
                <Item>No IMDB</Item>
              )}
            </ItemContainer>
            <Overview>{result.overview}</Overview>
          </Data>
          {!isMovie && (
            <Data>
              <Title>Seasons</Title>
              <Seasons>
                {result.seasons ? (
                  result.seasons.map((season) => {
                    return (
                      <Season key={season.id}>
                        <Poster
                          bgImage={`https://image.tmdb.org/t/p/original${season.poster_path}`}
                        />
                        <Info>
                          S{season.season_number} {season.name}
                        </Info>
                        <Info>{season.episode_count} episodes</Info>
                      </Season>
                    );
                  })
                ) : (
                  <Item>"Can't find Season infomations"</Item>
                )}
              </Seasons>
            </Data>
          )}
          <Data>
            <Title>Videos</Title>
            {result.videos ? (
              result.videos.results.map((video) => (
                <Videos
                  key={video.id}
                  href={`https://youtube.com/watch?v=${video.key}`}>
                  <Item>{video.name}</Item>
                </Videos>
              ))
            ) : (
              <Item>No Videos</Item>
            )}
          </Data>
          <Data>
            <Title>Production Company</Title>
            {result.production_companies ? (
              result.production_companies.map((company) => (
                <Item key={company.id}>{company.name}</Item>
              ))
            ) : (
              <Item>No Companies</Item>
            )}
          </Data>
          <Data>
            <Title>Production Contries</Title>
            {result.production_countries ? (
              result.production_countries.map((country, idx) => (
                <Item key={idx}>{country.name}</Item>
              ))
            ) : (
              <Item>No Contries</Item>
            )}
          </Data>
        </Side>
      </Content>
      {error && <Message color='#e74c3c' text={error} />}
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
