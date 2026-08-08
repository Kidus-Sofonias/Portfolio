import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellOff, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import SmartImage from './SmartImage';

const BLOG_POST_COUNT = 3; // Update this when adding new posts

const blogPosts = [
  {
    id: 1,
    title: 'Edify X Kuta Learning Hub — EdTech Expo 2026',
    images: ['/edify1.jpg', '/edify2.jpg', '/edify3.jpg'],
    description:
      'Meet Team Vision Zero! After months of training and coaching through Edify X Kuta Learning Hub\'s EdTech program, the team from Abune Gorgoriyos School — Kaliti Campus emerged as the 1st Place winners in the 2026 EdTech Expo Competition, rising above 79 teams from 25 schools. Their victory wasn\'t luck — it was built on passion, creativity, teamwork, and months of hard work. They proved that young innovators can solve real problems and inspire what\'s next.',
    date: '2026',
    tags: ['Edify', 'EdTech', 'Innovation'],
  },
  {
    id: 2,
    title: 'Building Drive Pulse — A Year of Road Safety Innovation',
    images: ['/drivepulse.png', '/edify1.jpg', '/edify2.jpg'],
    description:
      'It took me a year to build Drive Pulse. The idea was to improve road safety in Ethiopia by being able to monitor and give a score to a driver\'s trip — with no additional hardware. The solution is smart, safe, and inexpensive, designed to tackle the road accident problem that claims over 1.16 million lives globally every year. By turning a standard smartphone into a professional driving-safety tool, Drive Pulse captures GPS and IMU sensor data in real-time, detects risky driving events, and produces an AI-blended safety score with actionable feedback.',
    date: '2026',
    tags: ['Drive Pulse', 'Road Safety', 'ML'],
  },
  {
    id: 3,
    title: 'Isomer Explorer — Graph Theory Meets Chemistry',
    images: ['/isomer-explorer.png', '/edify3.jpg', '/edify1.jpg'],
    description:
      'A small school-project experiment that became something special: a fully client-side web app where you type any hydrocarbon formula or IUPAC name and it instantly enumerates, names, and draws every constitutional isomer. Instead of a database, the app uses a graph-theory algorithm in pure vanilla JavaScript that treats each molecule as a tree, enumerates every rooted and free tree form, and mathematically deduplicates identical structures through canonical labeling.',
    date: '2025',
    tags: ['Chemistry', 'Graph Theory', 'Three.js'],
  },
];

