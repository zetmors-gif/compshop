import { TopMenu } from './TopMenu';
import { Price } from './Price';
import { Review } from './Review';
import { Footer } from './Footer';
import { Hall } from './Room';
import Header from './Header';





const ZetMorsUltraWide = () => {
  return (
    <div className="max-w-375 bg-[#050505] text-white">
      <Header />
      
      <div className='flex justify-center'>
        {/* 1. HERO SECTION - FULLSCREEN */}
        <TopMenu />
      </div>
        {/* 2. PRICES - FULL WIDTH GRID */}
        <Price />
        <Hall />

        {/* 3. REVIEWS - FULLSCREEN DARK BLOCK */}
        <Review />

        {/* 4. FOOTER - FULL WIDTH RED FOOTER */}
        <Footer />
    </div>
  );
};

export default ZetMorsUltraWide;
