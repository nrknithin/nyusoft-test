import moment from "moment";
import React from "react";

const ItemList = ({ dataList, handleDelete, handleEdit }) => {
  return (
    <div className="w-100 px-5 py-3">
      <table width="100%" border="1" className="table table-bordered" align="center">
        <tr align="center">
          <th>Sr.No</th>
          <th>Title</th>
          <th>Hobby</th>
          <th>Education</th>
          <th>Picture</th>
          <th>Action</th>
        </tr>
        {dataList?.map((item, index) => (
          <tr align="center" key={item?.id}>
            <td>{item?.id}</td>
            <td>{item?.lessonTitle}</td>
            <td>{item?.hobby}</td>
            <td>{item?.education}</td>
            <td>
              <img src={item?.picture} height="100px" width="100px" alt={item?.lessonTitle} />
            </td>
            <td>
              <span className="c-pointer" onClick={() => handleEdit(item?.id)}>
                Edit
              </span>
              |
              <span className="c-pointer" onClick={() => handleDelete(item?.id)}>
                Delete
              </span>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ItemList;
