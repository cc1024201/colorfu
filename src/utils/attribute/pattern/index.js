import { line } from "./line";
import { dot } from "./dot";
import { wave } from "./wave";
import { get } from "../../object";

const nameCreator = {
  line,
  dot,
  wave
};

export function getPatternOptions(options, prefix) {
  const type = get(options, `${prefix}.type`);
  const creator = nameCreator[type] || line;
  return creator(options).map(({ key, ...rest }) => ({
    key: `${prefix}.${key}`,
    ...rest
  }));
}

export function getPatternRelations(options, prefix) {
  return Object.entries(nameCreator).map(([name, creator]) => ({
    trigger: name,
    actions: creator(options).map(({ key, defaultValue }) => ({
      key: `${prefix}.${key}`,
      value: defaultValue
    }))
  }));
}
