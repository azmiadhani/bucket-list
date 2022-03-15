import { useState, useEffect } from 'react';
import Bucketlist from '../../components/Bucketlist/Bucketlist';
import axios from 'axios';

const Home = () => {
  const [bucketlist, setBucketlist] = useState([]);
  const access_token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDczNTE1NDcsImV4cCI6MTY0NzM1NTE0NywiYXVkIjoiNjIzMDc5OTNmN2E3MmU5NTdiN2QzOTNlIiwiaXNzIjoiaHR0cHM6Ly9hem1pYWRoYW5pLmNvbSJ9.d4-HBCz7nboQaoim3VgGPrmPZpLfrBTDEq_Hke3JgTU';
  // useEffect runs only once when the component first renders
  useEffect(() => {
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
        console.log(err);
      })
      .then(() => {
        // always executed
      });
  }, []);
  const reRenderTest = () => {
    var originalBucketlist = [...bucketlist];
    originalBucketlist.push({
      _id: Math.random(),
      name: 'test',
      isDone: false,
    });
    setBucketlist(originalBucketlist);
  };
  return (
    <div className="chome">
      <h2>Homepage</h2>
      <button onClick={reRenderTest}>Test</button>
      <Bucketlist
        datas={bucketlist}
        title="Bucketlist"
        setDatas={setBucketlist}
      />
    </div>
  );
};

export default Home;
