const HomePage = ({ transactions }) => {
  return (
    <div>
      <h1>Hompage</h1>
      <div className="transactions-list">
        <div className="transactions-list-title flex-row">
          <div>Date</div>
          <div>Paid</div>
          <div>Saved</div>
        </div>
        {transactions?.map((transaction) => {
          console.log(transaction.date.seconds * 1000);
          const date = new Date(transaction.date.seconds * 1000);
          return (
            <div
              className="flex-row transaction-list-item"
              key={transaction.id}
            >
              <div>{date.toLocaleDateString()}</div>
              <div>${(transaction.paid / 100).toFixed(2)}</div>{" "}
              <div>${(transaction.saved / 100).toFixed(2)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
