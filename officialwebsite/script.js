// Node404 - Advanced Hacker Experience
// Terminal-level animations and hacker-grade interactions

class Node404Geek {
  constructor() {
    this.currentNode = null;
    this.discoverySecrets = {
      '1970': 'ARPANET节点404：第一个"未找到"错误诞生 - 这是网络历史上第一个404错误，从此"404 Not Found"成为互联网文化的一部分。',
      '2008': 'GitHub创立：代码社交化的黎明 - "Social coding"概念诞生，pull request成为新的协作方式，开源文化进入新纪元。',
      '2022': 'Node404成立：现实世界的404实验启动 - "404 to genesis"理念诞生，将虚拟世界的协作模式实体化，创造全新的技术社交体验。',
      'NEXT': '量子计算时代的去中心化实验网络 - 利用量子纠缠原理构建超高速、超安全的分布式协作网络，实现真正意义上的"瞬间同步"。'
    };
    this.binaryRain = [];
    this.terminalLines = [];
    this.glitchActive = false;
    this.hackerMode = false;
    this.commandHistory = [];
    this.init();
  }

  init() {
    this.setupDiscoveryPanel();
    this.setupNetworkVisualization();
    this.setupCopyButtons();
    this.setupSmoothScrolling();
    this.setupModalTriggers();
    this.setupScrollAnimations();
    this.setupDeveloperConsole();

    this.setupTerminalEffects();
    this.setupGlitchSystem();
    this.setupHackerCommands();
    this.setupMatrixEffects();
    this.setupEasterEggs();
    this.setupSubtleBinaryRain();
  }

  // Discovery panel interactions with hacker mystery
  setupDiscoveryPanel() {
    const discoveryItems = document.querySelectorAll('.discovery-item');
    
    discoveryItems.forEach(item => {
      item.addEventListener('click', () => {
        const year = item.dataset.year;
        const secret = item.querySelector('.discovery-secret');
        
        // Remove active class from all items
        discoveryItems.forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.discovery-secret').forEach(s => s.classList.remove('revealed'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Show secret with delay for smooth effect
        setTimeout(() => {
          secret.classList.add('revealed');
          
          // Add mysterious data stream effect
          this.addDataStreamEffect(item);
        }, 200);
        
        // Add subtle highlight effect
        item.style.borderLeft = '3px solid #000';
        setTimeout(() => {
          item.style.borderLeft = '';
        }, 1000);
        
        // Occasionally add mysterious binary code
        if (Math.random() < 0.4) {
          this.addMysteriousBinary(item);
        }
      });
    });
  }

  // Add data stream effect for mystery
  addDataStreamEffect(element) {
    const stream = document.createElement('div');
    stream.className = 'data-stream';
    stream.style.cssText = `
      position: absolute;
      top: 0;
      right: 0;
      font-family: "JetBrains Mono", monospace;
      font-size: 10px;
      color: #000;
      opacity: 0.3;
      animation: data-stream-flow 3s linear infinite;
      pointer-events: none;
      z-index: 5;
    `;
    
    // Generate random binary data
    let binaryData = '';
    for (let i = 0; i < 50; i++) {
      binaryData += Math.random() > 0.5 ? '1' : '0';
      if (i % 8 === 7) binaryData += ' ';
    }
    stream.textContent = binaryData;
    
    element.style.position = 'relative';
    element.appendChild(stream);
    
    // Add CSS animation if not exists
    if (!document.querySelector('#data-stream-animation')) {
      const style = document.createElement('style');
      style.id = 'data-stream-animation';
      style.textContent = `
        @keyframes data-stream-flow {
          0% { transform: translateX(100%); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateX(-100%); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Remove after animation
    setTimeout(() => {
      if (stream.parentNode) {
        stream.remove();
      }
    }, 3000);
  }

  // Add mysterious binary overlay
  addMysteriousBinary(element) {
    const binary = document.createElement('div');
    binary.className = 'mysterious-binary';
    binary.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: "JetBrains Mono", monospace;
      font-size: 8px;
      color: #000;
      opacity: 0.2;
      animation: binary-flicker 1s ease-in-out;
      pointer-events: none;
      z-index: 3;
    `;
    
    // Generate mysterious binary pattern
    let binaryPattern = '';
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 8; j++) {
        binaryPattern += Math.random() > 0.5 ? '1' : '0';
      }
      binaryPattern += '\n';
    }
    binary.textContent = binaryPattern;
    
    element.appendChild(binary);
    
