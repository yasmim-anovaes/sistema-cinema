const btnEntrar = document.querySelector("#botao-entrar");
const btnCadastrar = document.querySelector("#boat");

const overlay = document.querySelector("#overlay");
const formEntrar = document.querySelector("#form-entrar");
const formCadastrar = document.querySelector("#form-cadastrar");

if (btnEntrar) {
  btnEntrar.addEventListener("click", () => {
    overlay.classList.remove("hidden");
    formEntrar.classList.remove("hidden");
    formCadastrar.classList.add("hidden");
  });
}

if (btnCadastrar) {
  btnCadastrar.addEventListener("click", () => {
    overlay.classList.remove("hidden");
    formCadastrar.classList.remove("hidden");
    formEntrar.classList.add("hidden");
  });
}

const btnCadastro = document.querySelector("#btn-cadastro");

if (btnCadastro) {
  btnCadastro.addEventListener("click", () => {
    const nome = document.querySelector("#cad-nome").value;
    const email = document.querySelector("#cad-email").value;
    const senha = document.querySelector("#cad-senha").value;
    const idade = document.querySelector("#cad-idade").value;
    const cpf = document.querySelector("#cad-cpf").value;

    if (!nome || !email || !senha || !idade || !cpf) {
      alert("Preencha todos os campos!");
      return;
    }

    fetch(`${baseUrl}usuarios/cadastro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha, idade, cpf })
    })
      .then(res => res.json())
      .then(data => {
        alert(data.mensagem);
        fechar();
      })
      .catch(() => alert("Erro no cadastro!"));
  });
}

const usuarioSpan = document.getElementById("usuario-logado");

document.querySelector("#btn-login").addEventListener("click", async () => {
  const email = document.querySelector("#login-email").value;
  const senha = document.querySelector("#login-senha").value;

  try {
    const res = await fetch(`${baseUrl}usuarios/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    const data = await res.json();

    if (data.login) {
      usuarioSpan.innerText = "Bem-vindo, " + data.usuario.nome;
      usuarioSpan.style.color = "red";
      fechar();
    } else {
      alert(data.mensagem || "Usuário ou senha incorretos!");
    }
  } catch (erro) {
    alert("Erro ao tentar fazer login. Verifique sua conexão.");
  }
});

const pesquisa = document.getElementById("pesquisa");

if (pesquisa) {
  pesquisa.addEventListener("keyup", () => {
    const texto = pesquisa.value.toLowerCase();
    const filmes = document.querySelectorAll(".lista-filmes li, .em-breve li");

    filmes.forEach(filme => {
      const titulo = filme.querySelector("h3").textContent.toLowerCase();
      filme.style.display = titulo.includes(texto) ? "" : "none";
    });
  });
}

// --- CONTROLE DE ABERTURA DOS FORMULÁRIOS ---
document.addEventListener('DOMContentLoaded', () => {
  const botaoAbrirFilme = document.getElementById('botao-abrir-filme');
  const overlay = document.getElementById('overlay');
  const formCadastrarFilme = document.getElementById('form-cadastrar-filme');

  if (botaoAbrirFilme) {
    botaoAbrirFilme.addEventListener('click', () => {
      overlay.classList.remove('hidden');
      formCadastrarFilme.classList.remove('hidden');

      document.querySelector("#form-entrar").classList.add("hidden");
      document.querySelector("#form-cadastrar").classList.add("hidden");
    });
  }
});

// FUNÇÃO GLOBAL PARA FECHAR OS MODAIS (ÚNICA)
function fechar() {
  document.querySelector("#overlay").classList.add("hidden");
  document.querySelector("#form-entrar").classList.add("hidden");
  document.querySelector("#form-cadastrar").classList.add("hidden");

  const formFilme = document.getElementById('form-cadastrar-filme');
  if (formFilme) {
    formFilme.classList.add('hidden');
  }
}

// --- SALVAR NOVO FILME ---
document.getElementById('btn-salvar-filme').addEventListener('click', async () => {
  const titulo = document.getElementById('filme-titulo').value;
  const link = document.getElementById('filme-link').value;
  const imagemInput = document.getElementById('filme-imagem');

  if (!titulo || !link || imagemInput.files.length === 0) {
    alert('Por favor, preencha todos os campos e selecione uma imagem.');
    return;
  }

  const formData = new FormData();
  formData.append('titulo', titulo);
  formData.append('link', link);
  formData.append('imagem', imagemInput.files[0]);

  try {
    // Ajustado para evitar o problema da barra dupla caso baseUrl termine com '/'
    const urlFinal = baseUrl.endsWith('/') ? `${baseUrl}filmes` : `${baseUrl}/filmes`;

    const resposta = await fetch(urlFinal, {
      method: 'POST',
      body: formData
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert(dados.mensagem || 'Filme adicionado com sucesso!');
      
      const urlImagemGerada = dados.imagemUrl || URL.createObjectURL(imagemInput.files[0]);
      
      adicionarFilmeNaTela(titulo, link, urlImagemGerada);
      
      document.getElementById('filme-titulo').value = '';
      document.getElementById('filme-link').value = '';
      imagemInput.value = '';

      fechar();
     
    } else {
      console.error("Erro do servidor:", dados);
      alert(dados?.mensagem || 'Erro no servidor.');
    }

  } catch (erro) {
    console.error("Erro na requisição:", erro);
    alert('Erro ao tentar conectar com o servidor.');
  }
});

// FUNÇÃO RESPONSÁVEL POR REPLICAR O HTML NA TELA
function adicionarFilmeNaTela(titulo, link, urlImagem) {
  const listaFilmes = document.querySelector('.lista-filmes');
  const novoItem = document.createElement('li');
  
  novoItem.innerHTML = `
    <figure class="imagens">
      <h3>${titulo}</h3>
      <a href="${link}"><img src="${urlImagem}" alt="Imagem do filme ${titulo}"></a>
      <figcaption></figcaption>
    </figure>
  `;

  listaFilmes.appendChild(novoItem);
}