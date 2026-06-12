const API = "http://localhost:3000";

let quartoSelecionado = null;

function esconderTudo() {

    document.getElementById("telaQuartos").classList.add("oculto");
    document.getElementById("telaCadastroQuarto").classList.add("oculto");
    document.getElementById("telaReservas").classList.add("oculto");
    document.getElementById("telaCadastroReserva").classList.add("oculto");

}

function mostrarQuartos() {

    esconderTudo();

    document.getElementById("telaQuartos").classList.remove("oculto");

    listarQuartos();

}

function mostrarCadastroQuarto() {

    esconderTudo();

    document.getElementById("telaCadastroQuarto").classList.remove("oculto");

}

function mostrarCadastroReserva() {

    esconderTudo();

    document.getElementById("telaCadastroReserva").classList.remove("oculto");

}

async function listarQuartos() {

    const resposta = await fetch(`${API}/quarto/listar`);

    const quartos = await resposta.json();

    const tabela = document.getElementById("listaQuartos");

    tabela.innerHTML = "";

    quartos.forEach(quarto => {

        tabela.innerHTML += `
<tr>

<td>${quarto.numero}</td>

<td>${quarto.tipo}</td>

<td>

<button onclick="verReservas(${quarto.id})">
Reservas
</button>

<button class="excluir"
onclick="excluirQuarto(${quarto.id})">
Excluir
</button>

</td>

</tr>
`;

    });

}

async function cadastrarQuarto() {

    const numero =
        document.getElementById("numero").value;

    const tipo =
        document.getElementById("tipo").value;

    await fetch(`${API}/quarto/cadastrar`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            numero,
            tipo
        })

    });

    alert("Quarto cadastrado!");

    mostrarQuartos();

}

async function excluirQuarto(id) {

    if (!confirm("Excluir quarto?"))
        return;

    await fetch(`${API}/quarto/excluir/${id}`, {

        method: "DELETE"

    });

    listarQuartos();

}

async function verReservas(id) {

    quartoSelecionado = id;

    esconderTudo();

    document.getElementById("telaReservas")
        .classList.remove("oculto");

    const resposta =
        await fetch(`${API}/reserva/quarto/${id}`);

    const reservas =
        await resposta.json();

    const tabela =
        document.getElementById("listaReservas");

    tabela.innerHTML = "";

    reservas.forEach(reserva => {

        tabela.innerHTML += `
<tr>

<td>${reserva.hospede}</td>

<td>${reserva.dataEntrada.substring(0, 10)}</td>

<td>${reserva.dataSaida.substring(0, 10)}</td>

<td>

<button
class="excluir"
onclick="excluirReserva(${reserva.id})">
Excluir
</button>

</td>

</tr>
`;

    });

}

async function cadastrarReserva() {

    const hospede =
        document.getElementById("hospede").value;

    const dataEntrada =
        document.getElementById("entrada").value;

    const dataSaida =
        document.getElementById("saida").value;

    await fetch(`${API}/reserva/cadastrar`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            hospede,
            dataEntrada,
            dataSaida,
            quartoId: quartoSelecionado

        })

    });

    alert("Reserva cadastrada!");

    verReservas(quartoSelecionado);

}

async function excluirReserva(id) {

    if (!confirm("Excluir reserva?"))
        return;

    await fetch(`${API}/reserva/excluir/${id}`, {

        method: "DELETE"

    });

    verReservas(quartoSelecionado);

}

mostrarQuartos();