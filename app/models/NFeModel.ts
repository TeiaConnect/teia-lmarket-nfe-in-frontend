import mongoose from 'mongoose';

const XMLInboundSchema = new mongoose.Schema({
  nfeProc: {
    NFe: {
      infNFe: {
        ide: {
          cUF: String,
          cNF: String,
          natOp: String,
          mod: String,
          serie: String,
          nNF: String,
          dhEmi: Date,
          tpNF: String,
          idDest: String,
          cMunFG: String,
          tpImp: String,
          tpEmis: String,
          cDV: String,
          tpAmb: String,
          finNFe: String,
          indFinal: String,
          indPres: String,
          procEmi: String,
          verProc: String
        },
        emit: {
          CNPJ: String,
          xNome: String,
          xFant: String,
          enderEmit: {
            xLgr: String,
            nro: String,
            xBairro: String,
            cMun: String,
            xMun: String,
            UF: String,
            CEP: String,
            cPais: String,
            xPais: String,
            fone: String
          },
          IE: String,
          CRT: String
        },
        dest: {
          CNPJ: String,
          xNome: String,
          enderDest: {
            xLgr: String,
            nro: String,
            xBairro: String,
            cMun: String,
            xMun: String,
            UF: String,
            CEP: String,
            cPais: String,
            xPais: String,
            fone: String
          },
          indIEDest: String,
          IE: String
        },
        det: [{
          prod: {
            cProd: String,
            cEAN: String,
            xProd: String,
            NCM: String,
            CFOP: String,
            uCom: String,
            qCom: Number,
            vUnCom: Number,
            vProd: Number,
            cEANTrib: String,
            uTrib: String,
            qTrib: Number,
            vUnTrib: Number,
            indTot: String
          },
          imposto: {
            ICMS: {},
            PIS: {},
            COFINS: {}
          }
        }],
        total: {
          ICMSTot: {
            vBC: Number,
            vICMS: Number,
            vICMSDeson: Number,
            vFCP: Number,
            vBCST: Number,
            vST: Number,
            vFCPST: Number,
            vFCPSTRet: Number,
            vProd: Number,
            vFrete: Number,
            vSeg: Number,
            vDesc: Number,
            vII: Number,
            vIPI: Number,
            vIPIDevol: Number,
            vPIS: Number,
            vCOFINS: Number,
            vOutro: Number,
            vNF: Number,
            vTotTrib: Number
          }
        }
      },
      Signature: {
        SignedInfo: {},
        SignatureValue: String,
        KeyInfo: {}
      }
    },
    protNFe: {
      infProt: {
        tpAmb: String,
        verAplic: String,
        chNFe: String,
        dhRecbto: Date,
        nProt: String,
        digVal: String,
        cStat: String,
        xMotivo: String
      }
    }
  },
  xml_content: String,
  created_at: { type: Date, default: Date.now }
}, {
  collection: 'xml_inbound' // Especifica o nome da collection
});

export const XMLInbound = mongoose.models.XMLInbound || mongoose.model('XMLInbound', XMLInboundSchema); 