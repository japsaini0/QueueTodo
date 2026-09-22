(function () {
  'use strict';

  const taskForm    = document.getElementById('taskForm');
  const taskInput   = document.getElementById('taskInput');
  const taskList    = document.getElementById('taskList');
  const emptyState  = document.getElementById('emptyState');
  const queueSize   = document.getElementById('queueSize');
  const dequeueBtn  = document.getElementById('dequeueBtn');

  let queue = loadQueue();

  renderAll();

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    enqueue();
  });

  dequeueBtn.addEventListener('click', () => {
    dequeue();
  });

  function enqueue() {
    const text = taskInput.value.trim();
    if (!text) {
      shakeInput();
      return;
    }

    const task = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2),
      text: text,
      createdAt: Date.now(),
    };

    queue.push(task);
    saveQueue();
    taskInput.value = '';
    taskInput.focus();

    renderAll();
  }

  function dequeue() {
    if (queue.length === 0) return;

    const frontItem = taskList.querySelector('.task-item');
    if (!frontItem) return;

    dequeueBtn.disabled = true;

    frontItem.classList.add('dequeuing');
    frontItem.addEventListener('animationend', () => {
      queue.shift();
      saveQueue();
      renderAll();
    }, { once: true });
  }

  function renderAll() {
    renderList();
    updateStats();
  }

  function renderList() {
    taskList.innerHTML = '';

    if (queue.length === 0) {
      emptyState.classList.remove('hidden');
      return;
    }

    emptyState.classList.add('hidden');

    queue.forEach((task, index) => {
      const li = document.createElement('li');
      li.className = 'task-item';
      if (index === 0) li.classList.add('is-front');
      li.style.animationDelay = `${index * 0.04}s`;

      li.innerHTML = `
        <span class="task-position">${index + 1}</span>
        <span class="task-text">${escapeHtml(task.text)}</span>
        <span class="task-time">${timeAgo(task.createdAt)}</span>
      `;

      taskList.appendChild(li);
    });
  }

  function updateStats() {
    queueSize.textContent = queue.length;
    dequeueBtn.disabled = queue.length === 0;
  }

  function saveQueue() {
    try {
      localStorage.setItem('queuetodo_tasks', JSON.stringify(queue));
    } catch (_) {
    }
  }

  function loadQueue() {
    try {
      const raw = localStorage.getItem('queuetodo_tasks');
      return raw ? JSON.parse(raw) : [];
    } catch (_) {
      return [];
    }
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function timeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 5)    return 'just now';
    if (seconds < 60)   return `${seconds}s ago`;
    const mins = Math.floor(seconds / 60);
    if (mins < 60)      return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24)     return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  function shakeInput() {
    const wrapper = document.querySelector('.input-wrapper');
    wrapper.style.animation = 'none';
    wrapper.offsetHeight;
    wrapper.style.animation = 'shake 0.4s ease';
    wrapper.addEventListener('animationend', () => {
      wrapper.style.animation = '';
    }, { once: true });

    if (!document.getElementById('shakeStyle')) {
      const style = document.createElement('style');
      style.id = 'shakeStyle';
      style.textContent = `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  setInterval(() => {
    if (queue.length > 0) renderList();
  }, 30000);

})();
