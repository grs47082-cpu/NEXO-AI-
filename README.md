# NEXO AI

Painel pessoal de produtividade e organização, com interface responsiva e persistência local no navegador.

## MVP

- Dashboard com visão geral das atividades.
- Criar, editar, concluir e excluir tarefas.
- Categorias: Pessoal, Estudos e Trabalho.
- Prioridades: Baixa, Média e Alta.
- Prazo opcional por tarefa.
- Filtros por estado e prioridade.
- Persistência com `localStorage`.
- Tema claro/escuro persistido.
- Layout responsivo para celular e desktop.

## Estrutura

- `index.html` — estrutura da aplicação e componentes de interface.
- `styles.css` — identidade visual, estados, modal e responsividade.
- `app.js` — estado, CRUD, filtros, persistência e interações.

## Como executar

O projeto é um frontend estático. Abra `index.html` no navegador ou use um servidor HTTP estático durante o desenvolvimento.

Exemplo com Node.js:

```bash
npx serve .
```

Depois, abra o endereço indicado pelo servidor.

## Dados

As tarefas ficam somente no navegador do usuário usando `localStorage`. O MVP não utiliza banco de dados, API externa, chave ou serviço pago.
