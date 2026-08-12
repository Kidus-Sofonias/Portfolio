import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown,
  Dribbble,
  Zap,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
  Mail,
  BookHeart,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   HOBBIES — my real ones
   ═══════════════════════════════════════════════════════════ */
const hobbies = [
  {
    icon: Crown,
    title: 'Chess',
    description:
      "~1200 on chess.com. London System loyalist and devoted GothamChess fan — every game is a small exercise in out-calculating someone.",
  },
  {
    icon: Dribbble,
    title: 'Basketball',
    description:
      'Took a full summer training program. The court sharpens the same skills I use in code: reading the field, timing your move, staying cool under pressure.',
  },
  {
    icon: Zap,
    title: 'Marvel',
    description:
      "Tony Stark is my guy — the engineer who builds his way out of every problem. Long-term goal: be that guy.",
  },
];

/* ═══════════════════════════════════════════════════════════
   BOOKS — everything I've finished.
   type: 'series' | 'book'
   isbn: representative cover (Open Library covers API)
   books: series members only (title + isbn for each)
   ═══════════════════════════════════════════════════════════ */
const finishedBooks = [
  {
    type: 'series',
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    isbn: '9780439023481',
    gradient: 'from-amber-500 to-red-800',
    favorite: false,
    note: 'Strategy, survival, and systems under pressure — I tore through the whole trilogy.',
    books: [
      { title: 'The Hunger Games', isbn: '9780439023481' },
      { title: 'Catching Fire', isbn: '9780439023498' },
      { title: 'Mockingjay', isbn: '9780439023511' },
    ],
  },
  {
    type: 'series',
    title: 'A Song of Ice and Fire',
    author: 'George R.R. Martin',
    isbn: '9780553386790',
    gradient: 'from-slate-600 to-slate-900',
    favorite: false,
    note: "All five published books — world-building on a scale I didn't know existed.",
    books: [
      { title: 'A Game of Thrones', isbn: '9780553386790' },
      { title: 'A Clash of Kings', isbn: '9780553108033' },
      { title: 'A Storm of Swords', isbn: '9780553103427' },
      { title: 'A Feast for Crows', isbn: '9780553801507' },
      { title: 'A Dance with Dragons', isbn: '9780553801477' },
    ],
  },
  {
    type: 'series',
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    isbn: '9780747532699',
    gradient: 'from-purple-600 to-indigo-900',
    favorite: false,
    note: 'Grew up with all seven — the reason I first got hooked on long, rich stories.',
    books: [
      { title: "The Sorcerer's Stone", isbn: '9780747532699' },
      { title: 'The Chamber of Secrets', isbn: '9780747538486' },
      { title: 'The Prisoner of Azkaban', isbn: '9780747542155' },
      { title: 'The Goblet of Fire', isbn: '9780747546245' },
      { title: 'The Order of the Phoenix', isbn: '9780747551003' },
      { title: 'The Half-Blood Prince', isbn: '9780747581086' },
      { title: 'The Deathly Hallows', isbn: '9780545010221' },
    ],
  },
  {
    type: 'series',
    title: 'The Dark Tower',
    author: 'Stephen King',
    isbn: '9780452284692',
    gradient: 'from-rose-700 to-slate-950',
    favorite: false,
    note: "King's magnum opus — the Gunslinger alone made me chase all eight books.",
    books: [
      { title: 'The Gunslinger', isbn: '9780452284692' },
      { title: 'The Drawing of the Three', isbn: '9780452274457' },
      { title: 'The Waste Lands', isbn: '9781880418620' },
      { title: 'Wizard and Glass', isbn: '9781880418590' },
      { title: 'Wolves of the Calla', isbn: '9781880418484' },
      { title: 'Song of Susannah', isbn: '9781892284725' },
      { title: 'The Dark Tower', isbn: '9781880418569' },
      { title: 'The Wind Through the Keyhole', isbn: '9781880418590' },
    ],
  },
  {
    type: 'book',
    title: 'Inferno',
    author: 'Dan Brown',
    isbn: '9780385537858',
    gradient: 'from-red-600 to-rose-900',
    favorite: true,
    note: "My favorite book — a code-cracking, art-history chase through Florence that I finished in days and immediately reread.",
  },
  {
    type: 'book',
    title: 'Dreamcatcher',
    author: 'Stephen King',
    isbn: '9780684868208',
    gradient: 'from-fuchsia-600 to-purple-950',
    favorite: false,
    note: "Four friends, one cabin, and a nightmare that won't stay buried — King at his most gripping.",
  },
  {
    type: 'book',
    title: 'The Partner',
    author: 'John Grisham',
    isbn: '9780440238139',
    gradient: 'from-sky-600 to-blue-900',
    favorite: false,
    note: 'The legal thriller that pulled me in — a man who fakes his death, steals $90M, and still gets caught.',
  },
  {
    type: 'book',
    title: 'The Associate',
    author: 'John Grisham',
    isbn: '9781401323228',
    gradient: 'from-emerald-600 to-teal-900',
    favorite: false,
    note: 'A young lawyer blackmailed into corporate espionage — great look at how a single decision can chain everything.',
  },
  {
    type: 'book',
    title: 'The Broker',
    author: 'John Grisham',
    isbn: '9780743464426',
    gradient: 'from-amber-600 to-orange-900',
    favorite: false,
    note: "A disgraced CIA broker pardoned and hidden in Italy — until the world's most powerful people come looking.",
  },
];

