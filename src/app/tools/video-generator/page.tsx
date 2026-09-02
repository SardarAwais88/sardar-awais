'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from './page.module.css';

export default function VideoGenerator() {
  const [mode, setMode] = useState<'text2video' | 'image2video'>('text2video');
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [model, setModel] = useState('alibaba/wan-2.6');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() && mode === 'text2video') {
      setError('Please enter a prompt');
      return;
    }
    if (mode === 'image2video' && !image) {
      setError('Please upload an image');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);

    try {
      // Fetch the API key securely from our backend to avoid hardcoding it in the bundle
      const keyRes = await fetch('/api/keys');
      if (!keyRes.ok) throw new Error('Failed to retrieve API key');
      const { key } = await keyRes.json();

      if (!key) {
        throw new Error('OpenRouter API key is not configured. Please add it to your environment variables.');
      }

      // Prepare the payload for OpenRouter
      const messages: any[] = [];
      
      if (mode === 'text2video') {
        messages.push({
          role: 'user',
          content: prompt
        });
      } else {
        messages.push({
          role: 'user',
          content: [
            { type: 'text', text: prompt || 'Animate this image' },
            { type: 'image_url', image_url: { url: image } }
          ]
        });
      }

      // Execute client-side to bypass Vercel's 10s-60s timeout limit for long-running video generation
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://awaismehboob.dev',
          'X-Title': 'Awais Portfolio AI Video',
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
        }),
      });

      if (!response.ok) {
        let errorMsg = `HTTP ${response.status}`;
        try {
          const errData = await response.json();
          if (errData.error?.message) errorMsg = errData.error.message;
        } catch (e) {}
        
        if (response.status === 402 || errorMsg.includes('balance') || errorMsg.includes('credits')) {
          throw new Error('Insufficient OpenRouter Balance. Video models are NOT free. Please add credits to your OpenRouter account.');
        }
        throw new Error(errorMsg);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '';

      // OpenRouter usually returns the video URL in the markdown response for multimodal models
      // e.g. "Here is your video: https://..." or "![video](https://...)"
      const urlMatch = content.match(/https?:\/\/[^\s)"]+\.(mp4|webm|gif|mov)/i) || content.match(/https?:\/\/[^\s)"]+/i);
      
      if (urlMatch && urlMatch[0]) {
        setVideoUrl(urlMatch[0]);
      } else {
        throw new Error('Failed to extract video URL from provider response. Response: ' + content.substring(0, 50) + '...');
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred during generation.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Head>
        <title>AI Video Generator - Sardar Awais</title>
      </Head>
      <section className={styles.videoSection}>
        <div className="container">
          <div className={styles.breadcrumb}>
            <Link href="/tools">← Back to Tools</Link>
          </div>
          
          <div className="section-header">
            <h2 className="section-title">AI Video <span>Generator</span></h2>
            <p className="section-subtitle">
              Create stunning videos from text or images using state-of-the-art open-source models like Alibaba Wan and MiniMax.
            </p>
          </div>

          <div className={styles.modeSelector}>
            <button 
              className={`${styles.modeBtn} ${mode === 'text2video' ? styles.modeBtnActive : ''}`}
              onClick={() => { setMode('text2video'); setError(null); }}
            >
              📝 Text to Video
            </button>
            <button 
              className={`${styles.modeBtn} ${mode === 'image2video' ? styles.modeBtnActive : ''}`}
              onClick={() => { setMode('image2video'); setError(null); }}
            >
              🖼️ Image to Video
            </button>
          </div>

          <div className={styles.videoGrid}>
            
            {/* INPUT PANEL */}
            <div className={styles.inputPanel}>
              <div className={styles.panelHeader}>
                <span className={styles.panelIcon}>🎬</span>
                <h3>Scene Configuration</h3>
              </div>
              
              <select 
                className={styles.modelSelect}
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="alibaba/wan-2.6">Alibaba: Wan 2.6 (High Quality)</option>
                <option value="minimax/hailuo-2.3">MiniMax: Hailuo 2.3 (Cinematic)</option>
                <option value="bytedance/seedance-2.0">ByteDance: Seedance 2.0 (Character Preserving)</option>
                <option value="google/veo-3.1-lite">Google: Veo 3.1 Lite (Fast & Cheap)</option>
                <option value="x-ai/grok-imagine-video">xAI: Grok Imagine Video</option>
              </select>

              {mode === 'image2video' && (
                <div 
                  className={styles.uploadZone}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    hidden 
                    accept="image/png, image/jpeg, image/webp" 
                    onChange={handleImageUpload}
                  />
                  {image ? (
                    <img src={image} alt="Preview" className={styles.previewImage} />
                  ) : (
                    <>
                      <div className={styles.uploadIcon}>📸</div>
                      <p className={styles.uploadText}>Click to upload reference image (Max 5MB)</p>
                    </>
                  )}
                </div>
              )}

              <textarea
                className={styles.textInput}
                placeholder={mode === 'text2video' ? "Describe the video scene in detail (e.g. 'A cinematic drone shot of a futuristic cyberpunk city at night with neon lights reflecting on wet streets...')" : "Optional: Describe how the image should be animated (e.g. 'Make the water ripple and the clouds move slowly...')"}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={mode === 'text2video' ? 6 : 3}
              />

              {error && <div className={styles.error}>⚠️ {error}</div>}

              <div className={styles.inputActions}>
                <button 
                  className={`btn ${styles.generateBtn}`} 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Generating Video...' : '✨ Generate Video'}
                </button>
              </div>
              
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '10px' }}>
                *Note: Video models cost OpenRouter credits (approx $0.05 - $0.15 per sec). Generation takes 1-3 minutes. Do not close this tab.
              </div>
            </div>

            {/* OUTPUT PANEL */}
            <div className={styles.outputPanel}>
              <div className={styles.panelHeader}>
                <span className={styles.panelIcon}>📺</span>
                <h3>Generated Video</h3>
              </div>

              <div className={styles.outputArea}>
                {isGenerating ? (
                  <div className={styles.loadingState}>
                    <div className={styles.spinner}></div>
                    <h4>Rendering Scene</h4>
                    <p>This process requires massive GPU compute and may take 1 to 3 minutes. Please be patient and keep this tab open.</p>
                  </div>
                ) : videoUrl ? (
                  <>
                    <a href={videoUrl} download="generated-video.mp4" target="_blank" className={styles.downloadBtn}>
                      ⬇ Download
                    </a>
                    <video 
                      src={videoUrl} 
                      className={styles.videoPlayer} 
                      controls 
                      autoPlay 
                      loop 
                      muted 
                    />
                  </>
                ) : (
                  <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>🎥</div>
                    <p>Your generated video will appear here</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
