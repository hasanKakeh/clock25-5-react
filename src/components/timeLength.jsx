const TimeLength = ({ handleAdd, handleMin, item, itemLength, id }) => {
  return (
    <div className="text1">
      <h3 id={`${id}-label`}>{item}</h3>
      <div className="op">
        <h3 id={`${id}-increment`} onClick={handleAdd} className=" opP">
          +
        </h3>
        <h2 id={`${id}-length`}>{itemLength}</h2>
        <h3 id={`${id}-decrement`} onClick={handleMin} className=" opM">
          -
        </h3>
      </div>
    </div>
  );
};

export default TimeLength;
