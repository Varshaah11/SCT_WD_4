// DoBuddy - Enhanced Task Management System with Advanced Features
class DoBuddyManager {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.currentListFilter = 'all';
        this.currentView = 'grid';
        this.editingTaskId = null;
        this.sessionsCompleted = 0;
        this.totalFocusTime = 0; // in minutes
        this.streakDays = this.getStreakDays();
        this.timer = {
            isRunning: false,
            currentTime: 25 * 60, // 25 minutes in seconds
            mode: 'focus',
            interval: null,
            modes: {
                focus: 25 * 60,
                short: 5 * 60,
                long: 15 * 60
            }
        };
        this.motivationalQuotes = [
            "The journey of a thousand tasks begins with a single click. 🚀",
            "Progress, not perfection, is the goal. 🎯",
            "Your future self will thank you for starting today. ⭐",
            "Small steps daily lead to big achievements yearly. 📈",
            "Focus on what you can control, let go of what you can't. 🧘‍♂️",
            "Every completed task is a victory worth celebrating. 🎉",
            "Productivity isn't about doing more, it's about doing what matters. 💡",
            "The best time to plant a tree was 20 years ago. The second best time is now. 🌱",
            "You don't have to be great to get started, but you have to get started to be great. ✨",
            "Success is the sum of small efforts repeated day in and day out. 🔄",
            "Your only limit is your mind. Break through it. 🧠",
            "Great things never come from comfort zones. 🦋",
            "Dream it. Plan it. Execute it. Achieve it. 🎪",
            "The future belongs to those who prepare for it today. 🔮",
            "Consistency beats perfection every single time. ⚡"
        ];
        this.achievements = {
            firstTask: false,
            streak7: false,
            pomodoro10: false,
            completionist: false
        };
        this.init();
    }

    init() {
        this.loadTasks();
        this.bindEvents();
        this.render();
        this.updateStats();
        this.updateQuickStats();
        this.startQuoteRotation();
        this.initializeTimer();
        this.setTodayDate();
        this.startAutoSave();
        this.initializeAnimations();
        this.loadSessionStats();
    }

    // Enhanced task loading with better sample data
    loadTasks() {
        if (this.tasks.length === 0) {
            const now = new Date();
            const today = now.toISOString().split('T')[0];
            const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            
            this.tasks = [
                {
                    id: this.generateId(),
                    text: "🎉 Welcome to DoBuddy! Your intelligent task companion is ready to boost your productivity",
                    list: "personal",
                    priority: "medium",
                    completed: false,
                    createdAt: new Date(),
                    date: today,
                    time: "09:00"
                },
                {
                    id: this.generateId(),
                    text: "📖 Explore all the features - filters, categories, timer, and more!",
                    list: "learning",
                    priority: "high",
                    completed: false,
                    createdAt: new Date(now.getTime() - 5 * 60 * 1000),
                    date: today,
                    time: "10:30"
                },
                {
                    id: this.generateId(),
                    text: "🍅 Try the Pomodoro timer for focused work sessions",
                    list: "work",
                    priority: "medium",
                    completed: false,
                    createdAt: new Date(now.getTime() - 10 * 60 * 1000),
                    date: tomorrow,
                    time: "14:00"
                }
            ];
        }
    }

    // Generate unique ID for tasks
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Enhanced task saving with statistics
    saveTasks() {
        // In artifacts, we simulate saving - in a real app this would use localStorage
        console.log('💾 Tasks saved to memory:', this.tasks.length, 'tasks');
        this.updateSessionStats();
    }

    // Load session statistics
    loadSessionStats() {
        // Simulate loading from storage
        this.sessionsCompleted = 0;
        this.totalFocusTime = 0;
        this.updateTimerStats();
    }

    // Update session statistics
    updateSessionStats() {
        // In a real app, this would save to localStorage
        this.updateTimerStats();
    }

    // Enhanced event binding with more interactions
    bindEvents() {
        // Task form with enhanced validation
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        // Edit form
        document.getElementById('editTaskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEditedTask();
        });

        // Enhanced filter buttons with animations
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.closest('.filter-btn').dataset.filter);
                this.addRippleEffect(e.target.closest('.filter-btn'));
            });
        });

        // List filter with smooth transitions
        document.getElementById('listFilter').addEventListener('change', (e) => {
            this.setListFilter(e.target.value);
            this.showProgressIndicator();
        });

        // View controls with enhanced UX
        document.getElementById('viewGrid').addEventListener('click', () => {
            this.setView('grid');
            this.animateViewTransition();
        });

        document.getElementById('viewList').addEventListener('click', () => {
            this.setView('list');
            this.animateViewTransition();
        });

        // Action buttons with confirmations
        document.getElementById('clearCompleted').addEventListener('click', () => {
            this.clearCompleted();
        });

        document.getElementById('exportTasks').addEventListener('click', () => {
            this.exportTasks();
        });

        document.getElementById('importTasks').addEventListener('click', () => {
            document.getElementById('importFile').click();
        });

        document.getElementById('importFile').addEventListener('change', (e) => {
            this.importTasks(e);
        });

        // Modal controls
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('cancelEdit').addEventListener('click', () => {
            this.closeModal();
        });

        // Modal backdrop click
        document.querySelector('.modal-backdrop').addEventListener('click', () => {
            this.closeModal();
        });

        // Timer controls
        document.getElementById('timerStart').addEventListener('click', () => {
            this.startTimer();
        });

        document.getElementById('timerPause').addEventListener('click', () => {
            this.pauseTimer();
        });

        document.getElementById('timerReset').addEventListener('click', () => {
            this.resetTimer();
        });

        // Timer modes
        document.querySelectorAll('.timer-mode').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setTimerMode(e.target.dataset.mode);
            });
        });

        // Enhanced input focus effects
        document.getElementById('taskInput').addEventListener('focus', () => {
            this.addInputAnimation(document.getElementById('taskInput'));
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // Prevent form submission on enter in edit modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    // Add task with enhanced validation and animations
    addTask() {
        const taskInput = document.getElementById('taskInput');
        const listSelect = document.getElementById('listSelect');
        const prioritySelect = document.getElementById('prioritySelect');
        const taskDate = document.getElementById('taskDate');
        const taskTime = document.getElementById('taskTime');

        const text = taskInput.value.trim();
        if (!text) {
            this.showToast('Please enter a task description', 'warning');
            this.shakeElement(taskInput);
            return;
        }

        if (text.length > 200) {
            this.showToast('Task description is too long (max 200 characters)', 'error');
            return;
        }

        const task = {
            id: this.generateId(),
            text,
            list: listSelect.value,
            priority: prioritySelect.value,
            completed: false,
            createdAt: new Date(),
            date: taskDate.value || null,
            time: taskTime.value || null
        };

        this.tasks.push(task);
        this.saveTasks();
        this.render();
        this.updateStats();
        this.updateQuickStats();

        // Reset form with animation
        taskInput.value = '';
        taskDate.value = '';
        taskTime.value = '';
        
        this.addFormResetAnimation();
        this.showToast('Task added successfully! 🎉', 'success');
        
        // Check achievements
        this.checkAchievements();

        // Focus back to input for quick entry
        setTimeout(() => taskInput.focus(), 300);
    }

    // Enhanced task editing with better UX
    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        this.editingTaskId = id;
        
        // Populate edit form
        document.getElementById('editTaskText').value = task.text;
        document.getElementById('editTaskList').value = task.list;
        document.getElementById('editTaskPriority').value = task.priority;
        document.getElementById('editTaskDate').value = task.date || '';
        document.getElementById('editTaskTime').value = task.time || '';

        // Show modal with animation
        this.showModal();
    }

    // Save edited task with validation
    saveEditedTask() {
        if (!this.editingTaskId) return;

        const task = this.tasks.find(t => t.id === this.editingTaskId);
        if (!task) return;

        const text = document.getElementById('editTaskText').value.trim();
        if (!text) {
            this.showToast('Task description cannot be empty', 'error');
            return;
        }

        if (text.length > 200) {
            this.showToast('Task description is too long (max 200 characters)', 'error');
            return;
        }

        // Update task
        task.text = text;
        task.list = document.getElementById('editTaskList').value;
        task.priority = document.getElementById('editTaskPriority').value;
        task.date = document.getElementById('editTaskDate').value || null;
        task.time = document.getElementById('editTaskTime').value || null;
        task.updatedAt = new Date();

        this.saveTasks();
        this.render();
        this.updateStats();
        this.closeModal();
        
        this.showToast('Task updated successfully! ✏️', 'success');
    }

    // Delete task with confirmation and animation
    deleteTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        // Simple confirmation
        if (confirm(`Are you sure you want to delete "${task.text.substring(0, 50)}${task.text.length > 50 ? '...' : ''}"?`)) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveTasks();
            this.render();
            this.updateStats();
            this.updateQuickStats();
            
            this.showToast('Task deleted successfully', 'info');
        }
    }

    // Toggle task completion with celebration
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        const wasCompleted = task.completed;
        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date() : null;

        this.saveTasks();
        this.render();
        this.updateStats();
        this.updateQuickStats();

        if (task.completed && !wasCompleted) {
            this.showCompletionCelebration();
            this.showToast('Great job! Task completed! 🎉', 'success');
            this.checkAchievements();
        } else if (!task.completed && wasCompleted) {
            this.showToast('Task marked as incomplete', 'info');
        }
    }

    // Enhanced filtering with smooth transitions
    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active state
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        // Animate filter change
        this.animateFilterChange();
        this.render();
        
        // Update URL without page reload (in a real app)
        console.log(`Filter changed to: ${filter}`);
    }

    // Set list filter
    setListFilter(listFilter) {
        this.currentListFilter = listFilter;
        this.render();
    }

    // Set view mode with animation
    setView(view) {
        this.currentView = view;
        
        // Update active state
        document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(view === 'grid' ? 'viewGrid' : 'viewList').classList.add('active');
        
        // Apply view class
        const container = document.getElementById('tasksList');
        container.classList.toggle('list-view', view === 'list');
        
        this.showToast(`Switched to ${view} view`, 'info');
    }

    // Enhanced rendering with smooth animations
    render() {
        const container = document.getElementById('tasksList');
        const emptyState = document.getElementById('emptyState');
        
        // Get filtered tasks
        const filteredTasks = this.getFilteredTasks();
        
        if (filteredTasks.length === 0) {
            container.innerHTML = '';
            emptyState.classList.remove('hidden');
            return;
        }

        emptyState.classList.add('hidden');
        
        // Sort tasks by priority and date
        const sortedTasks = this.sortTasks(filteredTasks);
        
        container.innerHTML = sortedTasks.map(task => this.createTaskHTML(task)).join('');
        
        // Add event listeners to new elements
        this.bindTaskEvents();
        
        // Animate task entries
        this.animateTaskEntries();
    }

    // Get filtered tasks based on current filters
    getFilteredTasks() {
        let filtered = [...this.tasks];

        // Apply status filter
        switch (this.currentFilter) {
            case 'pending':
                filtered = filtered.filter(task => !task.completed);
                break;
            case 'completed':
                filtered = filtered.filter(task => task.completed);
                break;
            case 'overdue':
                const now = new Date();
                filtered = filtered.filter(task => {
                    if (!task.date || task.completed) return false;
                    const taskDate = new Date(task.date + 'T' + (task.time || '23:59'));
                    return taskDate < now;
                });
                break;
            case 'today':
                const today = new Date().toISOString().split('T')[0];
                filtered = filtered.filter(task => task.date === today);
                break;
            default:
                // 'all' - no additional filtering
                break;
        }

        // Apply list filter
        if (this.currentListFilter !== 'all') {
            filtered = filtered.filter(task => task.list === this.currentListFilter);
        }

        return filtered;
    }

    // Sort tasks intelligently
    sortTasks(tasks) {
        return tasks.sort((a, b) => {
            // Completed tasks go to bottom
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }

            // Priority order: critical > high > medium > low
            const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
            const priorityDiff = (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
            if (priorityDiff !== 0) return priorityDiff;

            // Then by date (closer dates first)
            if (a.date && b.date) {
                const dateA = new Date(a.date + 'T' + (a.time || '00:00'));
                const dateB = new Date(b.date + 'T' + (b.time || '00:00'));
                return dateA - dateB;
            }

            if (a.date && !b.date) return -1;
            if (!a.date && b.date) return 1;

            // Finally by creation date (newest first)
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
    }

    // Create enhanced task HTML with better UI
    createTaskHTML(task) {
        const isOverdue = this.isTaskOverdue(task);
        const isToday = this.isTaskToday(task);
        const timeAgo = this.getTimeAgo(task.createdAt);
        
        const priorityEmojis = {
            low: '🌱',
            medium: '🌿',
            high: '🔥',
            critical: '⚡'
        };

        const listEmojis = {
            personal: '🏠',
            work: '💼',
            health: '🏃‍♂️',
            learning: '📚',
            creative: '🎨',
            urgent: '⚡'
        };

        const dueDateDisplay = task.date ? this.formatTaskDate(task) : '';
        const overdueClass = isOverdue ? 'overdue' : '';
        const completedClass = task.completed ? 'completed' : '';
        const priorityClass = task.priority === 'critical' ? 'critical-priority' : 
                              task.priority === 'high' ? 'high-priority' : '';

        return `
            <div class="task-item ${completedClass} ${overdueClass} ${priorityClass}" data-id="${task.id}">
                <div class="task-header">
                    <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="app.toggleTask('${task.id}')"></div>
                    <div class="task-content">
                        <div class="task-text ${task.completed ? 'completed' : ''}">${task.text}</div>
                        <div class="task-meta">
                            <span class="task-category" style="border-color: ${this.getCategoryColor(task.list)}">
                                ${listEmojis[task.list]} ${task.list}
                            </span>
                            <span class="task-priority ${task.priority}">
                                ${priorityEmojis[task.priority]} ${task.priority}
                            </span>
                            ${isOverdue ? '<span class="overdue-badge">⚠️ Overdue</span>' : ''}
                            ${isToday ? '<span class="today-badge">📅 Today</span>' : ''}
                            ${dueDateDisplay ? `<span class="task-datetime">📅 ${dueDateDisplay}</span>` : ''}
                        </div>
                    </div>
                </div>
                <div class="task-actions">
                    <span class="task-time-ago">${timeAgo}</span>
                    <div class="task-buttons">
                        <button class="task-btn edit" onclick="app.editTask('${task.id}')" title="Edit task">
                            ✏️
                        </button>
                        <button class="task-btn delete" onclick="app.deleteTask('${task.id}')" title="Delete task">
                            🗑️
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Bind events to task elements
    bindTaskEvents() {
        // Events are handled through onclick attributes for simplicity
        // In a production app, you'd use event delegation
    }

    // Get category color for theming
    getCategoryColor(category) {
        const colors = {
            personal: 'rgba(59, 130, 246, 0.3)',
            work: 'rgba(16, 185, 129, 0.3)',
            health: 'rgba(245, 158, 11, 0.3)',
            learning: 'rgba(139, 92, 246, 0.3)',
            creative: 'rgba(236, 72, 153, 0.3)',
            urgent: 'rgba(239, 68, 68, 0.3)'
        };
        return colors[category] || 'rgba(255, 255, 255, 0.3)';
    }

    // Check if task is overdue
    isTaskOverdue(task) {
        if (!task.date || task.completed) return false;
        const now = new Date();
        const taskDate = new Date(task.date + 'T' + (task.time || '23:59'));
        return taskDate < now;
    }

    // Check if task is today
    isTaskToday(task) {
        if (!task.date) return false;
        const today = new Date().toISOString().split('T')[0];
        return task.date === today;
    }

    // Format task date for display
    formatTaskDate(task) {
        if (!task.date) return '';
        
        const date = new Date(task.date);
        const today = new Date();
        const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        
        let dateStr = '';
        if (task.date === today.toISOString().split('T')[0]) {
            dateStr = 'Today';
        } else if (task.date === tomorrow.toISOString().split('T')[0]) {
            dateStr = 'Tomorrow';
        } else {
            dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
        
        if (task.time) {
            const time = new Date('2000-01-01T' + task.time);
            dateStr += ' at ' + time.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
            });
        }
        
        return dateStr;
    }

    // Get human-readable time ago
    getTimeAgo(date) {
        const now = new Date();
        const diffMs = now - new Date(date);
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMins < 1) return 'just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return new Date(date).toLocaleDateString();
    }

    // Update comprehensive statistics
    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;
        const productivity = total > 0 ? Math.round((completed / total) * 100) : 0;

        // Update stat numbers with animations
        this.animateNumber('totalTasks', total);
        this.animateNumber('completedTasks', completed);
        this.animateNumber('pendingTasks', pending);
        this.animateNumber('productivityScore', productivity, '%');

        // Update progress bars
        this.updateProgressBar('completedBar', total > 0 ? (completed / total) * 100 : 0);
        this.updateProgressBar('pendingBar', total > 0 ? (pending / total) * 100 : 0);
        this.updateProgressBar('productivityBar', productivity);
    }

    // Update quick statistics
    updateQuickStats() {
        // Streak days
        document.getElementById('streakDays').textContent = this.streakDays;

        // Today's tasks
        const today = new Date().toISOString().split('T')[0];
        const todayTasks = this.tasks.filter(task => task.date === today).length;
        document.getElementById('todayTasks').textContent = todayTasks;

        // Weekly goal (example: complete 70% of tasks)
        const weeklyGoal = this.calculateWeeklyGoal();
        document.getElementById('weeklyGoal').textContent = weeklyGoal + '%';
    }

    // Calculate weekly goal progress
    calculateWeeklyGoal() {
        const now = new Date();
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
        weekStart.setHours(0, 0, 0, 0);
        
        const weekTasks = this.tasks.filter(task => {
            const taskDate = new Date(task.createdAt);
            return taskDate >= weekStart;
        });
        
        if (weekTasks.length === 0) return 0;
        
        const completedWeekTasks = weekTasks.filter(task => task.completed).length;
        return Math.round((completedWeekTasks / weekTasks.length) * 100);
    }

    // Animate numbers with smooth counting
    animateNumber(elementId, targetValue, suffix = '') {
        const element = document.getElementById(elementId);
        const currentValue = parseInt(element.textContent) || 0;
        const increment = targetValue > currentValue ? 1 : -1;
        const step = Math.abs(targetValue - currentValue) / 20; // 20 steps
        
        let current = currentValue;
        const timer = setInterval(() => {
            current += increment * Math.max(1, Math.round(step));
            
            if ((increment > 0 && current >= targetValue) || 
                (increment < 0 && current <= targetValue)) {
                current = targetValue;
                clearInterval(timer);
            }
            
            element.textContent = current + suffix;
        }, 50);
    }

    // Update progress bar with smooth animation
    updateProgressBar(barId, percentage) {
        const bar = document.getElementById(barId);
        if (bar) {
            bar.style.width = percentage + '%';
        }
    }

    // Get streak days (simulated)
    getStreakDays() {
        // In a real app, this would calculate based on actual completion history
        const completedToday = this.tasks.some(task => 
            task.completed && 
            task.completedAt &&
            new Date(task.completedAt).toDateString() === new Date().toDateString()
        );
        return completedToday ? Math.floor(Math.random() * 7) + 1 : 0;
    }

    // Clear completed tasks with confirmation
    clearCompleted() {
        const completedTasks = this.tasks.filter(t => t.completed);
        
        if (completedTasks.length === 0) {
            this.showToast('No completed tasks to clear', 'info');
            return;
        }

        if (confirm(`Are you sure you want to delete ${completedTasks.length} completed task(s)?`)) {
            this.tasks = this.tasks.filter(t => !t.completed);
            this.saveTasks();
            this.render();
            this.updateStats();
            this.updateQuickStats();
            
            this.showToast(`Cleared ${completedTasks.length} completed tasks`, 'success');
        }
    }

    // Export tasks to JSON
    exportTasks() {
        const data = {
            tasks: this.tasks,
            exported: new Date().toISOString(),
            version: '1.0'
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `dobuddy-tasks-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast('Tasks exported successfully! 📤', 'success');
    }

    // Import tasks from JSON
    importTasks(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (!data.tasks || !Array.isArray(data.tasks)) {
                    throw new Error('Invalid file format');
                }

                // Validate and import tasks
                const importedTasks = data.tasks.map(task => ({
                    ...task,
                    id: this.generateId(), // Generate new IDs to avoid conflicts
                    createdAt: new Date(task.createdAt),
                    completedAt: task.completedAt ? new Date(task.completedAt) : null,
                    updatedAt: task.updatedAt ? new Date(task.updatedAt) : null
                }));

                this.tasks = [...this.tasks, ...importedTasks];
                this.saveTasks();
                this.render();
                this.updateStats();
                this.updateQuickStats();
                
                this.showToast(`Imported ${importedTasks.length} tasks successfully! 📥`, 'success');
            } catch (error) {
                this.showToast('Error importing tasks. Please check file format.', 'error');
                console.error('Import error:', error);
            }
        };
        
        reader.readAsText(file);
        event.target.value = ''; // Reset file input
    }

    // Modal management
    showModal() {
        const modal = document.getElementById('editModal');
        modal.classList.add('show');
        
        // Focus first input
        setTimeout(() => {
            document.getElementById('editTaskText').focus();
        }, 300);
    }

    closeModal() {
        const modal = document.getElementById('editModal');
        modal.classList.remove('show');
        this.editingTaskId = null;
    }

   // Timer functionality
    initializeTimer() {
        this.updateTimerDisplay();
        this.updateTimerStats();
    }

    startTimer() {
        if (this.timer.isRunning) return;

        this.timer.isRunning = true;
        document.getElementById('timerStart').disabled = true;
        document.getElementById('timerPause').disabled = false;

        // Store session start time for accurate tracking
        this.timer.sessionStartTime = Date.now();

        this.timer.interval = setInterval(() => {
            this.timer.currentTime--;
            this.updateTimerDisplay();
            this.updateTimerProgress();

            if (this.timer.currentTime <= 0) {
                this.timerComplete();
            }
        }, 1000);

        this.showToast('Timer started! Focus time begins now 🍅', 'success');
    }

    pauseTimer() {
        if (!this.timer.isRunning) return;

        this.timer.isRunning = false;
        clearInterval(this.timer.interval);
        
        document.getElementById('timerStart').disabled = false;
        document.getElementById('timerPause').disabled = true;

        this.showToast('Timer paused', 'info');
    }

    resetTimer() {
        this.timer.isRunning = false;
        clearInterval(this.timer.interval);
        
        this.timer.currentTime = this.timer.modes[this.timer.mode];
        this.timer.sessionStartTime = null;
        
        document.getElementById('timerStart').disabled = false;
        document.getElementById('timerPause').disabled = true;
        
        this.updateTimerDisplay();
        this.updateTimerProgress();
        
        this.showToast('Timer reset', 'info');
    }

    setTimerMode(mode) {
        if (this.timer.isRunning) {
            this.showToast('Stop the timer before changing modes', 'warning');
            return;
        }

        this.timer.mode = mode;
        this.timer.currentTime = this.timer.modes[mode];
        
        // Update active mode
        document.querySelectorAll('.timer-mode').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
        
        this.updateTimerDisplay();
        this.updateTimerProgress();
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timer.currentTime / 60);
        const seconds = this.timer.currentTime % 60;
        const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        document.getElementById('timerDisplay').textContent = display;
        
        // Update page title if timer is running
        if (this.timer.isRunning) {
            document.title = `${display} - DoBuddy Focus`;
        } else {
            document.title = 'DoBuddy - Your Task Companion';
        }
    }

    updateTimerProgress() {
        const totalTime = this.timer.modes[this.timer.mode];
        const progress = ((totalTime - this.timer.currentTime) / totalTime) * 360;
        
        const progressElement = document.querySelector('.timer-progress');
        progressElement.style.background = `conic-gradient(var(--primary) ${progress}deg, transparent ${progress}deg)`;
        
        // Add urgent styling when less than 5 minutes remain
        const timerTime = document.getElementById('timerDisplay');
        if (this.timer.currentTime <= 300 && this.timer.isRunning) {
            timerTime.style.animation = 'timer-urgent 1s ease-in-out infinite';
        } else {
            timerTime.style.animation = 'none';
        }
    }

    timerComplete() {
        this.timer.isRunning = false;
        clearInterval(this.timer.interval);
        
        document.getElementById('timerStart').disabled = false;
        document.getElementById('timerPause').disabled = true;
        
        // Calculate actual session duration
        const sessionDurationMinutes = this.timer.modes[this.timer.mode] / 60;
        
        // Update statistics based on completed session type
        if (this.timer.mode === 'focus') {
            this.sessionsCompleted++;
            this.totalFocusTime += sessionDurationMinutes;
            this.showToast(`🎉 Focus session completed! (+${sessionDurationMinutes} minutes)`, 'success');
        } else if (this.timer.mode === 'short') {
            this.showToast('🌟 Short break completed! Ready to focus again?', 'success');
        } else if (this.timer.mode === 'long') {
            this.showToast('🏆 Long break completed! Refreshed and ready!', 'success');
        }
        
        this.updateTimerStats();
        this.updateSessionStats();
        
        // Reset timer for next session
        this.timer.currentTime = this.timer.modes[this.timer.mode];
        this.timer.sessionStartTime = null;
        this.updateTimerDisplay();
        this.updateTimerProgress();
        
        // Show completion celebration
        this.showTimerCompletionCelebration();
        
        // Play notification sound (simulated)
        this.playNotificationSound();
        
        // Auto-suggest next session type
        this.suggestNextSession();
    }

    updateTimerStats() {
        document.getElementById('sessionsCompleted').textContent = this.sessionsCompleted;
        
        const hours = Math.floor(this.totalFocusTime / 60);
        const minutes = Math.floor(this.totalFocusTime % 60);
        
        let timeDisplay;
        if (hours > 0) {
            timeDisplay = `${hours}h ${minutes}m`;
        } else {
            timeDisplay = `${minutes}m`;
        }
        
        document.getElementById('totalFocusTime').textContent = timeDisplay;
    }

    // New helper method to suggest next session type
    suggestNextSession() {
        let suggestion = '';
        let nextMode = '';
        
        if (this.timer.mode === 'focus') {
            if (this.sessionsCompleted % 4 === 0) {
                suggestion = 'Time for a long break! You\'ve earned it after 4 focus sessions.';
                nextMode = 'long';
            } else {
                suggestion = 'Great focus session! How about a short break?';
                nextMode = 'short';
            }
        } else {
            suggestion = 'Break time over! Ready for another focus session?';
            nextMode = 'focus';
        }
        
        // Auto-switch to suggested mode after 3 seconds
        setTimeout(() => {
            if (!this.timer.isRunning) {
                this.setTimerMode(nextMode);
                this.showToast(`Switched to ${nextMode} mode. ${suggestion}`, 'info');
            }
        }, 3000);
    }

    // Enhanced completion celebration
    showTimerCompletionCelebration() {
        // Create celebration effect
        const celebration = document.createElement('div');
        celebration.className = 'timer-celebration';
        celebration.innerHTML = '🎉';
        celebration.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            animation: celebrate 2s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;
        
        // Add celebration animation styles if not already present
        if (!document.getElementById('celebration-styles')) {
            const style = document.createElement('style');
            style.id = 'celebration-styles';
            style.textContent = `
                @keyframes celebrate {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
                    100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(celebration);
        setTimeout(() => celebration.remove(), 2000);
    }

    // Quote rotation system
    startQuoteRotation() {
        this.rotateQuote();
        setInterval(() => {
            this.rotateQuote();
        }, 30000); // Change every 30 seconds
    }

    rotateQuote() {
        const quoteElement = document.getElementById('zenQuote');
        if (!quoteElement) return;
        
        const randomQuote = this.motivationalQuotes[Math.floor(Math.random() * this.motivationalQuotes.length)];
        
        quoteElement.style.opacity = '0';
        setTimeout(() => {
            quoteElement.textContent = randomQuote;
            quoteElement.style.opacity = '1';
        }, 300);
    }

    // Set today's date in date input
    setTodayDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('taskDate').value = today;
    }

    // Auto-save system
    startAutoSave() {
        setInterval(() => {
            this.saveTasks();
        }, 30000); // Auto-save every 30 seconds
    }

    // Achievement system
    checkAchievements() {
        const completedCount = this.tasks.filter(t => t.completed).length;
        
        // First task achievement
        if (this.tasks.length >= 1 && !this.achievements.firstTask) {
            this.achievements.firstTask = true;
            this.showAchievement('🎉 First Task!', 'You added your first task to DoBuddy!');
        }
        
        // 7-day streak achievement
        if (this.streakDays >= 7 && !this.achievements.streak7) {
            this.achievements.streak7 = true;
            this.showAchievement('🔥 Week Warrior!', '7-day completion streak achieved!');
        }
        
        // 10 pomodoro sessions
        if (this.sessionsCompleted >= 10 && !this.achievements.pomodoro10) {
            this.achievements.pomodoro10 = true;
            this.showAchievement('🍅 Focus Master!', '10 Pomodoro sessions completed!');
        }
        
        // Complete 50 tasks
        if (completedCount >= 50 && !this.achievements.completionist) {
            this.achievements.completionist = true;
            this.showAchievement('🏆 Completionist!', '50 tasks completed - you\'re amazing!');
        }
    }

    // Animation and visual effects
    addRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.classList.add('btn-ripple');
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    addInputAnimation(input) {
        const wrapper = input.closest('.input-wrapper');
        if (wrapper) {
            const glow = wrapper.querySelector('.input-glow');
            if (glow) {
                glow.style.opacity = '1';
                setTimeout(() => {
                    glow.style.opacity = '0';
                }, 2000);
            }
        }
    }

    addFormResetAnimation() {
        const form = document.getElementById('taskForm');
        form.style.animation = 'completion-celebration 0.5s ease-in-out';
        setTimeout(() => {
            form.style.animation = 'none';
        }, 500);
    }

    shakeElement(element) {
        element.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            element.style.animation = 'none';
        }, 500);
    }

    showProgressIndicator() {
        const indicator = document.getElementById('progressIndicator');
        indicator.style.display = 'block';
        
        setTimeout(() => {
            indicator.style.display = 'none';
        }, 800);
    }

    animateViewTransition() {
        const container = document.getElementById('tasksList');
        container.style.opacity = '0.7';
        container.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            container.style.opacity = '1';
            container.style.transform = 'scale(1)';
        }, 200);
    }

    animateFilterChange() {
        const container = document.getElementById('tasksList');
        container.style.opacity = '0.8';
        
        setTimeout(() => {
            container.style.opacity = '1';
        }, 300);
    }

    animateTaskEntries() {
        const tasks = document.querySelectorAll('.task-item');
        tasks.forEach((task, index) => {
            task.style.animationDelay = `${index * 0.1}s`;
            task.style.animation = 'slideInUp 0.5s ease-out';
        });
    }

    showCompletionCelebration() {
        // Create confetti effect
        for (let i = 0; i < 20; i++) {
            this.createConfetti();
        }
        
        // Add celebration sound effect (simulated)
        this.playCompletionSound();
    }

    createConfetti() {
        const confetti = document.createElement('div');
        confetti.innerHTML = ['🎉', '🎊', '⭐', '✨', '🌟'][Math.floor(Math.random() * 5)];
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-20px';
        confetti.style.fontSize = '20px';
        confetti.style.zIndex = '10000';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = 'confetti-fall 3s ease-out';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }

    showTimerCompletionCelebration() {
        const timerContainer = document.querySelector('.pomodoro-container');
        timerContainer.style.animation = 'completion-celebration 1s ease-in-out';
        
        setTimeout(() => {
            timerContainer.style.animation = 'none';
        }, 1000);
    }

    initializeAnimations() {
        // Initialize any startup animations
        const header = document.querySelector('.header');
        header.style.animation = 'slideInUp 0.8s ease-out';
    }

    // Sound effects (simulated)
    playNotificationSound() {
        // In a real app, you would play an actual sound file
        console.log('🔔 Timer completion sound played');
    }

    playCompletionSound() {
        // In a real app, you would play an actual sound file
        console.log('🎵 Task completion sound played');
    }

    // Keyboard shortcuts
    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + Enter to add task quickly
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            if (document.activeElement.id === 'taskInput') {
                this.addTask();
            }
        }
        
        // Ctrl/Cmd + / to focus search/add input
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            document.getElementById('taskInput').focus();
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            this.closeModal();
        }
    }

    // Toast notification system
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || '📝'}</span>
            <span class="toast-message">${message}</span>
        `;
        
        const container = document.getElementById('toastContainer');
        container.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    container.removeChild(toast);
                }
            }, 300);
        }, 4000);
    }

    // Achievement notification
    showAchievement(title, description) {
        this.showToast(`${title} - ${description}`, 'success');
        
        // Add special animation or sound
        this.playCompletionSound();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new DoBuddyManager();
});

// Add some global utility functions for better UX
document.addEventListener('click', (e) => {
    // Close dropdowns when clicking outside
    if (!e.target.closest('.buddy-select')) {
        document.querySelectorAll('.buddy-select').forEach(select => {
            select.blur();
        });
    }
});

// Handle page visibility changes to pause timer when tab is not active
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.app && window.app.timer.isRunning) {
        // Optionally pause timer when tab is hidden
        console.log('Tab hidden - timer continues running');
    }
});

// Add smooth scrolling for any anchor links
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Prevent form submission on Enter key in certain inputs
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.classList.contains('buddy-select')) {
        e.preventDefault();
    }
});

// Add touch support for mobile devices
let touchStartY = 0;
document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    
    // Pull to refresh simulation (optional feature)
    if (diff < -100 && window.scrollY === 0) {
        console.log('Pull to refresh detected');
        // You could implement a refresh animation here
    }
});

// Service worker registration for PWA capabilities (commented out for artifact)
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
*/

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DoBuddyManager;
}