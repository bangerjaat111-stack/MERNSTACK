import React, { useState } from 'react';
import { useTheme } from '../../Context/ThemeContext.jsx';
import { useWishlist } from '../../Context/WishlistContext.jsx';
import { Link } from 'react-router-dom';
import {

  RiFireLine, RiShieldCheckLine,
  RiCustomerService2Line, RiExchangeLine,
  RiPlayCircleLine,
  RiHeartLine, RiHeartFill, RiShieldUserLine
} from 'react-icons/ri';

const BRANDS = [
  { name: 'Tata Motors', logo: 'data:image/png;base64,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' },
  { name: 'Mahindra', logo: 'data:image/jpeg;base64,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' },
  { name: 'Hyundai', logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAACUCAMAAADCkcf1AAAAq1BMVEX///8DO3o6U4cANncAMHUAK3P8/Py4v8/W2uMbO3qAjqz39/dra2kAJHAAOXnp6ehTaZRxcXBkeJ7x8fFmZmR3d3a4t7UwT4U6RH94gqRPWYoAJ3GAf34AAGaRm7aioZ9bcJiuravIx8UAGGzc29rf4+qcp76LiojU0tFZWlgABmhvc5usr8KamZdOTkx6faEgRoAADmnDytdEREI5ODcvLSwkIyFGXo1WY5Eo59NnAAASq0lEQVR4nO1cC1fburIODRiKTVRXlvrSRpUqKvmeyptCe3b//y87MyM7sRM7EAiPvW6+tc4+wRhFn2Y0T6mz2QEHHHDAAQcccMD/A+ScMeacg/8ynr/0bPYAZqX2CuCj1sZIgDFax/RMy8BeeoY7AiUUZMTJW8cyepa1yOm/6RFzFolHYPhvkCQP1koQDEwXCGR5nvNJwC+BZQbLACKV1gb+0rOfRBYMzdDxbMmJTWPAkDtaExOyl2axiVwqb8lGJFYDEgw1TwiBW0wgcO/hKgT4XcePLI31Sr4m3eQMeAVUP74UVU9kQRd1XVeFKFsIURZFUVVVWZQqgqSDYx3DbBaAHXsVusmtNTrkWUcLNEtqBVyUYUROiqqoiEqBAitL4FQVSBDECP8rCgEGx0jgl+hlmdPG2pdm50CvAkdeDGlJHUVR3wLqwkdLzFBMZdkUGhUwwJZCgBcAF1DWDUgTpQhQUZOtJNFxXCD3gsSCMI51amijqkBYDeC2KcFrSelQZiiasrZ8aCAyUl/yEuXtL2SIshQqWkcbb5aBmovwMryYFXKWJZPhpEIBAC/cVXWJvIy2YD9QJqLydxg+Jz1Qq+mPKw/C48n9WWGf36uDu7U8JzUMOK8CFLFGWYEWSY3EtAHKCpnV/j4j8mCiSotTADvUS7CV8DXPq5cMthgaCc6dhN1Vwq6BxbaOhOMiOCig5jg3YD/K+i6Z9cYF/ax+3QI/ZZAbunTw6M8oOe1DMvABeZVlfQs+rXNH3BuUmbcgUzTwVbHTzMB761v4u1rnbVSWMR2fgMQIclsGMIbkX2knFb6/27PELMqMc492vrK7f4eAyATWJu8CTibsMzjyQHuIgSZ6MH6FiHLogAyqo46oT5b8str5K3Ij0TvaHCWGFgWeSfPU1jID94zEGBBTqhJyPeiz3UbLMhZRZr923ihca/R8pOLS+xgoLWDSPKngmAdfBeFvAGKgbZsRA5gQEpoFv0VCq4tdv4MLLTG1A3HNLDhJMFAObSVEYE9oToIAYix3vlAQ7o5oSA4BEzKTsEeYqkFotzua7lzWmtJWCiPJz4HHjA6Uc5b7p1LKXEbmHOhiKbzycuwVmTZa5BBtWIguikrtpkXOlxGAPhN+sg2uDoY4IkUzRj5JZMm1cc7lLpZKleNf4VQqEATMqj3GxM3oCkwh1xBpedpeSCTzDS2PwEgnOgpP9FNwg23m2Myqwtd+Ynxll+o4cxjdF2IXfbQlZnReaZdEHUAfKxQ8978hkwiolO7+/v++yIV1FF6UopjS+GgQkRY2ixiIVPreX5C5olZUDuoi6Sw2NQi+wNWBXza1ZLBkfEcVvxPcA7Oc6UpUccpOkd0HdSRBQfQI1Mr7uuss6IaScG9cN3WH+SsksPQDA561Rm5scgIPAodUKuQMTH49md/z2FlHnKpMCfU9V9hGiEMRupf8GBRaWbc6ksmmbiKkhpCo7nO/SU3MSl9Pi0EmZx3pe1kkZveLRJyATQYyE16y1VrkaB4LUS2pgr2sgRvP7U62aTuCd5B7eeG35IasTHY/vREUZs7VPebAbZX2mBoQgxi8oeC6t5YO/IBnGZ/pvfk3JgJEPbr05fSQmZIrdQQXiFUQUd9pH50UHbHVJksDUm2hVP2NhdwgIeDZ3uISbyETM6WqtyxWSj9jm1rxSDW5ZvumyG0UZUcsrFUYJFGrzOBhaKpaziD93VOWA4kubLRSbctOXCoZxPYVUF6its2KcPT93qMjA4mtEYNIEnYaCG1tNe1tXbEZZ/vZbpwyapjrFh+VYa8CXFoXnAdiNq2QOQui9hh4pD226YZNg8zKDekY8N0sZ87sw0raaC3YcqW26HdoA/6OiqUqoyjN6NvMGiEiEgOBRelGZMsEVfHKjbXhClQyZ8w8IMFdBwbzjEGgv00FfGtDup9lmfyv2Jw1l1r7iLYUiWk7Rgx3GsgMxtj8ja0rAYlw0I8PSiDCkpkVvtryjtWJ2lJJbJm6an5NobiBfWVoV6LMdBiqYrYE5DIg+GZMUaoSxObcHuItMH0uj6rYYsfz0g7UEeuHaCGillpBSp5n1KsIulSSCscG8paewLJ1gE+jyvlokc+BQGGvyscbEvBX3PmtQmutYy8Es0gsamNDoJYM8NHRBOo04av4K2rArQMLx3nGGow/xcRygtgcD2H3msvGQNLmMNMt5tEldeyX6B0RQ2aQlHNsYjvGWmJYE7JYHVgjRMCiOM90TY2AOK5zpqhMZkP5WGYMdCiXft2/9CFTWNy3hhycNzaXsPsCHHJs0YeQiHVl7wGjAVxBPQ41YQRdXao82EdHJBb0aBbjlpTSRUs61jMIkIiCjiaZZdiYaInBM8e2cGqbcrGmftVUxOEKUfBg42PNv9QmZFFvWaK007wd7hyGnV8HFgS79i71nlCGiQ89CUAde2rrnWAsqqA+TikKU6LCftdj7YgkqZnp9M95EprO1w0Ca5khjdD1PYmnxNZahRWdEuxkj5uDv2HO18WET+uoqQIspHk0NQ0ZhDbTUhPJ8IcNe0AnKVAbiVGrbUF6UVETrm5RGJ7sTAfw1pBaq1Gflqh5D9TMo6VmYV1B5+LUXgNv3dXB17YO492zViRAq+pxSjXGqoL0kne0ULwV5tbbIlYmfImN/8fuNQc5PQS/U9RytCHggEO+sgJjcNZ4rNxgjaqlhR8JhZ2FFTQFj6qc3tyu8J7LbZbtfsgLLbk1U4qNQgPraLYdEAFe0ZctlY5PywpRxZzZtscdLPXwIbCerslBFBdzHatHV+1qrZnTdryxmRsqh6R2W49LOmrWKplRPREBueb21+/ftw2yKolbGbjt4KmKJdQWkUQvDPOxfiwz8GnR5saOV1WDp0jXDOxADwH2V6JF/ShsxgtDMTGzAusDyK2sbNYxM3Wy/OPZECGvo3IQRDw+0XYFqFuQbnSkSF1CHzYpESQeSmhVDySnouwLw6n2lEwBu1kmYJpWlKrYomwGwlPu/d11lzuRlzE6ZtnYKQ7XCm2NUQIZjm5H1Y3YPCLIC0VnZEqXpwOFMlIVq9xSEpzxEmwjZBbVHorIUoHYXBirtChqWkc7YJTMQZBiaSjA5Bs3ptCyPf/jmKaauqR6MdjHLdPBRg7zot5HccQp0DgeRiotLiXLZkloCanLuuNVFH5SdxoSmwIvZbCrphpkVlZbAl/wsz7IstgsLTwERkWNVs+sj9aWAaRdJxaLJDCIpsr1XvcaNaVE6XMkBoFqKvIXWww/WEaI/FSxQ59kG5gAyeCRHj9Ub6eJmrZW9gDEBBlEsOy3Sm5f3NoDtcLkkVAis6LcVl+CzD26CEZpTzVWWXpvM+Amho8jVTjkAFaLzhPfqtEN1kfjPUgtYObqIwgN1XdbfclDoB5ktWNHchuUIG7cqd5cmUdmSi9ZUT1HEbGyKqt7lJzyGgYoPTdYA8Isjdz15OuQXBmwWRCkPb54sJwC1nkt5Mqhl9xYRaVEs4KU1OQFO1D7e51FDQKpaY5HyNFToHWcVjUIrqS2ATzkPgz/cg7ALSZu3ebJBKljbGlpCCZjQQauaPw9T0hTLVKEQG3emuLi6eZO7jWkn1bAe3s9kCYrlNsMbUn73UHgvJTuAJusqDBuaopw30XFIYRnEkt7FYVY5VSbfOaEtMY6CLP3t9ESgBtEdjn6gNSULLTHRoROxs1IVVfpRPH9e18Wq/6lZaiOZWI21cDLpQoGHGi9f2bIDbyrBlPiJBZcQqQ7FsTLwx4QBR2xU7t8LwQyMAajUnNNjZliIix2kOtLGeSTMIM1ps5JyDFNAUsV8GYFNVu8kZ5KolUjd3E34H61FzrHcegYRanEqLPmYKGAmdNPxAyPcWCXUs5cgDiYMcgrhELJGSPIfDRbMuMxWPQewoGJ8iWGxYUabzVaBRmqDE4gsyc6ypShnai8g2DZMQ4ppsAFt7qizOQ+jes+wOKh0DK82ZAOjo/1JnMHeSeEqE42QGxbsvNIkFstJSbRdJPCi2g9iazeuZgbBJ6Hd3jEJ6mj2HTy3JqIuZKzwL5pnvIwa2ax3lR5i+eOYW+LGOhUT1HvflhRQESsMD9RRU33NDZiR9xjjoHyh1gDM0jG90RjHLn/haEvHd8Dq20ltvj8Aw7hMmFAH4MFfaRURq07YrAyIamHxtrKf/2TnvQkuILuG5QgM6WChXAEwp/dhyklCE0zX3g6+SIGZ544s0LznGpI+va2aW73G4FMITcllaOwpwsZKpiUYHa+eyYh2fOwMhVWTzDZXiVgdOmkvUQQTHVb17fF0x7O7YGZGs+8lUJEntGheImT2WEEB2E1pHpclFg/AUvS9dK4xVYjw1sfWR5iARamqc1zXtFg+jcd6CtUmOXtDSitJsvn68jBGUIswmRNJw2UT/bVgYqG1JHLILbCyyhF9fs5bzAkxDrVqsAXpGp/NmMSHPg9bn7yCvvZkB80kLfSFa+IbtLTYX7siuDlCDo3UlTPdHthbYKG4iPYKxE7gnm6PMisgezUgpOdul+XWzqLESX3pSrwbpd1ENSjbKi5k9MtHYi6isLv5eTLQ5BbXdMlkRomERg21ag5SDc/qSGPt0extbb0SLkzeO8Of4VW0Hvs5Ts8UocdLDwHBF4ajy9AJLC7cdonMm6L3w2xq0oq8mTL+5S87T3Rld90ZokO9zi6mGgg9YMgDZkBczx3AH8aJL4IEI1YP4/2IvRk0XXMmkYZt3lHudt6WTpAkm6VBIghJSPFxa2KbaoEvCr7eu7CMqzQYYyL9zEqpWVq8G424ttOjsMDMoba9kmIJra0BAr2lV2yT1cjG3TkWMYHs5fukTvafqsTIiQ4F+TyXw1I59Dw/yCTfa3/eADM2cbqV1MoOjOXgHcttE4Fr0SHWnItfKeE1S3Y2Vf/7wWgdkJ8saIW/YDG8mm3tUrx6nRwG/D0A3UEfHuBXi2Bp5LT8TQ87fRKNfBOkDkM6SJ2UkYqnlOXCjfhS89vT1ieCDzggAMOOOCAAw444IADnh9XZ4SrsYdn8PHsbPV57JXeO6NjtA/52Th6yVp2Nf7K1VrqPfne+hdfXr8BfHg/+OPv9PDNZ/j8Pn1883mYXPHP6fE1/uE7+vjxcpCwfBoMfPNmHF/Pl2uWn38YfeWfv7/3xz39+8/oax/+0379exrm+nJ2fjEHnLwbULv8hg/nH3ENftLH+cn5gNr5SXr8F67Vh2P8eHE+oPb1Cz788rWd0HwcxycfTztqn76Mv3NyvJpddj4/mRjpcyvddydpNjDHI8DxkNr3C3y4QGqzH/T5aDE/7b1xOl/Q04sf+NOHOX7+skbtmAbuqL1Nf7CJ+fymo3Yy8cpRt0Cz2eW3yXGW1OiLT+5Bjac5wisrleR/0iyOv/J7U5ua9tHFed5SO556ZXHd0r+6nk+98wBqs5t2wS9WKv+9leTH9I2Pozb/cHUXtaMv7Xff/Jwe5gHUZu1XLr51YuOtVhx/mu1IbTE/XqFV6sW3IbVF75XjVv2+tCaqXdO1cR5Obfa2/eM3sz6Vo/nbwc/3oLa4fvd+hXetOvzfgNriQ++V92/SKyef0rwvL1pBf+2988/84dRuvqW1OiGjMfvRbvefnWG5N7X5h4F7/P5lhNrx3/1X+J95muiA2snAhZ5ePJza7FO7WG9wyKs3SWgXS1/4UGpX3+6kNvvP8Sa1+fXglR+PoXbWGiZU+ewyrfX8ejnNfxG12Tq12Y92P3+76bRz0Wrnq6c2/2cQmKWHPWp569zAUL9pP31dhXavmtrR0SAeu16sUZuddZakddZHF71JvnJqg3isdTg9ahBrtu+1zPoh5SunNoIBtexDP1Y4Hgz+/NT4VQ/Jhzyc2uzmeBWYLo5vXpLa0fyvPlqL/XBqWe/NL+eD9PDZqY1hmlo/cGujsiG12dnHLuqefxzm3K+a2uL60yBym49Qm/340o7Sc2mvn9pdLjvhT5u5/Vl7/i+ithFotThL2dLP9RLQ81O76ON4D9TYXzTIX1drz0epvX9CateX5ytcfn1EUvMgaqnS8fIuey/ULgcPkyl6LLV8LF97dmrHX7/3cN4VhnalNv+nP8ynVHgYZtnPTu1oMSgLpv1+/H5XamvDtAWEVtlfitoYLi53pjY6TFvRek3UOkfxOGqLxemro3bRJayPo3b8Ln8QtQVgkxo+HaEGT8eoLUYAa3OxDDZP3+KjTWq98fJPJ6PDLBYnF903XtLENqnhwxU1/DOkdvwW0BmyjtoXfPh2g9pPevxzndqbt+P4uEoQTtOTdWr98UBqo6Ncf1y1kS4v0qM1avhs/rl1q18To/PZ2SlhkH91D09nQ+Tt4/WzpqfjuOn1ra7aZ4NWFh88zG7uHmZ0YldDCu0w69HgAQcccMABBxxwwDPjf7O0+lLgpiyKAAAAAElFTkSuQmCC' },
  { name: 'Maruti Suzuki', logo: 'data:image/jpeg;base64,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' },
  { name: 'Kia', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToI583O9-8OnqkM_NhsYMRs2_-BQMDLx5ZHr7eqt-mpfngAp94HUdmOtrZ&s=10' },
  { name: 'BMW', logo: 'data:image/jpeg;base64,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' },
];

const POPULAR_CARS = [
  {
    id: 'h31',
    name: 'Range Rover Sport',
    price: '₹1.45 – 2.20 Crore',
    tag: 'Luxury SUV',
    fuel: 'Petrol / Diesel',
    km: '8.7 kmpl · AWD',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYHindy8Kp6nhbGs4GgUfQf86JIBUhSsCGSb4tRu7evg&s=10',
    link: '/new-cars'
  },
  {
    id: 'h32',
    name: 'Range Rover Velar',
    price: '₹94.00 Lakh – 1.30 Crore',
    tag: 'Premium SUV',
    fuel: 'Petrol / Diesel',
    km: '10.9 kmpl · AWD',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHrymapxjlTILJ3dolqeCPMTXnbudG2kKFocPK-_Rs1Q&s=10',
    link: '/new-cars'
  },
  {
    id: 'h33',
    name: 'Range Rover Autobiography',
    price: '₹2.20 – 2.80 Crore',
    tag: 'Ultra Luxury',
    fuel: 'Petrol / Diesel',
    km: '8.7 kmpl · AWD',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Y8GZgtj2i7jEzQimfyJE63JKfsBmjNDHYc9PuY_GDw&s=10',
    link: '/new-cars'
  }



];

const SERVICES = [
  { icon: RiShieldCheckLine, title: 'Verified History', desc: '100% genuine RC & service history records' },
  { icon: RiExchangeLine, title: 'Zero Brokerage Sale', desc: 'Direct buyers & sellers with instant payment' },
  { icon: RiCustomerService2Line, title: '24/7 Expert Advice', desc: 'Personal car consultants to guide your purchase' },
  { icon: RiShieldUserLine, title: 'Doorstep Delivery', desc: 'Fully sanitized vehicle delivered to your home' },
];

export default function Home() {
  const { dark } = useTheme();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const bg = dark ? 'bg-[#080A0D]' : 'bg-slate-50';
  const cardBg = dark ? 'bg-[#0D0F16]' : 'bg-white';
  const border = dark ? 'border-red-900/20' : 'border-amber-600/15';
  const textHi = dark ? 'text-gray-50' : 'text-slate-900';
  const textSb = dark ? 'text-white/55' : 'text-slate-500';
  const gradText = dark
    ? 'bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent'
    : 'bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent';
  const gradBtn = dark
    ? 'bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white'
    : 'bg-gradient-to-r from-amber-700 via-amber-500 to-amber-400 text-white';

  return (
    <div className={`${bg} min-h-screen font-sans transition-colors duration-300`}>

      {/* ══════════════════════════════════════════════
          1. HERO SECTION
      ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

          <div className="space-y-6 z-10">
            <div className={`inline-flex items-center gap-2 text-xs font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full border ${dark ? 'bg-red-900/20 text-red-400 border-red-900/30' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
              <RiFireLine size={15} /> India's Premier Automotive Destination
            </div>

            <h1 className={`text-4xl sm:text-6xl font-black leading-none tracking-tight ${textHi}`}>
              DRIVE YOUR <span className={gradText}>DREAM CAR</span> 
            </h1>

            <p className={`text-base sm:text-lg leading-relaxed ${textSb} max-w-xl`}>
              Explore 10,000+ verified new & used cars, watch authentic video reviews by Arun Panwar, book test drives, and sell your car at best market price.
            </p>

            {/* QUICK ACTIONS ROW */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/new-cars" className={`px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider no-underline shadow-lg ${gradBtn}`}>
                Explore New Cars
              </Link>
              <Link to="/used-cars" className={`px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider no-underline border ${dark ? 'border-white/20 text-white hover:bg-white/10' : 'border-slate-300 text-slate-800 hover:bg-slate-100'}`}>
                Browse Used Cars
              </Link>
              <Link to="/sell" className={`px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider no-underline border ${dark ? 'border-red-600/50 text-red-400 hover:bg-red-900/20' : 'border-amber-500/50 text-amber-700 hover:bg-amber-50'}`}>
                Sell Your Car
              </Link>
            </div>

            {/* TRUST NUMBERS */}
            <div className={`grid grid-cols-3 gap-4 pt-6 border-t ${border}`}>
              <div>
                <p className={`text-2xl font-black ${textHi}`}>10,000+</p>
                <p className={`text-xs ${textSb}`}>Verified Cars</p>
              </div>
              <div>
                <p className={`text-2xl font-black ${textHi}`}>500+</p>
                <p className={`text-xs ${textSb}`}>Certified Dealers</p>
              </div>
              <div>
                <p className={`text-2xl font-black ${gradText}`}>4.9 ★</p>
                <p className={`text-xs ${textSb}`}>User Rating</p>
              </div>
            </div>
          </div>

          {/* HERO CAR SHOWCASE */}
          <div className="relative">
            <div className={`relative rounded-3xl overflow-hidden border ${border} ${cardBg} shadow-2xl p-2`}>
              <img
                src="https://wallpapercave.com/wp/wp7132237.jpg"
                alt="Luxury SUV"
                className="w-full h-360px sm:h-420px object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">

                  <h3 className="text-xl font-extrabold">RANGE ROVER</h3>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2. FEATURED BRAND BADGES
      ══════════════════════════════════════════════ */}
      <section className={`py-12 border-y ${border} ${dark ? 'bg-[#0A0C12]' : 'bg-slate-100/60'}`}>
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${textHi}`}>Top Car Manufacturers</h2>
              <p className={`text-xs ${textSb}`}>Browse cars by leading Indian and global automakers</p>
            </div>
            <Link to="/new-cars" className={`text-xs font-bold uppercase no-underline ${gradText}`}>
              View All Cars →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {BRANDS.map((b, i) => (
              <Link
                key={i}
                to="/new-cars"
                className={`p-4 rounded-2xl border ${border} ${cardBg} hover:scale-105 transition-all text-center no-underline block group shadow-sm`}
              >
                <img src={b.logo} alt={b.name} className="w-full h-30 object-cover rounded-xl mb-2 group-hover:opacity-90" />
                <h4 className={`text-sm font-bold ${textHi}`}>{b.name}</h4>
                <p className={`text-[11px] ${textSb}`}>{b.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. TRENDING CARS GRID
      ══════════════════════════════════════════════ */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className={`text-xs font-bold uppercase tracking-widest ${gradText}`}>Trending Selection</span>
              <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight mt-1 ${textHi}`}>
                Most Popular <span className={gradText}>Cars of 2026</span>
              </h2>
            </div>
            <Link to="/new-cars" className={`inline-block px-5 py-2.5 rounded-xl text-xs font-bold uppercase no-underline ${gradBtn}`}>
              Explore All 48+ Cars
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_CARS.map((car) => {
              const saved = isWishlisted(car.id || car.name);
              return (
                <div key={car.id} className={`rounded-3xl border ${border} ${cardBg} overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group`}>
                  <div className="relative h-65 overflow-hidden bg-slate-800">
                    <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                      {car.tag}
                    </span>
                    <button
                      onClick={() => toggleWishlist({ id: car.id, name: car.name, title: car.name, price: car.price, img: car.image })}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur text-white flex items-center justify-center border-none cursor-pointer hover:bg-red-600 transition-colors"
                    >
                      {saved ? <RiHeartFill size={18} className="text-red-500" /> : <RiHeartLine size={18} />}
                    </button>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className={`font-extrabold text-lg ${textHi}`}>{car.name}</h3>
                      <p className={`text-base font-extrabold mt-1 ${gradText}`}>{car.price}</p>
                      <div className={`grid grid-cols-2 gap-2 mt-3 text-xs ${textSb}`}>
                        <span>Fuel: <strong>{car.fuel}</strong></span>
                        <span>Spec: <strong>{car.km}</strong></span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-white/10">
                      <Link to="/new-cars" className={`flex-1 text-center py-2.5 rounded-xl text-xs font-bold no-underline ${gradBtn}`}>
                        View Prices & Specs
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. ARUN PANWAR YOUTUBE VIDEO FEATURE
      ══════════════════════════════════════════════ */}
      <section className={`py-16 border-y ${border} ${dark ? 'bg-[#0D0F16]' : 'bg-slate-100/80'}`}>
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-3xl overflow-hidden border border-red-600/30 shadow-2xl group">
            <iframe width="610" height="315" src="https://www.youtube.com/embed/Ek2RyUa-PZ8?si=ihbaaJN4RwNftd0m" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


            <span className="absolute bottom-4 left-4 bg-slate-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20">
              🔥 Arun Panwar LANDROVER DEFENDER
            </span>
          </div>

          <div className="space-y-5">
            <span className={`text-xs font-extrabold uppercase tracking-widest ${gradText}`}>AutoSyntax TV Creator Spotlight</span>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${textHi}`}>
              Watch Car Reviews by <span className={gradText}>Arun Panwar</span>
            </h2>
            <p className={`text-sm ${textSb} leading-relaxed`}>
              Get honest, real-world Indian car delivery videos, extreme 4x4 offroad challenges, long-term ownership reviews, and mileage tests from top creator Arun Panwar.
            </p>
            <Link to="/videos" className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider no-underline ${gradBtn}`}>
              <RiPlayCircleLine size={18} /> Watch All Videos Now
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5. WHY CHOOSE AUTOSYNTAX
      ══════════════════════════════════════════════ */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className={`text-xs font-extrabold uppercase tracking-widest ${gradText}`}>The AutoSyntax Guarantee</span>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${textHi}`}>
              Why Millions Trust AutoSyntax
            </h2>
            <p className={`text-xs sm:text-sm ${textSb}`}>
              We ensure transparent pricing, verified vehicle documentation, and zero hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className={`p-6 rounded-3xl border ${border} ${cardBg} space-y-3 shadow-md hover:shadow-xl transition-all`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${dark ? 'bg-red-900/30 text-red-400' : 'bg-amber-100 text-amber-700'}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className={`font-bold text-base ${textHi}`}>{s.title}</h3>
                  <p className={`text-xs ${textSb} leading-relaxed`}>{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. SELL YOUR CAR CTA BANNER
      ══════════════════════════════════════════════ */}
      <section className="py-12 px-4">
        <div className={`max-w-7xl mx-auto rounded-3xl border ${border} ${cardBg} p-8 sm:p-12 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8`}>
          <div className="space-y-3 z-10 max-w-xl">
            <span className={`text-xs font-bold uppercase tracking-widest ${gradText}`}>Instant Car Sale</span>
            <h2 className={`text-3xl sm:text-4xl font-black ${textHi}`}>
              Want to Sell Your Used Car for Top Rupee?
            </h2>
            <p className={`text-sm ${textSb}`}>
              Get free doorstep inspection, instant price estimate, zero commission fees, and payment credited directly to your bank account within 24 hours.
            </p>
          </div>
          <div className="z-10 w-full md:w-auto">
            <Link to="/sell" className={`block text-center px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest no-underline shadow-2xl ${gradBtn}`}>
              Get Free Instant Valuation →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}