-- CreateTable
CREATE TABLE "Medicine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "usersId" INTEGER NOT NULL,
    "dose_will_take" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "dose" INTEGER NOT NULL,
    "additionalId" INTEGER,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdditionalSetting" (
    "id" SERIAL NOT NULL,
    "instruction" TEXT,
    "treatment_duration_start_time" TEXT,
    "treatment_duration_end_time" TEXT,
    "medicine_reminder_total_required" INTEGER,
    "medicine_reminder_current_stock" INTEGER,
    "medicine_reminder_remiond_when_left" INTEGER,
    "precription" TEXT,
    "appointmentId" INTEGER,
    "scheduleId" INTEGER NOT NULL,

    CONSTRAINT "AdditionalSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "doctor_name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "set_reminder" BOOLEAN NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_additionalId_key" ON "Schedule"("additionalId");

-- CreateIndex
CREATE UNIQUE INDEX "AdditionalSetting_appointmentId_key" ON "AdditionalSetting"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "AdditionalSetting_scheduleId_key" ON "AdditionalSetting"("scheduleId");

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_id_fkey" FOREIGN KEY ("id") REFERENCES "Medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdditionalSetting" ADD CONSTRAINT "AdditionalSetting_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdditionalSetting" ADD CONSTRAINT "AdditionalSetting_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