    // Add CSS animation if not exists
    if (!document.querySelector('#binary-flicker-animation')) {
      const style = document.createElement('style');
      style.id = 'binary-flicker-animation';
      style.textContent = `
        @keyframes binary-flicker {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Remove after animation
    setTimeout(() => {
      if (binary.parentNode) {
        binary.remove();
      }
    }, 1000);
  }

  // Network visualization
  setupNetworkVisualization() {
    const nodes = document.querySelectorAll('.node');
    const connections = document.querySelectorAll('.connection');
    const networkInfo = document.querySelector('.network-info-content');
    
    const nodeData = {
      'central-node': {
        title: 'Node404 Core',
        description: '连接所有实验节点的中心枢纽，处理404到genesis的转换协议',
        stats: { connections: 42, protocols: 7, uptime: '99.9%' }
      },
      'web3-node': {
        title: 'Web3 Collective',
        description: '去中心化实验和区块链创新，探索Web3社交新范式',
        stats: { projects: 15, members: 128, dao: 3 }
      },
      'ai-node': {
        title: 'AI Laboratory',
        description: '人工智能实验和机器学习模型训练，推动AI民主化',
        stats: { models: 8, datasets: 23, papers: 5 }
      },
      'oss-node': {
        title: 'Open Source Hub',
        description: '开源项目协作和代码贡献，构建开发者生态',
        stats: { repos: 67, contributors: 234, stars: 1204 }
      }
    };

    nodes.forEach(node => {
      node.addEventListener('click', () => {
        const nodeId = node.id;
        const data = nodeData[nodeId];
        
        if (!data) return;
        
        // Remove active class from all nodes and connections
        nodes.forEach(n => n.classList.remove('active'));
        connections.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked node
        node.classList.add('active');
        
        // Activate related connections
        if (nodeId === 'central-node') {
          connections.forEach(c => c.classList.add('active'));
        } else if (nodeId === 'web3-node') {
          document.querySelector('.connection-1').classList.add('active');
        } else if (nodeId === 'ai-node') {
          document.querySelector('.connection-2').classList.add('active');
        } else if (nodeId === 'oss-node') {
          document.querySelector('.connection-3').classList.add('active');
        }
        
        // Update network info
        networkInfo.innerHTML = `
          <h3>${data.title}</h3>
          <p>${data.description}</p>
          <div class="node-stats">
            ${Object.entries(data.stats).map(([key, value]) => `
              <div class="stat">
                <span class="stat-value">${value}</span>
                <span class="stat-label">${key.toUpperCase()}</span>
              </div>
            `).join('')}
          </div>
        `;
        
        // Add subtle animation
        node.style.transform = 'scale(1.1)';
        setTimeout(() => {
          node.style.transform = '';
        }, 200);
      });
    });

    // Auto-activate central node on load
    setTimeout(() => {
      document.getElementById('central-node').click();
    }, 1000);
  }

  // Copy functionality with clean feedback
  setupCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        const text = document.getElementById(targetId).textContent;
        
        navigator.clipboard.writeText(text).then(() => {
          const originalText = btn.textContent;
          btn.textContent = '已复制';
          btn.style.background = '#000000';
          btn.style.color = '#ffffff';
          
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
          }, 2000);
        });
      });
    });
  }

  // Smooth scrolling for navigation
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Modal system triggers
  setupModalTriggers() {
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const modalCloses = document.querySelectorAll('.close, .modal');

    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const modalId = trigger.dataset.modalTarget;
        this.openModal(modalId);
      });
    });

    modalCloses.forEach(close => {
      close.addEventListener('click', (e) => {
        if (e.target === close || e.target.classList.contains('close')) {
          const modal = close.closest('.modal');
          if (modal) {
            this.closeModal(modal.id);
          }
        }
      });
    });

    // Escape key to close modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal[style*="block"]');
        if (openModal) {
          this.closeModal(openModal.id);
        }
      }
    });

    // Form submissions
    document.getElementById('contact-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('感谢您的留言！我们会尽快回复您。');
      this.closeModal('contact-modal');
      e.target.reset();
    });

    document.getElementById('apply-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('感谢您的申请！我们会尽快审核并与您联系。');
      this.closeModal('apply-modal');
      e.target.reset();
    });
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Add entrance animation
      const content = modal.querySelector('.modal-content');
      content.style.opacity = '0';
      content.style.transform = 'translateY(-20px)';
      
      setTimeout(() => {
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
        content.style.transition = 'all 0.3s ease';
      }, 10);
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      const content = modal.querySelector('.modal-content');
      content.style.opacity = '0';
      content.style.transform = 'translateY(-20px)';
      
      setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }, 300);
    }
  }

  // Scroll animations
  setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.mission-card, .experiment-card, .access-card').forEach(el => {
      observer.observe(el);
    });
  }

  // Developer console messages
  setupDeveloperConsole() {
    console.log(`
%c🚀 NODE404 HACKER SYSTEM INITIALIZED
%cWelcome to the true hacker experience.
%cAdvanced terminal-level animations and hacker-grade interactions loaded.
%cTry typing %cnode404.hacker()%c to activate hacker mode.
%cOr try %cnode404.matrix()%c for matrix effects.
    `, 
    'color: #000000; font-size: 16px; font-weight: bold; font-family: "JetBrains Mono", monospace;',
    'color: #000000; font-style: italic; font-family: "JetBrains Mono", monospace;',
    'color: #000000; font-style: italic; font-family: "JetBrains Mono", monospace;',
    'color: #000000; font-style: italic; font-family: "JetBrains Mono", monospace;',
    'color: #000000; font-family: "JetBrains Mono", monospace;',
    'color: #000000; font-style: italic; font-family: "JetBrains Mono", monospace;',
    'color: #000000; font-style: italic; font-family: "JetBrains Mono", monospace;',
    'color: #000000; font-family: "JetBrains Mono", monospace;',
    'color: #000000; font-style: italic; font-family: "JetBrains Mono", monospace;'
    );
  }



  // Terminal typing effects with corruption
  setupTerminalEffects() {
    const terminalElements = document.querySelectorAll('.terminal-text');
    
    terminalElements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      element.style.borderRight = '2px solid #000';
      element.style.animation = 'blink 1s infinite';
      
      let i = 0;
      let corruptionChance = 0.02; // 2% chance of corruption
      
      const typeWriter = setInterval(() => {
        if (i < text.length) {
          // Add occasional corruption for mystery
          if (Math.random() < corruptionChance) {
            const corruptChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/\\';
            element.textContent += corruptChars[Math.floor(Math.random() * corruptChars.length)];
            // Add a brief pause for effect
            setTimeout(() => {
              element.textContent = element.textContent.slice(0, -1) + text.charAt(i);
            }, 100);
          } else {
            element.textContent += text.charAt(i);
          }
          i++;
        } else {
          clearInterval(typeWriter);
          element.style.borderRight = 'none';
          element.style.animation = 'none';
          
          // Add mysterious cursor behavior after typing
          setTimeout(() => {
            element.style.borderRight = '2px solid #000';
            element.style.animation = 'blink 2s infinite';
            
            // Occasionally add mysterious messages
            if (Math.random() < 0.3) {
              setTimeout(() => {
                const mysteriousMessages = [
                  ' [SYSTEM: Anomaly detected]',
                  ' [TRACE: Unknown signal]',
                  ' [WARNING: Data corruption]',
                  ' [INFO: Quantum fluctuation]'
                ];
                const message = mysteriousMessages[Math.floor(Math.random() * mysteriousMessages.length)];
                element.textContent += message;
                
                // Remove message after a delay
                setTimeout(() => {
                  element.textContent = text;
                  element.style.borderRight = 'none';
                  element.style.animation = 'none';
                }, 3000);
              }, 2000);
            }
          }, 1000);
        }
      }, 50);
    });
  }

  // Glitch system for hacker feel
  setupGlitchSystem() {
    const glitchElements = document.querySelectorAll('.glitch-text');
    
    glitchElements.forEach(element => {
      const originalText = element.textContent;
      
      element.addEventListener('mouseenter', () => {
        this.glitchActive = true;
        this.glitchText(element, originalText);
        this.addScanningEffect(element);
      });
      
      element.addEventListener('mouseleave', () => {
        this.glitchActive = false;
        element.textContent = originalText;
        element.style.textShadow = 'none';
        element.style.position = 'relative';
        element.style.overflow = 'visible';
        
        // Remove scanning effect
        const scanner = element.querySelector('.code-scanner');
        if (scanner) {
          scanner.remove();
        }
      });
    });
  }

  // Add code scanning effect for mystery
  addScanningEffect(element) {
    const scanner = document.createElement('div');
    scanner.className = 'code-scanner';
    scanner.style.cssText = `
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255,255,255,0.1) 50%, 
        transparent 100%);
      animation: scan-code 2s infinite;
      pointer-events: none;
      z-index: 10;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(scanner);
    
    // Add CSS animation if not exists
    if (!document.querySelector('#scan-animation-style')) {
      const style = document.createElement('style');
      style.id = 'scan-animation-style';
      style.textContent = `
        @keyframes scan-code {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  glitchText(element, originalText) {
    if (!this.glitchActive) return;
    
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/\\';
    const chineseChars = '错误代码故障系统崩溃';
    const binaryChars = '01';
    
    let glitchedText = '';
    let shouldGlitch = Math.random() > 0.6;
    
    for (let i = 0; i < originalText.length; i++) {
      const random = Math.random();
      if (random > 0.85) {
        glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
      } else if (random > 0.8) {
        glitchedText += chineseChars[Math.floor(Math.random() * chineseChars.length)];
      } else if (random > 0.75) {
        glitchedText += binaryChars[Math.floor(Math.random() * binaryChars.length)];
      } else {
        glitchedText += originalText[i];
      }
    }
    
    element.textContent = glitchedText;
    
    // Multiple shadow layers for extreme glitch effect
    const shadow1 = `${Math.random() * 8 - 4}px ${Math.random() * 8 - 4}px 0 #000`;
    const shadow2 = `${Math.random() * 6 - 3}px ${Math.random() * 6 - 3}px 0 #333`;
    const shadow3 = `${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 #666`;
    
    element.style.textShadow = `${shadow1}, ${shadow2}, ${shadow3}`;
    element.style.transform = `translate(${Math.random() * 6 - 3}px, ${Math.random() * 6 - 3}px) rotate(${Math.random() * 4 - 2}deg)`;
    element.style.filter = `hue-rotate(${Math.random() * 60 - 30}deg) saturate(${Math.random() * 2})`;
    
    setTimeout(() => {
      if (this.glitchActive) {
        this.glitchText(element, originalText);
      } else {
        element.style.textShadow = '';
        element.style.transform = '';
        element.style.filter = '';
      }
    }, 50);
  }

  // Hacker command system
  setupHackerCommands() {
    const commands = {
      'help': 'Available commands: help, status, nodes, matrix, glitch, clear',
      'status': 'Node404 System Status: ONLINE | Nodes: 4 | Connections: 42 | Uptime: 99.9%',
      'nodes': 'Available nodes: central-node, web3-node, ai-node, oss-node',
      'matrix': 'Activating matrix mode...',
      'glitch': 'Activating glitch effects...',
      'clear': 'Clearing terminal...'
    };
    
    window.addEventListener('keydown', (e) => {
      if (e.key === '`' && e.ctrlKey) {
        e.preventDefault();
        this.toggleHackerMode();
      }
    });
  }

  toggleHackerMode() {
    this.hackerMode = !this.hackerMode;
    document.body.classList.toggle('hacker-mode');
    
    if (this.hackerMode) {
      this.showHackerTerminal();
    } else {
      this.hideHackerTerminal();
    }
  }

  showHackerTerminal() {
    const terminal = document.createElement('div');
    terminal.id = 'hacker-terminal';
    terminal.innerHTML = `
      <div class="terminal-header">
        <span>NODE404 TERMINAL v2.0</span>
        <button onclick="node404.hideHackerTerminal()">×</button>
      </div>
      <div class="terminal-output" id="terminal-output"></div>
      <div class="terminal-input">
        <span class="terminal-prompt">node404@system:~$</span>
        <input type="text" id="terminal-input" autofocus>
      </div>
    `;
    document.body.appendChild(terminal);
    
    const input = document.getElementById('terminal-input');
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.processTerminalCommand(input.value);
        input.value = '';
      }
    });
    
    this.addTerminalOutput('Node404 Terminal v2.0 initialized');
    this.addTerminalOutput('Type "help" for available commands');
  }

  hideHackerTerminal() {
    const terminal = document.getElementById('hacker-terminal');
    if (terminal) {
      terminal.remove();
    }
  }

  processTerminalCommand(command) {
    this.addTerminalOutput(`node404@system:~$ ${command}`);
    
    const commands = {
      'help': 'Available commands: help, status, nodes, matrix, glitch, clear, hack',
      'status': 'Node404 System Status: ONLINE | Nodes: 4 | Connections: 42 | Uptime: 99.9%',
      'nodes': 'Available nodes: central-node, web3-node, ai-node, oss-node',
      'matrix': 'Activating matrix mode... Use node404.matrix()',
      'glitch': 'Activating glitch effects...',
      'clear': '',
      'hack': 'Initializing hack sequence... Just kidding! This is a demo terminal.'
    };
    
    if (command === 'clear') {
      document.getElementById('terminal-output').innerHTML = '';
    } else if (commands[command]) {
      this.addTerminalOutput(commands[command]);
    } else if (command) {
      this.addTerminalOutput(`Command not found: ${command}`);
    }
  }

  addTerminalOutput(text) {
    const output = document.getElementById('terminal-output');
    if (output) {
      const line = document.createElement('div');
      line.textContent = text;
      line.style.opacity = '0';
      output.appendChild(line);
      
      setTimeout(() => {
        line.style.opacity = '1';
        line.style.transition = 'opacity 0.3s ease';
      }, 10);
      
      output.scrollTop = output.scrollHeight;
    }
  }

  // Matrix effects system
  setupMatrixEffects() {
    // Add matrix-style animations to network nodes
    const nodes = document.querySelectorAll('.network-node');
    
    nodes.forEach((node, index) => {
      setTimeout(() => {
        node.style.animation = 'matrix-pulse 2s infinite';
      }, index * 500);
    });
  }

  // Subtle binary rain for mystery atmosphere
  setupSubtleBinaryRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'subtle-binary-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.03'; // Very subtle
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const binaryChars = '01';
    const fontSize = 10;
    const columns = Math.floor(window.innerWidth / fontSize);
    
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = fontSize + 'px "JetBrains Mono", monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = binaryChars[Math.floor(Math.random() * binaryChars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Add subtle glow effect
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 1;
        ctx.fillText(text, x, y);
        
        // Reset shadow
        ctx.shadowBlur = 0;
        
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    setInterval(draw, 50);
  }

  // Advanced easter eggs for developers
  setupEasterEggs() {
    // Konami code
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    window.addEventListener('keydown', (e) => {
      konamiCode.push(e.key);
      if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
      }
      
      if (konamiCode.join(',') === konamiSequence.join(',')) {
        this.activateKonamiMode();
        konamiCode = [];
      }
    });
    
    // Secret click combinations
    let clickCount = 0;
    let lastClickTime = 0;
    
    document.addEventListener('click', (e) => {
      const currentTime = Date.now();
      if (currentTime - lastClickTime < 300) {
        clickCount++;
        if (clickCount >= 7) {
          this.activateSecretMode();
          clickCount = 0;
        }
      } else {
        clickCount = 1;
      }
      lastClickTime = currentTime;
    });
  }

  activateKonamiMode() {
    document.body.classList.add('konami-mode');
    this.addTerminalOutput('🎮 KONAMI CODE ACTIVATED!');
    this.addTerminalOutput('Secret developer mode unlocked!');
    
    setTimeout(() => {
      document.body.classList.remove('konami-mode');
    }, 5000);
  }

  activateSecretMode() {
    this.addTerminalOutput('🔓 SECRET MODE ACTIVATED!');
    this.addTerminalOutput('You found the secret click combination!');
    
    // Add secret visual effects
    document.querySelectorAll('.section-title').forEach(title => {
      title.style.animation = 'secret-glow 2s ease-in-out';
    });
  }
}

