import { IAuditLog } from "./auditLog";

export type UserRole = "admin" | "editor";

export interface IUser {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  role: UserRole | string;
  auditLogs?: IAuditLog[];
  createdAt: Date;
  updatedAt: Date;
}