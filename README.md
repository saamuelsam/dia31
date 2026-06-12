# Surpresa de Dia dos Namorados

Site romântico, divertido e emocional feito com React, Vite, TypeScript, Tailwind CSS, Framer Motion e Lucide React.

## Instalar

```bash
npm install
```

## Rodar localmente

```bash
npm run dev
```

Abra o endereço mostrado pelo Vite, normalmente `http://localhost:5173`.

No Windows, voce tambem pode dar dois cliques em:

```text
abrir-site.bat
```

Nao abra o arquivo `index.html` diretamente pelo Explorer. Projetos Vite precisam rodar por um servidor local; abrir o HTML direto pode deixar a tela branca.

## Gerar build de produção

```bash
npm run build
```

Antes de publicar, confira se todas as fotos, vídeos e música existem:

```bash
npm run check:assets
```

## Onde editar nomes, textos e datas

Edite `src/data/coupleData.ts`.

Troque:

- `herName`: nome dela.
- `myName`: seu nome.
- `storyStartDate`: data em que a história começou, no formato `AAAA-MM-DD`.
- `letter`: declaração principal.
- `finalSection`: textos e foto final.

## Adicionar fotos

Coloque as imagens em `public/images`.

Os caminhos já esperados são:

- `public/images/foto-01.jpg` até `foto-06.jpg`
- `public/images/historia-01.jpg` até `historia-06.jpg`
- `public/images/foto-final.jpg`
- `public/images/meme-01-capa.jpg` até `meme-04-capa.jpg`

Você pode trocar os nomes dos arquivos em `src/data/coupleData.ts`.

## Adicionar vídeos

Coloque os vídeos em `public/videos`.

Os caminhos esperados são:

- `public/videos/meme-01.mp4`
- `public/videos/meme-02.mp4`
- `public/videos/meme-03.mp4`
- `public/videos/meme-04.mp4`

## Adicionar música

Coloque a música em:

```text
public/audio/nossa-musica.mp3
```

A música começa pausada e só toca depois de um toque no botão flutuante.

## Trocar a foto final

Substitua:

```text
public/images/foto-final.jpg
```

Ou altere `finalSection.image` em `src/data/coupleData.ts`.

## Publicar na Vercel

1. Envie o projeto para um repositório no GitHub.
2. Acesse a Vercel e importe o repositório.
3. Use as configurações padrão para Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.

Antes de publicar, adicione as fotos, vídeos e música nas pastas dentro de `public`.