// Add global developer functions
window.node404 = window.node404 || {};
window.node404.info = function() {
  const info = [
    "🎯 Discovery Panel: Click the years to reveal historical secrets",
    "🌐 Network Graph: Click nodes to explore different tech collectives", 
    "💾 Copy System: Click copy buttons to grab contact codes",
    "🚪 Modal System: Use ESC key to close any open modal",
    "📱 Responsive Design: Optimized for all devices",
    "⚡ Smooth Animations: Clean transitions and hover effects",
    "🎨 Monochrome Design: True hacker style with white background and black text",
    "🌧️ Binary Rain: Matrix-style binary rain background effect",
    "⌨️ Terminal Effects: Typewriter animations on text elements",
    "💥 Glitch System: Hover over glitch-text for hacker effects",
    "🔧 Hacker Terminal: Press Ctrl+` to open hacker terminal",
    "🥚 Easter Eggs: Konami code and secret click combinations"
  ];
  
  console.log('%c🔍 NODE404 HACKER FEATURES:', 'color: #000000; font-weight: bold; font-family: "JetBrains Mono", monospace;');
  info.forEach(item => {
    console.log(`%c${item}`, 'color: #000000; margin-left: 10px; font-family: "JetBrains Mono", monospace;');
  });
  
  return "This is the true hacker experience - advanced, mysterious, and interactive.";
};

