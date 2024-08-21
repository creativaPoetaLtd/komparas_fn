import React from 'react';
import SubNav from '../Navigations/SubNav';
import HomeNav from '../home/HomeNav';
import MobileHomeNav from '../home/HomeMobileNav';
import Footer from '../Footer';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="flex flex-col h-fit">
    <SubNav />
    <HomeNav />
    <MobileHomeNav />
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-950">Amategeko n'Amabwiriza</h1>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-950 mb-2">1. Intangiriro</h2>
          <p className="text-gray-700 mb-4">
          Intego: Aya mategeko n'amabwiriza agenga uko ukoresha urubuga rwa Kompras, rufasha umuguzi kugereranya Telefoni zo mu maduka atandukanye. Mu gihe winjiye cyangwa ukoresha uru Rubuga, wemera kubahiriza aya Mabwiriza.          </p>
          <p className="text-gray-700">
          Impinduka: Dushobora kuvugurura aya Mabwiriza rimwe na rimwe. Gukomeza gukoresha uru Rubuga nyuma y'uko habayeho impinduka bivuze ko wemeye ayo Mabwiriza avuguruye. </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-950 mb-2">2. Konti y'ukoresha uru rubuga</h2>
          <p className="text-gray-700 mb-4">
          Kwiyandikisha: Kugira ngo ushobore kugera ku bintu bimwe na bimwe biri kuri uru Rubuga, usabwa gufungura konti. Tanga amakuru yawe neza kandi umenye umutekano wayo.</p>
          <p className="text-gray-700">
          Imikoreshereze y'urubuga: Uremeye kutazigera ukoresha uru Rubuga ku mpamvu iyo ari yo yose itemewe n'amategeko cyangwa mu buryo bwica aya Mategeko cyangwa andi mategeko agenga ikoreshwa ry'uru Rubuga.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-950 mb-2">3. Telefoni ziri ku rubuga na ba nyirazo</h2>
          <p className="text-gray-700 mb-4">
          Urutonde rw'Amaduka: Amaduka ashobora gushyira ibicuruzwa byayo kuri uru Rubuga. Dufite uburenganzira bwo gukuraho iduka iryo ariryo ryose ribangamiye amategeko n'amabwiriza agenga imikoreshereze y'urubuga.          </p>
          <p className="text-gray-700 mb-4">
          Amakuru kuri Telefoni: Nubwo dukora uko dushoboye ngo tumenye neza amakuru ya Telfoni, ntitwashobora kwemeza ko arimo ukuri cyangwa ko yuzuye neza. Ugomba kwemeza amakuru ahabwa n'iduka mbere yo kugura.          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-950 mb-2">4. Kubijyanye no gusaba akazi</h2>
          <p className="text-gray-700 mb-4">
          Uburyo bwo Gusaba Akazi: Urubuga rushobora gutanga amahirwe yo gusaba akazi. Gusaba kwawe kugombwa gulurikiza amategeko n'amabwiriza         </p>
          <p className="text-gray-700">
          Umutekano w'amakuru: Dushobora gukusanya no gukoresha amakuru yihariye mu gihe cyo gusaba. Nyamuneka reba Politiki yacu y'Ubwirinzi bw'Amakuru kugira ngo umenye uburyo dufata tukanakoresha amakuru yawe          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-950 mb-2">5. Imikoreshereze y'ibiri ku rubuga</h2>
          <p className="text-gray-700 mb-4">
          Umutungo: Ibikubiye ku Rubuga byose, harimo inyandiko, amashusho, ibirango, n'ibikoresho bya software, ni ibya Kompras cyangwa abahawe uburenganzira.          </p>
          <p className="text-gray-700">
          Igenzura ry'Imikoreshereze: Ntushobora kongera, guhindura, gukwirakwiza, cyangwa gukoresha ibikubiye ku Rubuga mu buryo ubwo ari bwo bwose hatabayeho uruhushya rwanditse rwa mbere rutanzwe na Kompras.          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-950 mb-2">6. Guteza Ingaru</h2>
          <p className="text-gray-700">
Mugihe cyose uguze telefoni unyuze kuri uru rubuga ntabwo tubibazwa kiretse iyo waguze gurantee nibwo tuyigukorera.          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-950 mb-2">7. Twandikire</h2>
          <p className="text-gray-700">
            Uramutse ugize ikibazo ku mategeko n'amabwiriza agenga uru rubuga watwandikira kuri contact@Komparas.com.
          </p>
        </section>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default TermsAndConditions;
