# Autenticação com Facebook

> ## Fluxo primário
1. Obter dados (nome, email e Facebook ID) da API do facebook
2. Consultar se existe um uusário com o email recebido acima
3. Criar uma conta para o usuário com os dados recebidos acima
4. Criar um token de acesso a partir do ID do usuário com expiração de 30 minutos
5. Retornar o token de acesso gerado

> ## Fluxo alternativo: Usuário já existe
1. Atualizar a conta do usuário com os dados recebidos do Facebook (Facebook ID e nome -só atualizar o nome caso a conta do usuário não possua um nome- )

> ## Fluxo de exceção: Token inválido ou expirado
1. Retornar um erro de autenticação
