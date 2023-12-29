import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory';
const Sales = () => {
  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
    { quarter: 5, earnings: 22000 },
    { quarter: 6, earnings: 25000 },
    { quarter: 7, earnings: 28000 },
    { quarter: 8, earnings: 31000 },
    { quarter: 9, earnings: 34000 },
    { quarter: 10, earnings: 37000 },
    { quarter: 11, earnings: 40000 },
    { quarter: 12, earnings: 43000 },
  ];

  return (
    <div className='h-96' style={{ width: '80%' }}>
        <h1 className="text-xl font-bold justify-center flex text-center">Sales Report</h1>
      <VictoryChart theme={VictoryTheme.grayscale} domainPadding={30}>
        <VictoryAxis
          tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
          tickFormat={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
        />
        <VictoryAxis
            dependentAxis
            tickFormat={(x) => (`$${x / 1000}k`)}
        />
        <VictoryBar data={data} x="quarter" y="earnings" />
      </VictoryChart>
    </div>
  );
};

export default Sales;
