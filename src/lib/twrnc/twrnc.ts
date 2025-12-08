import twrnc from "twrnc";
import { parseInputs } from "./parse-inputs";
import { dp } from "./tool";

const otw = twrnc;

type TailwindFnProps = Parameters<typeof otw.style>;

const parseMap = new Map<string, string>();

function tw(...args: TailwindFnProps) {
  const [classNames, rnStyles] = parseInputs(args);

  const modifiedClassNames = classNames.map((className) => {
    if (parseMap.has(className)) {
      return parseMap.get(className)!;
    }

    const isJIT = className.includes("[");

    let parseString: string;

    if (isJIT) {
      parseString = parseJIT(className);
    } else {
      parseString = parseCommon(className);
    }
    parseMap.set(className, parseString);

    return parseString;
  });

  return otw.style(...modifiedClassNames, rnStyles);
}

const prefix = [
  "size",
  "w",
  "min-w",
  "max-w",
  "h",
  "min-h",
  "max-h",
  "m",
  "ml",
  "mr",
  "mt",
  "mb",
  "mx",
  "my",
  "p",
  "pt",
  "pr",
  "pb",
  "pl",
  "px",
  "py",
  "border",
  "border-t",
  "border-r",
  "border-tr",
  "border-br",
  "border-b",
  "border-l",
  "border-tl",
  "border-bl",
  "gap",
  "gap-x",
  "gap-y",
  "text",
  "leading",
  "rounded",
  "rounded-l",
  "rounded-tl",
  "rounded-bl",
  "rounded-r",
  "rounded-tr",
  "rounded-br",
  "rounded-t",
  "rounded-b",
  "top",
  "right",
  "bottom",
  "left",
  "inset",
  "inset-x",
  "inset-y",
];

function parseJIT(className: string) {
  const regex = /^(-)?(.+)-\[(-)?(\d+(?:\.\d+)?)\]$/;
  const match = className.match(regex);

  if (match === null) {
    return className;
  }

  const prefixString: string | undefined = match[2];

  if (!prefix.includes(prefixString)) {
    return className;
  }

  const value = Number(match[4]);

  if (!(value > 0)) {
    return className;
  }

  const negative = parseNegative(match);

  const modifyValue = dp(value);

  return `${prefixString}-[${negative}${modifyValue}px]`;
}

function parseCommon(className: string) {
  const regex = /^(-)?(.+)-(\d+(?:\.\d+)?)$/;
  const match = className.match(regex);

  if (match === null) {
    return className;
  }

  const prefixString: string | undefined = match[2];

  if (!prefix.includes(prefixString)) {
    return className;
  }

  const value = Number(match[3]);

  if (!(value > 0)) {
    return className;
  }

  const negative = match[1] === "-" ? "-" : "";

  const modifyValue = dp(value * 4);

  return `${prefixString}-[${negative}${modifyValue}px]`;
}

function parseNegative(match: RegExpMatchArray) {
  const m1 = match[1] === "-" ? "-" : "";
  const m3 = match[3] === "-" ? "-" : "";

  let negative = "";

  if (m1 === "-" && m3 === "-") {
    negative = "";
  }

  if ((m1 === "-" && m3 === "") || (m1 === "" && m3 === "-")) {
    negative = "-";
  }

  return negative;
}

export { otw, tw };
