import type { schema } from "components/GreenPillForm";
import { getTime, parseISO } from 'date-fns';
import _ from "lodash";
import type * as z from "zod";
import { toYear } from "./date";
import { formatContributors } from "./formatting";


export const createClaim = (formData: z.infer<typeof schema>) => {

  const name = formData?.name;
  const workScope = _.map(formData?.workScope, 'value');
  const externalUrl = formData?.externalUrl;
  const description = formData?.description;
  const contributors = formData?.contributors;
  const workTimeframeStart = formData?.workTimeframeStart
  const workTimeframeEnd = formData?.workTimeframeEnd






  return {
    name,
    description,
    version: "0.0.1",
    image: `data:image/svg+xml;base64,${btoa("svg")}`,
    external_url: externalUrl,
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
        value: [getTime(parseISO(workTimeframeEnd)), 0],
        display_value: `${workTimeframeEnd} → ${toYear(0)}`,
      },
      work_timeframe: {
        name: "Work Timeframe",
        value: [workTimeframeStart, workTimeframeEnd],
        display_value: `${workTimeframeStart} → ${workTimeframeEnd}`,
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


