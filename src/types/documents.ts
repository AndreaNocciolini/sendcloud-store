import { Type, Static } from "@sinclair/typebox";

const Documents = Type.Union([
    Type.Literal("air-waybill"),
    Type.Literal("cn23"),
    Type.Literal("cn23-default"),
    Type.Literal("commercial-invoice"),
    Type.Literal("cp71"),
    Type.Literal("label"),
    Type.Literal("qr"),
]);

type DocumentsType = Static<typeof Documents>;

export {
    DocumentsType
}