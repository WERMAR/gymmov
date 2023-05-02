export interface CheckIn {
  userId: string;
  location: string | null;
  date: string;
  confirmed: boolean;
  confirmedUserId: string | null;
  requestedUserId: string;
  rejected: boolean;
  rejectedReason: string | null;
  trainingId: string;
}
