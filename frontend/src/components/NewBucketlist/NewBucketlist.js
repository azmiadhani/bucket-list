import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const NewBucketlist = ({ getBucketlist }) => {
  const defaultBucket = { name: '', isDone: false };
  const [newBucket, setNewBucket] = useState(defaultBucket);

  // state for error message
  const [errorMessage, setErrorMessage] = useState(null);

  const axiosPrivate = useAxiosPrivate();

  // initial
  useEffect(() => {
    // setErrorMessage('Please Provide');
  }, []);

  // useEffect for newBucket
  useEffect(() => {
    if (newBucket.name == '') {
      resetNewbucketlistState();
    }
    return () => {
      console.log('cleanup');
    };
  }, [newBucket]);

  const handleSubmit = async (e) => {
    console.log('handleSubmit');
    e.preventDefault();
    resetError();
    // send request to the api
    axiosPrivate({
      method: 'post',
      url: '/api/bucketlist',
      data: { name: newBucket.name, isDone: newBucket.isDone },
    })
      .then(function (response) {
        // handle success
        console.log('then => submit response');
        console.log(response);
        try {
          getBucketlist();
        } catch (error) {
          console.log(error);
        }
      })
      .catch(function (err) {
        // handle error
        let resErrorMessage = err?.response?.data?.error?.message;
        setErrorMessage(resErrorMessage ? resErrorMessage : 'Unexpected Error');
      })
      .then(function () {
        // always executed
      });
  };

  // @desc  reset bucket list to default state
  const resetNewbucketlistState = () => {
    if (newBucket.name !== '') {
      console.log('resetName');
      setNewBucketName(defaultBucket.name);
    }
    if (newBucket.isDone) {
      setNewBucketIsDone();
    }
    resetError();
  };

  const resetError = () => {
    setErrorMessage(null);
  };

  const inputNewBucketName = (e) => {
    setNewBucketName(e.target.value);
  };

  const setNewBucketName = (value) => {
    setNewBucket((prev) => {
      return { ...prev, name: value };
    });
  };

  const setNewBucketIsDone = () => {
    setNewBucket((prev) => {
      return { ...prev, isDone: !prev.isDone };
    });
  };

  return (
    <>
      {/* bootstrap input */}
      <form onSubmit={handleSubmit}>
        <div className="input-group border rounded p-2 mb-3">
          <div className="input-group-text bg-transparent border-0 pe-1 ps-2">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              aria-label="Checkbox for following text input"
              onChange={setNewBucketIsDone}
              checked={newBucket.isDone ? 'checked' : ''}
              disabled={newBucket.name !== '' ? '' : 'disabled'}
            />
          </div>
          <input
            type="text"
            className={
              'form-control border-0 ps-1' + (errorMessage ? ' is-invalid' : '')
            }
            placeholder="Type your new bucketlist here..."
            onChange={inputNewBucketName}
            value={newBucket?.name}
          />
          <div className="invalid-feedback ps-4 ms-2">
            {errorMessage && errorMessage}
          </div>
        </div>
        {/* !development temporary as "==", supposedly !== */}
        {newBucket.name !== '' && (
          <div className="btn-group col-12">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={resetNewbucketlistState}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default NewBucketlist;
