import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'
import Navbar from './components/Navbar'
import { NumericFormat } from 'react-number-format';
import './App.css'
import pic from './assets/Rectangle-1.jpg'

const API_URL = 'https://drab-jade-haddock-toga.cyclic.app/nb'

function App() {
  const [data, setData] = useState([]);
  const [groups, setGroups] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    axios.get(API_URL)
      .then(response => {
        setData(response.data)
        setLoading(false)

        // group the data by a certain property
        const groups = response.data.reduce((acc, item) => {
          const group = item.nb_group;
          if (!acc[group]) {
            acc[group] = [];
          }
          acc[group].push(item);
          return acc;
        }, {});

        setGroups(groups);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (

    <div>
      <Navbar />
      {loading ? (
        <div className="animate-pulse w-6 h-6 mx-auto">LOADING</div>
      ) : (
        <div className="bg-slate-100">
          <div className="mx-auto max-w-full py-4 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {/* <h1 className="text-lg sm:text-3xl text-center pb-1 font-bold text-custom_red1">เลือกเคสแล้วแจ้ง ADMIN ทาง INBOX ได้เลยครับ</h1> */}

            {Object.keys(groups).map(group => (

              <div key={group} className="container mx-auto bg-white shadow rounded-lg mb-2">
                <div className="px-4 py-5 sm:px-6">
                  <div className="h-10 w-full mb-2">
                    <img className="static h-full" src={pic} alt="" />
                    <div className='bg-gradient-to-r from-custom_red1 to-custom_red2 h-1'></div>
                    <div className='relative bottom-9 left-9 text-white font-bold text-2xl uppercase'>{group}</div>
                  </div>
`
                  <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-6">
                    {groups[group].map(item => (
                      <a key={item.nb_id} href={item.nb_href} target="_blank" className="group">
                        <div className="aspect-w-2 aspect-h-1 w-full overflow-hidden rounded-lg xl:aspect-w-7 xl:aspect-h-8">
                          <div className='h-20 sm:h-16'>
                            <p className="whitespace-nowrap text-lg sm:text-xl font-bold text-center text-black">{item.nb_brand}</p>
                            <p className="text-xs text-center text-red-600">{item.nb_model}</p>
                            <p className="text-xs text-center text-black">{item.nb_color}</p>
                          </div>
                          <div className='sm:h-44'>
                            <img
                              src={item.nb_img}
                              alt={item.nb_model}
                              className=" w-full object-cover object-center group-hover:opacity-75"
                            />
                          </div>
                          <div>

                            <p className="leading-tight text-xs md:text-sm text-left font-light text-black">SCREEN: {item.nb_size} {item.nb_hz}</p>
                            <p className="leading-tight text-xs md:text-sm text-left font-light text-black uppercase">CPU: {item.nb_cpu}</p>
                            <p className="leading-tight text-xs md:text-sm text-left font-light text-black uppercase">VGA: {item.nb_vga}</p>
                            <p className="leading-tight text-xs md:text-sm text-left font-light text-black">RAM: {item.nb_ram}</p>
                            <p className="leading-tight text-xs md:text-sm text-left font-light text-black uppercase">STORAGE: {item.nb_storage}</p>
                            <p className="leading-tight text-xs md:text-sm text-left font-light text-black uppercase">OS: {item.nb_os}</p>
                            <div className="flex justify-between items-center">
                              <p className="leading-normal text-xl text-left font-bold text-red-600">฿<NumericFormat value={item.nb_price_srp} thousandSeparator="," displayType="text" /></p>
                              {item.nb_dis_price === null || (item.nb_dis_price === item.nb_price_srp) ? "": <p className=" pr-4 line-through leading-normal text-base text-right font-light text-gray-500">฿<NumericFormat value={item.nb_dis_price} thousandSeparator="," displayType="text" /></p>}

                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      )}
    </div>
  )
}

export default App
