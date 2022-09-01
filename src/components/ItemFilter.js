import moment from "moment";
import React from "react";

const ItemFilter = ({ dataList, handleFilter, filters, handleClearFilter }) => {
  const eduOptions = [...new Set(dataList.map(item => item.education))];
  const maxRateLimit = 500;
  const minRateLimit = 0;
  const maxDateLimit = [...new Set(dataList.map(item => item.dateTime))].sort((a, b) => Date.parse(b) - Date.parse(a))[0];
  const minDateLimit = [...new Set(dataList.map(item => item.dateTime))].sort((a, b) => Date.parse(a) - Date.parse(b))[0];

  return (
    <div className="w-100 px-5">
      <div className="d-flex justify-content-between w-100 align-items-end">
        <div>
          <div>Search by Title</div>
          <div>
            <input type="text" pattern="[a-zA-Z]+" className="form-control" onBlur={handleFilter} name="title" defaultValue={filters.title} />
          </div>
        </div>
        <div>
          <div>Data Range</div>
          <div className="form-control date-range">
            <input type="date" min={moment(minDateLimit).format("YYYY-MM-DD")} onChange={handleFilter} name="fromDate" defaultValue={filters?.fromDate} />
            <input type="date" max={moment(maxDateLimit).format("YYYY-MM-DD")} onChange={handleFilter} name="toDate" defaultValue={filters?.toDate} />
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-between">
            <div>Rate</div>
            <div>{filters?.maxRate}</div>
          </div>
          <div className="d-flex justify-content-between">
            <span className="pe-2">{minRateLimit}</span>
            <div className="d-flex">
              <input
                type="range"
                className="form-range"
                style={{ marginLeft: "-3px" }}
                max={maxRateLimit}
                min={minRateLimit}
                onChange={handleFilter}
                defaultValue={filters?.maxRate}
                name="maxRate"
              />
            </div>
            <span className="ps-2">{maxRateLimit}</span>
          </div>
        </div>
        <div>
          <div>Education</div>
          <div>
            <select className="form-select" onChange={handleFilter} name="education" defaultValue={filters?.education}>
              <option value="">Select</option>
              {eduOptions?.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <button className="btn btn-secondary" onClick={handleClearFilter}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemFilter;
