import React from "react";
import SubNav from "../Navigations/SubNav";
import HomeNav from "../home/HomeNav";
import MobileHomeNav from "../home/HomeMobileNav";
import Footer from "../Footer";
import { Link } from "react-router-dom";

const WhyBuyersUseKompras: React.FC = () => {
  return (
    <div className="flex flex-col h-fit">
      <SubNav />
      <HomeNav />
      <MobileHomeNav />
      <div className="w-full h-auto p-6">
        <section className="bg-gradient-to-r from-slate-600 to-blue-950 text-white py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Kuki ari byiza kugura telefoni ukoresheje uru rubuga?
          </h1>
          <p className="text-xl">
            Kompras ituma ubasha kugura telefoni nziza, mu buryo bworoshye kandi
            bwizewe, buhendutse kandi bukunogeye
          </p>
        </section>

        <section className="my-12 px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Reason 1 */}
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-bold mb-4">
                1. Kugereranya Telefoni zitandukanye
              </h2>
              <p className="text-lg">
                Kuri kompras niho honyine ushobora kugereranya ama telefoni
                ameze kimwe ariko agurishirizwa mu maduka atandukanye ukabasha
                kugura iyo ushaka udahenzwe, udatuburiwe kandi nanone ubikunze.
              </p>
            </div>

            {/* Reason 2 */}
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-bold mb-4">2. Ibiciro byiza</h2>
              <p className="text-lg">
                Tukwereka ibiciro bya telefoni imwe mu maduka atandukanye maze
                ugahitamo aho ushaka kugurira bitewe n'izindi impamvu nka aho
                iduka iherereye, icyo bisaba ngo telefoni ikugereho n'ibindi...!
                Mugihe kandi ukoresheje Kode ya Kompras maze ukabona telefoni ku
                giciro gito cyane ugereranyije n'igiciro gisanzwe muri iyo duka.
              </p>
            </div>

            {/* Reason 3 */}
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-bold mb-4">
                3. Uru rubuga ruroroshye kurukoresha
              </h2>
              <p className="text-lg">
                Uru rubuga rworoshye kurukoresha mu buryo byorohera umuguzi kubona telefoni yifuza byoroshye, harimo utuyunguruzo twinshi kuburyo bikoroherakugera kuri telefoni wifuza vuba cyane.
              </p>
            </div>

            {/* Reason 4 */}
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-bold mb-4">
                4. Impano zidasanzwe no kugabanyirizwa
              </h2>
              <p className="text-lg">
               Kuri uru rubuga kandi tugira igihe dutanga impano ku bakiriye bacu cyangwa tukaba twanabagabanyiriza ibiciro. Igihe kandi uguze telefoni wifashishije Kompras code wishyura amafaranga make kurusha kuyigura bisanzwe. Ba umwe mu bagira aya mahirwe!              </p>
             
            </div>

            {/* Reason 5 */}
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-bold mb-4">
                5. Ibyo abakorana natwe bavuga kuri uru rubuga
              </h2>
              <p className="text-lg">
                Abantu bose bakoresha uru rubuga cyangwa se bagura telefoni banyuze kuri uru rubuga, bagira uburyo batanga ubuhamya bw'uko byabagendekeye mugihe bakoreshaga uru rubuga. Ibi bigufasha mugihe ugiye kugura ugakora ibintu wishimiye.
              </p>
            </div>

            {/* Reason 6 */}
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-bold mb-4">6. Nta yandi mafaranga y'inyongera usabwa</h2>
              <p className="text-lg">
              Ibyo ubona, cyangwa wakunze nibyo wishyura. Kompras ikorera mu mucyo, uretse 
              ibiciro nta mafaranga yandi y'ikirenga wishyuzwa.
              </p>
              
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gray-100 py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
           Witeguye kugura Telefoni hano cyangwa gukorana natwe?
          </h2>
          <p className="text-xl mb-6">
          Tangira gushakisha kuri Kompras uyumunsi hanyuma umenye terefone nziza kuri
          ibiciro bitagereranywa.
          </p>
          <Link to={`/products`} className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-600 transition-all">
          {/* <button className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-600 transition-all"> */}
            Reba Telefoni zose
          {/* </button> */}
          </Link>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default WhyBuyersUseKompras;
