const SuggestionEnum = {
  0: {
    label: 'Pago Único',
    value: 0,
    type: 'unique',
    labelDate: 'FECHA MANUAL',
  },
  1: { label: 'Mensual', value: 1, type: 'months' },
  3: { label: 'Trimestral', value: 3, type: 'quarter' },
  12: { label: 'Anual', value: 12, type: 'years' },
};

export default SuggestionEnum;
