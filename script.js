document.getElementById('send-request').addEventListener('click', async () => {
    const baseUrl = document.getElementById('base-url').value.trim();
    const endpoint = document.getElementById('endpoint').value.trim();
    const method = document.getElementById('method').value;
    const headersInput = document.getElementById('headers').value.trim();
    const bodyInput = document.getElementById('body').value.trim();

    if (!baseUrl || !endpoint) {
        alert('Por favor, preencha a URL base e o endpoint.');
        return;
    }

    try {
        const headers = JSON.parse(headersInput || '{}');
        const body = bodyInput ? JSON.parse(bodyInput) : null;

        const options = {
            method: method,
            headers: headers,
            body: (method === 'POST' || method === 'PUT') && body ? JSON.stringify(body) : undefined,
        };

        console.log('Fazendo requisição...', baseUrl + endpoint);  // Log de debug

        const response = await fetch(baseUrl + endpoint, options);

        // Checando se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

        let responseData;

        // Tenta converter o corpo da resposta para JSON, se possível
        try {
            responseData = await response.json();
        } catch (error) {
            // Caso a resposta não seja JSON, apenas retorna o texto
            responseData = await response.text();
        }

        document.getElementById('response-output').textContent = JSON.stringify(responseData, null, 2);
    } catch (error) {
        console.error('Erro ao enviar requisição:', error);
        document.getElementById('response-output').textContent = `Erro: ${error.message}`;
    }
});
