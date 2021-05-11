import React from 'react';
import { connect } from 'react-redux';
import { makeApiCall } from '.././actions';

class Headlines extends React.Component {
  constructor (props) {
    super(props);
  }

componentDidMount() {
  const { dispatch } = this.props;
  dispatch(makeApiCall());
}

  render() {
    const { error, isLoading, headlines } = this.props;
    if (error) {
      return <>Error: {error.message}</>;
    } else if (isLoading) {
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

const mapStateToProps = state => {
  return {
    headlines: state.headlines,
    isLoading: state.isLoading,
    error: state.error
  }
}


export default connect(mapStateToProps)(Headlines);