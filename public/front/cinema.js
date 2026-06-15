const btnEntrar = document.querySelector("#botao-entrar");
const btnCadastrar = document.querySelector("#boat");

const overlay = document.querySelector("#overlay");
const formEntrar = document.querySelector("#form-entrar");
const formCadastrar = document.querySelector("#form-cadastrar");

const usuarioSpan = document.querySelector("#usuario-logado");

btnEntrar.addEventListener("click", () => {
  overlay.classList.remove("hidden");
  formEntrar.classList.remove("hidden");
  formCadastrar.classList.add("hidden");
});

btnCadastrar.addEventListener("click", () => {
  overlay.classList.remove("hidden");
  formCadastrar.classList.remove("hidden");
  formEntrar.classList.add("hidden");
});

function fechar() {
  overlay.classList.add("hidden");
  formEntrar.classList.add("hidden");
  formCadastrar.classList.add("hidden");
}

document.querySelector("#btn-cadastro").addEventListener("click", () => {
  const nome = document.querySelector("#cad-nome").value;
  const email = document.querySelector("#cad-email").value;
  const senha = document.querySelector("#cad-senha").value;
  const idade = document.querySelector("#cad-idade").value;
  const cpf = document.querySelector("#cad-cpf").value;

  if (!nome || !email || !senha || !idade || !cpf) {
    alert("Preencha todos os campos!");
    return;
  }

  fetch("http://localhost:3000/usuarios/cadastro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nome,
      email,
      senha,
      idade,
      cpf
    })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.mensagem);
    fechar();
  })
  .catch(() => {
    alert("Erro no cadastro!");
  });
});

document.querySelector("#btn-login").addEventListener("click", () => {
  const email = document.querySelector("#login-nome").value;
  const senha = document.querySelector("#login-senha").value;

  if (!email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  fetch("http://localhost:3000/usuarios/cadastro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      senha
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.login) {
      usuarioSpan.textContent = "Olá, " + data.usuario.nome;
      usuarioSpan.classList.remove("hidden");
      fechar();
    } else {
      alert("Email ou senha incorretos!");
    }
  })
  .catch(() => {
    alert("Erro no login!");
  });
});