import { ImageResponse } from "@vercel/og";
import { Roboto_Mono, Volkhov } from "next/font/google";
import type { formSchema, optionType } from "utils/types";

export const config = {
  runtime: "edge",
};

const volkhov = Volkhov({ weight: "700", subsets: ["latin"] });
export const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

export default async function handler(req: Request) {
  const form = await req.json();

  const { formData } = form as { formData: formSchema };

  if (!formData) {
    return new Response("No form data provided", { status: 400 });
  }

  const selectedChapter = Object.values(formData)?.[5] as unknown as optionType;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#254D32",
          backgroundImage: `url('${process.env.NEXT_PUBLIC_DEPLOYMENT_IMAGES}/svgPatterns/certSvg.svg')`,
          backgroundSize: "cover",
          backgroundRepeat: "repeat-y",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div style={{display: "flex", flexDirection: "column"}}>
        <h1
          style={{
            color: "white",
            fontWeight: "bolder",
            fontSize: "24px",
            margin: 'auto 0px 0px 0px',
            fontFamily: volkhov.style.fontFamily,
          }}
        >
          {selectedChapter?.label ?? "Name of the chapter"}
        </h1>
        <h2
          style={{
            color: "white",
            fontWeight: "bolder",
            fontSize: "15px",
            margin: 'auto 0px 0px 0px',
            fontFamily: volkhov.style.fontFamily,
          }}
        >
          {formData?.ref}
        </h2>
        </div>


        <hr
          style={{
            borderColor: "#C2E812",
            borderWidth: "1px",
            width: "100%",
            margin: "5px 0px 12px 0px",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: '100%'
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {formData?.workScope?.map(
              (tagObject: { value: string; label: string }) => (
                <span
                  key={tagObject.value}
                  style={{
                    color: "#C2E812",
                    borderColor: "#C2E812",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderRadius: "10px",
                    height: "auto",
                    backgroundColor: "transparent",
                    fontSize: "12px",
                    fontWeight: "normal",
                    display: "flex",
                    alignItems: "center",
                    padding: "3px 10px",
                  }}
                >
                  {tagObject.label.toLowerCase()}
                </span>
              )
            )}
          </div>

          <div
            style={{
              width: "100%",
              justifyContent: "space-between",
              display: "flex",
              fontSize: "14px",
              lineHeight: '14px',
              fontFamily: "Raleway, sans-serif",
              fontWeight: "bolder",
              color: "white",
              marginTop: '12px'
            }}
          >
            <span>Timeframe</span>
            <span>
              {formData.workTimeframeStart ?? "Start Date"}
              {" — "}
              {formData.workTimeframeEnd ?? "End Date"}
            </span>
          </div>
        </div>

        <hr
          style={{
            borderColor: "#C2E812",
            borderWidth: "1px",
            width: "100%",
            margin: "12px 0px 12px 0px",
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
            src={`${process.env.NEXT_PUBLIC_DEPLOYMENT_IMAGES}/logo-yellow.svg`}
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
