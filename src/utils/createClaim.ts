import type { schema } from "components/GreenPillForm";
import type * as z from "zod";
import { toYear } from "./date";
import { formatContributors } from "./formatting";
import { getUnixTime } from 'date-fns';
import _ from "lodash";


export const createClaim = (formData: z.infer<typeof schema>) => {

  const name = formData?.name;
  const workScope = _.map(formData?.workScope, 'value');
  const externalUrl = formData?.externalUrl;
  const description = formData?.description;
  const contributors = formData?.contributors;
  const workTimeframeStart = getUnixTime(formData?.workTimeframeStart);
  const workTimeframeEnd = getUnixTime(formData?.workTimeframeEnd);





  return {
    name,
    description,
    version: "0.0.1",
    // image: `data:image/svg+xml;base64,${btoa(svg)}`,
    externalUrl,
    image: "hello",
    properties: [],
    hypercert: {
      impact_scope:{"name":"Impact Scope","value":["all"],"excludes":[],"display_value":"all"},
      work_scope: {
        name: "Work Scope",
        value: [...workScope],
        excludes: [],
        display_value:[...workScope].join(", "), // TODO: Find the right value
      },
      impact_timeframe: {
        name: "Impact Timeframe",
        value: [workTimeframeEnd, 0],
        display_value: `${toYear(+workTimeframeEnd)} → ${toYear(0)}`,
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
        value: [...contributors?.split(",") ?? []],
        display_value: formatContributors(contributors?.split(",") ?? []),
      },
    },
  };
};
