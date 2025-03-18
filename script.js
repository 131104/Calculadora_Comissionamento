document.addEventListener('DOMContentLoaded', function() {
    const data = document.getElementById('data');
    const valor = document.getElementById('valor');
    const anos = document.getElementById('anos');
    const plano = document.getElementById('plano');
    const calcular = document.getElementById('calcular');
    const limpar = document.getElementById('limpar');
    const resultado = document.getElementById('resultado');

    data.value = new Date().toLocaleDateString('pt-BR');

    calcular.addEventListener('click', function() {
        try {
            const valorConta = parseFloat(valor.value);
            const anosProposta = parseInt(anos.value);
            const planoSelecionado = plano.value;

            const tabelas = {
                "Premium": {
                    "250-500": { 0: 0.10, 3: 0.10, 5: 0.10 },
                    "501-1000": { 0: 0.20, 3: 0.25, 5: 0.30 },
                    "1001-2500": { 0: 0.20, 3: 0.35, 5: 0.40 },
                    "2501-50000": { 0: 0.20, 3: 0.40, 5: 0.50 },
                },
                "Max": {
                    "250-500": { 0: 0.10, 3: 0.10, 5: 0.10 },
                    "501-1000": { 0: 0.20, 3: 0.35, 5: 0.35 },
                    "1001-2500": { 0: 0.20, 3: 0.40, 5: 0.50 },
                    "2501-5000": { 0: 0.20, 3: 0.50, 5: 0.55 },
                    "5001-50000": { 0: 0.20, 3: 0.55, 5: 0.60 },
                }
            };

            let comissao = 0;
            for (const faixa in tabelas[planoSelecionado]) {
                const [min, max] = faixa.split('-').map(Number);
                if (valorConta >= min && valorConta <= max) {
                    comissao = valorConta * (tabelas[planoSelecionado][faixa][anosProposta] || 0);
                    break;
                }
            }

            resultado.textContent = `Comissão: R$ ${comissao.toFixed(2)}`;
        } catch (error) {
            resultado.textContent = "Insira valores válidos!";
        }
    });

    limpar.addEventListener('click', function() {
        valor.value = '';
        anos.value = '0';
        plano.value = 'Premium';
        resultado.textContent = '';
    });
});