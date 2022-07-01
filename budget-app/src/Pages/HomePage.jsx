const HomePage = ({ transactions }) => {
  return (
    <div>
      <h1>Hompage</h1>
      <div>
        {transactions?.map((transaction) => {
          return <div key={transaction.id}>{transaction.paid}</div>;
        })}
      </div>
    </div>
  );
};

export default HomePage;
