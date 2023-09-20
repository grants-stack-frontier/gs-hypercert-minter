import { ImageResponse } from '@vercel/og';
import _ from 'lodash';
import { NextApiRequest } from 'next';
import Image from 'next/image';
import { optionType } from 'utils/types';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextApiRequest) {
  const {formData} = req.body;
  return new ImageResponse(
    (
      <div style={{
        width: "320px",
        height: "400px",
        borderRadius: "8px",
        background: "#254D32",
        backgroundImage: "url('http://localhost:3000/svgPatterns/certSvg.svg')",
        boxShadow: "0px 15px 45px rgba(37, 44, 55, 0.12)",
        backgroundSize: "cover",
        backgroundRepeat: "repeat-y",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        padding: "4px",
        display: 'flex',
        flexDirection: 'column'
    }}>
      <div style={{
            width: "100%",
            justifyContent: "center",
            display: 'flex'
          }}>
        <img src="http://localhost:3000/collection_logos/green-pill.png" alt="" width="140" height="140" />
      </div>
      <div style={{
            width: "100%",
            justifyContent: "space-between",
            display: 'flex',
            fontSize: "15px"
          }}>
        <p>Timeframe</p>
        <p>
          {formData.workTimeframeStart}
          {' — '}
          {formData.workEndString}
        </p>
      </div>

      <hr style={{
        borderColor: "#C2E812",
        borderWidth: "1px",
        width: "100%"
      }} />

      <h1 style={{
        color: "white",
        lineHeight: "normal",
        fontWeight: "600",
        fontSize: "24px",
        margin: "8px 0",
        fontFamily: "Volkhov, serif"
      }}>
        {formData.selectedChapter.label}
      </h1>

      <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
        {(formData.workScope ?? ("Work, Scope, goes, here").split(", ")).map((tag:any) => (
          <span 
            key={tag + tag.substring(0, 2)} 
            style={{
                  color: "#C2E812",
                  borderColor: "#C2E812",
                  borderWidth: "1px",
                  borderRadius: "50%",
                  height: "auto",
                  backgroundColor: "transparent",
                  fontSize: "12px",
                  fontWeight: "normal",
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1px 8px'
                }}
          >
            {tag.toLowerCase()}
          </span>
        ))}
      </div>

      <hr style={{
        borderColor: "#C2E812",
        borderWidth: "1px",
        width: "100%"
      }} />

      <div style={{
            width: "100%",
            justifyContent: "center",
            padding: "2px",
            display: 'flex'
          }}>
        <img src="http://localhost:3000/logo-yellow.svg" alt="Hypercert" width="140" height="140" />
      </div>
    < /div>

    ),
{
  width: 320,
    height: 400,
    },
  );
}