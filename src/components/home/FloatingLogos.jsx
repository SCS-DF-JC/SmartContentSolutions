import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Brand icon SVG components
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const ThreadsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.33-3.022.88-.73 2.082-1.168 3.59-1.314-.033-1.263-.343-2.27-1.217-2.863-.477-.324-1.072-.483-1.766-.472-.695.012-1.318.176-1.853.49-.967.57-1.577 1.602-1.669 2.826l-2.108-.032c.107-1.689.903-3.19 2.243-4.23.988-.77 2.245-1.193 3.64-1.227 1.1-.02 2.084.175 2.932.579 1.4.665 2.3 1.762 2.678 3.263.215.854.282 1.894.2 3.09 1.076.527 1.94 1.311 2.474 2.318.903 1.7.964 4.618-1.391 6.924-1.9 1.86-4.232 2.726-7.548 2.754zm-1.19-8.143c-.821.068-1.474.289-1.94.66-.395.313-.59.71-.564 1.149.033.584.36 1.083.898 1.432.59.382 1.376.544 2.209.499.974-.053 1.75-.43 2.307-1.123.466-.578.782-1.378.922-2.342-.59-.122-1.218-.2-1.878-.234-.656-.03-1.313-.017-1.953.06l-.001-.101z"/>
  </svg>
);

const RedditIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
  </svg>
);

const MediumIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
);

const WordPressIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.034 1.232-.105 1.232-.105.582-.07.514-.925-.068-.892 0 0-1.749.138-2.877.138-.996 0-2.682-.138-2.682-.138-.581-.033-.649.858-.068.892 0 0 .548.07 1.127.105l1.679 4.607-2.36 7.082-3.925-11.7c.648-.034 1.233-.104 1.233-.104.583-.07.515-.925-.067-.892 0 0-1.749.138-2.878.138-.202 0-.443-.005-.693-.014C3.564 3.555 7.504 1.05 12 1.05c3.354 0 6.408 1.283 8.695 3.383-.056-.004-.11-.008-.167-.008-1.061 0-1.813.924-1.813 1.917 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .924-.355 1.997-.821 3.49l-1.076 3.596-3.899-11.616zm-5.5 17.858c-.833.262-1.715.407-2.626.407-1.37 0-2.672-.319-3.827-.886l2.763-8.019 2.832 7.762c.019.046.04.09.063.132l-.205.604m3.645-.062c-.077.057-.154.112-.233.166l-2.532-6.94 2.532 6.94zm8.618-17.1c-.1.624-.238 1.288-.42 1.99l-1.61 4.758-3.925-11.689c.647-.035 1.233-.105 1.233-.105.582-.07.514-.925-.068-.892 0 0-.447.035-1.17.07.724-.548 1.58-.952 2.536-1.147 1.377.304 2.603.881 3.613 1.658-.04.12-.112.32-.189.557z"/>
  </svg>
);

const MastodonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z"/>
  </svg>
);

const BlueskyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z"/>
  </svg>
);

const SEMrushIcon = () => (
  <img 
    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692b490db467b6aad2cac54d/10796a187_semrush.png" 
    alt="SEMrush"
    className="w-full h-full object-contain"
  />
);

const GoogleAdsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M3.9 12L9 2.1c.6-1 1.9-1.4 2.9-.8s1.4 1.9.8 2.9L7.5 14.1c-.6 1-1.9 1.4-2.9.8s-1.4-1.9-.8-2.9zm9.9 10.2l5.1-9.9c.6-1 .2-2.3-.8-2.9s-2.3-.2-2.9.8l-5.1 9.9c-.6 1-.2 2.3.8 2.9s2.3.2 2.9-.8zm3.3-14.4a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
  </svg>
);

const WriterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M21 4H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zM4 18V6h16v12H4zm2-10h12v2H6V8zm0 4h8v2H6v-2z"/>
  </svg>
);

const ScreamingFrogIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
    <circle cx="9" cy="10" r="2"/>
    <circle cx="15" cy="10" r="2"/>
    <path d="M8 15c1.5 2 6.5 2 8 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ContentSquareIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
    <rect x="6" y="6" width="5" height="5" rx="1"/>
    <rect x="13" y="6" width="5" height="5" rx="1"/>
    <rect x="6" y="13" width="5" height="5" rx="1"/>
    <rect x="13" y="13" width="5" height="5" rx="1"/>
  </svg>
);

const BazaarvoiceIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7.27 3.64L12 11.45 4.73 7.82 12 4.18zM4 8.82l7 3.5v6.86l-7-3.5V8.82zm9 10.36v-6.86l7-3.5v6.86l-7 3.5z"/>
  </svg>
);

const DynamicYieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

const ListrakIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const AttentiveIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM7 9h2v2H7V9zm8 0h2v2h-2V9zm-4 0h2v2h-2V9z"/>
  </svg>
);

const SmecIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

