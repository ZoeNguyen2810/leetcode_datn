interface FrameTimeDTO {
    frameId?: string;
    startAt: number;
    endAt: number;
    availableSlots: number;
    maxSlots: number;
}

export default FrameTimeDTO;