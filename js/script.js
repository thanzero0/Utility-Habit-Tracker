document.addEventListener('DOMContentLoaded', () => {
    const habitInput = document.getElementById('habit-input');
    const addHabitBtn = document.getElementById('add-habit-btn');
    const habitList = document.getElementById('habit-list');
    const habitsHeader = document.getElementById('habits-header');

    // Get short day names
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    let habits = JSON.parse(localStorage.getItem('minimalistHabits')) || [];

    function saveHabits() {
        localStorage.setItem('minimalistHabits', JSON.stringify(habits));
    }

    function renderHeader() {
        habitsHeader.innerHTML = '';
        days.forEach(day => {
            const span = document.createElement('span');
            span.className = 'day-label';
            span.textContent = day;
            habitsHeader.appendChild(span);
        });
    }

    function renderHabits() {
        habitList.innerHTML = '';
        habits.forEach((habit, habitIndex) => {
            const li = document.createElement('li');
            li.className = 'habit-item';

            const nameSpan = document.createElement('span');
            nameSpan.className = 'habit-name';
            nameSpan.textContent = habit.name;
            nameSpan.title = habit.name;
            li.appendChild(nameSpan);

            const daysContainer = document.createElement('div');
            daysContainer.className = 'days-container';

            habit.days.forEach((isChecked, dayIndex) => {
                const checkboxContainer = document.createElement('div');
                checkboxContainer.style.flex = '1';
                checkboxContainer.style.display = 'flex';
                checkboxContainer.style.justifyContent = 'center';

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'day-checkbox';
                checkbox.checked = isChecked;
                checkbox.addEventListener('change', () => {
                    habits[habitIndex].days[dayIndex] = checkbox.checked;
                    saveHabits();
                });

                checkboxContainer.appendChild(checkbox);
                daysContainer.appendChild(checkboxContainer);
            });

            li.appendChild(daysContainer);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '&times;';
            deleteBtn.title = 'Delete habit';
            deleteBtn.addEventListener('click', () => {
                habits.splice(habitIndex, 1);
                saveHabits();
                renderHabits();
            });
            li.appendChild(deleteBtn);

            habitList.appendChild(li);
        });
    }

    function addHabit() {
        const name = habitInput.value.trim();
        if (name) {
            habits.push({
                name: name,
                days: [false, false, false, false, false, false, false]
            });
            saveHabits();
            renderHabits();
            habitInput.value = '';
        }
    }

    addHabitBtn.addEventListener('click', addHabit);
    habitInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addHabit();
        }
    });

    // Initial render
    renderHeader();
    renderHabits();
});