// Core Tools - Internal product tools
const coreTools = [
  { name: "Social Automation", icon: null, color: "#E1C37A", url: null },
  { name: "WordPress SEO", icon: WordPressIcon, color: "#21759B", url: "https://wordpress.org/" },
  { name: "Email Engine", icon: null, color: "#FFE01B", url: null },
  { name: "Content Engine", icon: null, color: "#E1C37A", url: null },
  { name: "Ads Analytics", icon: null, color: "#F9AB00", url: null },
  { name: "Lead CRM", icon: null, color: "#FF7A59", url: null },
  { name: "Reports", icon: null, color: "#4285F4", url: null },
  { name: "Backlinks", icon: null, color: "#FF6B35", url: null },
  { name: "Reviews", icon: null, color: "#00B67A", url: null },
  { name: "Onboarding", icon: null, color: "#FFFFFF", url: null },
  { name: "Competitor Intel", icon: null, color: "#5B45BB", url: null }
];

// Corporate / Third Party Tools
const corporateTools = [
  { name: "Listrak", icon: ListrakIcon, color: "#00A4E4", url: "https://www.listrak.com/" },
  { name: "Attentive", icon: AttentiveIcon, color: "#9333EA", url: "https://www.attentive.com/" },
  { name: "Bazaarvoice", icon: BazaarvoiceIcon, color: "#003366", url: "https://www.bazaarvoice.com/" },
  { name: "Dynamic Yield", icon: DynamicYieldIcon, color: "#6B4FBB", url: "https://www.dynamicyield.com/" },
  { name: "AI Chatbot", icon: null, color: "#E1C37A", url: null },
  { name: "Smec", icon: SmecIcon, color: "#FF6B00", url: "https://www.smarter-ecommerce.com/" },
  { name: "SEMrush", icon: SEMrushIcon, color: "#FF642D", url: "https://www.semrush.com/" },
  { name: "Google Ads", icon: GoogleAdsIcon, color: "#4285F4", url: "https://ads.google.com/" },
  { name: "Writer", icon: WriterIcon, color: "#6366F1", url: "https://writer.com/" },
  { name: "Screaming Frog", icon: ScreamingFrogIcon, color: "#76B82A", url: "https://www.screamingfrog.co.uk/" },
  { name: "ContentSquare", icon: ContentSquareIcon, color: "#FF5C35", url: "https://contentsquare.com/" }
];

// Social platforms with real brand icons
const socialPlatforms = [
  { name: "Facebook", icon: FacebookIcon, color: "#1877F2", url: "https://www.facebook.com/" },
  { name: "Instagram", icon: InstagramIcon, color: "#E4405F", url: "https://www.instagram.com/" },
  { name: "X", icon: XIcon, color: "#FFFFFF", url: "https://x.com/" },
  { name: "LinkedIn", icon: LinkedInIcon, color: "#0A66C2", url: "https://www.linkedin.com/" },
  { name: "TikTok", icon: TikTokIcon, color: "#FF0050", url: "https://www.tiktok.com/" },
  { name: "Pinterest", icon: PinterestIcon, color: "#BD081C", url: "https://www.pinterest.com/" },
  { name: "YouTube", icon: YouTubeIcon, color: "#FF0000", url: "https://www.youtube.com/" },
  { name: "Threads", icon: ThreadsIcon, color: "#FFFFFF", url: "https://www.threads.net/" },
  { name: "Reddit", icon: RedditIcon, color: "#FF4500", url: "https://www.reddit.com/" },
  { name: "Medium", icon: MediumIcon, color: "#FFFFFF", url: "https://medium.com/" },
  { name: "Mastodon", icon: MastodonIcon, color: "#6364FF", url: "https://joinmastodon.org/" },
  { name: "Bluesky", icon: BlueskyIcon, color: "#0085FF", url: "https://bsky.app/" }
];

const scatteredPositions = [
  [6, 10], [20, 6], [36, 12], [64, 8], [80, 6], [94, 12],
  [4, 26], [14, 38], [5, 52],
  [96, 28], [86, 42], [96, 56],
  [6, 66], [16, 78], [4, 90],
  [94, 72], [84, 84], [96, 94],
  [14, 94], [30, 90], [46, 96], [54, 92], [70, 88], [86, 94],
  [26, 16], [74, 14], [8, 44], [92, 48],
  [12, 60], [88, 64], [24, 86], [76, 82],
  [50, 4], [50, 98]
];

// Filter out items without icons and combine
const allItems = [...corporateTools, ...socialPlatforms].filter(item => item.icon);

const glowStyles = `
  @keyframes glowPulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.15); }
  }
`;

