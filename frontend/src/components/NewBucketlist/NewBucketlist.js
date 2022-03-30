import { useState, useEffect } from 'react';

const NewBucketlist = ({}) => {
  const defaultBucket = { name: '', isDone: false };
  const [newBucket, setNewBucket] = useState(defaultBucket);

  // state for error message
  const [errorMessage, setErrorMessage] = useState(null);

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

  // @desc  reset bucket list to default state
  const resetNewbucketlistState = () => {
    if (newBucket.name !== '') {
      console.log('resetName');
      setNewBucketName(defaultBucket.name);
    }
    if (newBucket.isDone) {
      setNewBucketIsDone();
    }
    setErrorMessage(false);
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
          required
          onChange={inputNewBucketName}
          value={newBucket?.name}
        />
        <div className="invalid-feedback ps-4 ms-2">
          {errorMessage && errorMessage}
        </div>
      </div>
      {newBucket.name !== '' && (
        <div className="btn-group col-12">
          <button type="button" className="btn btn-primary">
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
      {/* <div className="row mb-3">
        <div className="d-grid col-md-6 col-sm-12">
          <button className="btn btn-primary" type="button">
            Save
          </button>
        </div>
        <div className="d-grid col-md-6 col-sm-12">
          <button className="btn btn-primary" type="button">
            Save
          </button>
        </div>
      </div> */}
      {/* <div className="form-floating">
        <input
          type="password"
          className={
            'form-control' + (errorObject?.password ? ' is-invalid' : '')
          }
          id="floatingPassword"
          placeholder="Password"
          required
          onChange={(e) => setNewBucketName(e)}
          // !development
          value={newBucket.name}
        />
        <label htmlFor="floatingPassword">Password</label>
        <div className="invalid-feedback">
          {errorObject?.password && errorObject?.password}
        </div>
      </div> */}
    </>
  );
};

export default NewBucketlist;
