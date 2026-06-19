const btnEntrar = document.querySelector("#botao-entrar");

console.log("CINEMA JS CARREGOU");
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

fetch(`${baseUrl}usuarios/cadastro`, {
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

document.querySelector("#btn-login").addEventListener("click", async () => {
  console.log("CLICK LOGIN FRONT");

  const email = document.querySelector("#login-email").value;
  const senha = document.querySelector("#login-senha").value;

  const res = await fetch("https://sistema-cinema.onrender.com/usuarios/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      senha
    })
  });

  console.log("STATUS:", res.status);

  const data = await res.json();
  console.log("RESPOSTA:", data);

  if (data.login) {
    alert("Login ok!");
  } else {
    alert("Email ou senha incorretos!");
  }
});
const btnComprar = document.getElementById("btnComprar");

if (btnComprar) {

    btnComprar.addEventListener("click", async () => {

        try {

            const resposta = await fetch(
                `${baseUrl}filmes/comprar/1`,
                {
                    method: "PUT"
                }
            );

            const dados = await resposta.json();

            if (resposta.ok) {
                alert(
                    `${dados.mensagem}\nValor: R$ ${dados.valor}`
                );
            } else {
                alert(dados.mensagem);
            }

        } catch (erro) {
            console.error(erro);
            alert("Erro ao realizar compra.");
        }

    });

}
const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("keyup", () => {
    const texto = pesquisa.value.toLowerCase();

    const filmes = document.querySelectorAll(".lista-filmes li, .em-breve li");

    filmes.forEach(filme => {
        const titulo = filme.querySelector("h3").textContent.toLowerCase();

        if (titulo.includes(texto)) {
            filme.style.display = "";
        } else {
            filme.style.display = "none";
        }
    });
});