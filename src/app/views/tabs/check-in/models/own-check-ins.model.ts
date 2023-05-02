export interface OwnCheckIns {
  userId: string,
  confirmedUserId: string | null,
  requestedDate: string | null,
  confirmed: boolean,
  test: {
    id: string,
    name: string
  }[],
  location: string | null
}
