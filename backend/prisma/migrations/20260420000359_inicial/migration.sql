-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "text" VARCHAR,
    "state" VARCHAR,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);
