import { useEffect, useState } from "react";
import { getAllKomparasCodes } from "../../../api/shops";

const KomparaKodeTable = () => {
  const [kodes, setKodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(20); 
  useEffect(() => {
    setLoading(true);
    const fetchKodes = async () => {
      const response = await getAllKomparasCodes();
      const sortedCodes = response.komparasCodes.sort(
        (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setKodes(sortedCodes);
      setLoading(false);
    };

    fetchKodes();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentKodes = kodes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(kodes.length / itemsPerPage);

  return (
    <div className="overflow-x-auto m-5">
      <h1 className="text-lg font-bold">List ya ma komparas kode</h1>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <table className="min-w-full bg-white border border-gray-200 overflow-auto">
            <thead>
              <tr className="bg-slate-200 text-left">
                <th className="py-3 px-4">Itariki</th>
                <th className="py-3 px-4">Amazina</th>
                <th className="py-3 px-4">Phone cg Email</th>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Iduka</th>
                <th className="py-3 px-4">Yaguzwe</th>
                <th className="py-3 px-4">Yagurishijwe</th>
              </tr>
            </thead>
            <tbody>
              {currentKodes.length > 0 ? (
                currentKodes.map((kode: any, index: any) => (
                  <tr
                    key={kode?._id}
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    <td className="py-3 px-4">
                      {new Date(kode?.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 relative cursor-pointer" title="Click to copy">
                      {kode?.fullName}
                    </td>
                    <td className="py-3 px-4">{kode?.phoneNumberOrEmail}</td>
                    <td className="py-3 px-4">{kode?.komparasCode}</td>
                    <td className="py-3 px-4">{kode?.shopName}</td>
                    <td className="py-3 px-4">{kode?.shop_sold_confirm ? "Yego" : "Hoya"}</td>
                    <td className="py-3 px-4">{kode?.sold_confirm ? "Yego" : "Hoya"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-3">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center items-center my-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="mx-2 px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`mx-2 px-3 py-1 ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
                } hover:bg-gray-400 rounded`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="mx-2 px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default KomparaKodeTable;
