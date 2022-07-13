import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = ({ transactions }) => {
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalSaved, setTotalSaved] = useState(0);
  const [sortedTransactions, setSortedTransactions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const paidTotal = transactions?.reduce((acc, curr) => {
      return (acc += curr.paid);
    }, 0);
    const savedTotal = transactions?.reduce((acc, curr) => {
      return (acc += curr.saved);
    }, 0);

    const sortedTransactions = transactions.sort(function (a, b) {
      return b.date - a.date;
    });

    setSortedTransactions(sortedTransactions);

    setTotalPaid(paidTotal);
    setTotalSaved(savedTotal);
  }, [transactions]);

  return (
    <div className="homepage-container">
      <h1 className="page-title">home</h1>
      <div id="totals-table">
        <div className="totals-table-total">
          <div className="total-title">total paid: </div>
          <div className="poppins-font">
            $
            {totalPaid &&
              (totalPaid / 100)
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
        </div>
        <div className="totals-table-total">
          <div className="total-title">total saved:</div>
          <div className="poppins-font">
            $
            {totalSaved &&
              (totalSaved / 100)
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
        </div>
      </div>
      <div className="totals-text">
        you've saved{" "}
        {totalSaved && totalPaid && parseInt((totalSaved / totalPaid) * 100)}%
        of your earnings!
      </div>
      <div className="table-container">
        <table id="transactions-table" className="transactions-list">
          <tbody>
            <tr className="transactions-list-title">
              <th>date</th>
              <th>paid</th>
              <th>saved</th>
            </tr>
            {sortedTransactions?.map((transaction) => {
              const date = new Date(transaction.date.seconds * 1000);
              return (
                <tr
                  className="transaction-list-item poppins-font"
                  key={transaction.id}
                  onClick={() => navigate(`/details/${transaction.id}`)}
                >
                  <td>{date.toLocaleDateString()}</td>
                  <td className="middle-column">
                    ${(transaction.paid / 100).toFixed(2)}
                  </td>
                  <td>${(transaction.saved / 100).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
