import { StaffStatus } from "@prisma/client";


export interface StaffCreateInput {
  name: string;
  serviceType: string;
  dailyCapacity: number;
  status: StaffStatus;
}

export interface StaffUpdateInput {
  name?: string;
  serviceType?: string;
  dailyCapacity?: number;
  status?: StaffStatus;
}
