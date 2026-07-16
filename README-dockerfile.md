## 🚀 Instalación local

```bash
git clone https://github.com/pmercado12/task-manager-react--ts

#Terminal 1
docker compose up --build

#Terminal 2
docker compose exec backend npx prisma migrate deploy

#Levantar frontend
http://localhost:5173