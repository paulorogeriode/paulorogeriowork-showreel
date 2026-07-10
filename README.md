# 🎨 Template de Portfólio — F&A Works

Um template de portfólio editorial, gratuito, em que **todo o conteúdo é gerenciado pelo Notion** (sem mexer em código) e o site fica hospedado de graça na Vercel.

Este guia foi escrito **passo a passo, para qualquer pessoa** — mesmo quem nunca programou. Vá com calma, faça um passo de cada vez, e ao final você terá um portfólio no ar com um endereço próprio.

> ⏱️ Tempo estimado: **30 a 60 minutos** na primeira vez.
> 💸 Custo: **R$ 0** — todas as ferramentas têm plano gratuito que dá conta de um portfólio.

---

## 📑 Índice

1. [O que você vai ter no final](#1-o-que-você-vai-ter-no-final)
2. [Antes de começar: crie as contas](#2-antes-de-começar-crie-as-contas)
3. [Visão geral (o caminho todo)](#3-visão-geral-o-caminho-todo)
4. [Passo 1 — Configurar o Notion](#4-passo-1--configurar-o-notion)
5. [Passo 2 — Configurar o Resend (e-mails do contato)](#5-passo-2--configurar-o-resend-e-mails-do-contato)
6. [Passo 3 — Pegar o código do template](#6-passo-3--pegar-o-código-do-template)
7. [Passo 4 — Publicar na Vercel](#7-passo-4--publicar-na-vercel)
8. [Passo 5 — (Opcional) Rodar no seu computador](#8-passo-5--opcional-rodar-no-seu-computador)
9. [Como adicionar e editar projetos](#9-como-adicionar-e-editar-projetos)
10. [Usar um domínio próprio](#10-usar-um-domínio-próprio)
11. [Personalização (logo, favicon e crédito)](#11-personalização-logo-favicon-e-crédito)
12. [Solução de problemas (FAQ)](#12-solução-de-problemas-faq)
13. [Anexo — Estrutura completa dos bancos do Notion](#13-anexo--estrutura-completa-dos-bancos-do-notion)

---

## 1. O que você vai ter no final

- Um **portfólio no ar**, rápido e responsivo, com um endereço tipo `https://seunome.vercel.app` (ou seu domínio próprio).
- Uma página de **projetos** (grid), páginas individuais de cada **projeto**, uma página de **bio** e um **formulário de contato** que envia mensagens para o seu e-mail.
- Controle total do conteúdo **pelo Notion**: adicionar um projeto novo é criar uma linha numa tabela — o site se atualiza sozinho.

---

## 2. Antes de começar: crie as contas

Crie estas contas (todas gratuitas). Pode usar o login com Google em todas para ir mais rápido.

| Conta | Para quê | Link |
|---|---|---|
| **GitHub** | Guardar o código do seu site | <https://github.com/signup> |
| **Notion** | Gerenciar o conteúdo (projetos, bio) | <https://notion.so/signup> |
| **Vercel** | Hospedar o site (colocar no ar) | <https://vercel.com/signup> |
| **Resend** | Enviar os e-mails do formulário de contato | <https://resend.com/signup> |

> 💡 Dica: ao criar a conta da **Vercel**, escolha "Continue with GitHub". Isso já conecta as duas e facilita o deploy.

---

## 3. Visão geral (o caminho todo)

Você vai fazer, nesta ordem:

```
Notion (conteúdo)  →  Resend (e-mails)  →  GitHub (código)  →  Vercel (no ar)
   token + bancos        chave de API       cópia do template     colar variáveis
```

No fim, você junta tudo numa lista de **variáveis de ambiente** (uma espécie de "configuração secreta") e cola na Vercel. É isso que conecta o site ao seu Notion e ao seu Resend.

Vá anotando os valores num bloco de notas conforme avança — você vai precisar deles no Passo 4. No final você terá algo assim:

```
NOTION_TOKEN=ntn_xxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SITE_NAME=Seu Nome
...
```

### ⚡ Atalho (botão de deploy)

Já fez os **Passos 1 e 2** (Notion e Resend) e tem os valores anotados? Então o botão abaixo faz os **Passos 3 e 4 de uma vez**: ele copia o template para o seu GitHub e abre a tela da Vercel já pedindo as variáveis.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<<COLE_AQUI_A_URL_DO_REPO>>&env=NOTION_TOKEN,NOTION_DATABASE_ID,NOTION_BIO_PAGE_ID,NEXT_PUBLIC_SITE_NAME,NEXT_PUBLIC_SITE_ROLE,NEXT_PUBLIC_SITE_CITY,NEXT_PUBLIC_SITE_URL,NEXT_PUBLIC_CONTACT_EMAIL)

> Prefere ir com calma e entender cada parte? Siga os passos numerados abaixo — eles cobrem exatamente o mesmo, em detalhe.

---

## 4. Passo 1 — Configurar o Notion

O site lê o conteúdo de **bancos de dados (tabelas) do Notion**. São até 5 bancos:

| Banco | Obrigatório? | Para quê |
|---|---|---|
| **Projetos** | ✅ Sim | O grid principal do portfólio |
| **Bio** | ✅ Sim (para a página /bio) | Seu texto, foto e habilidades |
| **Experiência** | ⬜ Opcional | Histórico profissional na bio |
| **Projetos relevantes** | ⬜ Opcional | Destaques na bio |
| **Clientes** | ⬜ Opcional | Lista de clientes na bio |

Você tem **dois caminhos** para criar esses bancos:

### Caminho A (recomendado): duplicar o modelo pronto

1. Abra o modelo de Notion: **[Modelo de portfólio (Notion)](https://statuesque-tulip-560.notion.site/Db_Felipe_Template_Folio-37d21b31c720806284b5f26a811408b4?pvs=74)**
2. Clique em **"Duplicar"** (canto superior direito). Os bancos vão para o seu Notion já com as colunas certas.
3. Pule para o item **4.1 (criar a integração)** abaixo.

> Se o link acima ainda não estiver disponível, use o **Caminho B**.

### Caminho B: criar os bancos manualmente

Crie cada banco com **exatamente** as colunas listadas no [Anexo (seção 12)](#12-anexo--estrutura-completa-dos-bancos-do-notion). ⚠️ **Os nomes das colunas diferenciam maiúsculas de minúsculas** — `Name` é diferente de `name`. Copie igualzinho.

### 4.1 Criar a integração e pegar o token

A "integração" é o que dá ao site permissão de ler o seu Notion.

1. Acesse <https://www.notion.so/my-integrations> e clique em **"New integration"**.
2. Dê um nome (ex.: `Meu Portfólio`), escolha o seu workspace e clique em **Save**.
3. Em **"Configuration"**, copie o **Internal Integration Secret** (começa com `ntn_` ou `secret_`).
   → Esse é o seu **`NOTION_TOKEN`**. Guarde no bloco de notas.

### 4.2 Dar acesso dos bancos à integração

⚠️ **Passo que todo mundo esquece — sem ele o site fica vazio.** Repita para **cada** banco:

1. Abra o banco no Notion (como página inteira).
2. Clique nos **`•••`** (canto superior direito) → **"Connections"** (ou "Conexões") → **"Connect to"**.
3. Selecione a integração que você criou (`Meu Portfólio`).

### 4.3 Pegar o ID de cada banco

Para cada banco, copie o **ID** (um código de 32 caracteres):

1. Abra o banco como página inteira no Notion.
2. Copie o link da página (botão **Share** → **Copy link**, ou a URL do navegador).
3. O ID é a sequência de letras/números **antes do `?`**:

```
https://www.notion.so/seuworkspace/  a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6  ?v=...
                                     └─────────── este é o ID ──────────┘
```

Anote os IDs nas variáveis certas:
- Projetos → **`NOTION_DATABASE_ID`**
- Bio → **`NOTION_BIO_PAGE_ID`**
- Experiência → **`NOTION_EXPERIENCE_DB_ID`**
- Projetos relevantes → **`NOTION_RELEVANT_PROJECTS_DB_ID`**
- Clientes → **`NOTION_CLIENTS_DB_ID`**

> ✅ Ao final do Passo 1 você deve ter: 1 token + 1 a 5 IDs anotados.

---

## 5. Passo 2 — Configurar o Resend (e-mails do contato)

Isso faz o **formulário de contato** enviar as mensagens para o seu e-mail. Se você não se importa com o contato agora, pode **pular** e voltar depois — o resto do site funciona sem isso.

1. Entre em <https://resend.com> e faça login.
2. No menu, vá em **"API Keys"** → **"Create API Key"**. Dê um nome e crie.
3. Copie a chave (começa com `re_`).
   → Essa é a sua **`RESEND_API_KEY`**.
4. **Para os e-mails realmente chegarem**, você precisa verificar um domínio:
   - Vá em **"Domains"** → **"Add Domain"** e siga as instruções (adicionar uns registros DNS no seu provedor de domínio).
   - Depois de verificado, use esse domínio em **`RESEND_FROM_DOMAIN`** (ex.: `seudominio.com`).

> Sem domínio verificado, o Resend só envia para o e-mail da sua própria conta e em modo de teste. Para um portfólio profissional, verifique um domínio.

---

## 6. Passo 3 — Pegar o código do template

1. No repositório do template no GitHub, clique no botão verde **"Use this template"** → **"Create a new repository"**.
   - (Se não houver esse botão, clique em **"Fork"**.)
2. Dê um nome ao seu repositório (ex.: `meu-portfolio`) e crie.

Pronto — agora existe uma **cópia sua** do template no seu GitHub. É essa cópia que a Vercel vai publicar.

> Repositório original do template: **`<<COLE AQUI O LINK DO SEU REPO NO GITHUB>>`**

---

## 7. Passo 4 — Publicar na Vercel

1. Acesse <https://vercel.com/new>.
2. Em **"Import Git Repository"**, encontre o repositório que você criou no passo anterior e clique em **"Import"**.
   - Se não aparecer, clique em "Adjust GitHub App Permissions" e dê acesso ao repositório.
3. Antes de clicar em Deploy, abra a seção **"Environment Variables"** e adicione **todas** as variáveis abaixo (nome + valor). Use os valores que você anotou:

| Variável | Obrigatória? | Exemplo / observação |
|---|---|---|
| `NOTION_TOKEN` | ✅ | `ntn_...` (token da integração) |
| `NOTION_DATABASE_ID` | ✅ | ID do banco Projetos |
| `NOTION_BIO_PAGE_ID` | ✅* | ID do banco Bio (*necessário para a página /bio) |
| `NOTION_EXPERIENCE_DB_ID` | ⬜ | ID do banco Experiência |
| `NOTION_RELEVANT_PROJECTS_DB_ID` | ⬜ | ID do banco Projetos relevantes |
| `NOTION_CLIENTS_DB_ID` | ⬜ | ID do banco Clientes |
| `NEXT_PUBLIC_SITE_NAME` | ✅ | `Seu Nome` |
| `NEXT_PUBLIC_SITE_ROLE` | ✅ | `Designer & Strategist` |
| `NEXT_PUBLIC_SITE_CITY` | ✅ | `São Paulo` |
| `NEXT_PUBLIC_SITE_URL` | ✅ | `https://seudominio.com` (pode ajustar depois) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | ✅ | `voce@email.com` |
| `NEXT_PUBLIC_LINKEDIN_URL` | ⬜ | `https://linkedin.com/in/voce` |
| `NEXT_PUBLIC_BEHANCE_URL` | ⬜ | `https://behance.net/voce` |
| `NEXT_PUBLIC_INSTAGRAM_URL` | ⬜ | `https://instagram.com/voce` |
| `NEXT_PUBLIC_TWITTER_URL` | ⬜ | `https://x.com/voce` |
| `NEXT_PUBLIC_MEETING_URL` | ⬜ | Link do Cal.com / Calendly |
| `RESEND_API_KEY` | ⬜ | `re_...` (para o formulário de contato) |
| `RESEND_FROM_DOMAIN` | ⬜ | `seudominio.com` (domínio verificado no Resend) |

> 💡 A coluna `Value` de cada variável é o valor; o `Name` é exatamente o texto da primeira coluna (sem aspas).

4. Clique em **"Deploy"** e aguarde 1–2 minutos.
5. Quando terminar, clique em **"Visit"** para ver o seu site no ar. 🎉

> Sempre que você editar o conteúdo no Notion, o site se atualiza sozinho (em até ~1 minuto). Você **não** precisa fazer deploy de novo para isso.

---

## 8. Passo 5 — (Opcional) Rodar no seu computador

Só faça isso se quiser testar localmente ou personalizar o código. Não é necessário para o site funcionar.

**Pré-requisito:** instalar o [Node.js](https://nodejs.org) versão **20 ou superior**.

```bash
# 1. Baixe o seu repositório (substitua pela URL do SEU repo)
git clone https://github.com/SEU-USUARIO/meu-portfolio.git
cd meu-portfolio

# 2. Instale as dependências
npm install

# 3. Crie o arquivo de variáveis a partir do exemplo
cp .env.example .env.local
#    → abra o .env.local e preencha com os valores que você anotou

# 4. Rode o site
npm run dev
```

Abra <http://localhost:3000> no navegador.

---

## 9. Como adicionar e editar projetos

Depois que o site está no ar, todo o gerenciamento é no **Notion**:

1. Abra o banco **Projetos**.
2. Clique em **"+ New"** para criar uma linha (um projeto).
3. Preencha os campos: `Name`, `Client`, `Year`, `Category`, `Description`...
4. Em `Slug`, escreva um apelido único e sem espaços para a URL (ex.: `cafe-aurora`).
5. Faça upload da capa em `Cover` e das imagens da galeria em `Media`.
6. Defina o `Grid_Size` (`small`, `medium` ou `large`) e a `Order` (número — quanto menor, mais no início).
7. **Marque a caixa `Published`** ✅ — só projetos publicados aparecem no site.

O site atualiza sozinho em até ~1 minuto. Se quiser ver na hora, force um novo deploy na Vercel (aba **Deployments** → **Redeploy**).

---

## 10. Usar um domínio próprio

1. Compre um domínio (Registro.br, GoDaddy, Namecheap...).
2. Na Vercel: **Project → Settings → Domains → Add**.
3. Digite seu domínio e siga as instruções de DNS que a Vercel mostrar (adicionar um registro `A` ou `CNAME` no painel de quem vendeu o domínio).
4. Atualize a variável `NEXT_PUBLIC_SITE_URL` para o seu domínio.

---

## 11. Personalização (logo, favicon e crédito)

Além do conteúdo (que vem do Notion), você pode deixar o template com a sua cara:

- **Favicon e ícone:** substitua `app/icon.svg` pela sua marca (qualquer SVG quadrado). Ele vira o favicon e também aparece na imagem de compartilhamento. Prefere PNG? Troque por um `app/icon.png`.
- **Imagem de compartilhamento (Open Graph):** por padrão o preview de link mostra a inicial do seu nome dentro de um quadrado. O visual está em `app/opengraph-image.tsx` — ajuste cores/layout se quiser.
- **Cores e fontes:** os tokens de cor ficam em `app/globals.css` (`--bg`, `--fg`, `--muted`, `--border`…). A fonte (Inter Tight) é configurada em `app/layout.tsx`.
- **Crédito do template:** há um link discreto **"Template by F&A"** na barra lateral. Para removê-lo, apague o bloco marcado com `Crédito do template` em `components/Sidebar.tsx`.

---

## 12. Solução de problemas (FAQ)

**O site abre, mas não aparece nenhum projeto.**
- Confirme que o `NOTION_TOKEN` e o `NOTION_DATABASE_ID` estão certos na Vercel.
- Confirme que você **conectou a integração ao banco** (Passo 4.2).
- Confirme que pelo menos um projeto está com **`Published` marcado**.

**As imagens não aparecem.**
- As imagens precisam ser **upload de arquivo** nas colunas `Cover`/`Media` (não cole links).
- Confirme que a integração tem acesso ao banco.

**A página /bio está vazia.**
- O `NOTION_BIO_PAGE_ID` é o ID de um **banco** (tabela), não de uma página comum.
- As colunas da bio são em **minúsculas**: `bio_text`, `capabilities`, `avatar`, `open_to_work`.
- Conecte a integração também a esse banco.

**O formulário de contato não envia.**
- Confirme `RESEND_API_KEY` e `NEXT_PUBLIC_CONTACT_EMAIL`.
- Para receber de fato, verifique um domínio no Resend e preencha `RESEND_FROM_DOMAIN`.

**O deploy falhou na Vercel.**
- Quase sempre é uma variável faltando ou com nome errado. Abra a aba **Deployments → (deploy) → Logs** e veja a mensagem.
- Os nomes das variáveis diferenciam maiúsculas/minúsculas.

**Editei o Notion e o site não mudou.**
- Espere ~1 minuto e recarregue. Se precisar na hora, faça **Redeploy** na Vercel.

---

## 13. Anexo — Estrutura completa dos bancos do Notion

Se você criou os bancos manualmente (Caminho B), eles precisam ter **exatamente** estas colunas. O tipo está na coluna "Tipo do Notion". ⚠️ Respeite maiúsculas/minúsculas.

### Banco "Projetos" → `NOTION_DATABASE_ID`

| Coluna | Tipo do Notion | Para quê |
|---|---|---|
| `Name` | Title (Título) | Nome do projeto |
| `Client` | Text (Texto) | Cliente |
| `Year` | Number (Número) | Ano |
| `Category` | Select (Seleção) | Categoria |
| `Slug` | Text | Apelido para a URL (único, sem espaços) |
| `Cover` | Files & media | Imagem de capa (usa a 1ª) |
| `Media` | Files & media | Galeria de imagens |
| `Video_Urls` | Text | URLs de vídeo separadas por vírgula |
| `Grid_Size` | Select | `small`, `medium` ou `large` |
| `Order` | Number | Ordem no grid (menor = primeiro) |
| `Published` | Checkbox | Marque para publicar |
| `Description` | Text | Descrição do projeto |

### Banco "Bio" → `NOTION_BIO_PAGE_ID` (apenas 1 linha)

| Coluna | Tipo do Notion | Para quê |
|---|---|---|
| `Name` | Title | Obrigatório pelo Notion (não aparece no site) |
| `bio_text` | Text | Seu texto. Cada quebra de linha vira um parágrafo |
| `capabilities` | Multi-select | Suas habilidades |
| `avatar` | Files & media | Sua foto |
| `open_to_work` | Checkbox | Mostra o selo "disponível para trabalho" |
| `awards` | Text | (Avançado/opcional) JSON dos prêmios — veja abaixo |

<details>
<summary>Formato do campo <code>awards</code> (avançado)</summary>

O campo `awards` aceita um texto em formato JSON, assim:

```json
[
  { "group": "Prêmios", "items": ["Awwwards 2024", "CSS Design Awards"] },
  { "group": "Menções", "items": ["Behance Featured"] }
]
```
Se não quiser usar, deixe em branco.
</details>

### Banco "Experiência" → `NOTION_EXPERIENCE_DB_ID`

| Coluna | Tipo do Notion | Para quê |
|---|---|---|
| `name` | Title | Empresa / cargo |
| `period` | Text | Período (ex.: `2021 — 2024`) |
| `color` | Text | Cor em hex (ex.: `#1a1a1a`) |
| `logo` | Files & media | Logo |
| `order` | Number | Ordem (menor = primeiro) |

### Banco "Projetos relevantes" → `NOTION_RELEVANT_PROJECTS_DB_ID`

| Coluna | Tipo do Notion | Para quê |
|---|---|---|
| `name` | Title | Nome do projeto |
| `type` | Text | Tipo / categoria |
| `color` | Text | Cor em hex |
| `logo` | Files & media | Logo |
| `link` | URL | Link do projeto |
| `order` | Number | Ordem |

### Banco "Clientes" → `NOTION_CLIENTS_DB_ID`

| Coluna | Tipo do Notion | Para quê |
|---|---|---|
| `name` | Title | Nome do cliente |
| `link` | URL | Link (opcional) |
| `order` | Number | Ordem |

---

## Stack técnica (para quem tem curiosidade)

- [Next.js 16](https://nextjs.org) (App Router) · React 19 · TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [Notion API](https://developers.notion.com) como CMS
- [Resend](https://resend.com) para e-mails
- Deploy na [Vercel](https://vercel.com)

---

Feito com ♥ pela **F&A Works**. Travou em algum passo? Chama no suporte e a gente te ajuda até o site estar no ar.
