export const myLocale = () => {
  return {
    /* starting with Sunday */
    days: 'Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sabado'.split('_'),
    daysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sab'.split('_'),
    months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
    monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Sep_Out_Nov_Dez'.split('_'),
    firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
    format24h: true,
    pluralDay: 'dias'
  }
}

export default myLocale
