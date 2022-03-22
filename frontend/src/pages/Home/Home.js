import { useState, useEffect } from 'react';
import Bucketlist from '../../components/Bucketlist/Bucketlist';
import axios from 'axios';

const Home = () => {
  const [bucketlist, setBucketlist] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const access_token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDc1ODg4OTEsImV4cCI6MTY0NzU5MjQ5MSwiYXVkIjoiNjIzMDc5OTNmN2E3MmU5NTdiN2QzOTNlIiwiaXNzIjoiaHR0cHM6Ly9hem1pYWRoYW5pLmNvbSJ9.7rp103BCDzSVB5n8_UWmAaCBJwC2iEzWGE_PmgZ5lvw';
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
        setBucketlist(res?.data);
      })
      .catch((err) => {
        // handle error
        let errorMessage = err?.response?.data?.error?.message;
        setErrorMessage(errorMessage ? errorMessage : 'Unexpected Error');
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
    <div className="ms-5">
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
