'use client';

import React, { useState, useMemo } from 'react';
import styles from './YouTubeDashboard.module.css';
import {
  mockChannels,
  YouTubeChannel,
  YouTubeVideo,
  getSampleApiPayload,
} from './youtubeData';

export default function YouTubeDashboard() {
  const [selectedChannelId, setSelectedChannelId] = useState<string>(
    mockChannels[0].id
  );
  const [activeTab, setActiveTab] = useState<
    'overview' | 'videos' | 'analytics' | 'api'
  >('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'views' | 'date' | 'likes' | 'comments'>(
    'views'
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [apiEndpoint, setApiEndpoint] = useState<'channels' | 'search' | 'videos'>(
    'channels'
  );

  const channel: YouTubeChannel = useMemo(() => {
    return (
      mockChannels.find((c) => c.id === selectedChannelId) || mockChannels[0]
    );
  }, [selectedChannelId]);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(channel.videos.map((v) => v.category)));
    return ['All', ...cats];
  }, [channel]);

  // Filter & Sort Videos
  const filteredVideos = useMemo(() => {
    let result = [...channel.videos];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.tags.some((t) => t.toLowerCase().includes(q)) ||
          v.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter((v) => v.category === selectedCategory);
    }

    if (sortBy === 'views') {
      result.sort((a, b) => b.viewCount - a.viewCount);
    } else if (sortBy === 'date') {
      result.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    } else if (sortBy === 'likes') {
      result.sort((a, b) => b.likeCount - a.likeCount);
    } else if (sortBy === 'comments') {
      result.sort((a, b) => b.commentCount - a.commentCount);
    }

    return result;
  }, [channel, searchQuery, selectedCategory, sortBy]);

  // Pagination (6 per page)
  const pageSize = 6;
  const totalPages = Math.ceil(filteredVideos.length / pageSize) || 1;
  const paginatedVideos = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredVideos.slice(start, start + pageSize);
  }, [filteredVideos, currentPage]);

  const formatNumber = (num: number) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* ── Demo Notice & Simulated API Quota ── */}
      <div className={styles.demoBanner}>
        <div className={styles.bannerBadge}>
          <span className={styles.bannerPulse} />
          <span>LIVE DEMO: Simulated YouTube Data API v3 Response</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className={styles.bannerQuota}>
            Quota: 8 / 10,000 units (No API Key Required)
          </span>
          <span style={{ fontSize: '0.8rem', color: '#a0a0b8' }}>Status: 200 OK</span>
        </div>
      </div>

      {/* ── Channel Hero & Identity ── */}
      <div className={styles.channelHero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={channel.banner}
          alt={`${channel.title} Banner`}
          className={styles.channelBannerImg}
        />
        <div className={styles.channelMetaBar}>
          <div className={styles.channelIdentity}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={channel.avatar}
              alt={channel.title}
              className={styles.channelAvatar}
            />
            <div>
              <h2 className={styles.channelTitle}>
                {channel.title}
                <span className={styles.verifiedBadge}>✓ Verified</span>
              </h2>
              <p className={styles.channelHandle}>
                {channel.customUrl} • {channel.country} • Joined{' '}
                {formatDate(channel.publishedAt)}
              </p>
            </div>
          </div>

          <div className={styles.channelSelector}>
            <label
              htmlFor="channel-select"
              style={{ fontSize: '0.84rem', color: '#a0a0b8' }}
            >
              Switch Channel:
            </label>
            <select
              id="channel-select"
              value={selectedChannelId}
              onChange={(e) => {
                setSelectedChannelId(e.target.value);
                setCurrentPage(1);
              }}
              className={styles.channelSelect}
            >
              {mockChannels.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.customUrl})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Navigation Tabs ── */}
      <div className={styles.tabsBar}>
        <button
          className={`${styles.tabBtn} ${
            activeTab === 'overview' ? styles.activeTabBtn : ''
          }`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Channel Telemetry
        </button>
        <button
          className={`${styles.tabBtn} ${
            activeTab === 'videos' ? styles.activeTabBtn : ''
          }`}
          onClick={() => setActiveTab('videos')}
        >
          🎬 Video Search & API Feed ({channel.videos.length})
        </button>
        <button
          className={`${styles.tabBtn} ${
            activeTab === 'analytics' ? styles.activeTabBtn : ''
          }`}
          onClick={() => setActiveTab('analytics')}
        >
          📈 Growth & Traffic Charts
        </button>
        <button
          className={`${styles.tabBtn} ${
            activeTab === 'api' ? styles.activeTabBtn : ''
          }`}
          onClick={() => setActiveTab('api')}
        >
          💻 Raw API JSON Explorer
        </button>
      </div>

      {/* ── TAB 1: OVERVIEW & TELEMETRY ── */}
      {activeTab === 'overview' && (
        <div>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Total Subscribers</p>
              <div className={styles.statValue}>
                {formatNumber(channel.subscriberCount)}
                <span className={styles.statDelta}>+14.2%</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#a0a0b8', marginTop: '4px' }}>
                channels.statistics.subscriberCount
              </p>
            </div>

            <div className={styles.statCard}>
              <p className={styles.statLabel}>Lifetime Views</p>
              <div className={styles.statValue}>
                {formatNumber(channel.viewCount)}
                <span className={styles.statDelta}>+21.8%</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#a0a0b8', marginTop: '4px' }}>
                channels.statistics.viewCount
              </p>
            </div>

            <div className={styles.statCard}>
              <p className={styles.statLabel}>Public Videos</p>
              <div className={styles.statValue}>
                {channel.videoCount}
                <span className={styles.statDelta}>Active</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#a0a0b8', marginTop: '4px' }}>
                channels.statistics.videoCount
              </p>
            </div>

            <div className={styles.statCard}>
              <p className={styles.statLabel}>Avg. Engagement Rate</p>
              <div className={styles.statValue}>
                8.4%
                <span className={styles.statDelta}>High</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#a0a0b8', marginTop: '4px' }}>
                (Likes + Comments) / Views
              </p>
            </div>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px',
            }}
          >
            <h3 style={{ fontSize: '1.05rem', marginBottom: '8px' }}>
              About Channel
            </h3>
            <p style={{ color: '#a0a0b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {channel.description}
            </p>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                marginTop: '14px',
              }}
            >
              {channel.topics.map((t) => (
                <span
                  key={t}
                  style={{
                    background: 'rgba(123, 97, 255, 0.12)',
                    color: '#b388ff',
                    border: '1px solid rgba(123, 97, 255, 0.25)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                  }}
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: VIDEOS & SEARCH API ── */}
      {(activeTab === 'videos' || activeTab === 'overview') && (
        <div>
          {activeTab === 'overview' && (
            <h3 style={{ fontSize: '1.15rem', margin: '24px 0 16px 0' }}>
              Latest Channel Videos (API: search.list)
            </h3>
          )}

          {/* Search & Sort Controls */}
          <div className={styles.searchSection}>
            <div className={styles.searchInputWrapper}>
              <input
                type="text"
                placeholder="Search videos by title, keyword, or tag..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className={styles.searchInput}
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className={styles.filterSelect}
            >
              <option value="views">Sort by Most Views</option>
              <option value="date">Sort by Latest Upload</option>
              <option value="likes">Sort by Most Liked</option>
              <option value="comments">Sort by Most Comments</option>
            </select>
          </div>

          {/* Category Filter Pills */}
          <div className={styles.categoryPills}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.pillBtn} ${
                  selectedCategory === cat ? styles.activePill : ''
                }`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Videos Grid */}
          <div className={styles.videosGrid}>
            {paginatedVideos.map((video) => (
              <div key={video.id} className={styles.videoCard}>
                <div className={styles.thumbnailWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className={styles.thumbnailImg}
                  />
                  <span className={styles.durationBadge}>{video.duration}</span>
                </div>

                <div className={styles.videoContent}>
                  <span className={styles.videoCategory}>{video.category}</span>
                  <h4 className={styles.videoTitle} title={video.title}>
                    {video.title}
                  </h4>

                  <div className={styles.videoStats}>
                    <span>👁️ {formatNumber(video.viewCount)} views</span>
                    <span>👍 {formatNumber(video.likeCount)}</span>
                    <span>💬 {formatNumber(video.commentCount)}</span>
                  </div>

                  <p
                    style={{
                      fontSize: '0.78rem',
                      color: '#6b6b80',
                      marginBottom: '12px',
                    }}
                  >
                    Published: {formatDate(video.publishedAt)}
                  </p>

                  <div className={styles.videoActions}>
                    <button
                      className={styles.inspectBtn}
                      onClick={() => setSelectedVideo(video)}
                    >
                      Inspect API JSON ↗
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: '#a0a0b8',
              }}
            >
              <p>No videos matched your query: &quot;{searchQuery}&quot;</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="btn btn-outline"
                style={{ marginTop: '12px' }}
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {filteredVideos.length > 0 && (
            <div className={styles.pagination}>
              <span>
                Showing {paginatedVideos.length} of {filteredVideos.length} videos •
                Page {currentPage} of {totalPages}
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className={styles.pageBtn}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  ← Previous
                </button>
                <button
                  className={styles.pageBtn}
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                >
                  Next (nextPageToken: &quot;CAUQAA&quot;) →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── TAB 3: GROWTH & ANALYTICS CHARTS ── */}
      {activeTab === 'analytics' && (
        <div className={styles.analyticsContainer}>
          {/* Monthly Views Chart */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <h4 className={styles.chartTitle}>Monthly Views Velocity (2026)</h4>
              <span className={styles.statDelta}>+122% Growth</span>
            </div>
            {/* Responsive SVG Chart */}
            <svg
              className={styles.chartSvg}
              viewBox="0 0 600 200"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff0033" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ff0033" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="600" y2="40" stroke="rgba(255,255,255,0.06)" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="rgba(255,255,255,0.06)" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="rgba(255,255,255,0.06)" />

              {/* Area */}
              <polygon
                points="50,160 150,135 250,115 350,85 450,55 550,25 550,180 50,180"
                fill="url(#viewsGrad)"
              />

              {/* Line */}
              <polyline
                points="50,160 150,135 250,115 350,85 450,55 550,25"
                fill="none"
                stroke="#ff0033"
                strokeWidth="3.5"
              />

              {/* Data points */}
              {channel.monthlyViews.map((item, idx) => {
                const x = 50 + idx * 100;
                const heights = [160, 135, 115, 85, 55, 25];
                const y = heights[idx] || 100;
                return (
                  <g key={item.month}>
                    <circle cx={x} cy={y} r="5" fill="#fff" stroke="#ff0033" strokeWidth="2.5" />
                    <text
                      x={x}
                      y="195"
                      fill="#a0a0b8"
                      fontSize="11"
                      textAnchor="middle"
                      fontFamily="sans-serif"
                    >
                      {item.month}
                    </text>
                  </g>
                );
              })}
            </svg>
            <p style={{ fontSize: '0.82rem', color: '#a0a0b8', marginTop: '10px' }}>
              Metric aggregated via simulated YouTube Analytics API endpoints.
            </p>
          </div>

          {/* Traffic Sources */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <h4 className={styles.chartTitle}>Traffic Breakdown</h4>
              <span style={{ fontSize: '0.8rem', color: '#00f5d4' }}>Search Led</span>
            </div>
            <div className={styles.trafficList}>
              {channel.trafficSources.map((source) => (
                <div key={source.source} className={styles.trafficItem}>
                  <div className={styles.trafficMeta}>
                    <span>{source.source}</span>
                    <span style={{ fontWeight: 600 }}>{source.percentage}%</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 4: RAW API JSON EXPLORER ── */}
      {activeTab === 'api' && (
        <div className={styles.schemaExplorer}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setApiEndpoint('channels')}
              className={`${styles.tabBtn} ${
                apiEndpoint === 'channels' ? styles.activeTabBtn : ''
              }`}
            >
              GET /channels.list
            </button>
            <button
              onClick={() => setApiEndpoint('search')}
              className={`${styles.tabBtn} ${
                apiEndpoint === 'search' ? styles.activeTabBtn : ''
              }`}
            >
              GET /search.list
            </button>
            <button
              onClick={() => setApiEndpoint('videos')}
              className={`${styles.tabBtn} ${
                apiEndpoint === 'videos' ? styles.activeTabBtn : ''
              }`}
            >
              GET /videos.list
            </button>
          </div>

          <div className={styles.schemaEndpoint}>
            {apiEndpoint === 'channels' &&
              `GET https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channel.id}&key=API_KEY`}
            {apiEndpoint === 'search' &&
              `GET https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel.id}&maxResults=10&order=viewCount&key=API_KEY`}
            {apiEndpoint === 'videos' &&
              `GET https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${channel.videos[0].id}&key=API_KEY`}
          </div>

          <pre className={styles.jsonViewer}>
            {apiEndpoint === 'channels' &&
              JSON.stringify(
                {
                  kind: 'youtube#channelListResponse',
                  etag: 'etag_channel_2026',
                  pageInfo: { totalResults: 1, resultsPerPage: 1 },
                  items: [
                    {
                      kind: 'youtube#channel',
                      id: channel.id,
                      snippet: {
                        title: channel.title,
                        customUrl: channel.customUrl,
                        description: channel.description,
                        publishedAt: channel.publishedAt,
                        country: channel.country,
                      },
                      statistics: {
                        viewCount: String(channel.viewCount),
                        subscriberCount: String(channel.subscriberCount),
                        hiddenSubscriberCount: false,
                        videoCount: String(channel.videoCount),
                      },
                    },
                  ],
                },
                null,
                2
              )}

            {apiEndpoint === 'search' &&
              JSON.stringify(
                {
                  kind: 'youtube#searchListResponse',
                  etag: 'etag_search_query_2026',
                  nextPageToken: 'CAUQAA',
                  regionCode: 'US',
                  pageInfo: { totalResults: channel.videos.length, resultsPerPage: 6 },
                  items: channel.videos.slice(0, 3).map((v) => ({
                    kind: 'youtube#searchResult',
                    id: { kind: 'youtube#video', videoId: v.id },
                    snippet: {
                      publishedAt: v.publishedAt,
                      channelId: channel.id,
                      title: v.title,
                      description: v.description,
                      channelTitle: channel.title,
                    },
                  })),
                },
                null,
                2
              )}

            {apiEndpoint === 'videos' &&
              JSON.stringify(getSampleApiPayload(channel.videos[0], channel), null, 2)}
          </pre>
        </div>
      )}

      {/* ── VIDEO JSON MODAL ── */}
      {selectedVideo && (
        <div className={styles.modalBackdrop} onClick={() => setSelectedVideo(null)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalClose}
              onClick={() => setSelectedVideo(null)}
            >
              ✕
            </button>

            <h3 style={{ fontSize: '1.15rem', marginBottom: '8px', paddingRight: '30px' }}>
              {selectedVideo.title}
            </h3>
            <p style={{ color: '#00f5d4', fontSize: '0.85rem', marginBottom: '16px' }}>
              Simulated REST Payload: /youtube/v3/videos?id={selectedVideo.id}
            </p>

            <pre className={styles.jsonViewer}>
              {JSON.stringify(getSampleApiPayload(selectedVideo, channel), null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