window.node404.hacker = function() {
  if (window.node404Geek) {
    window.node404Geek.toggleHackerMode();
    return "Hacker terminal activated! Type commands like: help, status, nodes, matrix, glitch";
  }
  return "Hacker system not initialized yet.";
};

window.node404.matrix = function() {
  document.body.classList.add('matrix-mode');
  
  // Add matrix effects to all text elements
  document.querySelectorAll('h1, h2, h3, p, span').forEach((element, index) => {
    setTimeout(() => {
      element.style.animation = 'matrix-glow 1s ease-in-out';
      setTimeout(() => {
        element.style.animation = '';
      }, 1000);
    }, index * 50);
  });
  
  setTimeout(() => {
    document.body.classList.remove('matrix-mode');
  }, 3000);
  
  return "Matrix mode activated for 3 seconds!";
};

window.node404.glitch = function() {
  document.querySelectorAll('.glitch-text').forEach(element => {
    element.dispatchEvent(new Event('mouseenter'));
    setTimeout(() => {
      element.dispatchEvent(new Event('mouseleave'));
    }, 2000);
  });
  return "Glitch effects activated for 2 seconds!";
};

window.node404.secret = function() {
  const secrets = [
    "🔍 The real 404 experiment is the friends we made along the way",
    "💡 Every bug is just an undocumented feature",
    "🚀 Code is poetry, but bugs are haikus",
    "⚡ The best error message is the one that never shows",
    "🎯 In Node404, every 'not found' becomes a new discovery"
  ];
  
  const secret = secrets[Math.floor(Math.random() * secrets.length)];
  console.log(`%c${secret}`, 'color: #000000; font-weight: bold; font-size: 14px; font-family: "JetBrains Mono", monospace;');
  
  return secret;
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize main hacker system
  window.node404Geek = new Node404Geek();
  
  // Add initial animations
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
  
  // Add mysterious heartbeat pulse
  setTimeout(() => {
    startMysteriousHeartbeat();
  }, 5000);
  
  // Add code flow effects
  setTimeout(() => {
    setupCodeFlowEffects();
  }, 2000);
  
  // Add advanced hacker effects
  setTimeout(() => {
    setupAdvancedHackerEffects();
  }, 3000);
}

