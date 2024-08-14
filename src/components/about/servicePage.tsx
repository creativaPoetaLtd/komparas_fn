
import Footer from '../Footer';
import MobileHomeNav from '../home/HomeMobileNav';
import HomeNav from '../home/HomeNav';
import SubNav from '../Navigations/SubNav';
import ServiceCard from './serviceCard';
import { FaShieldAlt, FaMobileAlt, FaRecycle, FaLaptop } from 'react-icons/fa';

const services = [
  {
    icon: <FaShieldAlt className="text-5xl" />,
    title: 'Kongererwa Guarantee',
    description: 'Iyo uguze telefoni unyuze kuri komparas, ubusanzwe uhabwa guarantee ya amezi 6 ariko tugira uburyo bwo kongera guarantee kuri telefoni yawe ku buryo igihe cyose ipfuye uza tukayigukorera ku buntu',
  },
  {
    icon: <FaMobileAlt className="text-5xl" />,
    title: 'Ubwishingizi bwa Telefoni',
    description: 'Dutanga kandi ubwishingizi bwa telefoni uguriye kuri komparas, kugira ngo igihe cyose ya telefoni ihuye na ibibazo bitunguranye uzabashe guhabwa ubufasha.',
  },
  {
    icon: <FaRecycle className="text-5xl" />,
    title: 'Kugugura telefoni mu gihe umukiriya ayigaruye', 
    description: 'Igihe uguriye telefoni iwacu ariko nyuma ugashaka kugura indi ushobora kuzana iyo wari ufite tukayigura hanyuma ukatwongera amafaranga tukaguha indi wifuza',
  },
  {
    icon: <FaLaptop className="text-5xl" />,
    title: 'Gushushanya',
    description: 'Dutanga kandi ubufasha mu gukora ibishushanyo bitandukanye harimo nka flyers, business cards, logo, save the dates, invitations, banners, posters, brochures,....',
  },
  {
    icon: <FaLaptop className="text-5xl" />,
    title: 'Gushushanya',
    description: 'Dutanga kandi ubufasha mu gukora ibishushanyo bitandukanye harimo nka flyers, business cards, logo, save the dates, invitations, banners, posters, brochures,....',
  },
  {
    icon: <FaLaptop className="text-5xl" />,
    title: 'Gushushanya',
    description: 'Dutanga kandi ubufasha mu gukora ibishushanyo bitandukanye harimo nka flyers, business cards, logo, save the dates, invitations, banners, posters, brochures,....',
  },
  {
    icon: <FaLaptop className="text-5xl" />,
    title: 'Gushushanya',
    description: 'Dutanga kandi ubufasha mu gukora ibishushanyo bitandukanye harimo nka flyers, business cards, logo, save the dates, invitations, banners, posters, brochures,....',
  },
  {
    icon: <FaLaptop className="text-5xl" />,
    title: 'Gushushanya',
    description: 'Dutanga kandi ubufasha mu gukora ibishushanyo bitandukanye harimo nka flyers, business cards, logo, save the dates, invitations, banners, posters, brochures,....',
  },
  {
    icon: <FaLaptop className="text-5xl" />,
    title: 'Gushushanya',
    description: 'Dutanga kandi ubufasha mu gukora ibishushanyo bitandukanye harimo nka flyers, business cards, logo, save the dates, invitations, banners, posters, brochures,....',
  },
];

const ServicePage = () => {
  return (
    <div className="flex flex-col h-fit">
            <SubNav />
            <HomeNav />
            <MobileHomeNav />
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Serivisi dutanga</h1>
        <p className="text-xl">Menya byinshi dutanga nyuma yo kugura telefoni kandi utasanga ahandi</p>
      </div>

      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>

      <div className="bg-primary-500 text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Interested in our services?</h2>
        <p className="text-xl mb-6">Get in touch with us today and learn more about how we can help you.</p>
        <button className="bg-white text-primary-500 font-bold py-2 px-6 rounded-full hover:bg-gray-100">
          Contact Us
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ServicePage;
