import React from "react";
import SubNav from "../Navigations/SubNav";
import HomeNav from "../home/HomeNav";
import MobileHomeNav from "../home/HomeMobileNav";
import Footer from "../Footer";

const HowToUseKompras: React.FC = () => {
  return (
    <div className="flex flex-col h-fit bg-white text-gray-900">
      <SubNav />
      <HomeNav />
      <MobileHomeNav />
      <div className="w-[90%] h-auto pt-6 px-8 lg:px-36 flex flex-col m-auto items-center justify-center">
        <section className="bg-gradient-to-r from-slate-600 to-blue-950 text-white py-12 text-center w-full">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Uko wakoresha urubuga rwacu rwa Kompras
          </h1>
          <p className="text-lg lg:text-xl leading-relaxed">
            Temebera urubuga rwacu umenye uburyo warukoresha waba uri umuguzi
            cyangwa umucuruzi
          </p>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-semibold mb-4">1. Page ibanza</h2>
          <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
            <div className="lg:w-1/2">
              <p className="text-lg leading-relaxed">
                Iyo ukigera ku rubuga rwacu, ubona{" "}
                <span className="font-bold">agace kabanza</span> kagaragaza
                amatangazo, Telephone zigezweho, ama promosiyo adasanzwe ndetse
                n'andi makuru agezweho.
              </p>

              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  Hasi kandi hari agace kagaragaza urutonde rwa telefoni zose
                  ziri kuri uru rubuga.
                </li>
                <li>
                  Ubona kandi n'akandi gace karimo ibyiciro cyangwa ubwoko bwa
                  telefoni ducuruza nka, Tecno, Sparks, Infinix, Samsung, ...
                </li>
                <li>
                  Hasi wongera kandi kubonaho abafanyabikorwa bacu, ibibazo
                  abantu bakunze kwibaza ndetse n'ibisubizo kuri ibyo bibazo.
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2">
              <img
                src="./Banner.png"
                alt="Kompras Banner"
                className="rounded-md shadow-md max-h-64 w-full object-fit"
              />
            </div>
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-semibold mb-4">
            2. Reba telefoni zose ziri kuri uru rubuga
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Uru rubuga rwacu rwa Kompras ruriho ama Telefoni menshi atandukanye
            ushobora guhita umwe murizo. Kanda kuri "Reba zose" maze urebe
            telefoni zose ziri ku rubuga.
          </p>
          <img
            src="/phones.png"
            alt="Browse Phones"
            className="rounded-md shadow-md max-h-72 w-full object-fit"
          />
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-semibold mb-4">
            3. Reba Telefoni imwe birambuye unayigereranye n'izindi
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Nyuma yo gukanda kuri telefoni imwe wahise, uhita ubona amakuru yose
            agendanye niyo telefoni harimo nk'ibintu telefone yubatsemo, uburyo
            yubakitse, ubushobozi n'imbaraga ifite, amafaranga igura mu maduka
            agiye atandukanye, amabara iyo telefoni ibonekamo n'ibindi. Ushobora
            no kugereranya iyo telefoni n'izindi.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <img
              src="/singlePhone.png"
              alt="View Phone"
              className="rounded-md shadow-md max-h-72 w-full object-fit"
            />
            <img
              src="/compare.png"
              alt="Compare Phones"
              className="rounded-md shadow-md max-h-72 w-full object-fit"
            />
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-semibold mb-4">
            4. Anzura telefoni yo kugura hanyuma unayigure
          </h2>
          <p className="text-lg mb-4">
            Nyuma yo kwanzura telefoni yo kugura ndetse n'iduka uyiguriramo
            uyijyaho hanyuma ukajya kuri iyo duka ugakanda ahanditse "Yirebe"
            maze ugakanda ahanditse "Kompras code" kugira ngo ubashe gusaba kode
            uza=itwaza ugiye kugura iyo telefoni muri ya duka kugira ngo
            bayiguhere ku giciro kigabanyije. kugira ngo ubone iyo kode usabwa
            gutanga amazina na emeyili byawe ubundi ugakurikiza amabwiriza
            kugeza bakoherereje kode.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <img
              src="/viewShop.png"
              alt="Shop View"
              className="rounded-md shadow-md max-h-72 w-full object-fit"
            />
            <img
              src="/sabaCode.png"
              alt="Discount Process"
              className="rounded-md shadow-md max-h-72 w-full object-fit"
            />
          </div>
        </section>
        <section className="my-12">
          <h2 className="text-2xl font-semibold mb-4">
            5. Intambwe unyuramo kuva ukigera kuri kompras kugeza umaze kugura
            telefoni
          </h2>
          {/* ordered list in numbers */}
          <ol type="1" className="list-decimal list-inside mb-6 text-gray-700">
            <li>Jya kuri page ibanza urebe ahari amatelefoni</li>
            <img className="rounded-md shadow-md max-h-72 w-full object-fit m-8" src="./phones.png" alt="" />
            <li>Kanda kuri buto yijimye yanditseho "Reba zose"</li>
            <li>
              Urabona Page iriho ama telefoni yose ndetse n'utuyunguruzo iburyo
              ku buryo ushobora no kuziyungurura bitewe icyigiro telefoni ushaka
              irimo. ushobora kuyungurura ukoresheje igiciro,amabara,
              RAM,Camera, Iduka, .... ibi byoroshya mu gushaka telefoni mu gihe
              hari telefoni nyinshi.
            </li>
            <img className="rounded-md shadow-md max-h-72 w-full object-fit m-8" src="./allProducts.png" alt="" />
            <li>
              Kanda kuri buto iri kuri telefoni wahisemo yanditseho
              <span>
                {" "}
                <a className="text-blue-700">Yirebe</a>{" "}
              </span>{" "}
              kugira ngo ubanshe kubona amakuru menshi ajyanye n'iyo telefoni
              nkuko bigaragara kuri iyi foro hasi aha. muri ayo makuru ubonamo
              amakuru nka: amaduka acuruza iyo telefoni ndetse n'ibiciro
              acururizwaho, amaforo agaragagaza ibice bitandukanye bya telefoni,
              no hasi ibumoso uhasanga amakuru arambuye kuri telefoni cg
              specification/reviews za telefoni bituma uyimenya neza.
            </li>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <img className="rounded-md shadow-md max-h-72 w-full object-fit m-8" src="./singlePhone.png" alt="" />
            <img className="rounded-md shadow-md max-h-72 w-full object-fit m-8" src="./compare1.png" alt="" />
            </div>
            <li>
              Nyuma yo kumenya byishin kuri telefoni wahisemo nkuko bigaragara hano hejuru ushobora kuyigereranya iyo telefoni n'izindi telefoni ziri kuri uru rubuga kugira ngo ubone aho itandukaniye n'andi matelefoni wakunze kugirango ubashe guhitamo neza. Ukanda kukamenyetso ko guteranya kari kuri iyi foto yo hejuru kugira ngo uhitemo indi telefoni ushaka kubigereranya nayo hanyuma ugakanda ku ibuto ryanditseho "Compare"
            </li>
            <img className="rounded-md shadow-md max-h-72 w-full object-fit m-8" src="./comparing.png" alt="" />
            <li>
              Iyo umaze kugereranya birumvikana ko uba wahisemo cyangwa wanzuye telefoni ugomba kugura. usubira inyuma ukayikandaho ukareba amaduka iherereyemo kugira ngo utangire uhitemo bitewe n'iduka bikoroheye kuyiguramo. kugira ngo umenye byinshi ku maduka acuruza iyo telefone ukanda kuri buto yanditseho "Yirebe maze ukamenya byinshi harimo nk'amasaha ikoreraho n'ibindi"
            </li>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <img className="rounded-md shadow-md max-h-72 w-full object-fit m-8" src="./chooseShop.png" alt="" />
            <img className="rounded-md shadow-md max-h-72 w-full object-fit m-8" src="./shopDetails.png" alt="" />
            </div>
            <li>
              Iyo umaze kwemeza kugurira muri iyo shop uhita kuka gafoto k'icyatsi iburyo hejuru mu kugira ngo usabe kode yo kuguriraho telefoni, iyo kode iyo uyibonye uyijyana ku mucuruzi w'iyo duka maze ukayimwereka ubundi akaguha telefoni ariko akugabanyirije igiciro kuber iyo kode. iyo udashaka gukoresha iyo kode ureba contact z'iduka hanyuma ukabavugisha mukumvikana uburyo ubona iyo telefoni. Kurikira uburyo ubona iyo kode:            </li>
            <img className="rounded-md shadow-md max-h-72 w-full object-contain m-8" src="./comparing.png" alt="" />
            <li>Kanda kuri ako gafoto k'icyatsi kugira ngo utangire gushaka kompras code:</li>
            <img className="rounded-md shadow-md max-h-72 w-full object-contain m-8" src="./sabaCode.png" alt="" />
            <li>Umaze kuzuzamo amazina na Emeyili yawe kanda kuri buto yanditseho "Komeza" kugira ngo ukomeze ahakurikira maze umenye amakuru ajyanye na kode urimo gusaba</li>
            <img className="rounded-md shadow-md max-h-72 w-full object-contain m-8" src="./kodeInfo.png" alt="" />
            <li>Bwa nyuma na nyuma ubona ya kode ukaba wayandika. tuyikoherereza ndetse kuri emeyili waduhaye kugira ngo nujya ku iduka uzabashe kuyerekana</li>
            <img className="rounded-md shadow-md max-h-72 w-full object-contain m-8" src="./kodeNyayo.png" alt="" />
          <li>Iyo ibyo birangiye wamaze kugura telefoni ukorsheje kode ya kompras ugaruka ku rubuga kwemeza koko ko telefoni wayibonye. Jya ahabanza ku rubuga maze ukande ahari "Emeza" hejuru iburyo nkuko bigaragara kuri iyi foro hasi aha:</li>
          <img className="rounded-md shadow-md max-h-72 w-full object-contain m-8" src="./emeza.png" alt="" />
          <li>Utanga code waguriyeho kugira ngo babyemeze ubundi ugahita ukanda kuri buto yanditseho "Emeza". Iyi niyo ntambwe ya nyuma.</li>
          <img className="rounded-md shadow-md max-h-72 w-full object-contain m-8" src="./Emeza1.png" alt="" />

          </ol>
        </section>

        {/* Footer Section */}
        <section className="bg-gray-100 py-6 mt-12">
          <p className="text-center text-lg font-semibold">
            Waba witeguye gukoresha Kompras? Sura urubuga rwacu utangire
            uryoherwe n'ibyiza tugufitiye!
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default HowToUseKompras;
