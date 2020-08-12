import React from "react";

const Sort = ({ sort, setSort }) => {

  return (
    <span className="sort-container">
      <label className="task-sort-label">Sort By:</label>
      <span className="select-sort">
        <label> Name</label>
        <select
          className="sort-alphabetically filter-height"
          value={sort}
          onChange={ (e) => setSort(e.target.value)}>
          <option value="select option" disabled>
            Select
          </option>
          <option value='0'>Default</option>
          <option value='1'>Tasks in Ascending Order</option>
          <option value='-1'>Tasks in Descending Order</option>
        </select>

      </span>
    </span>
  );
};


export default Sort;
