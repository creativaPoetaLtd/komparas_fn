import MainInfo from "./Dashboard/MainInfo"
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
        <div className="message flex flex-col w-[40%] rounded-md shadow p-2">
          <h1 className="text-xl font-bold justify-start flex text-start">User Querries</h1>
          <div className="messageAndUSer flex flex-col justify-between mt-3 items-center">
            <div className="flex flex-row  justify-between items-start">
            <div className="message__user__image w-[50px] h-[50px] rounded-full bg-gray-400"></div>
            <div className="message__user flex ml-3 flex-col justify-between items-start">
              <div className="message__user__name mt-2 flex justify-between w-full text-sm font-medium text-gray-500">
                <div className="message__user__name__name">Lorem ispum</div>
                <div className="message__user__name__time">Jan 12/12/2012, 10:00</div>
              </div>
              <div className="message__user__message text-md font-medium text-blue-700 mt-2">Lorem ispum Lorem ispumLorem ispumLorem ispumLorem ispum</div>
            </div>
            </div>
            <div className="flex flex-row mt-5  justify-between items-start">
            <div className="message__user__image w-[50px] h-[50px] rounded-full bg-gray-400"></div>
            <div className="message__user flex ml-3 flex-col justify-between items-start">
              <div className="message__user__name mt-2 flex justify-between w-full text-sm font-medium text-gray-500">
                <div className="message__user__name__name">Lorem ispum</div>
                <div className="message__user__name__time">Jan 12/12/2012, 10:00</div>
              </div>
              <div className="message__user__message text-md font-medium text-blue-700 mt-2">Lorem ispum Lorem ispumLorem ispumLorem ispumLorem ispum</div>
            </div>
            </div>
            <div className="flex flex-row mt-5  justify-between items-start">
            <div className="message__user__image w-[50px] h-[50px] rounded-full bg-gray-400"></div>
            <div className="message__user flex ml-3 flex-col justify-between items-start">
              <div className="message__user__name mt-2 flex justify-between w-full text-sm font-medium text-gray-500">
                <div className="message__user__name__name">Lorem ispum</div>
                <div className="message__user__name__time">Jan 12/12/2012, 10:00</div>
              </div>
              <div className="message__user__message text-md font-medium text-blue-700 mt-2">Lorem ispum Lorem ispumLorem ispumLorem ispumLorem ispum</div>
            </div>
            </div>
            </div>
        </div>
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