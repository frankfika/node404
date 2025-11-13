// NODE404 - 现实版思想碰撞引擎
(function(){
  'use strict';

  // 全局状态
  const state = {
    danmakuEnabled: true,
    votedTopics: new Set(),
    issues: JSON.parse(localStorage.getItem('node404-issues') || '[]'),
    latestDanmaku: JSON.parse(localStorage.getItem('node404-danmaku-latest') || '[]')
  };

  // 工具函数
  const $ = selector => document.querySelector(selector);
  const $$ = selector => document.querySelectorAll(selector);
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // 初始化
  function init() {
    initCodeRain();
    initTerminalEffect();
    initSmoothScroll();
    initNavbarScroll();
    initNetworkNodes();
    initButtonRipple();
    initCardAnimations();
    
    // 新增互动模块
    initDanmaku();
    initVoting();
    initIssueSystem();
    initAccessTabs();
    loadDonationWallets();
    loadContactQRCodes();
    
    // 渲染已有 Issue
    renderIssues();
  }

  // 弹幕系统
  function initDanmaku() {
    const toggle = $('#danmakuToggle');
    const input = $('#danmakuInput');
    const container = $('#danmakuContainer');
    const inputField = input.querySelector('input');

    const coreSlogans = [
      '404 NOT FOUND → GENESIS',
      'Reality is our off-chain testnet',
      'Not found. Not yet.',
      '代码即对话',
      '让疯狂想法重新上线',
      '边建设，边定义',
      '思想碰撞 > 闭门造车',
      '量子对话启动',
      '去中心化实验',
      'AI + Web3 + 现实'
    ];

    const hardcodeSlogans = [
      ...coreSlogans,
      '极客精神：动手解决问题',
      'Build > Talk',
      'Open Source Collective',
      'Web3 + AI + IRL',
      'Hack the future',
      'Demo or it didn\'t happen',
      'Trust, but verify',
      'Experiment on',
      'Find the unfound'
    ];

    state.latestDanmaku = Array.from(new Set(state.latestDanmaku)).slice(0, 50);
    localStorage.setItem('node404-danmaku-latest', JSON.stringify(state.latestDanmaku));

    let recentShown = [];
    let coreIndex = 0;
    const MAX_CONCURRENT = 20;
    const AUTO_INTERVAL = 6000;
    let scrollQueue = [];
    let queuePtr = 0;
    const LANE_HEIGHT = 36;
    const SPEED = 60;
    const GAP = 80;
    let lanes = [];

    function setupLanes() {
      const h = container.clientHeight || window.innerHeight;
      const count = Math.max(4, Math.floor(h / LANE_HEIGHT) - 2);
      lanes = new Array(count).fill(0);
    }

    // 自动弹幕
    function autoDanmaku() {
      if (!state.danmakuEnabled) return;
      if (container.childElementCount >= MAX_CONCURRENT) return;
      const pool = Array.from(new Set([...hardcodeSlogans, ...state.latestDanmaku]));
      let text;
      if (queuePtr < scrollQueue.length) {
        text = scrollQueue[queuePtr++];
      } else if (coreIndex % 3 === 0) {
        text = coreSlogans[coreIndex % coreSlogans.length];
        coreIndex++;
      } else {
        for (let i = 0; i < 10; i++) {
          const candidate = pool[random(0, pool.length - 1)];
          if (!recentShown.includes(candidate)) { text = candidate; break; }
        }
        if (!text) text = pool[random(0, pool.length - 1)];
      }
      createDanmaku(text);
      recentShown.unshift(text);
      recentShown = Array.from(new Set(recentShown)).slice(0, 20);
    }

    // 创建弹幕
    function createDanmaku(text, delaySec = 0) {
      const now = performance.now();
      if (!lanes.length) setupLanes();
      let laneIdx = 0;
      let earliest = lanes[0];
      for (let i = 1; i < lanes.length; i++) {
        if (lanes[i] < earliest) { earliest = lanes[i]; laneIdx = i; }
      }
      if (earliest > now + delaySec * 1000) return;

      const item = document.createElement('div');
      item.className = 'danmaku-item';
      item.textContent = text;
      item.style.visibility = 'hidden';
      container.appendChild(item);

      const w = item.offsetWidth || 120;
      const topPx = laneIdx * LANE_HEIGHT + random(-6, 6);
      const speed = random(50, 70);
      const durationSec = (container.clientWidth + w) / speed;
      item.style.top = topPx + 'px';
      item.style.animationDuration = durationSec + 's';
      item.style.animationDelay = delaySec + 's';
      item.addEventListener('animationstart', () => {
        item.style.visibility = 'visible';
      }, { once: true });

      lanes[laneIdx] = now + delaySec * 1000 + ((w + GAP) / speed) * 1000;

      item.addEventListener('animationend', () => {
        if (item.parentNode) item.remove();
      });
    }

    function prepareInitial() {
      const pool = Array.from(new Set([...hardcodeSlogans, ...state.latestDanmaku]));
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      const initial = shuffled.slice(0, Math.min(MAX_CONCURRENT, shuffled.length));
      initial.forEach(text => createDanmaku(text, random(0, 12)));
      scrollQueue = shuffled.slice(initial.length, initial.length + 30);
      queuePtr = 0;
    }

    // 切换开关
    toggle.addEventListener('click', () => {
      state.danmakuEnabled = !state.danmakuEnabled;
      toggle.querySelector('.toggle-btn').textContent = state.danmakuEnabled ? '弹幕 ON' : '弹幕 OFF';
      input.style.display = state.danmakuEnabled ? 'block' : 'none';
      if (!state.danmakuEnabled) {
        container.innerHTML = '';
      }
    });

    // 输入发送
    inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && inputField.value.trim()) {
        const value = inputField.value.trim();
        createDanmaku(value);
        state.latestDanmaku = [value, ...state.latestDanmaku.filter(t => t !== value)].slice(0, 50);
        scrollQueue = [value, ...scrollQueue.filter(t => t !== value)].slice(0, 30);
        localStorage.setItem('node404-danmaku-latest', JSON.stringify(state.latestDanmaku));
        inputField.value = '';
      }
    });

    // 初始显示输入框
    input.style.display = 'block';
    
    setupLanes();
    prepareInitial();
    setInterval(autoDanmaku, AUTO_INTERVAL);
  }

  // 投票墙系统
  function initVoting() {
    const voteCards = $$('.vote-card');
    
    voteCards.forEach(card => {
      const btn = card.querySelector('.vote-btn');
      const topic = card.dataset.topic;
      
      // 检查是否已投票
      if (state.votedTopics.has(topic)) {
        btn.disabled = true;
        btn.textContent = '已投票';
      }
      
      btn.addEventListener('click', () => {
        if (state.votedTopics.has(topic)) return;
        
        // 更新计数
        const countSpan = card.querySelector('.vote-count');
        const currentCount = parseInt(countSpan.textContent);
        countSpan.textContent = currentCount + 1;
        
        // 禁用按钮
        btn.disabled = true;
        btn.textContent = '已投票';
        state.votedTopics.add(topic);
        
        // 视觉反馈
        btn.style.background = 'var(--black)';
        btn.style.color = 'var(--white)';
        
        // 保存到本地存储
        localStorage.setItem('node404-votes', JSON.stringify([...state.votedTopics]));
      });
    });
    
    // 恢复已投票状态
    const savedVotes = JSON.parse(localStorage.getItem('node404-votes') || '[]');
    savedVotes.forEach(topic => state.votedTopics.add(topic));
  }

  // Issue 系统
  function initIssueSystem() {
    const floatingBtn = $('#floatingIssueBtn');
    const panel = $('#issuePanel');
    const closeBtn = $('#closeIssue');
    const cancelBtn = $('#cancelIssue');
    const submitBtn = $('#submitIssue');
    const titleInput = $('#issueTitle');
    const bodyInput = $('#issueBody');

    // 打开面板
    floatingBtn.addEventListener('click', () => {
      panel.classList.add('active');
      titleInput.focus();
    });

    // 关闭面板
    function closePanel() {
      panel.classList.remove('active');
      titleInput.value = '';
      bodyInput.value = '';
    }

    closeBtn.addEventListener('click', closePanel);
    cancelBtn.addEventListener('click', closePanel);

    // 点击面板外部关闭
    panel.addEventListener('click', (e) => {
      if (e.target === panel) closePanel();
    });

    // 提交 Issue
    submitBtn.addEventListener('click', () => {
      const title = titleInput.value.trim();
      const body = bodyInput.value.trim();
      
      if (!title) {
        titleInput.focus();
        return;
      }

      const issue = {
        id: Date.now(),
        title: title,
        body: body,
        timestamp: new Date().toLocaleString('zh-CN')
      };

      state.issues.unshift(issue);
      localStorage.setItem('node404-issues', JSON.stringify(state.issues));
      
      renderIssues();
      closePanel();

    });

    // 回车提交
    titleInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        bodyInput.focus();
      }
    });

    bodyInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        submitBtn.click();
      }
    });
  }

  function initAccessTabs() {
    const tabs = $$('#accessTabs .tab-btn');
    const participate = $('#participateContent');
    const contact = $('#contactContent');
    const donate = $('#donateContent');
    const issues = $('#issuesContent');
    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        tabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.dataset.tab;
        participate.classList.remove('active');
        if (contact) contact.classList.remove('active');
        donate.classList.remove('active');
        issues.classList.remove('active');
        if (tab === 'contact' && contact) {
          contact.classList.add('active');
        } else if (tab === 'donate') {
          donate.classList.add('active');
        } else if (tab === 'issues') {
          issues.classList.add('active');
        } else {
          participate.classList.add('active');
        }
      });
    });
  }

  function loadDonationWallets() {
    const grid = document.getElementById('donationGrid');
    if (!grid) return;
    const candidates = [
      { label: 'BTC', src: 'donationwallet/Btc.JPEG' },
      { label: 'ETH', src: 'donationwallet/eth.JPEG' },
      { label: 'BNB', src: 'donationwallet/bnb.JPEG' },
      { label: 'TRX', src: 'donationwallet/Trx.JPEG' },
      { label: 'SOL', src: 'donationwallet/Sol.JPEG' }
    ];
    candidates.forEach(({ label, src }) => {
      const img = new Image();
      img.onload = () => {
        const card = document.createElement('div');
        card.className = 'qr-crypto';
        const image = document.createElement('img');
        image.src = src;
        image.alt = label + ' Wallet';
        const text = document.createElement('div');
        text.className = 'label';
        text.textContent = label;
        card.appendChild(image);
        card.appendChild(text);
        grid.appendChild(card);
      };
      img.onerror = () => {};
      img.src = src;
    });
  }

  function loadContactQRCodes() {
    const grid = document.getElementById('contactGrid');
    if (!grid) return;
    const candidates = [
      { label: 'WeChat 公众号', src: 'contact/wechat-public.jpg' },
      { label: 'WeChat 社区', src: 'contact/wechat-community.jpg' },
      { label: 'Twitter', src: 'contact/twitter.jpg' }
    ];
    candidates.forEach(({ label, src }) => {
      const img = new Image();
      img.onload = () => {
        const card = document.createElement('div');
        card.className = 'qr-crypto';
        const image = document.createElement('img');
        image.src = src;
        image.alt = label;
        const text = document.createElement('div');
        text.className = 'label';
        text.textContent = label;
        card.appendChild(image);
        card.appendChild(text);
        grid.appendChild(card);
      };
      img.onerror = () => {
        const card = document.createElement('div');
        card.className = 'qr-crypto';
        const text = document.createElement('div');
        text.className = 'label';
        text.textContent = label + '（二维码待补充）';
        card.appendChild(text);
        grid.appendChild(card);
      };
      img.src = src;
    });
  }

  // 渲染 Issue Wall
  function renderIssues() {
    const containers = [$('#issueList'), $('#issueListAccess')].filter(Boolean);
    containers.forEach(issueList => {
      issueList.innerHTML = '';
      if (state.issues.length === 0) {
        issueList.innerHTML = '<div class="issue-item"><p>暂无 Issue，点击右下角「开 ISSUE」创造第一个！</p></div>';
        return;
      }
      state.issues.forEach(issue => {
        const item = document.createElement('div');
        item.className = 'issue-item';
        item.innerHTML = `
          <h4>${issue.title}</h4>
          ${issue.body ? `<p>${issue.body}</p>` : ''}
          <div class="issue-meta">#${issue.id} · ${issue.timestamp}</div>
        `;
        issueList.appendChild(item);
      });
    });
  }

  // 原有功能
  function initCodeRain() {
    const rain = document.createElement('div');
    rain.className = 'code-rain';
    document.body.appendChild(rain);

    const chars = '01';
    
    function createDrop() {
      const drop = document.createElement('div');
      drop.className = 'code-drop';
      drop.textContent = chars[Math.floor(Math.random() * chars.length)];
      drop.style.left = Math.random() * 100 + '%';
      drop.style.animationDelay = Math.random() * 2 + 's';
      drop.style.animationDuration = (Math.random() * 2 + 2) + 's';
      rain.appendChild(drop);
      
      setTimeout(() => {
        if (drop.parentNode) drop.remove();
      }, 4000);
    }

    setInterval(createDrop, 200);
    for (let i = 0; i < 20; i++) {
      setTimeout(createDrop, i * 100);
    }
  }

  function initTerminalEffect() {
    const terminals = document.querySelectorAll('.terminal-content');
    terminals.forEach(terminal => {
      const text = terminal.innerHTML;
      terminal.innerHTML = '';
      terminal.style.display = 'block';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          terminal.innerHTML = text.substring(0, i + 1);
          i++;
          setTimeout(typeWriter, Math.random() * 50 + 20);
        }
      };
      
      setTimeout(typeWriter, 1000);
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const contactBtn = document.querySelector('.nav-cta');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
      } else {
        navbar.style.background = 'var(--white)';
        navbar.style.backdropFilter = 'none';
      }
      
      lastScroll = currentScroll;
    });

    if (contactBtn) {
      contactBtn.addEventListener('click', () => {
        const contact = document.getElementById('contact') || document.querySelector('.footer');
        if (contact) {
          contact.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      });
    }
  }

  function initNetworkNodes() {
    const nodes = document.querySelectorAll('.node');
    const connection = document.querySelector('.connection');
    
    nodes.forEach(node => {
      node.addEventListener('mouseenter', () => {
        connection.style.background = 'var(--white)';
        setTimeout(() => {
          connection.style.background = 'var(--black)';
        }, 200);
      });
    });
  }

  function initButtonRipple() {
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }

  function initCardAnimations() {
    const cards = document.querySelectorAll('.mission-card, .experiment-card, .vote-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.6s ease-out';
          entry.target.style.opacity = '1';
        }
      });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
      card.style.opacity = '0';
      observer.observe(card);
    });
  }

  // 添加CSS样式
  const style = document.createElement('style');
  style.textContent = `
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.1);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
    }
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    .btn {
      position: relative;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
