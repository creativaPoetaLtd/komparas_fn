import React from 'react';
import Footer from '../Footer';

const JobDescriptionPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-slate-600 to-blue-950 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Umukozi ukusanya amakuru kuri telefoni runaka</h1>
        <p className="text-xl">Fasha abasura uru rubuga kugura telefoni bazi neza kandi bafiteho amakuru ahagije.</p>
      </header>

      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-6">Imiterere y'akazi</h2>
        <p className="text-lg mb-4"> 
            Turi gushaka Umukozi usobanukiwe neza n'ibyikoranabuhanga kuburyo yadufasha  mu Kwandika ibiranga amatelefoni (Technical sepecifications). 
            kuri uyu mwanya, uwo muntu uzaba ashinzwe gutanga se ibiranga ama telefoni cyangwa ibisobanuro birambuye kandi by’ukuri ku matelefoni atandukanye ari ku rubuga rwacu. 
            ibi bizafasha abaguzi gusobanukirwa n'ibiranga, ibyiza, n'ibisobanuro by’ayo matelefoni, bibafashe gufata ibyemezo byiza mu kugura.</p>
        <h3 className="text-2xl font-bold mt-8 mb-4">Inshingano z'ukora aka kazi</h3>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li>Gukora ubushakashatsi ku biranga telefoni harimo nka:RAM, ROM, camera, n'ibindi</li>
          <li>Kuranga telefoni byukuri (nta kuyishima cyangwa ngo uyinenge ahubwo uyivuga uko iri)</li>
          <li>Gukusanya amakuru ajyanye n'igihe</li>
          <li>Gukorana naba nyir'amaduka kugira ngo babashe kuguha amakuru ku matelefoni yabo</li>
        </ul>

        <h3 className="text-2xl font-bold mt-8 mb-4">Ibisabwa kugira ngo ubone aka kazi</h3>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li>Kuba ubasha kumva byoroshye ibiranga amatelefone(Technical sepecifications)</li>
          <li>kuba uri umunywarwanda kandi uzi ikinyarwanda neza haba kukivuga, kugisoma ndetse no kucyandika</li>
          <li>Kuba wumva icyongereza neza kubera ko usanga aya makuru aboneka mu cyongereza ukaba usabwa kuyahindura mu kinywarwanda</li>
          <li>Kuba warasoje nibura amashuri yisumbuye (A2)</li>
        </ul>
      </section>

      <section className="container mx-auto py-12 px-4 bg-gray-100">
        <h2 className="text-3xl font-bold mb-6">Uburyo wasaba aka kazi</h2>
        <p className="text-lg mb-4">
        Niba ukunda ikoranabuhanga kandi ukaba wifuza gufasha abaguzi gufata ibyemezo byiza, ukaba ukeneye aka kazi. Kurikiza mabwiriza akurikira:
        </p>
        <ol className="list-decimal list-inside mb-6 text-gray-700">
          <li>Tunganya CV yawe neza igaragaza ubunararibonye ufite mubijyanye n'ikoranabuhaga</li>
          <li>Andika ibaruwa igaragaza impamvu wumvise ukeneye aka kazi</li>
          <li>Ohereza ibaruwa yawe na CV kuri <span className="text-blue-700">contact@Komparas.com</span>.</li>
          <li>Andika uyu murongo muri emeyili wohereza: <span className="font-bold">"Gusaba akazi ko gukusanya amakuru ku ma telefoni"</span>.</li>
        </ol>
      </section>
      <Footer/>
    </div>
  );
};

export default JobDescriptionPage;
