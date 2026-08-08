/* ─────────────────────────────────────────────────
   Service Worker — Blog Push Notifications
   
   Strategy: Communicates with main thread via
   postMessage. Main thread tells SW when to check
   for new posts. SW shows notifications.
   ───────────────────────────────────────────────── */

/* Install: skip waiting to activate immediately */
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

/* Activate: clean old caches */
self.addEventListener('activate', (event) => {
  self.clients.claim();
});

/* Listen for messages from the main thread */
self.addEventListener('message', (event) => {
  const { type, postCount, storedCount } = event.data || {};

  if (type === 'CHECK_NEW_POSTS' && postCount > storedCount) {
    self.registration.showNotification('📝 New Blog Post!', {
      body: 'I just published a new article. Tap to read it!',
      icon: '/kidus.png',
      badge: '/kidus.png',
      tag: 'new-blog-post',
      renotify: true,
      data: { url: '#blog' },
    });
  }
});

/* Handle notification click — open the blog section */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      /* If portfolio is already open, focus it and scroll to blog */
      for (const client of clients) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.focus();
          client.postMessage({ type: 'SCROLL_TO_BLOG' });
          return;
        }
      }
      /* Otherwise open a new window */
      return self.clients.openWindow(self.location.origin + '/#blog');
    })
  );
});
