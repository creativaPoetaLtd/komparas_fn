import { Link } from 'react-router-dom';
import Footer from '../Footer';
import MobileHomeNav from '../home/HomeMobileNav';
import HomeNav from '../home/HomeNav';
import SubNav from '../Navigations/SubNav';
import TermCard from './TermCard';

const terms = [
  { term: 'RAM', description: 'Ubu ni ububiko bwa telefoni bubika igihe gito kandi bugakora mugihe hari ibintu turi gukora kuri telefoni. Ubu bubiko bukorana na proseseri bya hafi kugira ngo mugihe iyi pororoseseri irimo ikora ikintu runaka ikoreshe ububiko buri hafi(RAM) aho gufata igihe kinini ijya gukoresha bwa bubiko bubika igihe kinini(Storage). Ibi bituma proseseri ikorera ku muvuduko uri hejuru.' },
  { term: 'HARD DISK', description: 'ubu ni ububiko bubika ibintu igihe kirekire muri telefoni ' },
  { term: 'ROM', description: 'Read-Only Memory, typically used to store firmware and system software.' },
  { term: 'Camera', description: 'Captures photos and videos using different megapixel counts.' },
  { term: 'NFC(Near Field Communication )', description: 'aka ni akantu(chip) kaba muri telefoni gatuma telefoni ibasha kukorana n’indi telefoni byegeranye cyangwa indi ikindi gikoresho cy’amashanyarazi(Electronic device) kiri hafi aho.' },
  { term: 'Memory Card', description: 'Expandable storage for your phone.' },
  { term: '5G', description: 'Ni tekinoloji ituma telefoni ibasha gufasha telefoni kugira interineti ikorera ku muvuduko wo hejuru cyane.' },
  { term: 'Operating System(OS)', description: 'Iyi ni sisitemu ikora nk’umutima w’umuntu ariko kandi kuri telefoni nabow ni nk’umutima. Iyi sistemu niyo ikora ibintu byose bishobora gutuma telefoni itangira gukora ariko kandi ikanakurikirana neza niba andi ma pororgaramu abasha gukoranana neza hagati yayo.  Urugero rw’iyi sisitemu twavuga nka: Android, Apple, Window, Mac.' },
  { term: 'Processor', description: ' Iyi porogaramu yo ni nka moteri cyangwa ubwonko bwa telefoni, ifasha telefoni gutekereza, igakora ibyo uyikoresha ayisabye. Urugero nko gufungura porogaramu kandi nanone igakora ibyo uyisabye byose. ' },
  { term: 'Fingerprints', description: 'A biometric security feature that uses your fingerprint for authentication.' },
  { term: 'Face Recognition', description: 'A biometric method to unlock your phone using your face.' },
  { term: 'WI-FI:', description: 'umuyoboro ufasha telefoni kubasha kujya kuri interineti.' },
  { term: 'Aperture', description: 'Ni akantu kaba kuri kamera gatuma urumuri rubasha kwinjira mu ifoto. Uko aka kantu kaba kanini ninako urumuri rwinjira ari rwinshi bikaba byatuma ifoto iba nziza cyane.' },
];

const TechnicalTermsPage = () => {
  return (
    <div className="flex flex-col h-fit">
    <SubNav />
    <HomeNav />
    <MobileHomeNav />
      <div className="bg-gradient-to-r from-primary-500 to-primary-700  py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Sobanukirwa n'amwe mu magambo yakoreshweje</h1>
        <p className="text-xl">Menya icyo buri jambo ryakoreshejwe mu gusobanura telefoni bivuga mbere yo kuyigura kugira ngo umenye neza telefoni uguze kandi urusheho gusobanukirwa uburyo wayikoresha neza.</p>
      </div>

      <div className="container mx-auto py-8 px-4">
        <input
          type="text"
          placeholder="Search terms..."
          className="w-full p-4 mb-6 border rounded-lg shadow focus:outline-none"
        />
      </div>

      <div className="container mx-auto px-4 gap-5">
        {terms.map((term, index) => (
          <TermCard key={index} term={term.term} description={term.description} />
        ))}
      </div>

      <div className="bg-primary-500  py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ukeneye andi makuru?</h2>
        <p className="text-xl mb-6">Twandikire cyangwa uduhamagare tugufashe</p>
        <button className="bg-[#EDB62E] text-primary-500 font-bold py-2 px-6 rounded-full hover:bg-gray-100">
          <Link to='/contact_us' >Twandikire</Link>
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default TechnicalTermsPage;
