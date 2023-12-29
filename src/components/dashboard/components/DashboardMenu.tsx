import MainInfo from "./Dashboard/MainInfo"
import Messages from "./Dashboard/Messages"
import UsersGender from "./Dashboard/charts/GenderChart"
import SalesChart from "./Dashboard/charts/SalesChart"
import UsersChart from "./Dashboard/charts/UsersChart"

const DashboardMenu = () => {
  return (
    <div className="dashboard  p-5 w-full min-h-screen h-fit flex flex-col gap-4">
      <MainInfo />
      <div className="charts flex flex-row justify-between mt-3 items-center">
        <div className="chart1 flex flex-col w-[45%] rounded-md shadow p-2">
          <div className="chart1__day text-lg font-bold">
            <SalesChart />
          </div>
        </div>
        <div className="chart2 flex flex-col w-[53%] rounded-md shadow p-2">
          <div className="chart2__day text-lg font-bold">
            <UsersChart />
          </div>
        </div>
      </div>
      <div className="messages flex flex-row justify-between items-center">
       <Messages />
        <div className="chart2 flex flex-col w-[53%] rounded-md shadow p-2">
          <div className="chart2__day text-lg font-bold">
            <UsersGender/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardMenu