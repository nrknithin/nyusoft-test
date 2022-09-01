import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItem, updateItem } from "../redux/actions/itemsAction";
import MultiInput from "./MultiInput";

const ItemForm = ({ onHandleSubmit }) => {
  const data = useSelector(state => state?.allItems?.item);
  const dispatch = useDispatch();
  //   const [data, setData] = useState({});
  let hobbyRefOne = useRef(null);
  const handleOnChange = e => {
    let { name, value, checked, files } = e.target;
    if (name === "hobby") {
      let tempValue = data.hobby || "";
      let tempArray = tempValue.split(",").filter(item => item !== "");
      if (checked) tempArray.push(value);
      else tempArray = tempArray.filter(item => item !== value);
      value = tempArray.join(",");
    }
    if (name === "picture") {
      value = files?.[0];
    }

    dispatch(updateItem(name, value));
  };
  return (
    <form
      className="form-container container"
      onSubmit={e => {
        e.preventDefault();
        onHandleSubmit(data);
      }}
    >
      <span className="item-grid">
        <div>
          <label className="form-label">
            Lesson Title <span className="text-danger">*</span> :
          </label>
        </div>
        <div>
          <input
            className="w-100 form-control"
            type="text"
            required
            onChange={handleOnChange}
            name="lessonTitle"
            defaultValue={data?.lessonTitle}
            pattern="[a-zA-Z][a-zA-Z ]+"
          />
        </div>
        <div>A_Z</div>
      </span>
      <span className="item-grid">
        <div>
          <label className="form-label">
            Rate <span className="text-danger">*</span> :
          </label>
        </div>
        <div>
          <input defaultValue={data?.rate} className="w-100 form-control" type="number" required onChange={handleOnChange} name="rate" step=".01" />
        </div>
      </span>
      <span className="item-grid">
        <div>
          <label className="form-label">
            Date & Time <span className="text-danger">*</span> :
          </label>
        </div>
        <div>
          <input
            defaultValue={moment(data?.dateTime).format("YYYY-MM-DDTHH:ss")}
            className="w-100 form-control"
            type="datetime-local"
            required
            onChange={handleOnChange}
            name="dateTime"
          />
        </div>
      </span>
      <span className="item-grid">
        <div>
          <label className="form-label">
            Type <span className="text-danger">*</span> :
          </label>
        </div>
        <div>
          <span>
            <input
              defaultChecked={data?.type}
              type="radio"
              id="inperson"
              name="type"
              value="1"
              className="form-check-input"
              required
              onChange={handleOnChange}
            />
            <span className="px-2">In Person</span>
          </span>
          <span>
            <input defaultChecked={data?.type} type="radio" id="online" name="type" value="2" className="form-check-input" required onChange={handleOnChange} />
            <span className="px-2">Online</span>
          </span>
        </div>
      </span>
      <span className="item-grid">
        <div>
          <label className="form-label">
            Location <span className="text-danger">*</span> :
          </label>
        </div>
        <div>
          <input defaultValue={data?.location} className="w-100 form-control" required onChange={handleOnChange} name="location" />
        </div>
      </span>
      <span className="item-grid">
        <div>
          <label className="form-label">
            Education <span className="text-danger">*</span> :
          </label>
        </div>
        <div>
          <select className="w-100 form-select" required onChange={handleOnChange} name="education" defaultValue={data?.education}>
            <option value="">Select</option>
            <option value="btech">B.Tech</option>
            <option value="bca">BCA</option>
            <option value="ba">BA</option>
          </select>
        </div>
      </span>
      <span className="item-grid">
        <div>
          <label className="form-label">
            Hobby <span className="text-danger">*</span> :
          </label>
        </div>
        <div>
          <span>
            <input
              defaultChecked={data?.hobby
                ?.split(",")
                .map(item => item.toLowerCase().trim(""))
                .includes("cricket")}
              type="checkbox"
              id="cricket"
              name="hobby"
              value="cricket"
              className="form-check-input"
              onChange={handleOnChange}
              ref={hobbyRefOne}
            />
            <span className="px-2">Cricket</span>
          </span>
          <span>
            <input
              defaultChecked={data?.hobby
                ?.split(",")
                .map(item => item.toLowerCase().trim(""))
                .includes("singing")}
              type="checkbox"
              id="singing"
              name="hobby"
              value="singing"
              className="form-check-input"
              onChange={handleOnChange}
            />
            <span className="px-2">Singing</span>
          </span>
          <span>
            <input
              defaultChecked={data?.hobby
                ?.split(",")
                .map(item => item.toLowerCase().trim(""))
                .includes("travelling")}
              type="checkbox"
              id="travelling"
              name="hobby"
              value="travelling"
              className="form-check-input"
              onChange={handleOnChange}
            />
            <span className="px-2">Travelling</span>
          </span>
        </div>
      </span>
      <span className="item-grid">
        <div>
          <label className="form-label">
            Experience <span className="text-danger">*</span> :
          </label>
        </div>
        <MultiInput required onChange={handleOnChange} type="multi-input" name="experience" defaultValue={data?.experience} />
      </span>
      <span className="item-grid">
        <div>
          <label className="form-label">
            Picture <span className="text-danger">*</span> :
          </label>
        </div>
        <div>
          <input className="w-100 form-control" type="file" required onChange={handleOnChange} name="picture" accept=".jpeg,.jpg,.png" />
        </div>
        <div>*.jpg,*jpeg,*.png</div>
      </span>
      <span className="item-grid">
        <div></div>
        <div></div>
        <div>
          <button className="btn btn-secondary">Submit</button>
        </div>
      </span>
    </form>
  );
};

export default ItemForm;
