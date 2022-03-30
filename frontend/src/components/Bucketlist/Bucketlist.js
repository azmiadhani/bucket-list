import NewBucketlist from '../NewBucketlist/NewBucketlist';

const Bucketlist = ({ datas, title, setDatas, setInitialLoad }) => {
  const handleOnChange = (_id) => {
    // assigning the original bucketlist to a new variable
    const originalBucketlist = [...datas];
    // looping through the bucketlist and find the index of the item that is clicked
    const index = originalBucketlist.findIndex((item) => item._id === _id);
    // if the item is not done, change it to done, else change it to not done
    originalBucketlist[index].isDone = !originalBucketlist[index].isDone;
    setDatas(originalBucketlist);
    setInitialLoad(false);
  };

  console.log(datas.length);
  return (
    <div className="blog-list">
      <h2>{title}</h2>
      <div className="mb-3">
        <NewBucketlist />
      </div>
      <hr />
      {datas.length > 0 ? (
        <div className="list-group">
          {datas.map((data) => (
            // key is a must and unique, so react can keep track of item
            <label className="list-group-item p-3" key={data._id}>
              <input
                className="form-check-input me-2"
                type="checkbox"
                name={data._id}
                checked={data.isDone}
                onChange={() => handleOnChange(data._id)}
              />
              {data.name}
            </label>
          ))}
        </div>
      ) : (
        <p>{title}</p>
      )}
    </div>
  );
};

export default Bucketlist;
