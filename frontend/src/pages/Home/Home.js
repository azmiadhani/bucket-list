import { useState, useEffect } from 'react';
import Bucketlist from '../../components/Bucketlist/Bucketlist';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Home = () => {
  const [bucketlist, setBucketlist] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  // get bucketlist data when component is mounted
  useEffect(() => {
    clearAllState();
    getBucketlist();
  }, []);

  useEffect(() => {
    if (initialLoad == false) {
      console.log('bucketlist initial load done');
    }
  }, [bucketlist]);

  // @desc  get bucketlist from api
  const getBucketlist = () => {
    axiosPrivate({
      method: 'get',
      url: '/api/bucketlist',
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
  };

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
          setInitialLoad={setInitialLoad}
        />
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Home;
