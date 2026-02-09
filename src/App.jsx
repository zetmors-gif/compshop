import { TopMenu } from './TopMenu';
import { Price } from './Price';
import { Review } from './Review';
import { Footer } from './Footer';
import { Hall } from './Room';
import Header from './Header';





const ZetMorsUltraWide = () => {
  return (
    <div className="w-full bg-[#050505] text-white">
      <Header />
      
      {/* 1. HERO SECTION - FULLSCREEN */}
      <TopMenu />

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