// Advanced hacker effects
function setupAdvancedHackerEffects() {
  // Add memory indicator
  addMemoryIndicator();
  
  // Add matrix background effect
  addMatrixBackground();
  
  // Add code compilation effects
  addCompilationEffects();
  
  // Add syntax highlighting to existing code
  addSyntaxHighlighting();
  
  // Add hacker typing effect
  addHackerTypingEffect();
  
  // Add code decryption effect
  addCodeDecryptionEffect();
}

function addMemoryIndicator() {
  const memoryIndicator = document.createElement('div');
  memoryIndicator.className = 'memory-indicator';
  memoryIndicator.textContent = Math.floor(Math.random() * 50 + 20) + 'MB / 128MB';
  document.body.appendChild(memoryIndicator);
  
  // Update memory usage randomly
  setInterval(() => {
    const usage = Math.floor(Math.random() * 40 + 30);
    memoryIndicator.textContent = usage + 'MB / 128MB';
  }, 5000);
}

function addMatrixBackground() {
  const matrixBg = document.createElement('div');
  matrixBg.className = 'hacker-matrix-bg';
  document.body.appendChild(matrixBg);
}

function addCompilationEffects() {
  // Add compilation effect to code blocks
  const codeBlocks = document.querySelectorAll('.code-decoration, .terminal-container');
  codeBlocks.forEach((block, index) => {
    setTimeout(() => {
      block.classList.add('code-compilation');
      
      // Remove compilation effect after 5 seconds
      setTimeout(() => {
        block.classList.remove('code-compilation');
      }, 5000);
    }, index * 1000);
  });
}

