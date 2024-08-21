import Footer from "../Footer";

const JobDescriptionPage= () => {
  return (
    <>
    <header className="bg-gradient-to-r from-slate-600 to-blue-950 text-white py-16 text-center">
    <h1 className="text-4xl font-bold mb-4">
      Umukozi ukusanya amakuru kuri telefoni runaka
    </h1>
    <p className="text-xl">
      Fasha abasura uru rubuga kugura telefoni bazi neza kandi bafiteho
      amakuru ahagije.
    </p>
  </header>
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">

    <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
      

      <section className="mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-6">Imiterere y'akazi</h2>
        <p className="text-lg mb-4">
          Turi gushaka Umukozi usobanukiwe neza n'ibyikoranabuhanga kuburyo
          yadufasha mu Kwandika ibiranga amatelefoni (Technical
          sepecifications). kuri uyu mwanya, uwo muntu uzaba ashinzwe gutanga se
          ibiranga ama telefoni cyangwa ibisobanuro birambuye kandi by’ukuri ku
          matelefoni atandukanye ari ku rubuga rwacu. ibi bizafasha abaguzi
          gusobanukirwa n'ibiranga, ibyiza, n'ibisobanuro by’ayo matelefoni,
          bibafashe gufata ibyemezo byiza mu kugura.
        </p>
        <h3 className="text-2xl font-bold mt-8 mb-4">
          Inshingano z'ukora aka kazi
        </h3>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li>
            Gukora ubushakashatsi ku biranga telefoni harimo nka:RAM, ROM,
            camera, n'ibindi
          </li>
          <li>
            Kuranga telefoni byukuri (nta kuyishima cyangwa ngo uyinenge ahubwo
            uyivuga uko iri)
          </li>
          <li>Gukusanya amakuru ajyanye n'igihe</li>
          <li>
            Gukorana naba nyir'amaduka kugira ngo babashe kuguha amakuru ku
            matelefoni yabo
          </li>
        </ul>

        <h3 className="text-2xl font-bold mt-8 mb-4">
          Ibisabwa kugira ngo ubone aka kazi
        </h3>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li>
            Kuba ubasha kumva byoroshye ibiranga amatelefone(Technical
            sepecifications)
          </li>
          <li>
            kuba uri umunywarwanda kandi uzi ikinyarwanda neza haba kukivuga,
            kugisoma ndetse no kucyandika
          </li>
          <li>
            Kuba wumva icyongereza neza kubera ko usanga aya makuru aboneka mu
            cyongereza ukaba usabwa kuyahindura mu kinywarwanda
          </li>
          <li>Kuba warasoje nibura amashuri yisumbuye (A2)</li>
        </ul>
      </section>

      <section className="mx-auto py-12 px-4 bg-white">
        <h2 className="text-3xl font-bold mb-6">Uburyo wasaba aka kazi</h2>
        <p className="text-lg mb-4">
          Niba ukunda ikoranabuhanga kandi ukaba wifuza gufasha abaguzi gufata
          ibyemezo byiza, ukaba ukeneye aka kazi uzuza amakuru akurikira:
        </p>
        <div className="lg:w-[100%] w-full lg:p-4 lg:mt-0 mt-12 flex flex-col lg:shadow">
          <form
            action=""
            className="flex flex-col md:w-[737px] w-full m-auto justify-center  h-full space-y-6">
            <div className="flex md:flex-row flex-col md:space-y-0 space-y-3 justify-between">
              <input
                type="text"
                placeholder="Amazina yawe *"
                className="md:w-[235px] w-full h-[50px] bg-[#F5F5F5] rounded-md p-2"
              />
              <input
                type="text"
                placeholder="Emeyili yawe *"
                className="md:w-[235px] w-full h-[50px] bg-[#F5F5F5] rounded-md p-2"
              />
              <input
                type="text"
                placeholder="Telefoni yawe *"
                className="md:w-[235px] w-full h-[50px] bg-[#F5F5F5] rounded-md p-2"
              />
            </div>
            <textarea
              name=""
              id=""
              cols={30}
              rows={10}
              placeholder="Andi makuru agaragaza impamvu wumva ushoboye aka kazi*"
              className="w-full h-[200px] bg-[#F5F5F5] rounded-md p-2 mt-4"></textarea>
            <button className="bg-[#EDB62E] text-white px-4 py-3 w-fit float-right justify-end self-end rounded-md">
              Ohereza Ubutumwa
            </button>
          </form>
        </div>
      </section>
    </div>

      <Footer />
    </div>
    </>

  );
};

export default JobDescriptionPage;
