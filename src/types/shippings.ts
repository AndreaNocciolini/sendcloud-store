import { Type, Static } from '@sinclair/typebox';

const ShippingPricesQueryType = Type.Object({
    from_country: Type.Union([
        Type.Literal("AW"), Type.Literal("AF"), Type.Literal("AO"), Type.Literal("AI"), Type.Literal("AX"), Type.Literal("AL"), Type.Literal("AD"), Type.Literal("AE"), Type.Literal("AR"), Type.Literal("AM"),
        Type.Literal("AS"), Type.Literal("AQ"), Type.Literal("TF"), Type.Literal("AG"), Type.Literal("AU"), Type.Literal("TA"), Type.Literal("ZB"), Type.Literal("IB"), Type.Literal("EB"), Type.Literal("JB"),
        Type.Literal("QB"), Type.Literal("FB"), Type.Literal("DB"), Type.Literal("GB"), Type.Literal("HB"), Type.Literal("SB"), Type.Literal("AB"), Type.Literal("LB"), Type.Literal("BY"), Type.Literal("BZ"),
        Type.Literal("BM"), Type.Literal("BO"), Type.Literal("BR"), Type.Literal("BB"), Type.Literal("NB"), Type.Literal("TB"), Type.Literal("VB"), Type.Literal("WC"), Type.Literal("FC"), Type.Literal("AC"),
        Type.Literal("CC"), Type.Literal("HC"), Type.Literal("LC"), Type.Literal("NC"), Type.Literal("IC"), Type.Literal("MC"), Type.Literal("CD"), Type.Literal("CG"), Type.Literal("CK"), Type.Literal("CO"),
        Type.Literal("KM"), Type.Literal("CV"), Type.Literal("CR"), Type.Literal("CU"), Type.Literal("CW"), Type.Literal("CX"), Type.Literal("KY"), Type.Literal("YC"), Type.Literal("YZ"), Type.Literal("DE"),
        Type.Literal("DJ"), Type.Literal("MD"), Type.Literal("KD"), Type.Literal("OD"), Type.Literal("ZE"), Type.Literal("CE"), Type.Literal("GE"), Type.Literal("RE"), Type.Literal("HE"), Type.Literal("SE"),
        Type.Literal("ET"), Type.Literal("FI"), Type.Literal("FJ"), Type.Literal("FK"), Type.Literal("FR"), Type.Literal("FO"), Type.Literal("FM"), Type.Literal("GA"), Type.Literal("EG"), Type.Literal("GG"),
        Type.Literal("HG"), Type.Literal("IG"), Type.Literal("NG"), Type.Literal("PG"), Type.Literal("MG"), Type.Literal("WG"), Type.Literal("QG"), Type.Literal("RG"), Type.Literal("GD"), Type.Literal("GL"),
        Type.Literal("GT"), Type.Literal("FG"), Type.Literal("UG"), Type.Literal("YH"), Type.Literal("KH"), Type.Literal("MH"), Type.Literal("HN"), Type.Literal("HR"), Type.Literal("HT"), Type.Literal("HU"),
        Type.Literal("ID"), Type.Literal("IM"), Type.Literal("IN"), Type.Literal("IO"), Type.Literal("IE"), Type.Literal("IR"), Type.Literal("IQ"), Type.Literal("IS"), Type.Literal("IL"), Type.Literal("IT"),
        Type.Literal("JM"), Type.Literal("JE"), Type.Literal("JO"), Type.Literal("JP"), Type.Literal("KZ"), Type.Literal("KE"), Type.Literal("KG"), Type.Literal("IK"), Type.Literal("NK"), Type.Literal("KR"),
        Type.Literal("KW"), Type.Literal("LA"), Type.Literal("LR"), Type.Literal("LY"), Type.Literal("KL"), Type.Literal("SL"), Type.Literal("TL"), Type.Literal("UL"), Type.Literal("VM"), Type.Literal("OM"),
        Type.Literal("CM"), Type.Literal("DM"), Type.Literal("GM"), Type.Literal("XM"), Type.Literal("HM"), Type.Literal("ML"), Type.Literal("MT"), Type.Literal("MM"), Type.Literal("EM"), Type.Literal("NM"),
        Type.Literal("PM"), Type.Literal("ZP"), Type.Literal("MR"), Type.Literal("MS"), Type.Literal("MQ"), Type.Literal("MU"), Type.Literal("YY"), Type.Literal("TN"), Type.Literal("AN"), Type.Literal("CN"),
        Type.Literal("EN"), Type.Literal("FN"), Type.Literal("UN"), Type.Literal("NL"), Type.Literal("NO"), Type.Literal("NP"), Type.Literal("RN"), Type.Literal("NZ"), Type.Literal("PK"), Type.Literal("PA"),
        Type.Literal("PN"), Type.Literal("PE"), Type.Literal("PH"), Type.Literal("PW"), Type.Literal("PL"), Type.Literal("PR"), Type.Literal("KP"), Type.Literal("PT"), Type.Literal("PY"), Type.Literal("PS"),
        Type.Literal("PF"), Type.Literal("QA"), Type.Literal("OR"), Type.Literal("UR"), Type.Literal("WS"), Type.Literal("DS"), Type.Literal("NS"), Type.Literal("SS"), Type.Literal("HS"), Type.Literal("JS"),
        Type.Literal("BS"), Type.Literal("LS"), Type.Literal("VS"), Type.Literal("OP"), Type.Literal("ST"), Type.Literal("RS"), Type.Literal("KS"), Type.Literal("SZ"), Type.Literal("XS"), Type.Literal("CS"),
        Type.Literal("YT"), Type.Literal("CT"), Type.Literal("DT"), Type.Literal("JT"), Type.Literal("KT"), Type.Literal("LT"), Type.Literal("OT"), Type.Literal("TT"), Type.Literal("NR"), Type.Literal("TV"),
        Type.Literal("TW"), Type.Literal("TZ"), Type.Literal("UA"), Type.Literal("UM"), Type.Literal("UY"), Type.Literal("US"), Type.Literal("UZ"), Type.Literal("VA"), Type.Literal("VC"), Type.Literal("VE"),
        Type.Literal("VG"), Type.Literal("VI"), Type.Literal("NV"), Type.Literal("UW"), Type.Literal("FW"), Type.Literal("SY"), Type.Literal("EZ"), Type.Literal("AZ"), Type.Literal("MZ"), Type.Literal("WI")
    ]), // Union of country codes
    shipping_method_id: Type.Integer(), // Required shipping method ID
    weight: Type.Number(), // Required weight
    weight_unit: Type.Union([Type.Literal("kilogram"), Type.Literal("gram")]) // Required weight unit, either kilogram or gram
});

type ShippingPricesQueryType = Static<typeof ShippingPricesQueryType>;

export {
    ShippingPricesQueryType
}
