const https = require('https');

const sitemapUrl = 'https://sardarawais.com/sitemap.xml';

const searchEngines = [
  {
    name: 'Google',
    url: `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
  },
  {
    name: 'Bing',
    url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
  }
];

console.log(`Starting SEO Ping for ${sitemapUrl}...\n`);

searchEngines.forEach((engine) => {
  https.get(engine.url, (res) => {
    if (res.statusCode === 200) {
      console.log(`✅ Successfully pinged ${engine.name}. They will crawl your site soon.`);
    } else {
      console.log(`❌ Failed to ping ${engine.name}. Status Code: ${res.statusCode}`);
    }
  }).on('error', (e) => {
    console.error(`❌ Error pinging ${engine.name}: ${e.message}`);
  });
});
