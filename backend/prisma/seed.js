import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const pool = new pg.Pool(
  { 
    connectionString: process.env.DATABASE_URL//,
    //ssl: { rejectUnauthorized: false } 
  })

pool.on('error', (err) => {
  console.error('Error inesperado en el pool de pg:', err)
})

const adapter = new PrismaPg(pool)

// Aquí es donde pasas el "adapter" que te pedía el error
const prisma = new PrismaClient({ adapter })
 
async function main() {
  await prisma.tasks.upsert({
    where: { id: 'xxxxx' },
    update: {},
    create: {
      //id: 'xxxxx',
      text: 'Tarea de ejemplo para pruebas',
      state: "pending"      
    },
  })
}
 
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })