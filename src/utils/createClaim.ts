import type { schema } from "components/GreenPillForm";
import type * as z from "zod";
import { toYear } from "./date";
import { formatContributors } from "./formatting";

export const createClaim = (formData: z.infer<typeof schema>) => {

  const {name, workScope, externalUrl, description, contributors, workTimeframeStart, workTimeframeEnd } = formData;

  

  return {
    name,
    description,
    version: "0.0.1",
    // image: `data:image/svg+xml;base64,${btoa(svg)}`,
    externalUrl,
    image: "hello",
    properties: [],
    hypercert: {
      impact_scope: {
        name: "Impact Scope",
        value: ["all"],
        excludes: [],
        display_value: "all",
      },
      work_scope: {
        name: "Work Scope",
        value: [...workScope],
        excludes: [],
        display_value: [...workScope], // TODO: Find the right value
      },
      impact_timeframe: {
        name: "Impact Timeframe",
        value: [workTimeframeEnd, undefined],
        display_value: `${toYear(+workTimeframeEnd)} → ${toYear(undefined)}`,
      },
      work_timeframe: {
        name: "Work Timeframe",
        value: [workTimeframeStart, workTimeframeEnd],
        display_value: `${toYear(+workTimeframeStart)} → ${toYear(+workTimeframeEnd)}`,
      },
      rights: {
        name: "Rights",
        value: ["Public Display"],
        excludes: [],
        display_value: "Public Display",
      },
      contributors: {
        name: "Contributors",
        value: formatContributors(contributors?.split(",") ?? []),
        display_value: formatContributors(contributors?.split(",") ?? []),
      },
    },
  };
};
