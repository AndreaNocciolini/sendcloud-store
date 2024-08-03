export type BulkPDFLabelPrintingType = {
    label: {
        parcels: number[]
    }
};

export type MultiPDFLabels = {
    ids: number[],
    start_from?: 0 | 1 | 2 | 3
}