import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

const MultiInput = ({ defaultValue = "", onChange, name, type }) => {
  const [data, setData] = useState([{ id: 1, value: "" }]);
  const [field, setField] = useState([1]);
  const handleAddField = id => {
    setField([...field, id]);
  };

  const handleRemoveField = id => {
    setField(field.filter(item => item !== id));
    setData(data.filter(item => item.id !== id));
  };
  const handleValueChange = (id, value) => {
    let tempData = data || [];
    let item = { id, value };
    tempData.splice(id, 1, item);
    setData(tempData);
  };

  useEffect(() => {
    let value = data
      ?.filter(item => item?.value !== "")
      .map(item => item?.value)
      .join(",");
    let e = { target: { type: type, name: name, value } };
    onChange(e);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, field]);

  useEffect(() => {
    if (defaultValue.split(",")?.length > 0) {
      setData(defaultValue?.split(","));
      let array = Array.from(Array(defaultValue?.split(",")?.length + 1).keys()).map(item => item + 1);
      setField(array);
    }
  }, [defaultValue]);

  return (
    <>
      {field.map((input, index) => (
        <React.Fragment key={"input" + input}>
          {index !== 0 && <div></div>}
          <div>
            <input
              className="w-100 form-control"
              defaultValue={data[input]}
              onBlur={e => handleValueChange(input, e.target.value)}
              required={index === 0 ? true : false}
            />
          </div>
          <div>
            {field.length === index + 1 ? (
              <AiOutlinePlusCircle size={"24px"} onClick={() => handleAddField(input + 1)} />
            ) : (
              <AiOutlineMinusCircle size={"24px"} onClick={() => handleRemoveField(input)} />
            )}
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

export default MultiInput;
