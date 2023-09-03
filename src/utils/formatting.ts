/* eslint-disable @typescript-eslint/no-unsafe-call */
import _ from "lodash";

export const formatScope = (scopeLabel: string) =>
  scopeLabel.toLowerCase().replaceAll(/\s+/g, "-").trim();

export const formatContributors = (contributors: (string | undefined)[]) => {
    const validContributors = contributors.filter((contributor) => contributor !== undefined) as string[];

    if (validContributors.length === 0) {
        return "";
    }

    if (validContributors.length === 1) {
        return validContributors[0]!;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const initial: string[] = _.initial(validContributors);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const last: string = _.last(validContributors)!;

    return `${initial.join(", ")} & ${last}`;
};

export const formatFractionPercentage = (
    fractionUnits: string,
    totalUnits: string,
    ) => {
    const totalUnitsParsed = parseInt(totalUnits, 10);
    if (totalUnitsParsed === 0) {
        return "0%";
    }

    const fractionUnitsParsed = parseInt(fractionUnits, 10);

    const fraction = fractionUnitsParsed / totalUnitsParsed;
    const percentage = fraction * 100;

    return `${percentage.toFixed(2)}%`;
};

export const formatTime = (startTime: number, endTime?: number) => {
    if (startTime === endTime) {
        return new Date(startTime * 1000).toDateString();
    }

    if (endTime === undefined) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return `from ${new Date(startTime * 1000)}`;
    }

    return `${new Date(startTime).toDateString()} until ${new Date(
        endTime,
        ).toDateString()}`;
};

export const getOpenSeaFractionUrl = (
    tokenId: string,
    contractAddress: string,
    ) => {
    let _tokenId = BigInt(tokenId).toString();
    // n is appended to BigInt as a string to indicate that it is a BigInt
    if (_tokenId.endsWith("n")) {
        _tokenId = _tokenId.slice(0, -1);
    }

    return `https://testnets.opensea.io/assets/goerli/${contractAddress}/${_tokenId}`;
};

export const formatAddress = (address: string) =>
  `${address.slice(0, 4)}...${address.slice(-4)}`;

/**
* Prefix cid with `ipfs://` if it's not already
* @param cid
* @returns
*/
export const cidToIpfsUri = (cid: string) =>
  cid.startsWith("ipfs://") ? cid : `ipfs://${cid}`;