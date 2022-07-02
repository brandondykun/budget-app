import { useEffect, useState } from "react";

const HomePage = ({ transactions }) => {
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalSaved, setTotalSaved] = useState(0);

  useEffect(() => {
    const paidTotal = transactions?.reduce((acc, curr) => {
      return (acc += curr.paid);
    }, 0);
    const savedTotal = transactions?.reduce((acc, curr) => {
      return (acc += curr.saved);
    }, 0);

    setTotalPaid(paidTotal);
    setTotalSaved(savedTotal);
  }, [transactions]);

  return (
    <>
      <h1 className="page-title">Hompage</h1>
      <div className="table-container">
        <table id="transactions-table" className="transactions-list">
          <tbody>
            <tr className="transactions-list-title">
              <th>Date</th>
              <th>Paid</th>
              <th>Saved</th>
            </tr>
            {transactions?.map((transaction) => {
              const date = new Date(transaction.date.seconds * 1000);
              return (
                <tr className="transaction-list-item" key={transaction.id}>
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
        <table id="totals-table">
          <tbody>
            <tr>
              <td>Total</td>
              <td>
                $
                {totalPaid &&
                  (totalPaid / 100)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </td>
              <td>
                $
                {totalSaved &&
                  (totalSaved / 100)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        You've saved{" "}
        {totalSaved && totalPaid && parseInt((totalSaved / totalPaid) * 100)}%
        of your earnings!
      </div>
    </>
  );
};

export default HomePage;