/* ───────── Book cover with shimmer + gradient fallback ─────────
   Covers are bundled locally in /covers/{isbn}.jpg — no external
   requests, so they can never fail to load (DNS, rate limits, etc.). */
const BookCover = ({ isbn, title, gradient, size = 'L', className = '', eager = false }) => {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const src = isbn && !failed ? `/covers/${isbn}.jpg` : null;

  /* Fallback gradient cover (no real image available) */
  if (!src) {
    return (
      <div className={`w-full h-full bg-gradient-to-br ${gradient} relative overflow-hidden ${className}`}>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.12) 8px, rgba(255,255,255,0.12) 9px)',
          }}
        />
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center p-5">
          <p className="font-serif text-white text-lg text-center leading-snug">{title}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-navy-800 ${className}`}>
      {/* Shimmer while loading */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 animate-shimmer transition-opacity duration-500 ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <img
        src={src}
        alt={`${title} book cover`}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

/* ───────── Detail popup ───────── */
const BookModal = ({ book, onClose }) => {
  useEffect(() => {
    if (!book) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [book, onClose]);

  return (
    <AnimatePresence>
      {book && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X size={20} className="text-white" />
          </button>

          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-navy-900 rounded-2xl overflow-hidden shadow-2xl m-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row">
              {/* Cover */}
              <div className="md:w-64 shrink-0 relative">
                <div className="aspect-[2/3] md:h-full md:aspect-auto">
                  <BookCover
                    isbn={book.isbn}
                    title={book.title}
                    gradient={book.gradient}
                    size="L"
                  />
                </div>
                {book.favorite && (
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 bg-gold-500 text-navy-900 text-xs font-bold rounded-full shadow-lg">
                    <Star size={12} fill="currentColor" /> FAVORITE
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 p-6 md:p-8">
                <p className="text-gold-400 font-mono text-xs tracking-widest mb-2 uppercase">
                  {book.type === 'series' ? 'Series' : 'Book'} · Read & finished
                </p>
                <h3 className="font-serif text-2xl text-white mb-1">{book.title}</h3>
                <p className="text-gray-400 text-sm mb-5">{book.author}</p>

                <p className="text-gray-300 text-sm leading-relaxed mb-6">{book.note}</p>

                {book.type === 'series' && (
                  <div>
                    <p className="text-gray-500 font-mono text-xs tracking-widest mb-3 uppercase">
                      Books in the series
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {book.books.map((b, i) => (
                        <div key={b.title} className="w-16">
                          <div className="aspect-[2/3] rounded-md overflow-hidden shadow-md shadow-black/40 border border-navy-600/50">
                            <BookCover
                              isbn={b.isbn}
                              title={b.title}
                              gradient={book.gradient}
                              size="S"
                              eager
                            />
                          </div>
                          <p className="text-[10px] text-gray-500 mt-1.5 leading-tight text-center">
                            {i + 1}. {b.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ───────── Personal Section ───────── */
const PersonalSection = () => {
  const [active, setActive] = useState(4); // Inferno (favorite) starts center
  const [paused, setPaused] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [cardW, setCardW] = useState(220);
  const [isMobile, setIsMobile] = useState(false);
  const stageRef = useRef(null);
  const touchX = useRef(null);

  const total = finishedBooks.length;
  const GAP = 24;
  const CARD_H = cardW * 1.5;

  /* Measure stage + responsive mode */
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const updateMode = () => setIsMobile(mq.matches);
    updateMode();
    mq.addEventListener('change', updateMode);

    const measure = () => {
      if (!stageRef.current) return;
      const w = stageRef.current.offsetWidth;
      setCardW(isMobile ? Math.min(w - 40, 240) : Math.min(Math.floor(w / 3) - 28, 230));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => {
      mq.removeEventListener('change', updateMode);
      window.removeEventListener('resize', measure);
    };
  }, [isMobile]);

  /* Autoplay — pauses on hover / when popup open */
  useEffect(() => {
    if (paused || selectedBook) return;
    const id = setInterval(() => setActive((a) => (a + 1) % total), 4000);
    return () => clearInterval(id);
  }, [paused, selectedBook, total]);

  const go = useCallback(
    (dir) => setActive((a) => (a + dir + total) % total),
    [total]
  );

  const select = (book, index) => {
    setActive(index);
    setSelectedBook(book);
  };

  /* Visible window: 3 on desktop, 1 on mobile */
  const visibleCount = isMobile ? 1 : 3;
  const visibleOffsets = [];
  for (let o = -(visibleCount - 1) / 2; o <= (visibleCount - 1) / 2; o++) {
    visibleOffsets.push(o);
  }

  return (
    <section id="personal" className="section-padding">
      <div className="container mx-auto px-6">
        <p className="text-gold-400 font-mono text-sm tracking-widest mb-4">05 — PERSONAL</p>
        <h2 className="font-serif text-4xl md:text-5xl mb-6">Beyond the code.</h2>
        <p className="text-gray-400 max-w-2xl mb-16 leading-relaxed">
          The deep-analysis habit doesn't switch off when I close the editor — chessboard, court, and the books I finish.
        </p>

        {/* ── Hobbies ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {hobbies.map((hobby, index) => (
            <motion.div
              key={hobby.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group p-6 rounded-2xl border border-navy-600/50 hover:border-gold-500/30 hover:bg-navy-800 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center mb-5 group-hover:bg-gold-500/20 group-hover:scale-110 transition-all">
                <hobby.icon className="w-5 h-5 text-gold-400" />
              </div>
              <h3 className="font-serif text-xl mb-2 group-hover:text-gold-400 transition-colors">
                {hobby.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{hobby.description}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Books I've Finished ── */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-gold-400 font-mono text-xs tracking-widest mb-3 flex items-center gap-2">
              <BookHeart size={14} /> BOOKS I'VE FINISHED
            </p>
            <h3 className="font-serif text-3xl md:text-4xl">From my shelf.</h3>
          </div>
          <p className="text-gray-500 font-mono text-xs hidden md:block">
            {total} TITLES · INCLUDING SERIES
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={stageRef}
          className="relative select-none overflow-hidden"
          style={{ height: CARD_H + 64 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          {visibleOffsets.map((offset) => {
            const index = ((active + offset) % total + total) % total;
            const book = finishedBooks[index];
            const isCenter = offset === 0;
            const scale = isCenter ? 1 : 0.8;
            const opacity = isCenter ? 1 : 0.45;
            const z = isCenter ? 30 : 20;

            return (
              <div
                key={book.title}
                className="absolute top-0 transition-all duration-500 ease-out"
                style={{
                  left: '50%',
                  width: cardW,
                  transform: `translateX(${offset * (cardW + GAP) - cardW / 2}px) scale(${scale})`,
                  opacity,
                  zIndex: z,
                }}
              >
                <button
                  onClick={() => select(book, index)}
                  className="block w-full text-left cursor-pointer group/card focus:outline-none"
                  aria-label={`View ${book.title}`}
                >
                  <div
                    className="relative rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-navy-600/50 group-hover/card:border-gold-500/40 transition-colors"
                    style={{ height: CARD_H }}
                  >
                    <BookCover isbn={book.isbn} title={book.title} gradient={book.gradient} size="L" />

                    {/* Favorite badge */}
                    {book.favorite && (
                      <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 bg-gold-500 text-navy-900 text-[10px] font-bold rounded-full shadow-lg">
                        <Star size={10} fill="currentColor" /> FAVORITE
                      </div>
                    )}

                    {/* Series count */}
                    {book.type === 'series' && (
                      <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 rounded-full text-[10px] font-mono text-gray-300">
                        {book.books.length} books
                      </div>
                    )}

                    {/* Title gradient */}
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                      <p className="font-serif text-white text-sm leading-tight group-hover/card:text-gold-400 transition-colors">
                        {book.title}
                      </p>
                      <p className="text-gray-400 text-[10px] mt-0.5">{book.author}</p>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}

          {/* Arrows */}
          <button
            onClick={() => go(-1)}
            className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-navy-800/80 backdrop-blur border border-navy-600/60 hover:border-gold-500/40 hover:bg-navy-700 flex items-center justify-center transition-colors z-40"
            aria-label="Previous book"
          >
            <ChevronLeft size={20} className="text-gray-300" />
          </button>
          <button
            onClick={() => go(1)}
            className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-navy-800/80 backdrop-blur border border-navy-600/60 hover:border-gold-500/40 hover:bg-navy-700 flex items-center justify-center transition-colors z-40"
            aria-label="Next book"
          >
            <ChevronRight size={20} className="text-gray-300" />
          </button>

          {/* Hint */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-gray-600 text-[11px] font-mono whitespace-nowrap">
            {isMobile ? 'SWIPE · TAP A BOOK' : 'HOVER TO PAUSE · CLICK A BOOK'}
          </div>
        </div>

        {/* Recommendation invite */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm">
            Reading something I should pick up?{' '}
            <a
              href="mailto:sofoniaskidus@gmail.com?subject=Book%20recommendation%20for%20Kidus&body=Hi%20Kidus%2C%0A%0AI%20think%20you%20should%20read%20%3Cbook%20title%20here%3E%20by%20%3Cauthor%3E.%0A%0A%3Cwhy%20you%27d%20love%20it%3E"
              className="text-gold-400 hover:text-gold-500 transition-colors inline-flex items-center gap-1.5"
            >
              <Mail size={14} />
              Send me a recommendation
            </a>
          </p>
        </motion.div>
      </div>

      <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </section>
  );
};

export default PersonalSection;
