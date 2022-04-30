import moment from "moment";
import "moment/locale/es";

export const getDateDayMonthYear = (published) => {
  moment.locale("es");
  const result = moment(published).format("LL");
  return result;
};
