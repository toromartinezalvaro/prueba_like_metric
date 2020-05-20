export const NaturalSort = (ar) =>
  ar.sort(
    new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })
      .compare,
  );

export const ObjectNaturalSort = (ar, key) =>
  ar.sort((a, b) =>
    a[key].localeCompare(b[key], undefined, {
      numeric: true,
      sensitivity: 'base',
    }),
  );
