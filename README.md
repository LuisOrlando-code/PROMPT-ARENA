# PromptArena

Plataforma estilo LeetCode para practicar prompt engineering. Escribe prompts, recibe evaluación de la IA y mejora tus habilidades.

## Stack

- **Frontend**: React + Vite + Tailwind CSS + TypeScript
- **Backend**: Node.js + Express

## Iniciar

### Backend
```bash
cd backend
npm install
npm start
```
Corre en `http://localhost:4000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Corre en `http://localhost:5173`

## Funcionalidades

- 5 desafíos de diferentes dificultades (fácil, medio, difícil)
- Editor de prompts con contador de caracteres y palabras
- Evaluación por criterios: claridad, creatividad, especificidad, etc.
- Score del 1 al 10 con barras de progreso
- Feedback detallado con fortalezas y mejoras sugeridas
- Filtros por dificultad

## API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/challenges` | Listar todos los desafíos |
| GET | `/api/challenges/:id` | Obtener un desafío |
| POST | `/api/challenges/:id/evaluate` | Evaluar un prompt |
| GET | `/api/health` | Verificar estado del servidor |
