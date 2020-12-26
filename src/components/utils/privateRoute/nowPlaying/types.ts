import { Device } from "../../../../common/api/webapi/types"

export type HandleSetToggleModal = (state: boolean) => void
export type HandleToggleDropdowns = (index: number) => void
export type UpdateFatherVolume = (volume: number) => void
export type ChooseDevice = (id: string) => void
export type GetVolumeIcon = (volume: number) => JSX.Element
export type GetDeviceType = (type: Device['type']) => JSX.Element