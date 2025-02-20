import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, ListGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const CLIENT_ID = "8c4dab06e39d492a922d7ac019c72708";
const CLIENT_SECRET = "1fe6de1991d64c41afeb31552977f42c";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState({});
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    // Token
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    };

    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token));
  }, []);

  async function fetchTracks(albumId) {
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    };

    var tracksData = await fetch('https://api.spotify.com/v1/albums/' + albumId + '/tracks', searchParameters)
      .then(response => response.json())
      .then(data => data.items);

    setTracks(prevTracks => ({
      ...prevTracks,
      [albumId]: tracksData
    }));
  }

  async function fetchTopTracks(artistId) {
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    };

    var topTracksData = await fetch('https://api.spotify.com/v1/artists/' + artistId + '/top-tracks?market=BR', searchParameters)
      .then(response => response.json())
      .then(data => data.tracks);

    setTopTracks(topTracksData);
  }

  async function search() {
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    };

    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
      .then(response => response.json())
      .then(data => data.artists.items[0].id);

    await fetchTopTracks(artistID);

    var albumsData = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=BR&limit=50', searchParameters)
      .then(response => response.json())
      .then(data => data.items);

    setAlbums(albumsData);

    albumsData.forEach(album => fetchTracks(album.id));
  }

  return (
    <div className="App">
      
      <Container>
        <InputGroup className='mb-3' size='lg'>
          <FormControl
            placeholder='Search for Artist'
            type='input'
            onKeyPress={event => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={search}>
            Search
          </Button>
        </InputGroup>
      </Container>

      <Container>
        <h2>Top Tracks</h2>
        <ListGroup>
          {topTracks.map((track, i) => (
            <ListGroup.Item key={i}>
              {track.name} - {track.artists.map(artist => artist.name).join(", ")}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>

      <Container>
      <h2>Albums</h2>
        <Row className='mx-2 row row-cols-1'>
          {albums.map((album, i) => (
            <Card key={i}>
              <Card.Img src={album.images[0].url} />
              <Card.Body>
                <Card.Title>{album.name}</Card.Title>
                <ListGroup variant="flush">
                  {tracks[album.id]?.map((track, j) => (
                    <ListGroup.Item key={j}>{track.name}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>

    </div>
  );
}

export default App;