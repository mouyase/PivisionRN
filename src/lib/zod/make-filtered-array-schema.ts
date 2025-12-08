import { z, type ZodType } from "zod";

export function makeFilteredArraySchema<T extends ZodType>(schema: T) {
  return z.lazy(() =>
    z.preprocess((val) => {
      const array = Array.isArray(val) ? val : [];

      return array.filter((item: unknown) => schema.safeParse(item).success);
    }, z.array(schema)),
  );
}
