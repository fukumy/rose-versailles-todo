document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    // タスク追加関数
    const addTask = () => {
        const text = todoInput.value.trim();
        if (text === "") return;

        const li = document.createElement('li');
        li.className = 'todo-item';
        
        li.innerHTML = `
            <span class="todo-text">${escapeHTML(text)}</span>
            <div class="actions">
                <button class="action-btn complete-btn" title="想いを咲かせる">🌸</button>
                <button class="action-btn delete-btn" title="記憶から消去">×</button>
            </div>
        `;

        // 完了トグル
        li.querySelector('.complete-btn').addEventListener('click', () => {
            li.classList.toggle('completed');
            const btn = li.querySelector('.complete-btn');
            if (li.classList.contains('completed')) {
                btn.textContent = '✨'; // 完了（輝き）
                btn.title = '想いは遂げられた';
            } else {
                btn.textContent = '🌸'; // 未完了
                btn.title = '想いを咲かせる';
            }
        });

        // 削除機能
        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.style.opacity = '0';
            li.style.transform = 'scale(0.9)';
            setTimeout(() => {
                li.remove();
            }, 300);
        });

        todoList.appendChild(li);
        todoInput.value = "";
        todoInput.focus();
    };

    // HTMLエスケープ（セキュリティ対策）
    const escapeHTML = (str) => {
        return str.replace(/[&<>"']/g, (match) => {
            const escape = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            };
            return escape[match];
        });
    };

    // イベントリスナー
    addBtn.addEventListener('click', addTask);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // 初期化デモタスク
    const demoTasks = ["庭園にパンジーを植える", "紫色のリボンを探す", "お茶会の招待状"];
    demoTasks.forEach(task => {
        todoInput.value = task;
        addTask();
    });
});
