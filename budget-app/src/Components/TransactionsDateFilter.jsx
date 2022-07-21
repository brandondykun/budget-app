import { useState, useEffect } from "react";

const TransactionsDateFilter = ({ transactions, setFilteredTransactions }) => {
  const getCurrentYear = () => {
    const today = new Date(Date.now());
    return today.getFullYear();
  };

  const getCurrentMonth = () => {
    const today = new Date(Date.now());
    return today.getMonth();
  };

  const [yearFilter, setYearFilter] = useState(getCurrentYear());
  const [monthFilter, setMonthFilter] = useState(getCurrentMonth());

  useEffect(() => {
    const filteredByYear = yearFilter
      ? transactions?.filter((transaction) => {
          const date = new Date(transaction.date.seconds * 1000);
          return date.getFullYear() === Number(yearFilter);
        })
      : transactions;

    const filteredByYearAndMonth = monthFilter
      ? filteredByYear?.filter((transaction) => {
          const date = new Date(transaction.date.seconds * 1000);
          return date.getMonth() === Number(monthFilter);
        })
      : filteredByYear;

    setFilteredTransactions(filteredByYearAndMonth);
  }, [yearFilter, monthFilter, transactions]);

  return (
    <div className="date-filter-container">
      <div className="filter-inputs-container">
        <div className="filter-input-container">
          <label htmlFor="year">year</label>
          <div className="select-container">
            <select
              id="year"
              name="year"
              className="filter-select"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <option value={""}>all</option>
              <option value={2021}>2021</option>
              <option value={2022}>2022</option>
              <option value={2023}>2023</option>
            </select>
          </div>
        </div>
        <div className="filter-input-container">
          <label htmlFor="month">month</label>
          <div className="select-container">
            <select
              id="month"
              name="month"
              className="filter-select"
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
            >
              <option value={""}>all</option>
              <option value={0}>january</option>
              <option value={1}>february</option>
              <option value={2}>march</option>
              <option value={3}>april</option>
              <option value={4}>may</option>
              <option value={5}>june</option>
              <option value={6}>july</option>
              <option value={7}>august</option>
              <option value={8}>september</option>
              <option value={9}>october</option>
              <option value={10}>november</option>
              <option value={11}>december</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsDateFilter;
