import { getTime, parseISO } from 'date-fns';
import _ from "lodash";
import type { RefObject } from 'react';
import { toYear } from "./date";
import { exportImage } from './svg';
import type { formSchema, optionType } from './types';

export const createClaim = async (formData: formSchema, ref: RefObject<HTMLDivElement>) => {

  const selectedChapter = _.map(formData)[4] as unknown as optionType;


  const name = selectedChapter?.label;
  const workScope = _.map(formData?.workScope, 'value');
  const externalUrl = formData?.externalUrl;
  const description = formData?.description;
  const contributors = _.map(formData?.contributors, 'value');
  const workTimeframeStart = formData?.workTimeframeStart
  const workTimeframeEnd = formData?.workTimeframeEnd
  const imageData = await exportImage(ref)



  return {
    name,
    description,
    version: "0.0.1",
    image: imageData ?? "",
    external_url: externalUrl,
    properties: [],
    hypercert: {
      impact_scope:{"name":"Impact Scope","value":["all"],"excludes":[],"display_value":"all"},
      work_scope: {
        name: "Work Scope",
        value: [...workScope],
        excludes: [],
        display_value: [...workScope].join(", "), 
      },
      impact_timeframe: {
        name: "Impact Timeframe",
        value: [getTime(parseISO(workTimeframeEnd)), 0],
        display_value: `${workTimeframeEnd} → ${toYear(0)}`,
      },
      work_timeframe: {
        name: "Work Timeframe",
        value: [getTime(parseISO(workTimeframeStart)), getTime(parseISO(workTimeframeEnd))],
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
        value: [...contributors],
        display_value: [...contributors].join(", "),
      },
    },
  };
};


