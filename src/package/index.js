import Inputs from '@/components/inputs';
import Checkform from '@/components/formCheck/popForm';
const components = {
  Inputs,
  Checkform
};

const install = (Vue) => {
  const keys = Object.keys(components);
  keys.forEach(key => {
    Vue.component(`con${key}`, components[key]);
  });
};
export default Object.assign({}, { install });
