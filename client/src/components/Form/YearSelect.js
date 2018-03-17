import React from 'react';

const years = [];
const currentYear = new Date().getFullYear();
for (var i = currentYear; i >= 1900; i--) {
  years.push(i);
}

export const YearSelect = props => (
  <div className="form-group">
    <select className="form-control" {... props}>
      {
        years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))
      }
    </select>
  </div>
);
