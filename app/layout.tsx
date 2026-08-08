import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { Open_Sans, Roboto_Mono, Anek_Latin } from "next/font/google";
import localFont from "next/font/local";

// 字体配置
const HMFont = localFont({
  src: "fonts/HarmonyOS_Sans_SC_Medium.ttf",
  display: "swap",
  variable: "--font-hm",
});

const dingTalkFont = localFont({
  src: "fonts/DingTalk JinBuTi.ttf",
  display: "swap",
  variable: "--font-dingtalk",
});

const kingsoftFont = localFont({
  src: "fonts/Kingsoft_Cloud_Font.ttf",
  display: "swap",
  variable: "--font-kingsoft",
});

const xinYiGuanHeiFont = localFont({
  src: "fonts/ZiTiQuanXinYiGuanHeiTi.ttf",
  display: "swap",
  variable: "--font-xinyiguanhei",
});

const alibabaFont = localFont({
  src: "fonts/AlibabaPuHuiTi-3-55-Regular.ttf",
  display: "swap",
  variable: "--font-alibaba",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-opensans",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

const ankeLatin = Anek_Latin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anke",
});

export const metadata: Metadata = {
  title: "MSQY Cover - Better Cover Image Generator Tools",
  description: "MSQY Cover is a better cover image generator tool for Medium, YouTube, BiliBili, Blog and more. Edit from LiuShen-Fork/picprose",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={`${openSans.variable} ${robotoMono.variable} ${ankeLatin.variable} ${dingTalkFont.variable} ${kingsoftFont.variable} ${xinYiGuanHeiFont.variable} ${alibabaFont.variable} ${HMFont.variable} font-sans light`}>
      <head>
        {/* Favicon 配置 */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        {/* 规范站点（SEO canonical） */}
        <link rel="canonical" href="https://msqy-h.github.io/picprose/" />

        {/* 加载页面样式（不含横幅） */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              * { box-sizing: border-box; }
              html { -webkit-font-smoothing: antialiased; }
              body, html { margin: 0; padding: 0; }

              #loading-state {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: fixed;
                inset: 0;
                z-index: 9999;
                background: #ffffff;
                opacity: 1;
                transition: opacity 0.6s ease;
              }
              #loading-state.hide {
                opacity: 0;
                pointer-events: none;
              }
              #loading-state.semi-transparent {
                opacity: 0.5;
              }

              .dark-mode #loading-state {
                background: #0a0a0a;
              }
              .dark-mode body {
                background-color: #0a0a0a;
                color: #d9d9d9;
              }

              .message {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 0;
                margin: 0;
              }
              .message .logo-text {
                font-size: 36px;
                font-weight: 700;
                color: #2563eb;
                letter-spacing: -0.5px;
                margin-bottom: 20px;
                font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              }
              .dark-mode .message .logo-text {
                color: #60a5fa;
              }

              .loading-bar-container {
                width: 116px;
                height: 4px;
                background: #e5e5e5;
                border-radius: 2px;
                overflow: hidden;
                margin-top: 6px;
                transform: translateX(-4.5px);
              }
              .dark-mode .loading-bar-container {
                background: #333;
              }
              .loading-bar {
                width: 25%;
                height: 100%;
                background: linear-gradient(
                  90deg,
                  transparent,
                  #2563eb 45%,
                  #2563eb 55%,
                  transparent
                );
                border-radius: 2px;
                animation: loading-bar 1.5s ease-in-out infinite;
              }
              @keyframes loading-bar {
                0% { transform: translateX(-100%); }
                50% { transform: translateX(400%); }
                100% { transform: translateX(-100%); }
              }
              @media screen and (prefers-reduced-motion: reduce) {
                .loading-bar {
                  animation: none;
                  transform: translateX(0);
                }
              }
            `,
          }}
        />

        {/* 暗色模式检测 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if ( localStorage.getItem('dark-mode') === 'on' ||
                     (localStorage.getItem('dark-mode') === 'system' &&
                      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
                   ) {
                  document.documentElement.classList.add('dark-mode');
                  document.documentElement.setAttribute('data-mode', 'dark');
                }
              } catch (err) {}
            `,
          }}
        />
      </head>
      <body>
        {/* 加载页面 */}
        <div
          id="loading-state"
          role="alert"
          aria-live="assertive"
          suppressHydrationWarning
        >
          <div className="message">
            <div className="logo-text">MSQY Cover</div>
            <div className="loading-bar-container">
              <div className="loading-bar"></div>
            </div>
          </div>
        </div>

        {/* 分流与定位脚本（使用 next/script，beforeInteractive） */}
        <Script
          id="redirect-and-location"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var loader = document.getElementById('loading-state');
                var isGithubIo = window.location.hostname.endsWith('.github.io');
                var isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                var isDebug = window.location.search.includes('debug=true');

                // ----- 通用弹窗函数（可指定类型） -----
                function showNotification(type) {
                  if (window._redirectNotified) return;
                  window._redirectNotified = true;
                  setTimeout(function() {
                    if (document.querySelector('#redirect-overlay')) return;
                    var overlay = document.createElement('div');
                    overlay.id = 'redirect-overlay';
                    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;' +
                      'background:rgba(0,0,0,0.5);z-index:99999;display:flex;align-items:center;justify-content:center;';
                    var modal = document.createElement('div');
                    modal.style.cssText = 'background:#fff;padding:30px 40px;border-radius:12px;' +
                      'max-width:420px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.3);';
                    
                    var title, content;
                    if (type === 'china') {
                      title = '检测到您为中国大陆用户';
                      content = '为获得更流畅的访问体验，建议您前往';
                    } else { // 'unknown'
                      title = '无法识别您的位置';
                      content = '如果您是中国大陆用户，建议访问镜像站点';
                    }

                    modal.innerHTML =
                      '<h2 style="margin:0 0 12px;font-size:20px;color:#1a1a2e;">' + title + '</h2>' +
                      '<p style="margin:0 0 8px;font-size:15px;color:#333;line-height:1.6;">' + content + '</p>' +
                      '<p style="margin:0 0 20px;font-size:18px;font-weight:bold;color:#2563eb;">cover.msqy.cc.cd</p>' +
                      '<div style="display:flex;gap:12px;justify-content:center;">' +
                        '<button id="redirect-btn" style="padding:10px 28px;background:#2563eb;color:#fff;border:none;border-radius:8px;font-size:15px;cursor:pointer;">立即前往</button>' +
                        '<button id="stay-btn" style="padding:10px 28px;background:#e5e7eb;color:#374151;border:none;border-radius:8px;font-size:15px;cursor:pointer;">留在本页</button>' +
                      '</div>';
                    overlay.appendChild(modal);
                    document.body.appendChild(overlay);
                    document.getElementById('redirect-btn').addEventListener('click', function() {
                      window.location.href = 'https://cover.msqy.cc.cd';
                    });
                    document.getElementById('stay-btn').addEventListener('click', function() {
                      overlay.remove();
                    });
                  }, 200);
                }

                // ----- 主逻辑 -----
                if (isDebug) {
                  console.log('[Redirect] 调试模式：显示无法识别弹窗');
                  showNotification('unknown');
                } else if (isGithubIo || isLocal) {
                  var completed = false;
                  var services = [
                    {
                      url: 'http://ip-api.com/json/?lang=zh-CN',
                      parse: function(data) { return data.country === '中国'; }
                    },
                    {
                      url: 'https://api.vore.top/api/IPdata',
                      parse: function(data) { return data?.ip?.country === '中国'; }
                    },
                    {
                      url: 'https://api.xxapi.cn/ip',
                      parse: function(data) { return data?.data?.address?.includes('中国'); }
                    },
                    {
                      url: 'https://ip9.com.cn/get',
                      parse: function(data) { return data.data && (data.data.country === '中国' || data.data.country_code === 'cn'); }
                    }
                  ];

                  function tryService(index) {
                    if (index >= services.length) {
                      console.debug('[Redirect] 所有IP查询失败，显示无法识别');
                      showNotification('unknown');
                      return;
                    }
                    var service = services[index];
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', service.url, true);
                    xhr.timeout = 3000;
                    xhr.onload = function() {
                      if (xhr.status === 200) {
                        try {
                          var data = JSON.parse(xhr.responseText);
                          if (service.parse(data)) {
                            console.log('[Redirect] IP 归属中国，显示弹窗');
                            showNotification('china');
                            completed = true;
                            return;
                          } else {
                            console.log('[Redirect] IP 非中国');
                            completed = true;
                            return;
                          }
                        } catch (e) {
                          console.debug('[Redirect] 解析失败，尝试下一个');
                          tryService(index + 1);
                        }
                      } else {
                        console.debug('[Redirect] 状态码 ' + xhr.status + '，尝试下一个');
                        tryService(index + 1);
                      }
                    };
                    xhr.onerror = function() {
                      console.debug('[Redirect] 网络错误，尝试下一个');
                      tryService(index + 1);
                    };
                    xhr.ontimeout = function() {
                      console.debug('[Redirect] 超时，尝试下一个');
                      tryService(index + 1);
                    };
                    xhr.send();
                  }

                  // 整体超时 5 秒后显示“无法识别”
                  setTimeout(function() {
                    if (!completed) {
                      console.debug('[Redirect] 查询超时，显示无法识别');
                      showNotification('unknown');
                      completed = true;
                    }
                  }, 5000);

                  tryService(0);
                } else {
                  console.log('[Redirect] 非目标域名，跳过');
                }

                // ----- 加载页面隐藏逻辑（等待 load 事件，超时半透明）-----
                function hideLoader() {
                  if (loader) {
                    loader.classList.add('hide');
                    loader.classList.remove('semi-transparent');
                  }
                }

                if (document.readyState === 'complete') {
                  setTimeout(hideLoader, 100);
                } else {
                  window.addEventListener('load', function() {
                    setTimeout(hideLoader, 200);
                  });
                }

                var timeoutId = setTimeout(function() {
                  if (loader && !loader.classList.contains('hide')) {
                    console.log('[Redirect] 加载超时，变为半透明');
                    loader.classList.add('semi-transparent');
                  }
                }, 8000);

                window.addEventListener('load', function() {
                  clearTimeout(timeoutId);
                });
              })();
            `
          }}
        />

        {/* React 应用 */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}