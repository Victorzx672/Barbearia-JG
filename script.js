const horariosDisponiveis = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

document.getElementById('data').addEventListener('change', atualizarHorarios);
document.getElementById('formReserva').addEventListener('submit', fazerReserva);

function atualizarHorarios() {
    const dataSelecionada = document.getElementById('data').value;
    const selectHorario = document.getElementById('horario');
    selectHorario.innerHTML = '';

    if (!dataSelecionada) return;

    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const horariosIndisponiveis = reservas
        .filter(r => r.data === dataSelecionada)
        .map(r => r.horario);

    horariosDisponiveis.forEach(horario => {
        if (!horariosIndisponiveis.includes(horario)) {
            const option = document.createElement('option');
            option.value = horario;
            option.textContent = horario;
            selectHorario.appendChild(option);
        }
    });

    if (selectHorario.options.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'Nenhum horário disponível';
        selectHorario.appendChild(option);
    }
}

function fazerReserva(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const data = document.getElementById('data').value;
    const horario = document.getElementById('horario').value;
    const tipoCorte = document.getElementById('tipoCorte').value;
    const mensagem = document.getElementById('mensagem');

    if (!nome || !data || !horario || !tipoCorte || horario === 'Nenhum horário disponível') {
        mensagem.style.color = 'red';
        mensagem.textContent = 'Por favor, preencha todos os campos corretamente.';
        return;
    }

    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    reservas.push({ nome, data, horario, tipoCorte });
    localStorage.setItem('reservas', JSON.stringify(reservas));

    mensagem.style.color = 'green';
    mensagem.textContent = `Reserva confirmada para ${nome}, dia ${data} às ${horario} (${tipoCorte}).`;

    document.getElementById('formReserva').reset();
    atualizarHorarios();
}