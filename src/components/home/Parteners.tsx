import west from "../../assets/westernunion.png"
import sumsung from "../../assets/SamsungPay.png"
import visa from "../../assets/Visamastercard.png"
import gpay from "../../assets/GooglePay.png"
import paypal from "../../assets/Paypal.png"
import applepay from "../../assets/ApplePay.png"
import payonaer from "../../assets/Payoneer.png"
import stripe from "../../assets/Stripe.png"
import shoppay from "../../assets/ShopPay.png"
import amazon from "../../assets/AmazonPay.png"

const Parteners = () => {
    return (
        <div className='flex flex-col w-full lg:px-[4rem] px-2 mt-6 py-12'>
            <div className="flex  md:w-[621px] flex-col justify-center m-auto items-center text-center space-y-2 p-3">
                  <h1 className="flex font-bold flex-wrap md:text-3xl text-xl" ><span>Hura</span> <span className="text-[#EDB62E] ml-2">n'abafatanyabikorwa</span> <span className="ml-2">bacu</span></h1>
                  <p className="test-sm">Dufite abafatanyabikorwa batandukanye dufatanya kugirango tubashe kubagezaho telefoni nziza kandi mu buryo bunogeye buri wese. Menya byinshi kuribo </p>
            </div>
            <div className="w-full grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-6 py-12">
                <div className="flex card1 m-auto justify-between items-center">
                    <img src={west} height={100} width={100} className="w-full h-full"></img>
                </div>
                <div className="flex card1 m-auto justify-between items-center">
                    <img src={sumsung} height={100} width={100} className="w-full h-full"></img>
                </div>
                <div className="flex card1 m-auto justify-between items-center">
                    <img src={visa} height={100} width={100} className="w-full h-full"></img>
                </div>
                <div className="flex card1 m-auto justify-between items-center">
                    <img src={gpay} height={100} width={100} className="w-full h-full"></img>
                </div>
                <div className="flex card1 m-auto justify-between items-center">
                    <img src={paypal} height={100} width={100} className="w-full h-full"></img>
                </div>
                <div className="flex card1 m-auto justify-between items-center">
                    <img src={applepay} height={100} width={100} className="w-full h-full"></img>
                </div>
                <div className="flex card1 m-auto justify-between items-center">
                    <img src={payonaer} height={100} width={100} className="w-full h-full"></img>
                </div>
                <div className="flex card1 m-auto justify-between items-center">
                    <img src={stripe} height={100} width={100} className="w-full h-full"></img>
                </div>
                <div className="flex card1 m-auto justify-between items-center">
                    <img src={shoppay} height={100} width={100} className="w-full h-full"></img>
                </div>
                <div className="flex card1 m-auto justify-between items-center">
                    <img src={amazon} height={100} width={100} className="w-full h-full"></img>
                </div>
            </div>
        </div>

    )
}

export default Parteners