import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
const data = [
    {name: 'Jan', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Feb', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Mar', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Apr', uv: 2780, pv: 3908, amt: 2000},
    {name: 'May', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Jun', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Jul', uv: 3490, pv: 4300, amt: 2100},
    {name: 'Aug', uv: 3490, pv: 4300, amt: 2100},
    {name: 'Sep', uv: 3490, pv: 4300, amt: 2100},
    {name: 'Oct', uv: 3490, pv: 4300, amt: 2100},
    {name: 'Nov', uv: 3490, pv: 4300, amt: 2100},
    {name: 'Dec', uv: 3490, pv: 4300, amt: 2100},
   
];

const UsersChart = (
  <LineChart width={650} height={350} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
  </LineChart>
);

const Chart = () => {
    return (
        <div className="chart">
            <h1 className="text-xl font-bold justify-center flex text-center">Users Report</h1>
        {UsersChart}
        </div>
    )
    }

export default Chart