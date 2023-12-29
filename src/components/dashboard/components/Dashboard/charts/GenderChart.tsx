"use client";

import { useEffect } from "react";
import { Chart, registerables } from "chart.js";

Chart?.register(...registerables);

const UsersGender = () => {
  useEffect(() => {
    const canvas = document.getElementById(
      "myHorizontal"
    ) as HTMLCanvasElement | null;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        if (Chart.getChart(ctx)) {
          Chart.getChart(ctx)?.destroy();
        }

        var myHorizontal = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["male", "female"],
            datasets: [
              {
                data: [],
                label: "",
                borderColor: "#3C8066",
                backgroundColor: "#3C8066",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                grid: {
                  display: true,
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
            indexAxis: "y",
          },
        });
      }
    }

    return () => {
      if (myHorizontal) {
        myHorizontal.destroy();
      }
    };
  }, []);

  return (
    <>
      <div className="p-2 shadow-xl rounded-lg">
        <div className="p-1 justify-between">
          <div className="flex items-center text-center justify-between">
            <div className="flex justify-center text-center w-full">Customers Gender</div>
            <div className="flex relative items-center text-center justify-between space-x-2">
                <div className="flex justify-center text-center w-full">Total</div>
                <div className="flex justify-center text-center w-full">1000</div>
                <div className="flex justify-center text-center w-full">%</div>
                <div className="flex justify-center text-center w-full">100%</div>
            </div> 
          </div>
        </div>
        <div className="flex h-full w-full flex-col justify-center m-auto items-center text-center">
          <div className="canv_border h-full w-full mx-auto my-auto">
            <div className="canv  pt-0 h-[31vh] my-auto mx-auto">
              <div className="h-[100%]  w-full overflow-hidden flex justify-center m-auto items-center text-center">
                <canvas id="myHorizontal"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersGender;