function addSyntaxHighlighting() {
  // Add syntax highlighting to code elements
  const codeElements = document.querySelectorAll('[style*="font-family: var(--font-mono)"]');
  codeElements.forEach(element => {
    let content = element.innerHTML;
    
    // Simple syntax highlighting
    content = content.replace(/\b(const|let|var|function|class|if|else|for|while|return|await|new)\b/g, '<span class="syntax-keyword">$1</span>');
    content = content.replace(/"([^"]*)"/g, '<span class="syntax-string">$1</span>');
    content = content.replace(/'([^']*)'/g, '<span class="syntax-string">$1</span>');
    content = content.replace(/\/\/([^\n]*)/g, '<span class="syntax-comment">//$1</span>');
    content = content.replace(/\b(\d+)\b/g, '<span class="syntax-number">$1</span>');
    
    element.innerHTML = content;
  });
}

function addHackerTypingEffect() {
  // Add random typing sounds/visual effects
  const typingInterval = setInterval(() => {
    if (Math.random() < 0.1) { // 10% chance
      createTypingEffect();
    }
  }, 3000);
}

function createTypingEffect() {
  const typingElement = document.createElement('div');
  typingElement.className = 'hacker-typing';
  typingElement.style.cssText = `
    position: fixed;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #000;
    background: rgba(255,255,255,0.95);
    padding: 6px 10px;
    border: 1px solid #000;
    z-index: 200;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
  
  const typingTexts = [
    'user@node404:~$ echo "Hello World"',
    'root@system:# chmod +x hack.sh',
    'admin@network>$ ping -c 1 404.genesis',
    'developer@lab:~$ npm install future',
    'hacker@darknet:# ./quantum-leap'
  ];
  
  const text = typingTexts[Math.floor(Math.random() * typingTexts.length)];
  typingElement.textContent = '';
  
  // Random position
  const posX = Math.random() * (window.innerWidth - 300);
  const posY = Math.random() * (window.innerHeight - 100);
  typingElement.style.left = posX + 'px';
  typingElement.style.top = posY + 'px';
  
  document.body.appendChild(typingElement);
  
  // Typewriter effect
  let i = 0;
  typingElement.style.opacity = '0.9';
  
  const typeInterval = setInterval(() => {
    if (i < text.length) {
      typingElement.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typeInterval);
      
      // Add cursor blink
      typingElement.style.borderRight = '2px solid #000';
      typingElement.style.animation = 'blink 1s infinite';
      
      // Remove after delay
      setTimeout(() => {
        typingElement.style.opacity = '0';
        setTimeout(() => {
          typingElement.remove();
        }, 300);
      }, 2000);
    }
  }, 50);
}

function addCodeDecryptionEffect() {
  // Add random code decryption animations
  const decryptionInterval = setInterval(() => {
    if (Math.random() < 0.05) { // 5% chance
      createDecryptionEffect();
    }
  }, 5000);
}

function createDecryptionEffect() {
  const decryptionElement = document.createElement('div');
  decryptionElement.className = 'code-decryption';
  decryptionElement.style.cssText = `
    position: fixed;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #000;
    background: rgba(0,0,0,0.05);
    padding: 8px 12px;
    border-left: 3px solid #000;
    z-index: 150;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.5s ease;
  `;
  
  // Random position
  const posX = Math.random() * (window.innerWidth - 250);
  const posY = Math.random() * (window.innerHeight - 80);
  decryptionElement.style.left = posX + 'px';
  decryptionElement.style.top = posY + 'px';
  
  document.body.appendChild(decryptionElement);
  
  // Decryption animation
  const encrypted = '4E6F64653430342069732074686520667574757265';
  const decrypted = 'Node404 is the future';
  
  decryptionElement.textContent = encrypted;
  decryptionElement.style.opacity = '0.8';
  
  // Decrypt character by character
  let step = 0;
  const decryptInterval = setInterval(() => {
    if (step < decrypted.length) {
      const progress = decrypted.substring(0, step + 1) + encrypted.substring((step + 1) * 2);
      decryptionElement.textContent = progress;
      step++;
    } else {
      clearInterval(decryptInterval);
      decryptionElement.textContent = decrypted;
      
      // Hold then fade out
      setTimeout(() => {
        decryptionElement.style.opacity = '0';
        setTimeout(() => {
          decryptionElement.remove();
        }, 500);
      }, 1500);
    }
  }, 100);
}

// Code flow effects for geek atmosphere
function setupCodeFlowEffects() {
  // Add floating code snippets
  const codeSnippets = [
    'const node404 = new Experiment();',
    'if (error.code === 404) { discover(); }',
    'function hackThePlanet() { /* TODO */ }',
    'console.log("404 to genesis");',
    'git commit -m "not found -> discovery"',
    'npm install curiosity --save-dev',
    'while(true) { learn(); innovate(); }',
    'class QuantumNode extends Reality {}',
    'const future = await Promise.resolve(innovation);',
    'if (impossible) { makeItPossible(); }'
  ];
  
  // Create floating code elements
  codeSnippets.forEach((snippet, index) => {
    setTimeout(() => {
      createFloatingCode(snippet, index);
    }, index * 3000);
  });
  
  // Add code rain effect
  setupCodeRain();
}

function createFloatingCode(code, index) {
  const element = document.createElement('div');
  element.className = 'floating-code';
  element.textContent = code;
  element.style.cssText = `
    position: fixed;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: #000;
    opacity: 0;
    z-index: 100;
    pointer-events: none;
    background: rgba(255,255,255,0.9);
    padding: 8px 12px;
    border: 1px solid #000;
    border-radius: 0;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    max-width: 300px;
    word-break: break-all;
  `;
  
  // Random position
  const startX = Math.random() * (window.innerWidth - 300);
  const startY = Math.random() * (window.innerHeight - 100);
  element.style.left = startX + 'px';
  element.style.top = startY + 'px';
  
  document.body.appendChild(element);
  
  // Animate
  setTimeout(() => {
    element.style.transition = 'all 4s ease-in-out';
    element.style.opacity = '0.7';
    element.style.transform = 'translateY(-20px) rotate(' + (Math.random() * 10 - 5) + 'deg)';
    
    setTimeout(() => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(-40px) rotate(' + (Math.random() * 20 - 10) + 'deg)';
      
      setTimeout(() => {
        element.remove();
      }, 2000);
    }, 2000);
  }, 100);
}

function setupCodeRain() {
  const codeRainInterval = setInterval(() => {
    if (Math.random() < 0.3) { // 30% chance
      createCodeRainDrop();
    }
  }, 2000);
}

function createCodeRainDrop() {
  const codeCommands = [
    'git push origin main',
    'npm run dev',
    'node server.js',
    'curl -X POST api.node404.com',
    'ssh node@404.lab',
    'docker run -d node404',
    'make deploy',
    'yarn install',
    'python hack.py',
    'rsync -avz ./'
  ];
  
  const element = document.createElement('div');
  element.className = 'code-rain-drop';
  element.textContent = codeCommands[Math.floor(Math.random() * codeCommands.length)];
  element.style.cssText = `
    position: fixed;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #000;
    opacity: 0;
    z-index: 50;
    pointer-events: none;
    background: rgba(0,0,0,0.05);
    padding: 4px 8px;
    border-left: 2px solid #000;
    white-space: nowrap;
  `;
  
  const startX = Math.random() * window.innerWidth;
  element.style.left = startX + 'px';
  element.style.top = '-50px';
  
  document.body.appendChild(element);
  
  // Animate falling
  setTimeout(() => {
    element.style.transition = 'all 3s linear';
    element.style.opacity = '0.6';
    element.style.top = (window.innerHeight + 50) + 'px';
    
    setTimeout(() => {
      element.remove();
    }, 3000);
  }, 100);
}

// Mysterious heartbeat pulse for atmosphere
function startMysteriousHeartbeat() {
  const heartbeatInterval = setInterval(() => {
    // Random chance to trigger heartbeat
    if (Math.random() < 0.1) { // 10% chance
      document.body.style.filter = 'brightness(1.1) contrast(1.1)';
      document.body.style.transition = 'filter 0.2s ease-in-out';
      
      setTimeout(() => {
        document.body.style.filter = 'brightness(0.95) contrast(1.05)';
        
        setTimeout(() => {
          document.body.style.filter = '';
          document.body.style.transition = '';
        }, 200);
      }, 200);
      
      // Add mysterious sound effect (visual only)
      const pulseIndicator = document.createElement('div');
      pulseIndicator.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 4px;
        height: 4px;
        background: #000;
        border-radius: 50%;
        opacity: 0;
        animation: pulse-indicator 1s ease-out;
        z-index: 1000;
      `;
      document.body.appendChild(pulseIndicator);
      
      setTimeout(() => {
        pulseIndicator.remove();
      }, 1000);
      
      // Add CSS for pulse indicator
      if (!document.querySelector('#pulse-indicator-style')) {
        const style = document.createElement('style');
        style.id = 'pulse-indicator-style';
        style.textContent = `
          @keyframes pulse-indicator {
            0% { opacity: 0; transform: scale(1); }
            50% { opacity: 1; transform: scale(3); }
            100% { opacity: 0; transform: scale(5); }
          }
        `;
        document.head.appendChild(style);
      }
    }
  }, 10000); // Check every 10 seconds
}