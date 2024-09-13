import React from 'react';
import SubNav from '../Navigations/SubNav';
import HomeNav from '../home/HomeNav';
import MobileHomeNav from '../home/HomeMobileNav';
import Footer from '../Footer';
import { Link } from 'react-router-dom';

const WhyShopsUseKompras: React.FC = () => {
  return (
    <div className="flex flex-col h-fit">
    <SubNav />
<HomeNav />
<MobileHomeNav />
    <div className="w-full h-auto p-6">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-slate-600 to-blue-950 text-white py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Kuki iduka ryawe rikwiye kugaragara kuri Kompras?</h1>
        <p className="text-xl">Kwagura ibyo wagezeho, kuzamura ibicuruzwa byawe, no guhuza nabaguzi benshi binyuze mu gukoresha Kompras.</p>
      </section>

      {/* Benefits Section */}
      <section className="my-12 px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reason 1 */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">1. Kugera kubakiriya benshi</h2>
            <p className="text-lg">
            Kompras iguhuza nabaguzi benshi bashaka telefoni bikaba byatuma telefone cyangwa ibicuruzwa byawe bimenyekana ku mubare munini w'abantu
            </p>
          </div>

          {/* Reason 2 */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">2. Ongera ingano y'ibyo ugurisha</h2>
            <p className="text-lg">
              Mugihe cyose ukorana na Kompras bigufasha kuba wakongera ingano ya telefoni wacuruzaga mugihe runaka bitewe nuko umubare w'abamenya ibicuruzwa byawe ari munini. 
            </p>
          </div>

          {/* Reason 3 */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">3.Ubaka ikizere n'abakiriya bawe</h2>
            <p className="text-lg">
              Kompras igufasha mu kubaka ikizere mu bakiriye bawe igihe cyose ugurisha telefoni nziza, zihariye kandi z'umwimerere. Impamvu nuko mbere yuko ukiriya ahitamo telefoni aba yabanje kuyigereranya n'izindi bimeze kimwe zo muyandi maduka.
            </p>
          </div>
          {/* Reason 3 */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">3.Ubaka ikizere n'abakiriya bawe</h2>
            <p className="text-lg">
              Kompras igufasha mu kubaka ikizere mu bakiriye bawe igihe cyose ugurisha telefoni nziza, zihariye kandi z'umwimerere. Impamvu nuko mbere yuko ukiriya ahitamo telefoni aba yabanje kuyigereranya n'izindi bimeze kimwe zo muyandi maduka.
            </p>
          </div>

          {/* Reason 4 */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">4. Kwamamaza no kumenyekana</h2>
            <p className="text-lg">
              Urubuga rwacu rwa Kompras rutanga serivisi zijyanye no kwamamaza aho nko kuri page ibanza hari ahantu hagenewe kuba twakwamamarizaho telefoni zidasanzwe. iyo rero telefoni zo mu iduka ryawe zihagaragaye kenshi bituma umenyekana ndetse n'iduka ryawe rikaba umwitangirizwa.
            </p>
          </div>
          {/* Reason 4 */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">4. Kwamamaza no kumenyekana</h2>
            <p className="text-lg">
              Urubuga rwacu rwa Kompras rutanga serivisi zijyanye no kwamamaza aho nko kuri page ibanza hari ahantu hagenewe kuba twakwamamarizaho telefoni zidasanzwe. iyo rero telefoni zo mu iduka ryawe zihagaragaye kenshi bituma umenyekana ndetse n'iduka ryawe rikaba umwitangirizwa.
            </p>
          </div>


          
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-100 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Tangira gucuriza kuri kompras uyumunsi!</h2>
        <p className="text-xl mb-6">Injira mu mubare w'amaduka menshi yatangiye kunguka binyuze mu gukorana na Kompras</p>
        <Link to='/andikisha-iduka-ryawe' >
        <button className="bg-green-500 text-white px-6 py-3 rounded-md text-lg hover:bg-green-600 transition-all">
          Andikisha iduka ryawe
        </button>
        </Link>
      </section>
    </div>
    <Footer />
    </div>
  );
};

export default WhyShopsUseKompras;
