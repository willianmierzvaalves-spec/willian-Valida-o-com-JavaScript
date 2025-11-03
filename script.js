document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleciona o formulário
    const form = document.getElementById('cadastroForm');

    // 2. Adiciona um "ouvinte" de evento para quando o formulário for submetido
    form.addEventListener('submit', function(event) {
        // Impede o envio padrão do formulário
        event.preventDefault(); 
        
        // Executa a função de validação principal
        if (validarFormulario()) {
            // Se a validação for OK, simula o sucesso
            exibirSucesso();
        }
    });

    // --------------------------------------------------------
    // FUNÇÕES DE VALIDAÇÃO
    // --------------------------------------------------------

    function validarFormulario() {
        let isValid = true; // Flag para rastrear o estado da validação
        
        // Validação do Campo Nome
        const nomeInput = document.getElementById('nome');
        if (nomeInput.value.trim().length < 3) {
            exibirErro(nomeInput, 'O nome deve ter pelo menos 3 caracteres.');
            isValid = false;
        } else {
            exibirSucessoInput(nomeInput);
        }

        // Validação do Campo Email
        const emailInput = document.getElementById('email');
        if (!validarEmailRegex(emailInput.value)) {
            exibirErro(emailInput, 'Por favor, insira um e-mail válido.');
            isValid = false;
        } else {
            exibirSucessoInput(emailInput);
        }

        return isValid;
    }

    // Função auxiliar para validar o formato do email
    function validarEmailRegex(email) {
        // Regex simples para validação de email
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        return re.test(String(email).toLowerCase());
    }

    // --------------------------------------------------------
    // FUNÇÕES DE FEEDBACK VISUAL
    // --------------------------------------------------------

    function exibirErro(input, mensagem) {
        // Encontra o elemento pai (.form-group) e a mensagem de erro (.erro-mensagem)
        const formGroup = input.parentElement;
        const small = formGroup.querySelector('.erro-mensagem');
        
        // Adiciona/Remove classes CSS para o estilo
        formGroup.classList.remove('success');
        formGroup.classList.add('error');
        
        // Exibe a mensagem de erro
        small.innerText = mensagem;
    }

    function exibirSucessoInput(input) {
        const formGroup = input.parentElement;
        const small = formGroup.querySelector('.erro-mensagem');
        
        // Adiciona/Remove classes CSS para o estilo
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        
        // Limpa a mensagem de erro
        small.innerText = '';
    }

    function exibirSucesso() {
        const mensagemSucesso = document.getElementById('sucesso-mensagem');
        // Exibe a mensagem de sucesso do formulário
        mensagemSucesso.classList.remove('hidden');
        
        // Opcional: Limpa o formulário após 2 segundos
        setTimeout(() => {
            form.reset();
            mensagemSucesso.classList.add('hidden');
            // Remove as classes 'success' dos campos
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('success');
            });
        }, 2000);
    }

    // Opcional: Validação em tempo real ao sair do campo (evento blur)
    document.getElementById('nome').addEventListener('blur', () => validarFormulario());
    document.getElementById('email').addEventListener('blur', () => validarFormulario());
});