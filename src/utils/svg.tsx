import satori from "satori";

export const generateSVG = ({
  text = "",
  color = ["red", "red"],
  borderRadius = 32,
  width = 100,
  height = 100,
}) => {
  const [background, textColor] = color;
  return fetch("/inter-latin-ext-400-normal.woff")
    .then((res) => res.arrayBuffer())
    .then((data) =>
      satori(
        <div
          style={{
            background,
            borderColor: textColor,
            borderWidth: 2,
            borderRadius,
            display: "flex",
            height: "100%",
            width: "100%",
            color: "white",
          }}
        >
          <div style={{ display: "flex", position: "relative" }}>
            <img
              src="/svgPatterns/pattern-1.svg"
              style={{ zIndex: 10, width: "100%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",

              height: "100%",
              width: "100%",
              position: "absolute",
            }}
          >
            <div
              style={{
                color: textColor,
                background,
                borderColor: textColor,
                borderWidth: 2,
                borderRadius,
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                fontSize: 24,
                padding: 40,
                height: 200,
                width: 600,
              }}
            >
              {text}
            </div>
          </div>
        </div>,
        {
          width,
          height,
          fonts: [
            {
              name: "Inter",
              data,
              weight: 400,
              style: "normal",
            },
          ],
        }
      )
    );
};