const FloatingIcon = ({ item, position, index, mouseOffset }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const distanceFromCenter = Math.sqrt(
    Math.pow(position[0] - 50, 2) + Math.pow(position[1] - 50, 2)
  );
  const parallaxStrength = Math.min(distanceFromCenter / 50, 1) * 0.6;
  
  const parallaxX = mouseOffset.x * parallaxStrength * 15;
  const parallaxY = mouseOffset.y * parallaxStrength * 15;
  
  const floatDuration = 6 + (index % 5);
  const floatDelay = (index * 0.3) % 3;
  const floatRangeY = 8 + (index % 6);
  const floatRangeX = 4 + (index % 4);
  const pulseDelay = (index * 0.3) % 3;

  const IconComponent = item.icon;

  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -floatRangeY, 0, floatRangeY, 0],
        x: [0, floatRangeX, 0, -floatRangeX, 0]
      }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.04 },
        scale: { duration: 0.5, delay: index * 0.04 },
        y: { duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay: floatDelay },
        x: { duration: floatDuration * 1.2, repeat: Infinity, ease: "easeInOut", delay: floatDelay + 0.5 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="absolute cursor-pointer z-10"
      style={{
        left: `${position[0]}%`,
        top: `${position[1]}%`,
        transform: `translate(-50%, -50%) translate(${parallaxX}px, ${parallaxY}px)`,
        transition: "transform 0.15s ease-out"
      }}
    >
      <motion.div
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <div 
          className="absolute inset-0 rounded-full blur-xl pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${item.color}60 0%, transparent 70%)`,
            animation: `glowPulse 3s ease-in-out infinite`,
            animationDelay: `${pulseDelay}s`,
            transform: isHovered ? 'scale(1.4)' : 'scale(1)',
            opacity: isHovered ? 0.9 : 0.5,
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            width: '150%',
            height: '150%',
            left: '-25%',
            top: '-25%'
          }}
        />
        
        <div 
          className="w-9 h-9 lg:w-11 lg:h-11 transition-all duration-300 relative z-10"
          style={{ 
            color: item.color,
            filter: isHovered 
              ? `drop-shadow(0 0 18px ${item.color}) drop-shadow(0 0 30px ${item.color}60)` 
              : `drop-shadow(0 0 8px ${item.color}40)`,
            opacity: isHovered ? 1 : 0.65
          }}
        >
          <IconComponent />
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 6 }}
        className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none z-50"
      >
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#1A1A1C]/95 text-[#A9AAAC] border border-[#3B3C3E]/40">
          {item.name}
        </span>
      </motion.div>
    </motion.div>
  );

  // Wrap in anchor if URL exists
  if (item.url) {
    return (
      <a 
        href={item.url} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label={item.name}
        className="pointer-events-auto"
      >
        {content}
      </a>
    );
  }

  return <div className="pointer-events-auto">{content}</div>;
};

export function DesktopFloatingLogos() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setMouseOffset({
        x: (e.clientX - centerX) / centerX,
        y: (e.clientY - centerY) / centerY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const itemsWithPositions = useMemo(() => {
    return allItems.slice(0, scatteredPositions.length).map((item, index) => ({
      ...item,
      position: scatteredPositions[index]
    }));
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden" style={{ zIndex: 5 }}>
      <style>{glowStyles}</style>
      {itemsWithPositions.map((item, index) => (
        <FloatingIcon 
          key={index}
          item={item} 
          position={item.position} 
          index={index} 
          mouseOffset={mouseOffset}
        />
      ))}
    </div>
  );
}

export function MobileLogosSection() {
  const renderIcon = (item, index, size = "w-9 h-9") => {
    const IconComponent = item.icon;
    if (!IconComponent) return null;

    const iconElement = (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        whileTap={{ scale: 1.1 }}
        className="flex flex-col items-center gap-2 relative"
      >
        <div className="relative">
          <div 
            className="absolute inset-0 rounded-full blur-lg pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${item.color}50 0%, transparent 70%)`,
              animation: `glowPulse 3s ease-in-out infinite`,
              animationDelay: `${index * 0.2}s`,
              width: '140%',
              height: '140%',
              left: '-20%',
              top: '-20%'
            }}
          />
          <div 
            className={`${size} relative z-10`}
            style={{ 
              color: item.color,
              filter: `drop-shadow(0 0 6px ${item.color}40)`
            }}
          >
            <IconComponent />
          </div>
        </div>
        <span className="text-[9px] text-[#5B5C60] text-center leading-tight">
          {item.name}
        </span>
      </motion.div>
    );

    if (item.url) {
      return (
        <a 
          key={index}
          href={item.url} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label={item.name}
        >
          {iconElement}
        </a>
      );
    }

    return <div key={index}>{iconElement}</div>;
  };

  return (
    <section className="bg-[#1A1A1C] py-10 px-6">
      <style>{glowStyles}</style>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-lg mx-auto"
      >
        <p className="text-center text-sm text-[#A9AAAC] mb-6">
          Integrates with your tools and platforms
        </p>

        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-wider text-[#5B5C60] mb-4 text-center">Enterprise Tools</p>
          <div className="grid grid-cols-4 gap-5 justify-items-center">
            {corporateTools.filter(t => t.icon).slice(0, 8).map((item, index) => 
              renderIcon(item, index)
            )}
          </div>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wider text-[#5B5C60] mb-4 text-center">Platforms</p>
          <div className="grid grid-cols-4 gap-4 justify-items-center">
            {socialPlatforms.map((item, index) => 
              renderIcon(item, index, "w-8 h-8")
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}