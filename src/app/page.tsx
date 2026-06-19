import ThemeToggle from '@/components/ThemeToggle';
import Header from '@/components/Header';
import Services from '@/components/Services';
import Cases from '@/components/Cases';
import MediaBlock from '@/components/MediaBlock';
import Clock from '@/components/Clock';



export default function Home() {
  return (
    <>
      {/* Theme toggle — fixed top-right */}
      <ThemeToggle />

      {/* Content layer — z-index: 2 */}
      <main
        style={{ position: 'relative', zIndex: 2 }}
        aria-label="Портфолио Якова Пилипюка"
      >
        {/* Clock at top 10px, stretched to window width */}
        <Clock />

        <div className="content-col">
          {/* Block 1: Header / Article header */}
          <Header />

          <hr className="divider" />

          {/* Block 2: Services */}
          <Services />

          <hr className="divider" />

          {/* Block 3: Cases */}
          <Cases />

          <hr className="divider" />

          {/* Block 5: Media stub ("всячина") */}
          <MediaBlock />

        </div>
      </main>
    </>
  );
}

