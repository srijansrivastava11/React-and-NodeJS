import React from "react";

const Filter = ({ filter, setFilter }) => {

return (
  <div className="filter-todos">
    <span className="filter-container">
      <label className="task-filter-label">Filter By:</label>
      <select
        className="filter-task filter-height"
        value={filter}
        onChange={ (e) => setFilter(e.target.value)}
      >
      <option value='0'>All Tasks</option>
      <option value='1'>Task Completed</option>
      <option value='-1'>Task Not Completed</option>
      </select>
    </span>
  </div>
);
};

export default Filter;
