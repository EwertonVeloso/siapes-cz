-- DropForeignKey
ALTER TABLE "Archive" DROP CONSTRAINT "Archive_request_id_fkey";

-- AddForeignKey
ALTER TABLE "Archive" ADD CONSTRAINT "Archive_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "Request"("id") ON DELETE CASCADE ON UPDATE CASCADE;
