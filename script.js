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
    initApplyDialog();
    loadDonationWallets();
    loadSocialCards();
    loadHostQRCodes();
    
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

    // 捐赠相关弹幕（可点击）
    const donateSlogans = [
      '❤ Support Node404',
      '☕ Buy us a coffee',
      '🚀 Fund the experiment',
      '💡 Support open innovation',
      '🔥 Keep 404 alive'
    ];

    const hardcodeSlogans = [
      ...coreSlogans,
      ...donateSlogans,
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
    let donateCounter = 0;
    function autoDanmaku() {
      if (!state.danmakuEnabled) return;
      if (container.childElementCount >= MAX_CONCURRENT) return;
      const pool = Array.from(new Set([...hardcodeSlogans, ...state.latestDanmaku]));
      let text;

      // 每4条弹幕插入一条捐赠弹幕
      donateCounter++;
      if (donateCounter % 4 === 0) {
        text = donateSlogans[random(0, donateSlogans.length - 1)];
      } else if (queuePtr < scrollQueue.length) {
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
    function createDanmaku(text, delaySec = 0, force = false) {
      const now = performance.now();
      if (!lanes.length) setupLanes();
      let laneIdx = 0;
      let earliest = lanes[0];
      for (let i = 1; i < lanes.length; i++) {
        if (lanes[i] < earliest) { earliest = lanes[i]; laneIdx = i; }
      }
      if (!force && earliest > now + delaySec * 1000) return;

      const item = document.createElement('div');
      item.className = 'danmaku-item';
      item.textContent = text;
      item.style.visibility = force ? 'visible' : 'hidden';

      // 捐赠弹幕可点击
      if (donateSlogans.includes(text)) {
        item.classList.add('danmaku-donate');
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
          openDonateModal();
        });
      }

      container.appendChild(item);

      const w = item.offsetWidth || 120;
      const topPx = laneIdx * LANE_HEIGHT + random(-6, 6);
      const speed = random(50, 70);
      const durationSec = (container.clientWidth + w) / speed;
      item.style.top = topPx + 'px';
      item.style.animationDuration = durationSec + 's';
      item.style.animationDelay = delaySec + 's';
      if (!force) {
        item.addEventListener('animationstart', () => {
          item.style.visibility = 'visible';
        }, { once: true });
      }

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
        createDanmaku(value, 0, true);
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
    const tabs = Array.from(document.querySelectorAll('#accessTabs .tab-btn'));
    const panes = Array.from(document.querySelectorAll('.tab-content .tab-pane'));
    function setActive(key){
      tabs.forEach(b => b.classList.toggle('active', b.dataset.tab === key));
      panes.forEach(p => p.classList.toggle('active', p.id === (key + 'Content')));
    }
    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.tab;
        if (!key) return;
        setActive(key);
      });
    });
    const initial = (tabs.find(t => t.classList.contains('active')) || tabs[0]);
    if (initial) setActive(initial.dataset.tab);
  }

  function initApplyDialog() {
    const applyBtn = document.querySelector('#participateContent .access-actions .btn.btn-primary');
    if (!applyBtn) return;
    let panel = document.getElementById('applyPanel');
    if (!panel) {
      panel = document.createElement('div');
      panel.className = 'issue-panel';
      panel.id = 'applyPanel';
      const modal = document.createElement('div');
      modal.className = 'issue-modal';
      const header = document.createElement('div');
      header.className = 'issue-header';
      const h3 = document.createElement('h3');
      h3.id = 'applyTitle';
      h3.textContent = 'JOIN US';
      const closeBtn = document.createElement('button');
      closeBtn.className = 'close-issue';
      closeBtn.id = 'closeApply';
      closeBtn.textContent = '×';
      header.appendChild(h3);
      header.appendChild(closeBtn);
      const content = document.createElement('div');
      content.id = 'applyContent';
      modal.appendChild(header);
      modal.appendChild(content);
      panel.appendChild(modal);
      document.body.appendChild(panel);
      function closePanel(){ panel.classList.remove('active'); }
      closeBtn.addEventListener('click', closePanel);
      panel.addEventListener('click', (e) => { if (e.target === panel) closePanel(); });
    }
    const content = document.getElementById('applyContent');
    const source = document.querySelector('#contactContent .access-card');
    applyBtn.addEventListener('click', () => {
      if (!content || !source) return;
      content.innerHTML = '';
      const cloned = source.cloneNode(true);
      content.appendChild(cloned);
      cloned.querySelectorAll('.terminal-content').forEach(terminal => {
        const text = terminal.innerHTML;
        terminal.innerHTML = '';
        let i = 0;
        const typeWriter = () => {
          if (i < text.length) {
            terminal.innerHTML = text.substring(0, i + 1);
            i++;
            setTimeout(typeWriter, Math.random() * 50 + 20);
          }
        };
        setTimeout(typeWriter, 400);
      });
      panel.classList.add('active');
    });
  }

  function loadHostQRCodes() {
    const grid = document.getElementById('hostGrid');
    if (!grid) return;
    const candidates = [
      { type: 'qr', label: 'YuKi', src: 'contact/yuki.jpg', desc: '主理人：2017入圈Web3，做过DeFi，经历牛熊；专注寻找真正在思考和做事的人' },
      { type: 'qr', label: 'Frank', src: 'contact/frank.jpg', desc: '主理人：多年代码与AI/私募经历；热爱长谈与思想碰撞，搭台让有想法的人发声' }
    ];
    candidates.forEach(item => {
      if (item.type === 'qr') {
        const img = new Image();
        img.onload = () => {
          const card = document.createElement('div');
          card.className = 'qr-crypto host';
          const image = document.createElement('img');
          image.src = item.src;
          image.alt = item.label;
          const content = document.createElement('div');
          content.className = 'qr-content';
          const text = document.createElement('div');
          text.className = 'label';
          text.textContent = item.label;
          const d = document.createElement('div');
          d.className = 'desc';
          d.textContent = item.desc;
          content.appendChild(text);
          content.appendChild(d);
          card.appendChild(image);
          card.appendChild(content);
          grid.appendChild(card);
        };
        img.onerror = () => {
          const card = document.createElement('div');
          card.className = 'qr-crypto host';
          const content = document.createElement('div');
          content.className = 'qr-content';
          const text = document.createElement('div');
          text.className = 'label';
          text.textContent = item.label;
          const d = document.createElement('div');
          d.className = 'desc';
          d.textContent = item.desc + '（二维码待补充）';
          content.appendChild(text);
          content.appendChild(d);
          card.appendChild(content);
          grid.appendChild(card);
        };
        img.src = item.src;
      }
    });
  }

  function loadSocialCards() {
    const grids = [document.getElementById('subscribeGrid'), document.getElementById('socialGrid')].filter(Boolean);
    if (grids.length === 0) return;
    const items = [
      { type: 'qr', label: '公众号', src: 'contact/wechatpublicaccount.jpg', desc: '关注公众号获取活动与公告' },
      { type: 'link', label: 'Twitter', href: 'https://twitter.com/node404', desc: '关注 Twitter 获取即时更新' }
    ];
    grids.forEach(grid => {
      items.forEach(item => {
        if (item.type === 'qr') {
          const img = new Image();
          img.onload = () => {
            const card = document.createElement('div');
            card.className = 'qr-crypto';
            const image = document.createElement('img');
            image.src = item.src;
            image.alt = item.label;
            const aImg = document.createElement('a');
            aImg.href = item.src;
            aImg.target = '_blank';
            aImg.rel = 'noopener noreferrer';
            aImg.appendChild(image);
            const text = document.createElement('div');
            text.className = 'label';
            text.textContent = item.label;
            const d = document.createElement('div');
            d.className = 'desc';
            d.textContent = item.desc;
            card.appendChild(aImg);
            card.appendChild(text);
            card.appendChild(d);
            grid.appendChild(card);
          };
          img.onerror = () => {
            const card = document.createElement('div');
            card.className = 'qr-crypto';
            const text = document.createElement('div');
            text.className = 'label';
            text.textContent = item.label;
            const d = document.createElement('div');
            d.className = 'desc';
            d.textContent = item.desc + '（二维码待补充）';
            card.appendChild(text);
            card.appendChild(d);
            grid.appendChild(card);
          };
          img.src = item.src;
        } else if (item.type === 'link') {
          const a = document.createElement('a');
          a.href = item.href;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.className = 'link-card big';
          a.textContent = item.label + ' · ' + item.desc;
          grid.appendChild(a);
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

  // ===== 简易双语切换 =====
  const i18n = {
    zh: {
      nav: { mission: '使命', voting: '投票', experiments: '实验', collective: '社群网络', access: '加入', contact: '联系' },
      hero: { slogan: '在现实世界，重启一次「404实验」', explore: '探索', join: '加入' },
      mission: { title: '使命' },
      voting: { title: '投票墙' },
      experiments: { title: '实验' },
      collective: { title: '社群网络' },
      access: { title: '加入', subtitle: '加入我们的实验网络' },
      hosts: { title: '入群与交流', intro: '关注并添加两位主理人微信，私信“node404”，我们会把你拉入群；也可关注公众号与 Twitter 获取更新。' },
      follow: { title: '关注与订阅', subtitle: '关注公众号与 Twitter，获取活动与发布的即时更新' },
      tabs: { participate: '参与', contact: '联系', donate: '捐助', issues: '问题' },
      participate: { title: '如何参与' },
      contact: { title: '联系' },
      issues: { title: 'ISSUE WALL', empty: '暂无 Issue，点击右下角「开 ISSUE」创造第一个！' },
      issuePanel: { title: '开一个新 ISSUE' },
      buttons: { cancel: '取消', submit: '提交 ISSUE' },
      placeholders: { issueTitle: 'Issue 标题', issueBody: '描述你的想法...' }
    },
    en: {
      nav: { mission: 'MISSION', voting: 'VOTING', experiments: 'EXPERIMENTS', collective: 'COLLECTIVE', access: 'ACCESS', contact: 'CONTACT' },
      hero: { slogan: 'Reboot the "404 Experiment" in the real world', explore: 'EXPLORE', join: 'JOIN' },
      mission: { title: 'MISSION' },
      voting: { title: 'VOTING WALL' },
      experiments: { title: 'EXPERIMENTS' },
      collective: { title: 'COLLECTIVE' },
      access: { title: 'ACCESS', subtitle: 'Join our experimental network' },
      hosts: { title: 'Community & Joining', intro: 'Add the two hosts on WeChat and DM “node404” to join; follow our Public Account and Twitter for updates.' },
      follow: { title: 'FOLLOW & SUBSCRIBE', subtitle: 'Follow our Public Account and Twitter for real-time updates' },
      tabs: { participate: 'Participate', contact: 'Contact', donate: 'Donate', issues: 'Issues' },
      participate: { title: 'How to Participate' },
      contact: { title: 'CONTACT' },
      issues: { title: 'ISSUE WALL', empty: 'No issues yet — click bottom-right to create one!' },
      issuePanel: { title: 'Open a new ISSUE' },
      buttons: { cancel: 'Cancel', submit: 'Submit ISSUE' },
      placeholders: { issueTitle: 'Issue title', issueBody: 'Describe your idea...' }
    }
  };
  function detectLang(){ const l=localStorage.getItem('node404-lang'); if(l) return l; return (navigator.language||'').startsWith('zh')?'zh':'en'; }
  let currentLang = detectLang();
  function applyI18n(lang){ const t=i18n[lang]; if(!t) return;
    const q=(sel)=>document.querySelector(sel);
    const qa=(sel)=>Array.from(document.querySelectorAll(sel));
    // nav
    const mapNav={ '#mission':t.nav.mission, '#voting':t.nav.voting, '#experiments':t.nav.experiments, '#collective':t.nav.collective, '#access':t.nav.access };
    Object.entries(mapNav).forEach(([href,label])=>{ const a=document.querySelector(`.nav-links a[href="${href}"]`); if(a) a.textContent=label; });
    const navCta=q('.nav-cta'); if(navCta) navCta.textContent=t.nav.contact;
    // hero
    const heroS=q('.hero-slogan'); if(heroS) heroS.textContent=t.hero.slogan;
    const heroExplore=q('.hero-actions .btn.btn-primary'); if(heroExplore) heroExplore.textContent=t.hero.explore;
    const heroJoin=q('.hero-actions .btn.btn-secondary'); if(heroJoin) heroJoin.textContent=t.hero.join;
    // section titles
    const secMap={ '#mission h2':t.mission.title, '#voting h2':t.voting.title, '#experiments h2':t.experiments.title, '#collective h2':t.collective.title, '#access h2':t.access.title, '#subscribe h2': t.follow ? t.follow.title : 'FOLLOW & SUBSCRIBE' };
    Object.entries(secMap).forEach(([sel,label])=>{ const el=q(sel); if(el) el.textContent=label; });
    const accSub=q('#access .section-title + p, #access .section-title p'); if(accSub) accSub.textContent=t.access.subtitle;
    const subSub=q('#subscribe .section-title + p'); if(subSub) subSub.textContent=t.follow ? t.follow.subtitle : '';
    // tabs
    qa('#accessTabs .tab-btn').forEach(btn=>{ const key=btn.dataset.tab; if(t.tabs[key]) btn.textContent=t.tabs[key]; });
    // cards
    const partTitle=q('#participateContent h3'); if(partTitle) partTitle.textContent=t.participate.title;
    const contactTitle=q('#contactContent h3'); if(contactTitle) contactTitle.textContent=t.contact.title;
    const hostsTitle=q('#hostsTitle'); if(hostsTitle) hostsTitle.textContent=t.hosts.title;
    const hostsIntro=q('#hostsIntro'); if(hostsIntro) hostsIntro.textContent=t.hosts.intro;
    const socialTitle=q('#socialTitle'); if(socialTitle) socialTitle.textContent=t.follow ? t.follow.title : (lang==='zh'?'关注与订阅':'Follow & Subscribe');
    // issue wall
    const wallTitle=q('#issueWall h2'); if(wallTitle) wallTitle.textContent=t.issues.title;
    ['#issueList','#issueListAccess'].forEach(id=>{ const el=q(id); if(el && el.children.length===1 && el.textContent.includes('暂无 Issue')) el.innerHTML=`<div class="issue-item"><p>${t.issues.empty}</p></div>`; });
    const panelTitle=q('#issuePanel .issue-header h3'); if(panelTitle) panelTitle.textContent=t.issuePanel.title;
    const applyPanelTitle=q('#applyPanel .issue-header h3'); if(applyPanelTitle) applyPanelTitle.textContent=t.participate.title;
    const cancelBtn=q('#cancelIssue'); if(cancelBtn) cancelBtn.textContent=t.buttons.cancel;
    const submitBtn=q('#submitIssue'); if(submitBtn) submitBtn.textContent=t.buttons.submit;
    const titlePh=q('#issueTitle'); if(titlePh) titlePh.placeholder=t.placeholders.issueTitle;
    const bodyPh=q('#issueBody'); if(bodyPh) bodyPh.placeholder=t.placeholders.issueBody;
    // toggle button label
    const toggle=document.getElementById('langToggle'); if(toggle) toggle.textContent=(lang==='zh'?'EN':'中文');
  }
  function setLang(lang){ currentLang=lang; localStorage.setItem('node404-lang',lang); applyI18n(lang); }
  // inject toggle if missing
  (function(){ let toggle=document.getElementById('langToggle'); if(!toggle){ toggle=document.createElement('button'); toggle.id='langToggle'; toggle.className='btn btn-secondary'; const actions=document.querySelector('.nav-actions'); if(actions) actions.appendChild(toggle); }
    toggle.addEventListener('click',()=> setLang(currentLang==='zh'?'en':'zh'));
    toggle.textContent=(currentLang==='zh'?'EN':'中文');
  })();

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

// 全局函数：打开捐赠弹窗
window.openDonateModal = function() {
  const modal = document.getElementById('donateModal');
  const walletsContainer = document.getElementById('donateWallets');

  if (!modal) {
    console.error('Donate modal not found');
    return;
  }

  // 加载钱包二维码
  if (walletsContainer && !walletsContainer.hasChildNodes()) {
    const wallets = [
      { label: 'BTC', src: 'donationwallet/Btc.JPEG' },
      { label: 'ETH', src: 'donationwallet/eth.JPEG' },
      { label: 'BNB', src: 'donationwallet/bnb.JPEG' },
      { label: 'TRX', src: 'donationwallet/Trx.JPEG' },
      { label: 'SOL', src: 'donationwallet/Sol.JPEG' }
    ];
    wallets.forEach(({ label, src }) => {
      const card = document.createElement('div');
      card.className = 'donate-wallet-card';
      card.innerHTML = '<img src="' + src + '" alt="' + label + '"><span>' + label + '</span>';
      walletsContainer.appendChild(card);
    });
  }

  modal.classList.add('active');
};

window.closeDonateModal = function() {
  const modal = document.getElementById('donateModal');
  if (modal) modal.classList.remove('active');
};

// 初始化捐赠弹窗事件
document.addEventListener('DOMContentLoaded', function() {
  var modal = document.getElementById('donateModal');
  var closeBtn = document.getElementById('closeDonate');
  var navSupportBtn = document.getElementById('navSupportBtn');
  var heroSupportBtn = document.getElementById('heroSupportBtn');

  // 打开弹窗
  if (navSupportBtn) {
    navSupportBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.openDonateModal();
    });
  }
  if (heroSupportBtn) {
    heroSupportBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.openDonateModal();
    });
  }

  // 关闭弹窗
  if (closeBtn) closeBtn.addEventListener('click', window.closeDonateModal);
  if (modal) modal.addEventListener('click', function(e) {
    if (e.target === modal) window.closeDonateModal();
  });
});
