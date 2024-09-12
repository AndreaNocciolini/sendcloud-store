import { Type, Static } from "@sinclair/typebox";

const BulkPDFLabelPrinting = Type.Object({
    label: Type.Object({
        parcels: Type.Array(Type.Number())
    })
})

const MultiPDFLabels = Type.Object({
    ids: Type.Array(Type.Number()),
    start_from: Type.Optional(Type.Union([
        Type.Literal(0),
        Type.Literal(1),
        Type.Literal(2),
        Type.Literal(3)
    ]))
})

type BulkPDFLabelPrintingType = Static<typeof BulkPDFLabelPrinting>;
type MultiPDFLabelsType= Static<typeof MultiPDFLabels>;

export {
    BulkPDFLabelPrintingType,
    MultiPDFLabelsType
}