/* ───────── Instagram-style carousel modal ───────── */
const ImageModal = ({ post, onClose }) => {
  const [current, setCurrent] = useState(0);
  const images = post?.images || [];

  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!post) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [post, onClose, prev, next]);

  useEffect(() => {
    if (post) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [post]);

  return (
    <AnimatePresence>
      {post && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X size={20} className="text-white" />
          </button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-navy-900 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] bg-black">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  <SmartImage
                    src={images[current]}
                    alt={`${post.title} — image ${current + 1}`}
                    eager
                    className="w-full h-full"
                  />
                </motion.div>
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft size={18} className="text-white" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
                  >
                    <ChevronRight size={18} className="text-white" />
                  </button>
                </>
              )}

              {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === current ? 'bg-gold-400 w-4' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className="font-serif text-xl text-white mb-2">{post.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{post.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-mono text-gray-400 bg-navy-800 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ───────── Blog Section ───────── */
const BlogSection = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  /* Check localStorage + SW registration on mount */
  useEffect(() => {
    const subscribed = localStorage.getItem('blog_notifications_subscribed');
    if (subscribed === 'true') {
      setIsSubscribed(true);
    }

    /* Listen for SCROLL_TO_BLOG from service worker */
    const handler = (event) => {
      if (event.data?.type === 'SCROLL_TO_BLOG') {
        const el = document.getElementById('blog');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    };
    navigator.serviceWorker?.addEventListener?.('message', handler);
    return () => navigator.serviceWorker?.removeEventListener?.('message', handler);
  }, []);

  const handleSubscribe = async () => {
    if (!('Notification' in window)) {
      alert('Your browser does not support push notifications.');
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      /* Register service worker */
      if ('serviceWorker' in navigator) {
        try {
          const reg = await navigator.serviceWorker.register('/sw.js');
          console.log('Service Worker registered:', reg.scope);

          /* Store current post count and notify SW */
          const storedCount = parseInt(localStorage.getItem('blog_post_count') || '0', 10);
          localStorage.setItem('blog_post_count', String(BLOG_POST_COUNT));

          /* Tell SW to check for new posts */
          if (reg.active) {
            reg.active.postMessage({
              type: 'CHECK_NEW_POSTS',
              postCount: BLOG_POST_COUNT,
              storedCount,
            });
          }

          /* Welcome notification */
          if (storedCount === 0) {
            new Notification('🔔 Notifications enabled!', {
              body: 'You\'ll be notified when I publish new blog posts.',
              icon: '/kidus.png',
            });
          }
        } catch (err) {
          console.error('SW registration failed:', err);
        }
      }

      setIsSubscribed(true);
      localStorage.setItem('blog_notifications_subscribed', 'true');
    } else if (permission === 'denied') {
      alert('Notifications are blocked. Please enable them in your browser settings.');
    }
  };

  const handleUnsubscribe = () => {
    setIsSubscribed(false);
    localStorage.removeItem('blog_notifications_subscribed');
    localStorage.removeItem('blog_post_count');
  };

  return (
    <section id="blog" className="section-padding bg-navy-800">
      <div className="container mx-auto px-6">
        <p className="text-gold-400 font-mono text-sm tracking-widest mb-4">
          04 — BLOG
        </p>
        <h2 className="font-serif text-4xl md:text-5xl mb-16">Latest Articles</h2>

        {/* Blog cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative h-56 overflow-hidden">
                <SmartImage
                  src={post.images[0]}
                  alt={post.title}
                  className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/20 to-transparent" />

                {post.images.length > 1 && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 rounded-full flex items-center gap-1">
                    <span className="text-white text-xs font-mono">{post.images.length} images</span>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-xl text-white group-hover:text-gold-400 transition-colors mb-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gold-400 font-mono text-sm group-hover:gap-3 transition-all">
                    Read More <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Push notification subscription */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-10 text-center"
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors ${
            isSubscribed ? 'bg-green-500/10' : 'bg-gold-500/10'
          }`}>
            {isSubscribed ? (
              <Bell className="w-8 h-8 text-green-400" />
            ) : (
              <Bell className="w-8 h-8 text-gold-400 animate-bounce" />
            )}
          </div>

          <h3 className="font-serif text-2xl mb-4">
            {isSubscribed ? 'You\'re Subscribed!' : 'Get Notified on Your Phone'}
          </h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            {isSubscribed
              ? 'You\'ll receive a notification on your device whenever I publish a new blog post. Click it to read anytime.'
              : 'Subscribe to receive a notification on your phone whenever I publish a new blog post. Tap the notification to open and read it right in your browser.'}
          </p>

          {isSubscribed ? (
            <div className="flex flex-col items-center gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-full"
              >
                <Bell size={16} className="text-green-400" />
                <span className="text-green-400 font-mono text-sm">
                  Notifications active
                </span>
              </motion.div>
              <button
                onClick={handleUnsubscribe}
                className="flex items-center gap-2 text-gray-500 hover:text-red-400 font-mono text-xs transition-colors"
              >
                <BellOff size={14} />
                UNSUBSCRIBE
              </button>
            </div>
          ) : (
            <button
              onClick={handleSubscribe}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold-500 text-navy-900 rounded-full font-medium hover:bg-gold-400 transition-all duration-300 hover:scale-105 group"
            >
              <Bell size={18} className="group-hover:animate-bounce" />
              Enable Notifications
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          )}

          <p className="text-gray-600 text-xs mt-4 font-mono">
            Works on mobile & desktop. No email required.
          </p>
        </motion.div>
      </div>

      <ImageModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </section>
  );
};

export default BlogSection;
