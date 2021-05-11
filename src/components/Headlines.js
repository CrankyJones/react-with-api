import React from 'react'

class Headlines extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      headlines: []
    };
  }

makeApiCall = () => {
  fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.REACT_APP_API_KEY}`)
  .then(response => response.json())
  .then(
    (jsonifiedResponse) => {
      this.setState({
        isLoaded: true,
        headlines: jsonifiedResponse.results
      });
    })
  .catch((error) => {
    this.setState({
      isLoaded: true,
      error
    });
  });
}

componentDidMount() {
  this.makeApiCall()
}

  render() {
    const {error, isLoaded, headlines } = this.state;
    if (error) {
      return <>Error: {error.message}</>;
    } else if (!isLoaded) {
      return <>Loading...</>;
    } else {
      return (
        <>
          <h1>Headlines</h1>
          <ul>
            {headlines.map((headlines, index) =>
            <li key={index}>
              <h3>{headlines.title}</h3>
              <p>{headlines.abstract}</p>
            </li>
          )}
          </ul>
        </>
      );
    }
  }
}

export default Headlines;