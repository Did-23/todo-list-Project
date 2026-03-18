const input = document.querySelector('#todo-input')
const addBtn = document.querySelector('#todo-btn')
const todoCount = document.querySelector('#todo-count')
const deleteAllBtn = document.querySelector('#delete-all')
const todoList = document.querySelector('#todo-list')

const tasks = []

function addTask() {
	const inputText = input.value
	if (inputText.trim().length === 0) {
		return
	}

	const objTasks = {
		id: Date.now(),
		text: inputText,
		completed: false,
	}

	tasks.push(objTasks)
	input.value = ''

	renderTasks()
}

function renderTasks() {
	todoList.innerHTML = ''

	for (const task of tasks) {
		const li = document.createElement('li')
		const deleteButton = document.createElement('button')
		const checkbox = document.createElement('input')
		const span = document.createElement('span')

		li.classList.add('todo__item')
		span.classList.add('todo__span')
		checkbox.classList.add('todo__checkbox')

		deleteButton.textContent = 'Удалить'
		deleteButton.classList.add('todo__delete-btn')

		// data-id для кнопки - чтобы найти задачу по id и удалить из массива
		deleteButton.dataset.id = task.id

		// checkbox

		checkbox.type = 'checkbox'

		// span
		span.textContent = task.text
		// Добавляем элементы
		li.append(checkbox, span, deleteButton)
		todoList.appendChild(li)

		// Обработчик удаление задачи

		deleteButton.addEventListener('click', () => {
			// находим индекс задачи по id
			for (let i = 0; i < tasks.length; i++) {
				if (tasks[i].id === Number(deleteButton.dataset.id)) {
					// удаляем из массива tasks
					tasks.splice(i, 1)
					break
				}
			}
			// вызываем renderTasks() снова
			renderTasks()
		})

		if (task.completed) {
			checkbox.checked = true
			span.classList.add('todo__completed')
		}
		// Обработчик выполнения задачи

		checkbox.addEventListener('click', () => {
			task.completed = checkbox.checked
			renderTasks()
		})
	}

	// Счетчик задач
	todoCount.textContent = `Total Tasks: ${tasks.length}`
}

// Обработчик добавление задачи
addBtn.addEventListener('click', addTask)

// Обработчик удаление всего задач
deleteAllBtn.addEventListener('click', () => {
	tasks.length = 0 // очищаем массив
	renderTasks()
})
