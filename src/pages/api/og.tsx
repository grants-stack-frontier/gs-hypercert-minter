import { ImageResponse } from "@vercel/og";
import type { NextApiRequest } from "next";
import type { formSchema } from "utils/types";
import { Volkhov, Roboto_Mono } from "next/font/google";

export const config = {
  runtime: "edge",
};

const volkhov = Volkhov({ weight: "700", subsets: ["latin"] });
export const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

export default function handler(req: NextApiRequest) {
// export default function handler() {
  const { formData }: { formData: formSchema } = req.body;

  // const formData: formSchema = {
  //   workTimeframeStart: "2023-09-21",
  //   workTimeframeEnd: "2023-09-28",
  //   externalUrl: "www.cnn.com",
  //   description: "Raid Guild",
  //   name: [
  //     {
  //       label: "GreenPill Mars",
  //       value: "ad18ae38-de78-4bc4-a4eb-c9ad1c4a72f6",
  //     },
  //   ],
  //   workScope: [
  //     {
  //       label: "Climate Change",
  //       value: "climate_change",
  //     },
  //   ],
  //   contributors: [
  //     {
  //       label: "Raid Guild",
  //       value: "raid_guild",
  //     },
  //   ],
  // };

  const workScope = formData.workScope.map(x => x.value);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#254D32",
          backgroundImage:
            "url('http://localhost:3000/svgPatterns/certSvg.svg')",
          backgroundSize: "cover",
          backgroundRepeat: "repeat-y",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <img
            src="http://localhost:3000/collection_logos/green-pill.png"
            alt=""
            width="140"
          />
        </div>
        <div
          style={{
            width: "100%",
            justifyContent: "space-between",
            display: "flex",
            fontSize: "14px",
            fontFamily: "Raleway, sans-serif",
            fontWeight: "bolder",
            color: "white",
          }}
        >
          <p>Timeframe</p>
          <p>
            {formData?.workTimeframeStart}
            {" — "}
            {formData?.workTimeframeEnd}
          </p>
        </div>

        <hr
          style={{
            borderColor: "#C2E812",
            borderWidth: "1px",
            width: "100%",
            margin: "5px 0",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <h1
            style={{
              color: "white",
              fontWeight: "bolder",
              fontSize: "24px",
              margin: "4px 5px 8px 5px",
              fontFamily: volkhov.style.fontFamily,
            }}
          >
            {formData?.name[0].label}
          </h1>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {(workScope ?? "Work, Scope, goes, here".split(", ")).map(
              (tag: string) => (
                <span
                  key={tag + tag.substring(0, 2)}
                  style={{
                    color: "#C2E812",
                    borderColor: "#C2E812",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderRadius: "10",
                    height: "auto",
                    backgroundColor: "transparent",
                    fontSize: "12px",
                    fontWeight: "normal",
                    display: "flex",
                    alignItems: "center",
                    marginTop: "4px",
                    padding: "3px 10px",
                  }}
                >
                  {tag.toLowerCase()}
                </span>
              )
            )}
          </div>
        </div>

        <hr
          style={{
            borderColor: "#C2E812",
            borderWidth: "1px",
            width: "100%",
            margin: "5px 0",
          }}
        />

        <div
          style={{
            width: "100%",
            justifyContent: "center",
            display: "flex",
            padding: "5px",
          }}
        >
          <img
            src="http://localhost:3000/logo-yellow.svg"
            alt="Hypercert"
            width="140"
          />
        </div>
      </div>
    ),
    {
      width: 320,
      height: 400,
    }
  );
}
