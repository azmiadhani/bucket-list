import { useState, useEffect } from 'react';
import Bucketlist from '../../components/Bucketlist/Bucketlist';
import axios from 'axios';

const Home = () => {
  const [bucketlist, setBucketlist] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const access_token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDc0MTY2NjYsImV4cCI6MTY0NzQyMDI2NiwiYXVkIjoiNjIzMDc5OTNmN2E3MmU5NTdiN2QzOTNlIiwiaXNzIjoiaHR0cHM6Ly9hem1pYWRoYW5pLmNvbSJ9.L3lVAC4Sh5cc6WXHOz_2Wtgi591RD3Cm26N62x_dRRU';
  // get bucketlist data when component is mounted
  useEffect(() => {
    clearAllState();
    axios({
      method: 'get',
      url: 'http://localhost:8001/api/bucketlist',
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    })
      .then((res) => {
        // handle success
        setBucketlist(res.data);
      })
      .catch((err) => {
        // handle error
        console.log(err.response.data.error.message);
        setErrorMessage(err.response.data.error.message);
      })
      .then(() => {
        // always executed
      });
  }, []);
  // clear all state
  const clearAllState = () => {
    setBucketlist(null);
    setErrorMessage(null);
  };
  return (
    <div className="chome">
      {bucketlist && (
        <Bucketlist
          datas={bucketlist}
          title="Bucketlist"
          setDatas={setBucketlist}
        />
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Home;
