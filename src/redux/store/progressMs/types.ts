export const PROGRESS_MS = 'PROGRESS_MS'

export type ProgressMs = number | null

export interface ProgressMsAction{
    type: 'PROGRESS_MS',
    payload: ProgressMs
}