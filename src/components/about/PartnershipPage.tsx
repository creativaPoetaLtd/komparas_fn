import { useEffect } from 'react';
import SubNav from '../Navigations/SubNav';
import HomeNav from '../home/HomeNav';
import MobileHomeNav from '../home/HomeMobileNav';
import Footer from '../Footer';

const PartnershipPage = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="flex flex-col h-fit"> 
      <SubNav />
      <HomeNav />
      <MobileHomeNav />
      <header className="bg-gradient-to-r from-primary-500 to-primary-700 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Uko waba umufatanyabikorwa wacu</h1>
        <p className="text-xl">Menya uko watangira gukorana natwe waba uri Umucuruzi, umuguzi, ushaka akazi, ushaka kwamamaza cyangwa kugaragara kuri Kompras.</p>
      </header>

      <section id="ndi_umucuruzi" className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-6">Ndi umucuruzi</h2>
        <p className="text-lg mb-4">Uri umucuruzi? Ushaka kumenyekanisha iduka ryawe? Koresha ubu buryo:</p>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li>Ohereza ubutuma bugufi kuri emeili ya kompras <span  className='text-blue-700'>contact@Komparas.com</span> maze utegereze bakwemerere</li>
          <li>Uzuza amakuru ajyanye n'iduka ryawe kuri form uhawe kuri emeiyili yawe</li>
          <li>Ryoherwa no gukorana natwe harimo nko kuba telefoni zawe zamenyekana ku ba guzi benshi ndetse no kuba umubare w'abakiriye wakwiyongera</li>
        </ul>
        <p className="text-lg">Turagufasha ku buryo iduka ryawe rizamura imikorere yaba mu gucuza, kumenyekana, no kwaguka. Karibu!</p>
      </section>

      <section id="umuguzi" className="container mx-auto py-12 px-4 bg-gray-100">
        <h2 className="text-3xl font-bold mb-6">Ndi Umuguzi</h2>
        <p className="text-lg mb-4">Menya ibyiza byo kugurira telefoni iwacu:</p>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li>Ubasha kubona telefoni zigiye zitandukanye zo mu maduka atandukanye</li>
          <li>Ubasha kugereranya izo telefoni ugendeye ku bintu bitandukanye nk'ibiciro, icyo bisaba ngo telefoni ikugereho, n'ibindi.</li>
          <li>Ugurira telefoni mu iduka wishimiye nyuma yo gusura amaduka menshi afite iyo telefoni</li>
          <li>Menya izindi nyungu wabona nyuma cyangwa na mbere yo kugura telefoni harimo nko kongererwa guarant, gukoresha kompras kode, n'ibindi. <span> <a href="/serivisi" className='text-blue-700'>Menya byinshi</a> </span></li>
        </ul>
        <p className="text-lg">Uru ruguha amahirwe yo guhitamo telefoni wifuza mu iduka wifuza!</p>
      </section>

      <section id="kwamamaza" className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-6">Kwamamaza</h2>
        <p className="text-lg mb-4">Menyekanisha ibicuruzwa byawe ku mubare munini w'abaguzi bakoresha uru rubuga:</p>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li>Amamaza Telefoni zawe mubare munini w'abaguzi bakoresha Kompras</li>
          <li>Zamura kumenyekana kw'ibikorwa byawe n'umubare w'abasura iduka ryawe</li>
          <li>Twandikire maze umenye neza uburyo wamenyekanisha ibikorwa byawe kuri uru buga rwa Kompras</li>
        </ul>
        <p className="text-lg">Menyekanisha ibikorwa byawe maze ingano y'ibyo ugurisha yikube!</p>
      </section>
      <Footer />
    </div>
  );
};

export default PartnershipPage;
