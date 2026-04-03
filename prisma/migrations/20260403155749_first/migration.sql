-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('NEW_PARTICIPANT', 'CAPACITY_REACHED', 'REGISTRATION_OPENING_SOON', 'REGISTRATION_OPENED', 'REGISTRATION_CLOSING_SOON', 'REGISTRATION_CLOSED', 'TOURNAMENT_STARTING_SOON', 'TOURNAMENT_STARTED', 'CUSTOM');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'PROCESSING', 'SENT', 'FAILED', 'CANCELLED', 'READ');

-- CreateEnum
CREATE TYPE "NotificationChannel" AS ENUM ('IN_APP', 'EMAIL', 'WEBSOCKET');

-- CreateEnum
CREATE TYPE "LogLevel" AS ENUM ('INFO', 'WARN', 'ERROR');

-- CreateTable
CREATE TABLE "Notification" (
    "notificationID" TEXT NOT NULL,
    "sourceEventID" TEXT,
    "torneoID" TEXT NOT NULL,
    "torneoName" TEXT,
    "organizatorID" TEXT NOT NULL,
    "organizatorName" TEXT,
    "participantID" TEXT,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "payload" JSONB,
    "scheduledFor" TIMESTAMP(3),
    "processedAt" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3),
    "readAt" TIMESTAMP(3),
    "status" "NotificationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notificationID")
);

-- CreateTable
CREATE TABLE "MicroserviceLog" (
    "id" TEXT NOT NULL,
    "level" "LogLevel" NOT NULL,
    "context" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "eventId" TEXT,
    "notificationId" TEXT,
    "torneoId" TEXT,
    "organizatorId" TEXT,
    "metadata" JSONB,
    "errorStack" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MicroserviceLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MicroserviceLog_level_createdAt_idx" ON "MicroserviceLog"("level", "createdAt");

-- CreateIndex
CREATE INDEX "MicroserviceLog_context_action_idx" ON "MicroserviceLog"("context", "action");

-- CreateIndex
CREATE INDEX "MicroserviceLog_eventId_idx" ON "MicroserviceLog"("eventId");

-- CreateIndex
CREATE INDEX "MicroserviceLog_torneoId_idx" ON "MicroserviceLog"("torneoId");
