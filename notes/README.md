# NoteBox

MVP de notas sincronizadas para web/PWA e base Tauri para Windows.

## Backend
Supabase project: `notebox` (sa-east-1)
- Auth por e-mail/senha
- Tabela `public.notes`
- RLS por usuário
- Realtime habilitado

## Web
```bash
npm install
npm run dev
```

Produção usa `.env.production` com a URL e publishable key do projeto NoteBox.

## Build
```bash
npm run build
```

## Desktop Windows
```bash
npm run tauri dev
npm run tauri build
```

## GitHub Pages

O workflow `.github/workflows/pages.yml` compila e publica em cada push para `main`. Em Settings → Pages, selecione GitHub Actions como fonte. O build usa caminhos relativos para funcionar em `/notebox/`.

O widget web fica dentro do navegador. A janela sobre outras aplicações exige compilar a versão desktop Tauri; publicar Pages não gera um instalador Windows.
