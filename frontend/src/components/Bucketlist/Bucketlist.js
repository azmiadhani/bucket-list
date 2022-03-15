const Bucketlist = ({ datas, title, setDatas }) => {
  const handleOnChange = (_id) => {
    // assigning the original bucketlist to a new variable
    const originalBucketlist = [...datas];
    // looping through the bucketlist and find the index of the item that is clicked
    const index = originalBucketlist.findIndex((item) => item._id === _id);
    // if the item is not done, change it to done, else change it to not done
    originalBucketlist[index].isDone = !originalBucketlist[index].isDone;
    setDatas(originalBucketlist);
  };

  return (
    <div className="blog-list">
      <h2>{title}</h2>
      {datas.map((data) => (
        // key is a must and unique, so react can keep track of item
        <div className="blog-preview" key={data._id}>
          <input
            type="checkbox"
            id={`custom-checkbox-${data._id}`}
            name={data._id}
            checked={data.isDone}
            onChange={() => handleOnChange(data._id)}
          />
          {' ' + data.name}
        </div>
      ))}
    </div>
  );
};

export default Bucketlist;
