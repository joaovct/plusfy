export const PROGRESS_MS = 'PROGRESS_MS'

export type ProgressMs = number

export interface ProgressMsAction{
    type: 'PROGRESS_MS',
    payload: {
        progressMs: ProgressMs
    }
}