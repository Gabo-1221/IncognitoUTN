document.getElementById('categoriaSelect').addEventListener('change', async function() {
    const categoriaId = this.value;

    // Realizar la solicitud AJAX a tu API para obtener las preguntas
    const response = await fetch(`/admin/preguntas/categoria/${categoriaId}`);
    const preguntas = await response.json();

    // Selecciona el contenedor donde se mostrarán las checkboxes
    const preguntaList = document.getElementById('preguntaList');

    // Limpia las preguntas anteriores
    preguntaList.innerHTML = '';

    // Llena el contenedor con las nuevas preguntas
    preguntas.forEach(pregunta => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `pregunta-${pregunta._id}`;
        checkbox.name = 'preguntas';
        checkbox.value = pregunta._id;

        const label = document.createElement('label');
        label.htmlFor = `pregunta-${pregunta._id}`;
        label.textContent = pregunta.nombre;

        const div = document.createElement('div');
        div.appendChild(checkbox);
        div.appendChild(label);

        preguntaList.appendChild(div);
    });
});

document.getElementById('categoriaSelectEdit').addEventListener('change', async function() {
    const categoriaId = this.value;

    // Realizar la solicitud AJAX a tu API para obtener las preguntas
    const response = await fetch(`/admin/preguntas/categoria/${categoriaId}`);
    const preguntas = await response.json();

    // Selecciona el contenedor donde se mostrarán las checkboxes
    const preguntaList = document.getElementById('preguntaList');

    // Limpia las preguntas anteriores
    preguntaList.innerHTML = '';

    // Llena el contenedor con las nuevas preguntas
    preguntas.forEach(pregunta => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `pregunta-${pregunta._id}`;
        checkbox.name = 'preguntas';
        checkbox.value = pregunta._id;

        const label = document.createElement('label');
        label.htmlFor = `pregunta-${pregunta._id}`;
        label.textContent = pregunta.nombre;

        const div = document.createElement('div');
        div.appendChild(checkbox);
        div.appendChild(label);

        preguntaList.appendChild(div);
    });
});

